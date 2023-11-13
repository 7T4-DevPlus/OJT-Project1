function checkUser() {
    if(!localStorage.getItem("userId")){
        window.location.href = "http://127.0.0.1:5500/loginsignup.html";
    }
}
checkUser();

import {  collection, doc, getDocs, updateDoc  } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
import db from "./database.js"
const userDB = collection(db, "users");
const userId = localStorage.getItem("userId");
const users = await getDocs(userDB);

const orderDB = collection(db, "orders");
const orders = await getDocs(orderDB);

const orderDetailsDB = collection(db, "orderDetails");
const orderDetails = await getDocs(orderDetailsDB);

const productDB = collection(db, "products");
const products = await getDocs(productDB);

loadContent('user-info');
loadUserData();
loadOrderHistory();

const userInfoBtn = document.getElementById("userInfo");
const editInfoBtn = document.getElementById("editInfo");
const orderInfoBtn = document.getElementById("orderInfo");

userInfoBtn.addEventListener("click", () => {
    loadContent('user-info')
})

editInfoBtn.addEventListener("click", () => {
    loadContent('edit-info')
})

orderInfoBtn.addEventListener("click", () => {
    loadContent('order-history')
})

function loadContent(pageName) {
    var contentSections = document.querySelectorAll('.content-section');
    var sidebar = document.getElementById('sidebar');

    contentSections.forEach(function (section) {
        section.style.display = 'none';
    });

    if (pageName === 'user-info' || pageName === 'edit-info' || pageName === 'order-history') {
        var selectedSection = document.getElementById(pageName);
        selectedSection.style.display = 'block';

        if (pageName === 'edit-info') {
            sidebar.style.width = '20%';
            // Retrieve the saved values from local storage
            var savedName = localStorage.getItem('name');
            var savedEmail = localStorage.getItem('email');
            var savedPhone = localStorage.getItem('phone');

            // Set the values in the form fields
            document.getElementById('name').value = savedName || ''; // Set the value or leave it empty if not found
            document.getElementById('email').value = savedEmail || '';
            document.getElementById('phone').value = savedPhone || '';

        } else {
            sidebar.style.width = '20%';
        }
    }
}       

function loadUserData() {
    users.forEach((doc) => {
        if(doc.id === userId){
            var userInfo = doc._document.data.value.mapValue.fields;
    
            var name = userInfo.name.stringValue;
            var email = userInfo.email.stringValue;
            var phone = userInfo.phone.stringValue;
    
            var userInfoSection = document.getElementById('user-info');
            userInfoSection.innerHTML = '<h2 style="margin-top: 8px;">User Information</h2>' +
                '<p>Name: ' + name + '</p>' +
                '<p>Email: ' + email + '</p>' +
                '<p>Phone: ' + phone + '</p>';
        }
    })
}

var editForm = document.getElementById('edit-form');

users.forEach((doc) => {
    if(doc.id === userId){
        var emailInput = document.getElementById('email');
        var nameInput = document.getElementById('name');
        var phoneInput = document.getElementById('phone');

        var userInfomation = doc._document.data.value.mapValue.fields;

        nameInput.placeholder = `${userInfomation.name.stringValue}`
        emailInput.placeholder = `${userInfomation.email.stringValue}`
        phoneInput.placeholder = `${userInfomation.phone.stringValue}`

        nameInput.defaultValue = `${userInfomation.name.stringValue}`
        emailInput.defaultValue = `${userInfomation.email.stringValue}`
        phoneInput.defaultValue = `${userInfomation.phone.stringValue}`
    }
})

editForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    const docRef = doc(db, "users", userId);
    await updateDoc(docRef, {"name":name, "email":email, "phone":phone});

    alert('User information saved.');
    window.top.location.href = `http://127.0.0.1:5500/userProfile.html`;

    loadUserData();
    loadContent('user-info');
});

function loadOrderHistory() {
    orders.forEach((doc) => {
        var orderInfo = doc._document.data.value.mapValue.fields
        if(orderInfo.userId.stringValue === userId){
            var orderHistorySection = document.getElementById('order-list');
            var parts = orderInfo.date.timestampValue.split("T")[0].split("-");
            var formattedDate = `${parts[0]}/${parts[1]}/${parts[2]}`;
            orderHistorySection.innerHTML += 
            `
            <li id=${doc.id} class="order-details">Order ${doc.id} - Date: ${formattedDate} - Total: ${orderInfo.total.integerValue}VNĐ</li>
            `
        }
    })
}
var modal = document.getElementById("order-modal");

var detailsButtons = document.querySelectorAll(".order-details");
detailsButtons.forEach((detailsBtn) => {
    detailsBtn.onclick = function() {
        modal.style.display = "block";
        var orderId = detailsBtn.id; 
        getOrderDetails(orderId)
    }
})

function getOrderDetails(id){
    orders.forEach((orderDoc) => {
        let orderInfo = orderDoc._document.data.value.mapValue.fields;
        if(orderDoc.id === id){   
            modal.innerHTML = `
            <div id="order-details-modal" class="order-details-modal" >
                <h2 style="margin: 0;">ORDER DETAILS</h2>
                <p style="text-align: left;">Total: ${orderInfo.total.integerValue} VNĐ</p>
                <div style="display: flex; width: 100%">
                    <div style="width: 30%">
                        <p style="text-align: left;">Image</p>
                    </div>
                    <div style="width: 20%">
                        <p>Name</p>
                    </div>
                    <div style="width: 20%">
                        <p>Size</p>
                    </div>
                    <div style="width: 20%">
                        <p>Price</p>
                    </div>
                    <div style="width: 20%">
                        <p>Quantity</p>
                    </div>
                </div> 
            </div> `
            var orderItemIds = orderInfo.orderDetails.arrayValue.values;    //2
            orderItemIds.forEach((orderItemid) => {                         //lấy tất cả orderDetails trong order
                orderDetails.forEach((orderDetailsDoc) =>{     //3
                    let orderDetailsInfo = orderDetailsDoc._document.data.value.mapValue.fields
                    if(orderDetailsDoc.id === orderItemid.stringValue){    //check orderDetails trong db
                        products.forEach((productDoc) => {                                  //4
                            let productInfo = productDoc._document.data.value.mapValue.fields;
                            if(productDoc.id === orderDetailsInfo.productId.stringValue){   //check product trong orderDetails
                                console.log(orderDetailsInfo);
                                document.getElementById("order-details-modal").innerHTML += 
                                `<div style="border: solid 1px black; display: flex; height: 20vh; width: 100%">
                                    <div style="width: 30%">
                                        <img style="height: 100%; width: auto;" src="${productInfo.imgUrl.arrayValue.values[0].stringValue}"/>
                                    </div>
                                    <div style="width: 20%">
                                        <p>${productInfo.name.stringValue}</p>
                                    </div>
                                    <div style="width: 20%">
                                        <p>${orderDetailsInfo.size.stringValue}</p>
                                    </div>
                                    <div style="width: 20%">
                                        <p>${productInfo.price.integerValue} VNĐ</p>
                                    </div>
                                    <div style="width: 20%">
                                        <p>${orderDetailsInfo.quantity.integerValue}</p>
                                    </div>
                                </div>`
                            }                                                                         
                        });                                                                     
                    }                                           
                });                                             
            });                                                            
        }                                                                  
    });                         
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

const logoutBtn = document.getElementById("logout");
logoutBtn.onclick = function() {
    localStorage.removeItem("userId");
    window.location.href = "http://127.0.0.1:5500/userProfile.html";
}