const orderList = document.querySelector("#order-list");

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
      cartStatus();
    }

    function checkItemInCart(productInfo) {
      const itemInCart = orderList.querySelector(
        `[data-id="${productInfo.id}"]`
      );

      if (itemInCart) {
        const counterElement = itemInCart.querySelector("[data-counter]");
        const newQuantity = parseInt(counterElement.innerText) + 1;
        counterElement.innerText = newQuantity;
        
        updateItemCount(); // Обновляем количество
        updateTotalAmount(); // Пересчитываем общую сумму
      } else {
        addToCart(productInfo);
      }
    }

    addBasketEventListeners();
    window.addEventListener("productsRendered", addBasketEventListeners);
});