const productLink = document.getElementById('product-link');
const productList = document.getElementById('product-list');
const toggleIcon = document.getElementById('toggle-icon');

import {  collection, doc, getDocs, addDoc, updateDoc  } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import db from "./database.js"
const productDB = collection(db, "products");

productLink.onclick = function() {
    if (productList.style.display === 'none') {
        productList.style.display = 'block'; // Hiển thị danh sách con
    } else {
        productList.style.display = 'none'; // Ẩn danh sách con
    }
}

//Products
const products = await getDocs(productDB);
async function getProducts() {
    products.forEach((doc) => {
        let product = doc._document.data.value.mapValue.fields;
        if (product.imgUrl.arrayValue.values.length > 1) {
            document.getElementById('products').innerHTML += `
            <div style="border: 1px solid #ddd; width: 84%; margin-bottom: 5vh; margin-left: 2vw;">
                <div class="product-box">
                    <div class="product-thumbnail">
                        <img class="original" src="${product.imgUrl.arrayValue.values[0].stringValue}">
                        <img class="hover" src="${product.imgUrl.arrayValue.values[1].stringValue}">
                        <div class="hover-part">
                            <div class="pumpup-item" style="border-right: 1px solid white">
                            <button class="look-button" id="${product.productId.stringValue}">
                                Xem nhanh
                                <span>
                                    <img
                                    src="https://res.cloudinary.com/dfz0xsh2d/image/upload/v1699004047/Image_OJT7T4_Project1/Session3_body/eye_zfoznw.png"
                                    style="display: inline; width: 10px; height: auto"
                                    />
                                </span>
                            </button>
                            </div>
                            <div class="pumpup-item">
                            <button class="details-button" id="${product.productId.stringValue}">
                                Mua ngay
                                <span>
                                    <img
                                    src="https://res.cloudinary.com/dfz0xsh2d/image/upload/v1699004048/Image_OJT7T4_Project1/Session3_body/cart_gskmks.png"
                                    style="display: inline; width: 10px; height: auto"
                                    />
                                </span>
                            </button>
                            </div>
                        </div>
                    </div>      
                </div>
                <div class="product-info a-left">
                    <p style="margin:0;">${product.name.stringValue}</p>
                    <p style="margin:0;">${product.price.integerValue} <u>đ</u></p>
                </div> 
            </div>
            `;
        }else{
            document.getElementById('products').innerHTML += `
            <div style="border: 1px solid #ddd; width: 84%; margin-bottom: 5vh; margin-left: 2vw;">
                <div class="product-box">
                    <div class="product-thumbnail">
                        <img src="${product.imgUrl.arrayValue.values[0].stringValue}">
                        <div class="hover-part">
                            <div class="pumpup-item" style="border-right: 1px solid white">
                            <button class="look-button" id="${product.productId.stringValue}">
                                Xem nhanh
                                <span>
                                    <img
                                    src="https://res.cloudinary.com/dfz0xsh2d/image/upload/v1699004047/Image_OJT7T4_Project1/Session3_body/eye_zfoznw.png"
                                    style="display: inline; width: 10px; height: auto"
                                    />
                                </span>
                            </button>
                            </div>
                            <div class="pumpup-item">
                            <button class="details-button" id="${product.productId.stringValue}">
                                Mua ngay
                                <span>
                                    <img
                                    src="https://res.cloudinary.com/dfz0xsh2d/image/upload/v1699004048/Image_OJT7T4_Project1/Session3_body/cart_gskmks.png"
                                    style="display: inline; width: 10px; height: auto"
                                    />
                                </span>
                            </button>
                            </div>
                        </div>
                    </div>      
                </div>
                <div class="product-info a-left">
                    <p style="margin:0;">${product.name.stringValue}</p>
                    <p style="margin:0;">${product.price.integerValue} <u>đ</u></p>
                </div> 
            </div>
            `;
        };
    });
}
getProducts();

//Modal
var modal = document.getElementById("product-modal");
var detailsButtons = document.querySelectorAll(".details-button");
detailsButtons.forEach((detailsBtn) => {
    detailsBtn.addEventListener("click", () => {
        window.location.href = `http://127.0.0.1:5500/productDetail.html?id=${detailsBtn.id}`;
    });
})

var lookButtons = document.querySelectorAll(".look-button");
lookButtons.forEach((lookBtn) => {
    lookBtn.onclick = function() {
        modal.style.display = "block";
        var productId = lookBtn.id; 
        console.log(productId)
        productDetails(productId)
    }
})

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

function productDetails(id){
    products.forEach((doc) => {
        let productDetails = doc._document.data.value.mapValue.fields;
        if(productDetails.productId.stringValue === id){
            modal.innerHTML =
            `<div class="product-details" id="${productDetails.productId.stringValue}" >
                <div style="display: flex;">
                    <div class="left-block-modal">
                        <img id="displayImg" src="${productDetails.imgUrl.arrayValue.values[0].stringValue}"
                        style="width: 100%; margin: 2%;"/>
                        <div class="product-pictures-container">
                            <div id="product-pictures" class="product-pictures">
                                
                            </div>
                        </div>
                    </div>
                    <div class="right-block-modal">
                        <p style="margin-bottom: 0;">${productDetails.name.stringValue}</p>
                        <p style="font-size: 2vh;">${productDetails.productId.stringValue}</p>
                        <hr>
                        <p>${productDetails.price.integerValue} <u>đ</u></p>
                        <hr>
                        <p style="font-size: 2vh; margin-bottom: 0">Kích thước:</p>
                        <div style="display: flex; margin-bottom: 5px;">
                            <button id="sizeLarge" class="size-choice">L</button>
                            <button id="sizeMedium" class="size-choice">M</button>
                            <button id="sizeSmall" class="size-choice">S</button>
                        </div>
                        <button class="add-cart-btn">
                            Thêm vào giỏ
                        </button>
                        <div style="text-align: center;">
                            <p style="font-size: 2vh;"> Hoặc <b>xem chi tiết</b></p>
                        </div>
                    </div>
                </div>
            </div>`    
            let imgUrlSlide = productDetails.imgUrl.arrayValue.values;
            imgUrlSlide.forEach(img => {
                console.log(img.stringValue)
                document.getElementById("product-pictures").innerHTML += 
                `<div class="product-picture">
                    <img onclick="changeImage(this.src)
                    src="${img.stringValue}"/>
                </div>`
            });
        }
    })
}

// SIZE
var sizeL = document.getElementById("sizeLarge");
var sizeM = document.getElementById("sizeMedium");
var sizeS = document.getElementById("sizeSmall");

sizeL.onclick = function() {
    if(sizeL.classList.contains("size-choice"))
    {
        sizeL.classList.remove("size-choice");
        sizeL.classList.toggle("size-chosen");
    }
    
    if(sizeM.classList.contains("size-chosen"))
    {
        sizeM.classList.remove("size-chosen");
        sizeM.classList.toggle("size-choice");
    } else if(sizeS.classList.contains("size-chosen"))
    {
        sizeS.classList.remove("size-chosen");
        sizeS.classList.toggle("size-choice");
    } 
}

sizeM.onclick = function() {
    if(sizeM.classList.contains("size-choice"))
    {
        sizeM.classList.remove("size-choice");
        sizeM.classList.toggle("size-chosen");
    }
    
    if(sizeL.classList.contains("size-chosen"))
    {
        sizeL.classList.remove("size-chosen");
        sizeL.classList.toggle("size-choice");
    } else if(sizeS.classList.contains("size-chosen"))
    {
        sizeS.classList.remove("size-chosen");
        sizeS.classList.toggle("size-choice");
    } 
}

sizeS.onclick = function() {
    if(sizeS.classList.contains("size-choice"))
    {
        sizeS.classList.remove("size-choice");
        sizeS.classList.toggle("size-chosen");
    }
    
    if(sizeL.classList.contains("size-chosen"))
    {
        sizeL.classList.remove("size-chosen");
        sizeL.classList.toggle("size-choice");
    } else if(sizeS.classList.contains("size-chosen"))
    {
        sizeS.classList.remove("size-chosen");
        sizeS.classList.toggle("size-choice");
    } 
}

// SLIDE
var displayImg = document.getElementById("displayImg");

function changeImage(imgUrl) {
    displayImg.src = imgUrl;
}