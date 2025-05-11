window.addEventListener("click", function (event) {
  if (
    event.target.dataset.action === "plus" ||
    event.target.dataset.action === "minus"
  ) {
    const orderItem = event.target.closest(".order-item");

    const orderProductCount = event.target.closest(".order-product-count");
    const counter = orderProductCount.querySelector("[data-counter]");

    if (event.target.dataset.action === "plus") {
      counter.innerText = ++counter.innerText;
    }

    if (event.target.dataset.action === "minus") {
      if (parseInt(counter.innerText) > 1) {
        counter.innerText = --counter.innerText;
      } else if (parseInt(counter.innerText) === 1) {
        orderItem.remove();
        cartStatus();
      }
    }

    updateItemCount(); // Обновляем количество
    updateTotalAmount();
  }
});

window.addEventListener("click", function (event) {
  if (event.target.dataset.action === "delete") {
    const orderItem = event.target.closest(".order-item");
    if (orderItem) {
      orderItem.remove(); // Удаляем элемент из корзины
      updateItemCount(); // Обновляем количество
      updateTotalAmount(); // Обновляем общую сумму
      cartStatus(); // Проверяем статус корзины
    }
  }
});

function updateItemCount() {
  const orderList = document.querySelector("#order-list");
  let totalCount = 0;

  Array.from(orderList.children).forEach((item) => {
    const count = parseInt(item.querySelector("[data-counter]").innerText);
    totalCount += count;
    console.log(
      `Товар: ${
        item.querySelector(".order-product-title").textContent
      }, Количество: ${count}`
    );
  });

  const itemCountElement = document.querySelector(
    ".header-basket-group .header-basket-icon .basket-item-count"
  );
  itemCountElement.innerText = totalCount;
  itemCountElement.style.display = totalCount > 0 ? "flex" : "none";
}

function updateTotalAmount() {
  const orderList = document.querySelector("#order-list");
  let totalAmount = 0;

  Array.from(orderList.children).forEach((item) => {
    const count = parseInt(item.querySelector("[data-counter]").innerText);
    const itemPrice = parseFloat(
      item.querySelector(".order-product-price").textContent
    );
    totalAmount += count * itemPrice;
    console.log(
      `Товар: ${
        item.querySelector(".order-product-title").textContent
      }, Количество: ${count}, Цена: ${itemPrice}`
    );
  });

  const totalAmountElement = document.querySelector(
    ".basket-content.filled .basket-summary .total-amount"
  );
  totalAmountElement.innerText = totalAmount;

  const headerBasketCost = document.querySelector(
    ".header-basket-cost .basket-cost"
  );
  headerBasketCost.innerText = totalAmount;

  console.log(`Общая сумма: ${totalAmount}`);
}
