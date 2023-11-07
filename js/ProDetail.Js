const productsEl = document.getElementById("products");
const productDetailEl = document.getElementById("products-item");

const isShowNavSideBar = (status) => {
  const element = document.getElementById("menu-sidebar");
  if (element) {
    if (element.style.display === "none") {
      element.style.display = "block";
    } else {
      element.style.display = "none";
    }
  }
};
//add json data
window.onload = function () {
  fetch("db.json")
    .then((response) => response.json())
    .then((data) => {
      const products = data.products;

      renderProducts(productsEl, products, false);
      renderProducts(productDetailEl, products, true);
    })
    .catch((error) => {
      console.error("Error fetching JSON data: ", error);
    });
};
//scroll 
const renderProducts = (elRender, data, assignId) => {
  return (elRender.innerHTML = data
    .map((product, index) => {
      if (assignId) {
        return `<li class="${index >= 1 ? "mt-2" : ""}" id="${product.id}">
            <img width="100%" src="${product.image}"/>
        </li>`;
      } else {
        return `<li class="${index >= 1 ? "mt-2" : ""}" onclick={scrollImg("${
          product.id
        }")}>
                <img width="100%" src="${product.image}"/>
            </li>`;
      }
    })
    .join(""));
};

const scrollImg = (idElment) => {
  const element = document.getElementById(idElment);
  element.scrollIntoView({
    bottom: 0,
    behavior: "smooth",
  });
};

// onclick button
function toggleButtonColor(button) {
  
  const buttons = document.querySelectorAll(".size-button");
  buttons.forEach((btn) => {
    btn.classList.remove("black");
  });
  button.classList.add("black");
}

// Lấy các phần tử HTML cần thao tác
const decrementButton = document.getElementById("decrement");
const incrementButton = document.getElementById("increment");
const quantityInput = document.querySelector(".counter");

// Đặt sự kiện khi nút "Trừ" được nhấn
decrementButton.addEventListener("click", () => {
    let currentQuantity = parseInt(quantityInput.value);
    if (currentQuantity > 1) {
        currentQuantity--;
        quantityInput.value = currentQuantity;
    }
});

//quantyti
incrementButton.addEventListener("click", () => {
    let currentQuantity = parseInt(quantityInput.value);
    currentQuantity++;
    quantityInput.value = currentQuantity;
});
quantityInput.addEventListener("input", () => {
    let inputQuantity = parseInt(quantityInput.value);
    if (isNaN(inputQuantity) || inputQuantity < 1) {
        inputQuantity = 1; 
    }
    quantityInput.value = inputQuantity;
});







