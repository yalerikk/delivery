// ------ Header ------

document.addEventListener("DOMContentLoaded", function () {
  const burgerButton = document.querySelector(".header-burger-button");
  const headerMenu = document.querySelector(".header-menu");
  const overlay = document.querySelector(".overlay");
  const menuLinks = document.querySelectorAll(".header-menu-item a");

  burgerButton.addEventListener("click", function () {
    headerMenu.classList.toggle("visible"); // Переключаем класс для отображения меню
    overlay.style.display = "block"; // Показываем затемнение
  });

  overlay.addEventListener("click", function () {
    headerMenu.classList.remove("visible"); // Закрываем меню при клике на затемнение
    overlay.style.display = "none"; // Скрываем затемнение
  });

  // Закрытие сайдбара при клике на любые ссылки
  menuLinks.forEach((link) => {
    link.addEventListener("click", function () {
      headerMenu.classList.remove("visible"); // Закрываем меню
      overlay.style.display = "none"; // Скрываем затемнение
    });
  });
});

// ------ Basket ------

document.addEventListener("DOMContentLoaded", function () {
  const basketButton = document.querySelector(".header-basket-button");
  const basketPopup = document.getElementById("basket");
  const emptyBasketContent = document.querySelector(".basket-content.empty");
  const filledBasketContent = document.querySelector(".basket-content.filled");

  // Определяем, на какой странице мы находимся
  const isCartPage = window.location.pathname.includes("cartpage.html");

  basketButton.addEventListener("click", function (event) {
    event.stopPropagation();
    toggleBasketDisplay();
  });

  if (!isCartPage) {
    // Закрытие корзины при клике вне её области
    document.addEventListener("click", function (event) {
      if (!basketPopup.contains(event.target)) {
        hideAllBaskets(emptyBasketContent, filledBasketContent);
      }
    });
  }

  // Добавление ссылки на раздел сайта
  const fakeOrderButton = emptyBasketContent.querySelector(".basket-button");
  fakeOrderButton.addEventListener("click", function (event) {
    location.href = "/#set"; // Переход к разделу "set"
  });

  // Добавление ссылки на страницу оформления заказа
  const orderButton = filledBasketContent.querySelector(".basket-button");
  orderButton.addEventListener("click", function (event) {
    if (!isCartPage) {
      location.href = "/cartpage.html"; // Переход
    } else {
      location.href = "#order-form";
    }
  });

  function toggleBasketDisplay() {
    cartStatus(); // Проверяем статус корзины при открытии
  }

  function hideAllBaskets(emptyBasketContent, filledBasketContent) {
    emptyBasketContent.style.display = "none";
    filledBasketContent.style.display = "none";
  }
});

// ------ Footer ------

document.addEventListener("DOMContentLoaded", function () {
  const menuWrappers = document.querySelectorAll(".footer-menu-wrapper");
  const categoryWrappers = document.querySelectorAll(
    ".footer-category-wrapper"
  );

  menuWrappers.forEach((wrapper) => {
    const menuHeader = wrapper.querySelector(".footer-menu-header");
    if (menuHeader) {
      menuHeader.addEventListener("click", function () {
        wrapper.classList.toggle("open");
      });
    }
  });

  categoryWrappers.forEach((wrapper) => {
    const categoryHeader = wrapper.querySelector(".footer-category-header");
    if (categoryHeader) {
      categoryHeader.addEventListener("click", function () {
        wrapper.classList.toggle("open");
      });
    }
  });
});
