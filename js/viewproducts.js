const productLink = document.getElementById('product-link');
const productList = document.getElementById('product-list');
const toggleIcon = document.getElementById('toggle-icon');

import {  collection, doc, getDocs, addDoc, updateDoc  } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import db from "./database.js"
const productDB = collection(db, "products");
const cartitemDB = collection(db, "cartItems");

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
                            <button class="details-button" id="${doc.id}">
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
                            <button class="details-button" id="${doc.id}">
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
        window.location.href = `http://127.0.0.1:5500/OJT-Project1/productDetail.html?id=${detailsBtn.id}`;
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
                        <img id="displayImg" class="displayImg" src="${productDetails.imgUrl.arrayValue.values[0].stringValue}"
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
                        <form id="add-to-cart-form" class="${id}" onsubmit="return false">
                            <div>
                                <input type="radio" id="sizeL" name="size" value="L">
                                <label for="sizeL">L</label>
                                <input type="radio" id="sizeM" name="size" value="M" style="margin-left: 10%">
                                <label for="sizeM">M</label>
                                <input type="radio" id="sizeS" name="size" value="S" style="margin-left: 10%">
                                <label for="sizeS">S</label>
                            </div>
                            <button type="submit" class="add-cart-btn">
                                Thêm vào giỏ
                            </button>
                        </form>
                        <div style="text-align: center;">
                            <p style="font-size: 2vh;"> Hoặc <b>xem chi tiết</b></p>
                        </div>
                    </div>
                </div>
            </div>
            <script>
                var displayImg = document.getElementsByClassName("displayImg");
                var addForm = document.getElementById('add-to-cart-form');
                    addForm.addEventListener('submit', async (event) => {
                        event.preventDefault();
                        var size = document.querySelector('input[name="size"]:checked').value;

                        var productId = addForm.className; 
                        console.log("product id:", productId);
                        console.log("userId:", localStorage.getItem("userId"))
                        console.log("size:", size);

                        if(!localStorage.getItem("userId")){
                            alert("Please login to buy product")
                        }else{
                            const docRef = await addDoc(cartitemDB, {
                                "userId": localStorage.getItem("userId"), 
                                "productId": productId, 
                                "size": size, 
                                "quantity": 1
                            });
                            console.log(docRef.id);
                        }
                    });
            </script>`    
            let imgUrlSlide = productDetails.imgUrl.arrayValue.values;
            imgUrlSlide.forEach(img => {
                document.getElementById("product-pictures").innerHTML += 
                `<div class="product-picture">
                    <img onclick="changeImg(this.src)" class="slideImg" src="${img.stringValue}"/>
                </div>`
            });
        }
    })
}

//Add to cart
// var addForm = document.getElementById('add-to-cart-form');
// addForm.addEventListener('submit', async (event) => {
//     event.preventDefault();
//     var size = document.querySelector('input[name="size"]:checked').value;

//     var productId = addForm.className; 
//     console.log("product id:", productId);
//     console.log("userId:", localStorage.getItem("userId"))
//     console.log("size:", size);

//     if(!localStorage.getItem("userId")){
//         alert("Please login to buy product")
//     }else{
//         const docRef = await addDoc(cartitemDB, {
//             "userId": localStorage.getItem("userId"), 
//             "productId": productId, 
//             "size": size, 
//             "quantity": 1
//         });
//         console.log(docRef.id);
//     }
// });