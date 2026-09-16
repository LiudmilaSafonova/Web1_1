const cart = JSON.parse(localStorage.getItem("cart")) || [];
const cartItems = document.querySelector("#cart-page-items");
const cartTotal = document.querySelector("#cart-page-total");
const checkoutForm = document.querySelector("form.checkout-form");
const orderMessage = document.querySelector("#order-message");
const orderModal = document.querySelector("#order-modal");
const orderModalClose = document.querySelector("#order-modal-close");
const firstNameInput = document.querySelector("#first-name");
const lastNameInput = document.querySelector("#last-name");
const phoneInput = document.querySelector("#phone");
const streetInput = document.querySelector("#street");
const houseInput = document.querySelector("#house");
const apartmentInput = document.querySelector("#apartment");

function validateForm() {
  const namePattern = /^[А-ЯЁA-Z][а-яёa-z]+(?:(?: |-)[А-ЯЁA-Z][а-яёa-z]+)*$/;

  if (firstNameInput.value !== "" && !namePattern.test(firstNameInput.value)) {
    firstNameInput.setCustomValidity("Имя должно начинаться с заглавной буквы и содержать только буквы");
  } else {
    firstNameInput.setCustomValidity("");
  }

  if (lastNameInput.value !== "" && !namePattern.test(lastNameInput.value)) {
    lastNameInput.setCustomValidity("Фамилия должна начинаться с заглавной буквы и содержать только буквы");
  } else {
    lastNameInput.setCustomValidity("");
  }

  const phoneDigits = phoneInput.value.replace(/\D/g, "");
  if (phoneInput.value !== "" && (phoneDigits.length < 10 || phoneDigits.length > 15)) {
    phoneInput.setCustomValidity("Телефон должен содержать от 10 до 15 цифр");
  } else {
    phoneInput.setCustomValidity("");
  }

  const streetLetters = streetInput.value.match(/[А-Яа-яЁёA-Za-z]/g) || [];
  if (streetInput.value !== "" && streetLetters.length < 3) {
    streetInput.setCustomValidity("Название улицы должно содержать не менее трёх букв");
  } else {
    streetInput.setCustomValidity("");
  }

  const houseNumber = Number(houseInput.value);
  if (houseInput.value !== "" && (!Number.isInteger(houseNumber) || houseNumber < 1)) {
    houseInput.setCustomValidity("Введите корректный номер дома");
  } else {
    houseInput.setCustomValidity("");
  }

  const apartmentNumber = Number(apartmentInput.value);
  if (apartmentInput.value !== "" && (!Number.isInteger(apartmentNumber) || apartmentNumber < 1)) {
    apartmentInput.setCustomValidity("Введите корректный номер квартиры");
  } else {
    apartmentInput.setCustomValidity("");
  }

  return checkoutForm.checkValidity();
}

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

  if (!validateForm()) {
    checkoutForm.reportValidity();
    return;
  }

  if (cart.length === 0) {
    orderMessage.textContent = "Добавьте товары в корзину";
    return;
  }

  orderMessage.textContent = "";
  orderModal.hidden = false;
});

checkoutForm.addEventListener("input", function () {
  validateForm();
});

orderModalClose.addEventListener("click", function () {
  orderModal.hidden = true;
});

showCart();
