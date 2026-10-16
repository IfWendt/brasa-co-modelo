const cart = [];
const cartEl = document.querySelector('#cart');
const scrim = document.querySelector('#scrim');
const cartItems = document.querySelector('#cart-items');
const cartTotal = document.querySelector('#cart-total');
const cartCount = document.querySelector('#bag-count');
const orderButton = document.querySelector('#order-button');
const money = value => value.toLocaleString('pt-BR', {style:'currency', currency:'BRL'});

function renderCart(){
  const total = cart.reduce((sum, item) => sum + item.price, 0);
  cartCount.textContent = cart.length;
  cartTotal.textContent = money(total);
  orderButton.disabled = !cart.length;
  cartItems.innerHTML = cart.length ? cart.map((item, index) => `<div class="cart-row"><div><strong>${item.name}</strong><span>${money(item.price)}</span></div><button data-remove="${index}">remover</button></div>`).join('') : '<p class="cart-empty">Seu pedido ainda está vazio.<br>Que tal começar pelo Brasa Smash?</p>';
  cartItems.querySelectorAll('[data-remove]').forEach(button => button.addEventListener('click', () => {cart.splice(Number(button.dataset.remove),1); renderCart()}));
}
function toggleCart(open){cartEl.classList.toggle('open',open);scrim.classList.toggle('open',open);cartEl.setAttribute('aria-hidden',String(!open))}
document.querySelectorAll('.add').forEach(button => button.addEventListener('click', () => {cart.push({name:button.dataset.name,price:Number(button.dataset.price)});renderCart();toggleCart(true)}));
document.querySelector('#open-bag').addEventListener('click',()=>toggleCart(true));
document.querySelector('#close-bag').addEventListener('click',()=>toggleCart(false));
scrim.addEventListener('click',()=>toggleCart(false));
document.querySelectorAll('.menu-filters button').forEach(button => button.addEventListener('click',()=>{document.querySelectorAll('.menu-filters button').forEach(item=>item.classList.remove('active'));button.classList.add('active');let shown=0;document.querySelectorAll('.dish').forEach(dish=>{const show=button.dataset.category==='all'||dish.dataset.category===button.dataset.category;dish.hidden=!show;if(show)shown++});document.querySelector('#no-dishes').hidden=shown!==0;}));
orderButton.addEventListener('click',()=>{const list=cart.map(item=>`• ${item.name} — ${money(item.price)}`).join('%0A');const total=money(cart.reduce((sum,item)=>sum+item.price,0));window.open(`https://wa.me/5511999999999?text=Olá!%20Quero%20fazer%20este%20pedido:%0A${list}%0A%0ASubtotal:%20${encodeURIComponent(total)}`,'_blank','noopener');});
