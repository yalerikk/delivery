const setList = document.querySelector("#set-list");
const catalogList = document.querySelector("#catalog-list");
const filterButtons = document.querySelectorAll(".filter-btn");

let productsArray = [];

document.addEventListener("DOMContentLoaded", function () {
  getProducts();

  filterButtons.forEach((button) => {
    button.addEventListener("click", function () {
      // Удаляем активный класс у всех кнопок
      filterButtons.forEach((btn) => btn.classList.remove("filter-btn-active"));
      // Добавляем активный класс на текущую кнопку
      this.classList.add("filter-btn-active");

      // Фильтруем продукты в зависимости от активной кнопки
      filterProducts();
    });
  });
});

async function getProducts() {
  const response = await fetch("./scripts/products.json");
  productsArray = await response.json();

  // Отрисовываем все сеты и пироги по умолчанию
  const defaultProducts = productsArray.filter(
    (item) => item.type === "pirogi" || item.type === "sety"
  );
  renderProducts(defaultProducts); // Отрисовываем по умолчанию
}

function filterProducts() {
  const activeButton = document.querySelector(".filter-btn-active");
  const activeType = activeButton.classList[1].split("-")[2]; // Получаем тип из класса
  console.log("activeType: " + activeType);

  // Фильтруем только по типу, при этом всегда добавляем сеты
  const filteredProducts = productsArray.filter(
    (item) => item.type === activeType || item.type === "sety"
  );

  // Отрисовываем отфильтрованные продукты
  renderProducts(filteredProducts);
}

function renderProducts(productsArray) {
  setList.innerHTML = ""; // Очищаем список для сетов
  catalogList.innerHTML = ""; // Очищаем список для категорий

  productsArray.forEach(function (item) {
    const productHTML = `<li class="catalog-item" data-id="${item.id}">
                <img class="item-image" src="/images/product/${item.image}" alt="${item.title}" loading="lazy">
                <div class="item-content">
                    <div class="item-product">
                        <span class="item-product-parameter">${item.parameter}</span>
                        <p class="item-product-title">${item.title}</p>
                        <p class="item-product-description">${item.description}</p>
                    </div>
                    <div class="item-product-summary">
                        <span class="item-product-price">${item.price} BYN</span>
                        <button class="item-product-order-btn">Заказать</button>
                    </div>
                </div>
            </li>`;

    if (item.type === "sety") {
      setList.insertAdjacentHTML("beforeend", productHTML); // Для сетов
    } else {
      catalogList.insertAdjacentHTML("beforeend", productHTML); // Для остальных категорий
    }
  });

  // Генерируем событие после отрисовки продуктов
  const event = new Event("productsRendered");
  window.dispatchEvent(event);
}
