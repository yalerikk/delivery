function cartStatus() {
  const orderList = document.querySelector("#order-list");
  const emptyBasketContent = document.querySelector(".basket-content.empty");
  const filledBasketContent = document.querySelector(".basket-content.filled");

  if (orderList.children.length > 0) {
    console.log("FULL");
    showFilledBasket();
  } else {
    console.log("EMPTY");
    showEmptyBasket();
  }

  function showEmptyBasket() {
    emptyBasketContent.style.display = "block";
    filledBasketContent.style.display = "none";
  }

  function showFilledBasket() {
    emptyBasketContent.style.display = "none";
    filledBasketContent.style.display = "block";
  }
}
