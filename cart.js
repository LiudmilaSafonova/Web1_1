const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItems = document.querySelector("#cart-page-items");
const cartTotal = document.querySelector("#cart-page-total");
const checkoutForm = document.querySelector("form.checkout-form");
const orderMessage = document.querySelector("#order-message");

function showCart() {
  cartItems.innerHTML = "";
  let totalPrice = 0;

  if (cart.length === 0) {
    cartItems.textContent = "Корзина пуста";
  }

  cart.forEach(function (product) {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    const productElement = document.createElement("p");
    const productPrice = product.price * product.quantity;
    productElement.textContent = product.name + " × " + product.quantity + " шт.";
    cartItem.appendChild(productElement);

    const productPriceElement = document.createElement("p");
    productPriceElement.classList.add("cart-product-price");
    productPriceElement.textContent = productPrice.toLocaleString("ru-RU") + " ₽";
    cartItem.appendChild(productPriceElement);

    const quantityControls = document.createElement("div");
    quantityControls.classList.add("quantity-controls");

    const minusButton = document.createElement("button");
    minusButton.type = "button";
    minusButton.textContent = "−";
    minusButton.addEventListener("click", function () {
      changeQuantity(product.id, -1);
    });

    const quantityElement = document.createElement("span");
    quantityElement.textContent = product.quantity;

    const plusButton = document.createElement("button");
    plusButton.type = "button";
    plusButton.textContent = "+";
    plusButton.addEventListener("click", function () {
      changeQuantity(product.id, 1);
    });

    const deleteButton = document.createElement("button");
    deleteButton.type = "button";
    deleteButton.textContent = "×";
    deleteButton.classList.add("delete-item-button");
    deleteButton.setAttribute("aria-label", "Удалить товар");
    deleteButton.addEventListener("click", function () {
      deleteProduct(product.id);
    });

    quantityControls.appendChild(minusButton);
    quantityControls.appendChild(quantityElement);
    quantityControls.appendChild(plusButton);
    quantityControls.appendChild(deleteButton);
    cartItem.appendChild(quantityControls);
    cartItems.appendChild(cartItem);

    totalPrice = totalPrice + productPrice;
  });

  cartTotal.textContent = "Итого: " + totalPrice.toLocaleString("ru-RU") + " ₽";
  localStorage.setItem("cart", JSON.stringify(cart));
}

function changeQuantity(productId, change) {
  const product = cart.find(function (item) {
    return item.id === productId;
  });

  product.quantity = product.quantity + change;

  if (product.quantity === 0) {
    deleteProduct(productId);
    return;
  }

  showCart();
}

function deleteProduct(productId) {
  const productIndex = cart.findIndex(function (product) {
    return product.id === productId;
  });

  cart.splice(productIndex, 1);
  showCart();
}

checkoutForm.addEventListener("submit", function (event) {
  event.preventDefault();

  if (cart.length === 0) {
    orderMessage.textContent = "Добавьте товары в корзину";
    return;
  }

  orderMessage.textContent = "Заказ создан!";
});

showCart();
