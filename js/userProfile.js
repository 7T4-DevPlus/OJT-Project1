function checkUser() {
    if(!localStorage.getItem("userId")){
        window.location.href = "http://127.0.0.1:5500/loginsignup.html";
    }
}
checkUser();

const userId = localStorage.getItem("userId");

const userApi = 'https://fourt7.onrender.com/api/users';
const usersResponse = await fetch(userApi);
const users = await usersResponse.json();

const orderApi = 'https://fourt7.onrender.com/api/orders';
const ordersResponse = await fetch(orderApi);
const orders = await ordersResponse.json();

const orderDetailsApi = 'https://fourt7.onrender.com/api/orderDetails';
const orderDetailsResponse = await fetch(orderDetailsApi);
const orderDetails = await orderDetailsResponse.json();

const productsApi = 'https://fourt7.onrender.com/api/products';
const productsResponse = await fetch(productsApi);
const products = await productsResponse.json();

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
        sidebar.style.width = '20%';  
    }
}       

function loadUserData() {
    users.forEach((userInfo) => {
        if(userInfo.id === userId){
    
            var name = userInfo.name;
            var email = userInfo.email;
            var phone = userInfo.phone;
    
            var userInfoSection = document.getElementById('user-info');
            userInfoSection.innerHTML = '<h2 style="margin-top: 8px;">User Information</h2>' +
                '<p>Name: ' + name + '</p>' +
                '<p>Email: ' + email + '</p>' +
                '<p>Phone: ' + phone + '</p>';
        }
    })
}

var editForm = document.getElementById('edit-form');

users.forEach((userInfo) => {
    if(userInfo.id === userId){
        var emailInput = document.getElementById('email');
        var nameInput = document.getElementById('name');
        var phoneInput = document.getElementById('phone');

        nameInput.placeholder = `${userInfo.name}`
        emailInput.placeholder = `${userInfo.email}`
        phoneInput.placeholder = `${userInfo.phone}`

        nameInput.defaultValue = `${userInfo.name}`
        emailInput.defaultValue = `${userInfo.email}`
        phoneInput.defaultValue = `${userInfo.phone}`
    }
})

editForm.addEventListener('submit', async (event) => {
    event.preventDefault();

    var name = document.getElementById('name').value;
    var email = document.getElementById('email').value;
    var phone = document.getElementById('phone').value;

    var editUser = {
        name:  name,
        email: email,
        phone: phone,
      }

    const patchUrl = `https://fourt7.onrender.com/api/users/${userId}`;

    console.log(JSON.stringify(editUser))
    fetch(patchUrl, {
        method: 'PATCH',
        body: JSON.stringify(editUser),
        headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(a => {
            console.log('Dữ liệu đã được gửi thành công:', a);
        })
        .catch(error => {
            // console.error('Lỗi cho có', error);
        });

    alert('User information saved.');
    window.top.location.href = `http://127.0.0.1:5500/userProfile.html`;

    loadUserData();
    loadContent('user-info');
});

function loadOrderHistory() {
    orders.forEach((order) => {
        if(orderInfo.userId.stringValue === userId){
            var orderHistorySection = document.getElementById('order-list');
            var parts = order.date.split("T")[0].split("-");
            var formattedDate = `${parts[0]}/${parts[1]}/${parts[2]}`;
            orderHistorySection.innerHTML += 
            `
            <li id=${order.id} class="order-details">Order ${order.id} - Date: ${formattedDate} - Total: ${order.total.toLocaleString()}VNĐ</li>
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
    orders.forEach((orderInfo) => {
        if(orderInfo.id === id){   
            modal.innerHTML = `
            <div id="order-details-modal" class="order-details-modal" >
                <h2 style="margin: 0;">ORDER DETAILS</h2>
                <p style="text-align: left;">Total: ${orderInfo.total.toLocaleString()} VNĐ</p>
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
            var orderItemIds = orderInfo.orderDetails;    //2
            orderItemIds.forEach((orderItemid) => {                         //lấy tất cả orderDetails trong order
                orderDetails.forEach((orderDetailsDoc) =>{     //3
                    if(orderDetailsDoc.id === orderItemid){    //check orderDetails trong db
                        products.forEach((productInfo) => {                                  //4
                            if(productInfo.id === orderDetailsDoc.productId){   //check product trong orderDetails
                                console.log(orderDetailsDoc);
                                document.getElementById("order-details-modal").innerHTML += 
                                `<div style="border: solid 1px black; display: flex; height: 20vh; width: 100%">
                                    <div style="width: 30%">
                                        <img style="height: 100%; width: auto;" src="${productInfo.imgUrl[0]}"/>
                                    </div>
                                    <div style="width: 20%">
                                        <p>${productInfo.name}</p>
                                    </div>
                                    <div style="width: 20%">
                                        <p>${orderDetailsInfo.size}</p>
                                    </div>
                                    <div style="width: 20%">
                                        <p>${productInfo.price.toLocaleString()} VNĐ</p>
                                    </div>
                                    <div style="width: 20%">
                                        <p>${orderDetailsInfo.quantity}</p>
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