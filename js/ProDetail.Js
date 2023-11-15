const productsEl = document.getElementById("products");
const productDetailEl = document.getElementById("products-item");
const productDetailInforEl = document.getElementById("product-info");
const http = 'https://fourt7.onrender.com/api' //add to servive

const params = new URLSearchParams(document.location.search);
const idProduct = params.get('id');

// tach ra file rieng de su dung chung
const callApi = async (url, callback) => {
  try {
    await fetch(`${http}${url}`).then((result)=> {
      return result.json();
    }).then((data)=>{
      callback(data)
    })
  }
  catch (err) {
    throw err;
  }

}

// methods
callApi(`/products/${idProduct}`, (data)=>actionsRenderData(data))

const actionsRenderData = (data) => {
  renderProducts(productsEl, data.imgUrl, false);
  renderProducts(productDetailEl, data.imgUrl, true);
  renderProductInfo(productDetailInforEl, data)
}



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

// processing DOM
const renderProducts = (elRender, data, assignId) => {
  return (elRender.innerHTML = data
    .map((item, index) => {
      if (assignId) {
        return `<li class="${index >= 1 ? "mt-2" : ""}" id="${item}">
            <img width="100%" src="${item}"/>
        </li>`;
      } else {
        return `<li class="${index >= 1 ? "mt-2" : ""}" onclick={scrollImg("${item}")}>
                <img width="100%" src="${item}"/>
            </li>`;
      }
    })
    .join(""));
};

const renderProductInfo = (elRender, data) => {
  return (elRender.innerHTML = `
    <h1 style="font-family: 'Oswald'">${data?.name ?? ''}</h1>
    <h4>Mã sản phẩm: ${data?.productId ?? ''}</h4>
    <span style="display: block;"> ${data?.price.toLocaleString() ?? ''}vnđ</span>
  `)
}

// scroll
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

// get các phần tử HTML cần thao tác
const decrementButton = document.getElementById("decrement");
const incrementButton = document.getElementById("increment");
const quantityInput = document.querySelector(".counter");

// even khi nút "Trừ" được nhấn
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