const cart = [];
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
const cartPreview = document.querySelector(".cart-preview");

addToCartButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const productCard = button.closest(".product-card");

    const product = {
      id: productCard.dataset.id,
      name: productCard.querySelector(".product-title").textContent,
      price: Number(productCard.dataset.price),
      quantity: 1
    };

    const productInCart = cart.find(function (item) {
      return item.id === product.id;
    });

    if (productInCart) {
      productInCart.quantity = productInCart.quantity + 1;
    } else {
      cart.push(product);
    }

    showCart();
  });
});

function showCart() {
  cartPreview.innerHTML = "";
  let totalPrice = 0;

  if (cart.length === 0) {
    const emptyCartElement = document.createElement("p");
    emptyCartElement.textContent = "Корзина пуста";
    cartPreview.appendChild(emptyCartElement);
    return;
  }

  cart.forEach(function (product) {
    const cartItem = document.createElement("div");
    cartItem.classList.add("cart-item");

    const productElement = document.createElement("p");
    productElement.textContent = product.name + " — " + product.price.toLocaleString("ru-RU") + " ₽";
    cartItem.appendChild(productElement);

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

    quantityControls.appendChild(minusButton);
    quantityControls.appendChild(quantityElement);
    quantityControls.appendChild(plusButton);
    cartItem.appendChild(quantityControls);
    cartPreview.appendChild(cartItem);

    totalPrice = totalPrice + product.price * product.quantity;
  });

  const totalElement = document.createElement("p");
  totalElement.classList.add("cart-total");
  totalElement.textContent = "Итого: " + totalPrice.toLocaleString("ru-RU") + " ₽";
  cartPreview.appendChild(totalElement);
}

function changeQuantity(productId, change) {
  const productIndex = cart.findIndex(function (product) {
    return product.id === productId;
  });

  cart[productIndex].quantity = cart[productIndex].quantity + change;

  if (cart[productIndex].quantity === 0) {
    cart.splice(productIndex, 1);
  }

  showCart();
}
