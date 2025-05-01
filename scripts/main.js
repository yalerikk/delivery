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
