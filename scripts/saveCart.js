function saveCart() {
  const orderList = document.querySelector("#order-list");
  const cartItems = Array.from(orderList.children).map((item) => {
    return {
      id: item.dataset.id,
      title: item.querySelector(".order-product-title").textContent,
      parameter: item.querySelector(".order-product-parameter").textContent,
      price: parseFloat(item.querySelector(".order-product-price").textContent),
      image: item.querySelector(".order-image").src,
      quantity: parseInt(item.querySelector("[data-counter]").innerText),
    };
  });
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

// Функция для загрузки корзины из localStorage
function loadCart() {
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    cart.forEach((item) => addToCart(item)); // Вызов функции для добавления товара в корзину
  }
}

// Вызываем функцию загрузки при загрузке страницы
window.onload = function () {
  loadCart();
};
