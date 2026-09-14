const cart = [];
const addToCartButtons = document.querySelectorAll(".add-to-cart-btn");
const cartPreview = document.querySelector(".cart-preview");

addToCartButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const productCard = button.closest(".product-card");

    const product = {
      id: productCard.dataset.id,
      name: productCard.querySelector(".product-title").textContent,
      price: Number(productCard.dataset.price)
    };

    cart.push(product);
    showCart();
  });
});

function showCart() {
  cartPreview.innerHTML = "";

  cart.forEach(function (product) {
    const productElement = document.createElement("p");
    productElement.textContent = product.name + " — " + product.price.toLocaleString("ru-RU") + " ₽";
    cartPreview.appendChild(productElement);
  });
}
