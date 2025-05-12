const orderList = document.querySelector("#order-list");

function addToCart(productInfo) {
  const cartItemHTML = `
        <li class="order-item" data-id="${productInfo.id}">
            <img class="order-image" src="${productInfo.image}" alt="${productInfo.title}" loading="lazy">
            <div class="order-product">
                <p class="order-product-title">${productInfo.title}</p>
                <span class="order-product-parameter">${productInfo.parameter}</span>
            </div>
            <div class="order-product-count">
                <button class="count-minus" data-action="minus">-</button>
                <p class="count-amount" data-counter>${productInfo.quantity}</p> 
                <button class="count-plus" data-action="plus">+</button>
            </div>
            <span class="order-product-price">${productInfo.price} <span>byn</span></span>
            <button class="order-product-delete-btn" data-action="delete"></button>
        </li>`;

  orderList.insertAdjacentHTML("beforeend", cartItemHTML);
  updateItemCount(); // Обновляем количество
  updateTotalAmount();
  saveCart();
  cartStatus();
}

function checkItemInCart(productInfo) {
  const itemInCart = orderList.querySelector(`[data-id="${productInfo.id}"]`);

  if (itemInCart) {
    const counterElement = itemInCart.querySelector("[data-counter]");
    const newQuantity = parseInt(counterElement.innerText) + 1;
    counterElement.innerText = newQuantity;

    updateItemCount(); // Обновляем количество
    updateTotalAmount(); // Пересчитываем общую сумму
  } else {
    addToCart(productInfo);
  }

  saveCart();
}

function saveCart() {
  console.log("Сохранение корзины...");
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
  console.log("Корзина сохранена:", cartItems);
  localStorage.setItem("cart", JSON.stringify(cartItems));
}

// Функция для загрузки корзины из localStorage
function loadCart() {
  console.log("Загрузка корзины...");
  const cart = JSON.parse(localStorage.getItem("cart"));
  if (cart) {
    console.log("Корзина загружена:", cart);
    cart.forEach((item) => addToCart(item)); // Вызов функции для добавления товара в корзину
  }
}

// Обработчик события для добавления товаров в корзину
document.addEventListener("DOMContentLoaded", function () {
  function addBasketEventListeners() {
    const addToBasketButtons = document.querySelectorAll(
      ".item-product-order-btn"
    );

    addToBasketButtons.forEach(function (button) {
      button.addEventListener("click", function () {
        const itemId = parseInt(
          this.closest(".catalog-item").getAttribute("data-id")
        );
        const itemTitle = this.closest(".item-content").querySelector(
          ".item-product-title"
        ).textContent;
        const itemParameter = this.closest(".item-content").querySelector(
          ".item-product-parameter"
        ).textContent;
        const itemPrice = parseFloat(
          this.closest(".item-product-summary").querySelector(
            ".item-product-price"
          ).textContent
        );
        const itemImage =
          this.closest(".catalog-item").querySelector(".item-image").src;

        const productInfo = {
          id: itemId,
          title: itemTitle,
          parameter: itemParameter,
          price: itemPrice,
          image: itemImage,
          quantity: 1,
        };

        console.log(`Добавлено в корзину: ${productInfo.title}`);
        checkItemInCart(productInfo);
      });
    });
  }

  addBasketEventListeners();
  window.addEventListener("productsRendered", addBasketEventListeners);
});

// Вызываем функцию загрузки при загрузке страницы
window.onload = function () {
  loadCart();
};
