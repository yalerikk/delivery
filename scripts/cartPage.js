document.addEventListener("DOMContentLoaded", function () {
  const orderMethodButton = document.querySelector(".order-method-btn");

  orderMethodButton.addEventListener("click", function (event) {
    location.href = "#footer"; // Переход
  });
});

document.querySelectorAll('input[name="payment"]').forEach((elem) => {
  elem.addEventListener("change", function () {
    const cashInput = document.getElementById("input-cost");
    cashInput.style.display = this.value === "cash" ? "block" : "none";
  });
});

document.getElementById("order-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const orderList = document.querySelector("#order-list");
    
    if (orderList.children.length === 0) {
        alert("Нельзя оформить пустой заказ.");
        return; 
    }

    alert("Заказ принят в обработку, с вами свяжется менеджер, ожидайте.");
    localStorage.removeItem('cart'); 
    orderList.innerHTML = ""; 
    this.reset();
    updateTotalAmount(); 

    cartStatus();

    setTimeout(() => {
        window.location.href = "/"; 
    }, 3000);
});