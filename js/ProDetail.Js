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
