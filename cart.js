const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItems = document.querySelector("#cart-page-items");
const cartTotal = document.querySelector("#cart-page-total");
const checkoutForm = document.querySelector("form.checkout-form");
const orderMessage = document.querySelector("#order-message");
let totalPrice = 0;

if (cart.length === 0) {
  cartItems.textContent = "Корзина пуста";
}

cart.forEach(function (product) {
  const productElement = document.createElement("p");
  const productPrice = product.price * product.quantity;

  productElement.textContent = product.name + " - " + product.quantity + " шт. - " + productPrice.toLocaleString("ru-RU") + " ₽";
  cartItems.appendChild(productElement);

  totalPrice = totalPrice + productPrice;
});

cartTotal.textContent = "Итого: " + totalPrice.toLocaleString("ru-RU") + " ₽";

checkoutForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (cart.length === 0) {
    orderMessage.textContent = "Добавьте товары в корзину";
    return;
  }

  orderMessage.textContent = "Заказ создан!";
});
