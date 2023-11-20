const productsEl = document.getElementById("products");
const productDetailEl = document.getElementById("products-item");
const productDetailInforEl = document.getElementById("product-info");
const http = 'https://fourt7.onrender.com/api' //add to servive

const params = new URLSearchParams(document.location.search);
const idProduct = params.get('id');

getProductDetails()

async function getProductDetails () {
  const url = `https://fourt7.onrender.com/api/products/${idProduct}`;
  const productResponse = await fetch(url);
  const data = await productResponse.json();
  actionsRenderData(data);     
}

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
    <h4>Product code: ${data?.productId ?? ''}</h4>
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
let currentQuantity = 1;

// even khi nút "Trừ" được nhấn
decrementButton.addEventListener("click", () => {
  currentQuantity = parseInt(quantityInput.value);
  if (currentQuantity > 1) {
      currentQuantity--;
    quantityInput.value = currentQuantity;
    }
});

//quantyti
incrementButton.addEventListener("click", () => {
  currentQuantity++;
  quantityInput.value = currentQuantity;
});

let size = "";
document.getElementById("select-size").addEventListener("click", (event) => {
  const target = event.target;

  if (target.classList.contains('S')) {
    size = "S"
  } else if (target.classList.contains('M')) {
    size = "M"
  } else if (target.classList.contains('L')) {
    size = "L"
  }
})

const addBtn = document.querySelector(".add-btn");
addBtn.addEventListener("click", async function () {
  const url = `https://fourt7.onrender.com/api/products/${idProduct}`;
  const productResponse = await fetch(url);
  const data = await productResponse.json();

  console.log(data)
  
  const subTotal = data.price * currentQuantity;

  if(localStorage.getItem("userId")){
    
    var postCartItem = {
      userId:  localStorage.getItem("userId"),
      productId: idProduct,
      productQuantity: currentQuantity,
      productSize: size,
      subTotal : subTotal,
    }
  } else {
    alert("Please login to buy product!")
  }

  const postUrl = "https://fourt7.onrender.com/api/cartItems" 

  console.log(JSON.stringify(postCartItem))
  fetch(postUrl, {
    method: 'POST',
    body: JSON.stringify(postCartItem),
    headers: {
        'Content-Type': 'application/json'
        }
    })
    .then(response => response.json())
    .then(a => {
        console.log('Dữ liệu đã được gửi thành công:', a);
        alert("Add product to cart successfully!");
    })
    .catch(error => {
      console.log(error);
    });

})