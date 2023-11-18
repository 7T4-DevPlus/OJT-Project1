const currentuserID = localStorage.getItem("userId");
displayCart();
var cartItemsData = []
var totalPriceWithShippingAll = 0
var address = "";
var totalCartPrice = 0;
var orderDetailsList = [];


async function displayCart() {
   var citis = document.getElementById("city");
   var districts = document.getElementById("district");
   var wards = document.getElementById("ward");

   var Parameter = {
      url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
      method: "GET",
      responseType: "application/json",
   };

   // Code lấy thông tin thành phố, quận, huyện
   try {
      const result = await axios(Parameter);
      renderCity(result.data);
   } catch (error) {
      console.error('Error fetching data:', error);
   }
   // renderCity(data);

   
   function renderCity(data) {
      for (const x of data) {
         citis.options[citis.options.length] = new Option(x.Name, x.Id);
      }
      citis.onchange = function () {
         districts.length = 1;
         wards.length = 1;
         if (this.value !== "") {
            const result = data.filter((n) => n.Id === this.value);

            for (const k of result[0].Districts) {
               districts.options[districts.options.length] = new Option(k.Name, k.Id);
            }
         }
      };
      districts.onchange = function () {
         wards.length = 1;
         const dataCity = data.filter((n) => n.Id === citis.value);
         if (this.value !== "") {
            const dataWards = dataCity[0].Districts.filter((n) => n.Id === this.value)[0]
               .Wards;

            for (const w of dataWards) {
               wards.options[wards.options.length] = new Option(w.Name, w.Id);
            }
         }
      };
   }
   //display shipping method when change address value
   document.getElementById("city").addEventListener("change", function () {
      const shippingRadios = document.querySelectorAll('input[name="shipping"]');

      // Check if a city is selected
      if (this.value !== "") {
         // Automatically select the first shipping method
         shippingRadios[0].checked = true;

         // Manually trigger the change event for the selected shipping radio button
         const event = new Event("change");
         shippingRadios[0].dispatchEvent(event);
      }
   });


   const productContainer = document.getElementById("product-details");

   const cartAPI = "https://fourt7.onrender.com/api/cartItems";
   const cartResponse = await fetch(cartAPI);
   const cartItems = await cartResponse.json();
   console.log(cartItems);

   const productAPI = "https://fourt7.onrender.com/api/products";
   const productResponse = await fetch(productAPI);
   const products = await productResponse.json();

   // const orderDetailsAPI = "https://fourt7.onrender.com/api/orderDetails";
   // const orderDetailsResponse = await fetch(orderDetailsAPI);
   // const orderDetails = await orderDetailsResponse.json();

   let totalPriceWithShipping = 0;

   cartItems.forEach((ci) => {
      if (ci.userId == currentuserID) {
         [...cartItemsData,ci];
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
               cartItemsData = [...cartItemsData,ci];
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

         let totalProductPrice = ci.subTotal;
         totalCartPrice += totalProductPrice;

         const productCartPrice = document.createElement("div");
         productCartPrice.classList.add("product-cart-price");
         productCartPrice.textContent = `${totalProductPrice.toLocaleString()}`;

         productDiv.appendChild(productCartPrice);
         productContainer.appendChild(productDiv);
      }
   });

   const totalCheckout = document.getElementById("total-checkout");
   totalCheckout.querySelector("b").textContent = `${totalCartPrice.toLocaleString()}`;

   const orderButton = document.getElementById("orderButton");

   document.getElementById("city").addEventListener("change", function () {
      const shippingRadios = document.querySelectorAll('input[name="shipping"]');

      // Check if a city is selected
      if (this.value !== "") {
         // Automatically select the first shipping method
         shippingRadios[0].checked = true;
      }
   });

   //display shipping method when change city address
   document.getElementById("city").addEventListener("change", function () {
      // console.log("change address");
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
   

   //Add shipping fee when change shipping method
   document.addEventListener("DOMContentLoaded", function () {
      const shippingRadios = document.querySelectorAll('input[name="shipping"]');
      const totalCheckout = document.getElementById("total-checkout");
      const productsTotal = document.querySelectorAll(".product-cart-price");
        productsTotal.forEach((priceDiv) => {
           const priceText = priceDiv.textContent.trim();
           const extractedPrice = Number(priceText.replace(/[^0-9.-]+/g, ""));

           if (!isNaN(extractedPrice)) {
              totalCartPrice += extractedPrice;
           }

        });

      totalCheckout.querySelector(
         "b"
      ).textContent = `${totalCartPrice.toLocaleString()} VND`;

      shippingRadios.forEach((radio) => {
         radio.addEventListener("change", function () {
            const selectedShipping = parseFloat(this.value.replace(",", ""));
            var totalPriceWithShipping = totalCartPrice + selectedShipping;
            orderTotal = totalPriceWithShipping;
            totalCheckout.querySelector(
               "b"
            ).textContent = `${totalPriceWithShipping.toLocaleString()} VND`;
            totalPriceWithShippingAll += totalPriceWithShipping
            console.log(totalPriceWithShippingAll);
         });
      });
   });
   // cartItemsData.forEach(cartItem => {
   //    creatOrderDetails({...cartItem, totalPriceWithShippingAll })
   // })
   console.log(totalCartPrice);
   document.getElementById("productsTotal").textContent = `${totalCartPrice.toLocaleString()} VND`;

   const shippingRadios = document.querySelectorAll('input[name="shipping"]');
   const shippingCost = document.getElementById("shippingCost");
   const displayShippingCost = document.getElementById("displayShippingCost");
   let selectedShippingCost = 0;

   shippingRadios.forEach((radio) => {
      radio.addEventListener("change", function () {
         orderButton.disabled = false;
      });
   });

   //Calculation Total with shipping fee when change shipping method
   shippingRadios.forEach((radio) => {
      radio.addEventListener("change", function () {
         selectedShippingCost = parseFloat(this.value.replace(",", ""));
         totalPriceWithShipping = totalCartPrice + selectedShippingCost;
         console.log("total", totalPriceWithShipping)
         const shippingCostText = `${selectedShippingCost.toLocaleString()} VND`;

         displayShippingCost.textContent = shippingCostText;
         const totalPriceText = `${totalPriceWithShipping.toLocaleString()} VND`;
         document.getElementById("total-checkout").textContent =
            totalPriceText.toLocaleString();

         // Show the shipping cost field only when a shipping method is chosen
         shippingCost.style.display = "block";
      });
   });

   //get address value 
   const homeaddress = document.querySelector("#house");
   homeaddress.addEventListener("change", function () {
      address = homeaddress.value
      console.log(address)
   });

  
}

async function creatOrderDetails(ci) {
   const postOrder = `https://fourt7.onrender.com/api/orderDetails`;
   const postResponse = await fetch(postOrder, {
      method: 'POST',
      headers: {
         'Content-Type': 'application/json',
      },
      body: JSON.stringify({
         productId: ci.productId,
         quantity: ci.productQuantity,
         size: ci.productSize,
         subtotal: ci.subTotal,
      })
   })
      .then(postResponse => postResponse.json())
      .then(data => {
         totalCartPrice += data.subtotal;
         var newObjectId = data.id;
         console.log(data.id);
         orderDetailsList.push(newObjectId);
         // [...orderDetailsList,newObjectId];
         console.log('OrderDetails Id: ', newObjectId);
         console.log(orderDetailsList)
         console.log(totalCartPrice);
      })
      .catch(error => console.error('Error:', error));
};
async function deleteCartItems(id) {
   const postOrder = `https://fourt7.onrender.com/api/cartItems/${id}`;
   const postResponse = await fetch(postOrder, {
      method: 'DELETE',
      headers: {
         'Content-Type': 'application/json',
      },
   })
      .then(postResponse => postResponse.json())
      .then(data =>console.log(data.json()))
      .catch(error => console.error('Error:', error));
};
function getDateTime(){
   var ngayGioHienTai = new Date();
   var ngay = ngayGioHienTai.getDate();
   var thang = ngayGioHienTai.getMonth() + 1; // Tháng bắt đầu từ 0
   var nam = ngayGioHienTai.getFullYear();

   var gio = ngayGioHienTai.getHours();
   var phut = ngayGioHienTai.getMinutes();
   var giay = ngayGioHienTai.getSeconds();

   let dateTime = `${ngay}/${thang}/${nam}` + ` ${gio}:${phut}:${giay}`;
   console.log(dateTime.toLocaleString());
   return dateTime;
}
async function creatOrder(postData) {
   console.log(postData.orderDetails)
      console.log(JSON.stringify(postData))
      const postOrder = `https://fourt7.onrender.com/api/orders`;
      const postResponse = await fetch(postOrder, {
         method: 'POST',
         headers: {
            'Content-Type': 'application/json',
         },
         body: JSON.stringify(postData),
      });
      if (postResponse.ok) {
         console.log("Checkout successful");
         window.location.href = "home.html"
      }
      else {
         console.error("Something error...");
      }
      console.log(postResponse);
   }
const form = document.querySelector("#form")
form.addEventListener("submit", async function (event) {
   event.preventDefault();
   console.log(cartItemsData)
   for (const cartItem of cartItemsData) {
      await creatOrderDetails(cartItem);
      console.log(cartItem.id)
      await deleteCartItems(cartItem.id); 
   }
   const formValue = {
      userId: currentuserID,
      total: totalCartPrice,
      address: address,
      date: getDateTime(),
      orderDetails: orderDetailsList,
   }
   await creatOrder(formValue);

    setTimeout(function () {
      window.location.href = "userProfile.html";
   }, 3000);
})

