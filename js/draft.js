
var orderTotal = 0;



function validatePayment() {
   const checkbox = document.getElementById("payment");
   if (!checkbox.checked) {
      alert("Please select Payment method!");
      return false;
   }
   return true;
}


document.addEventListener("DOMContentLoaded", function () {
   const productCartPrices = document.querySelectorAll(".product-cart-price");

   productCartPrices.forEach((priceDiv) => {
      const priceText = priceDiv.textContent.trim();
      const extractedPrice = Number(priceText.replace(/[^0-9.-]+/g, ""));

      if (!isNaN(extractedPrice) && extractedPrice !== 0) {
         priceDiv.textContent = `${extractedPrice.toLocaleString()} ₫`;
      } else {
         priceDiv.textContent = "";
      }
   });
});






// Check userId từ localStoreages


async function displayCart() {
   const productContainer = document.getElementById("product-details");
   let totalCartPrice = 0;

   const cartAPI = "https://fourt7.onrender.com/api/cartItems";
   const cartResponse = await fetch(cartAPI);
   const cartItems = await cartResponse.json();

   const productAPI = "https://fourt7.onrender.com/api/products";
   const productResponse = await fetch(productAPI);
   const products = await productResponse.json();

   cartItems.forEach((ci) => {
      if (ci.userid == currentuserID) {
         const productDiv = document.createElement("div");
         productDiv.classList.add("product-details");

         const productImgContainer = document.createElement("div");
         productImgContainer.classList.add("product-img-container");

         const quantityCircle = document.createElement("div");
         quantityCircle.classList.add("product-quantity-circle");
         quantityCircle.textContent = ci.productQuantity;

         const productInfo = document.createElement("div");
         productInfo.classList.add("product-info");

         products.forEach((item) => {
            if (item.id == ci.productId) {
               console.log(ci.productId);
               const productImg = document.createElement("img");
               productImg.classList.add("product-img");
               productImg.src = item.imgUrl[0];
               const productName = document.createElement("div");
               productName.classList.add("product-name");
               productName.textContent = item.name;
               productImgContainer.appendChild(productImg);
               productInfo.appendChild(productName);
            }
         });

         const productSize = document.createElement("div");
         productSize.classList.add("product-size");
         productSize.textContent = `Size: ${ci.productSize}`;

         productImgContainer.appendChild(quantityCircle);
         productDiv.appendChild(productImgContainer);

         productInfo.appendChild(productSize);
         productDiv.appendChild(productInfo);

         let totalProductPrice = ci.subtotal;
         totalCartPrice += totalProductPrice;

         const productCartPrice = document.createElement("div");
         productCartPrice.classList.add("product-cart-price");
         productCartPrice.textContent = `${totalProductPrice}`;

         productDiv.appendChild(productCartPrice);
         productContainer.appendChild(productDiv);
      }
   });

   const totalCheckout = document.getElementById("total-checkout");
   totalCheckout.querySelector("b").textContent = `${totalCartPrice}`;

   const orderButton = document.getElementById("orderButton");

   document.getElementById("city").addEventListener("change", function () {
      const shippingRadios = document.querySelectorAll('input[name="shipping"]');

      // Check if a city is selected
      if (this.value !== "") {
         // Automatically select the first shipping method
         shippingRadios[0].checked = true;
      }
   });

   document.getElementById("city").addEventListener("change", function () {
   var citySelect = document.getElementById("city");
   var shippingFeeDiv = document.getElementById("shippingFee");
   var messageDiv = document.getElementById("message");

   if (citySelect.value !== "") {
      shippingFeeDiv.style.display = "block";
      messageDiv.style.display = "none";
   } else {
      shippingFeeDiv.style.display = "none";
      messageDiv.style.display = "block";
   }
    });

   document.addEventListener("DOMContentLoaded", function () {
      const shippingRadios = document.querySelectorAll('input[name="shipping"]');
      const totalCheckout = document.getElementById("total-checkout");
      const productsTotal = document.querySelectorAll(".product-cart-price");

    //   productsTotal.forEach((priceDiv) => {
    //      const priceText = priceDiv.textContent.trim();
    //      const extractedPrice = Number(priceText.replace(/[^0-9.-]+/g, ""));

    //      if (!isNaN(extractedPrice)) {
    //         totalCartPrice += extractedPrice;
    //      }

    //   });

      totalCheckout.querySelector(
         "b"
      ).textContent = `${totalCartPrice.toLocaleString()} ₫`;

      shippingRadios.forEach((radio) => {
         radio.addEventListener("change", function () {
            const selectedShipping = parseFloat(this.value.replace(",", ""));
            var totalPriceWithShipping = totalCartPrice + selectedShipping;
            orderTotal = totalPriceWithShipping;
            totalCheckout.querySelector(
               "b"
            ).textContent = `${totalPriceWithShipping.toLocaleString()} ₫`;
         });
      });
   });
   console.log(totalCartPrice);
   document.getElementById("productsTotal").textContent = `${totalCartPrice.toLocaleString()} ₫`;

    const shippingRadios = document.querySelectorAll('input[name="shipping"]');
    const shippingCost = document.getElementById("shippingCost");
    const displayShippingCost = document.getElementById("displayShippingCost");
    let selectedShippingCost = 0;

   shippingRadios.forEach((radio) => {
      radio.addEventListener("change", function () {
         orderButton.disabled = false;
      });
   });

    shippingRadios.forEach((radio) => {
        radio.addEventListener("change", function () {
            selectedShippingCost = parseFloat(this.value.replace(",", ""));
            const totalPriceWithShipping = totalCartPrice + selectedShippingCost;
            const shippingCostText = `${selectedShippingCost.toLocaleString()} ₫`;

            displayShippingCost.textContent = shippingCostText;
            const totalPriceText = `${totalPriceWithShipping.toLocaleString()} ₫`;
            document.getElementById("total-checkout").textContent =
                totalPriceText.toLocaleString();

            // Show the shipping cost field only when a shipping method is chosen
            shippingCost.style.display = "block";
        });
    });
}
displayCart();


//Order function 

// })

async function creatOrder() {
   var postData = {
            "total" : totalPriceWithShipping,
            "userId": currentuserID,
            "address":"" ,
            "date": dateTime,
            "orderDetails": [],
   }
   console.log(postData)
   // const postOrder = `https://fourt7.onrender.com/api/orders`;
   // const postResponse = await fetch(postOrder, {
   //    method: 'POST',
   //    headers: {
   //          'Content-Type': 'application/json',
   //    },
   //    body: JSON.stringify({
   //          total : totalPriceWithShipping,
   //          userId: currentuserID,
   //          address:"" ,
   //          date: dateTime,
   //          orderDetails: [],
   //    }),
   // }); 

   if (postResponse.ok) {
      console.log("Checkout successful");
   }
   else {
      console.error("Something error...");
   }
}


document.querySelector("orderButton").addEventListener("click", function(){
   creatOrder();
})



//lấy dữ liệu vị trí từ form
// const getDirection = function() {
//    const city = document.querySelector("#city").value;
//    const district = document.querySelector("#district").value;
//    const ward = document.querySelector("#ward").value;
//    return city+district+ward;
// }




 //Chuyển trang sang trang cart.html
// function handleOrderButtonClick() {
//    if (!document.forms[0].checkValidity()) {
//       return false;
//    }

//    alert("Order placed!");
//    setTimeout(function () {
//       window.location.href = "cart.html";
//    }, 5000);
//    return false;
// }

// Get Datetime 
var ngayGioHienTai = new Date();
var ngay = ngayGioHienTai.getDate();
var thang = ngayGioHienTai.getMonth() + 1; // Tháng bắt đầu từ 0
var nam = ngayGioHienTai.getFullYear();

var gio = ngayGioHienTai.getHours();
var phut = ngayGioHienTai.getMinutes();
var giay = ngayGioHienTai.getSeconds();

let dateTime = `${ngay}/${thang}/${nam}` + ` ${gio}:${phut}:${giay}`;
console.log(dateTime.toLocaleString())




 