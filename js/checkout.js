var citis = document.getElementById("city");
var districts = document.getElementById("district");
var wards = document.getElementById("ward");
var Parameter = {
    url: "https://raw.githubusercontent.com/kenzouno1/DiaGioiHanhChinhVN/master/data.json",
    method: "GET",
    responseType: "application/json",
};

var promise = axios(Parameter);
promise.then(function (result) {
    renderCity(result.data);
});

function renderCity(data) {
    for (const x of data) {
        citis.options[citis.options.length] = new Option(x.Name, x.Id);
    }
    citis.onchange = function () {
        districts.length = 1;
        wards.length = 1;
        if (this.value !== "") {
            const result = data.filter(n => n.Id === this.value);

            for (const k of result[0].Districts) {
                districts.options[districts.options.length] = new Option(k.Name, k.Id);
            }
        }
    };
    districts.onchange = function () {
        wards.length = 1;
        const dataCity = data.filter((n) => n.Id === citis.value);
        if (this.value !== "") {
            const dataWards = dataCity[0].Districts.filter(n => n.Id === this.value)[0].Wards;

            for (const w of dataWards) {
                wards.options[wards.options.length] = new Option(w.Name, w.Id);
            }
        }
    };
}

function validatePayment() {
    const checkbox = document.getElementById("payment");
    if (!checkbox.checked) {
        alert("Please select Payment method!");
        return false;
    }
    return true;
}

document.getElementById('city').addEventListener('change', function () {
    var citySelect = document.getElementById('city');
    var shippingFeeDiv = document.getElementById('shippingFee');
    var messageDiv = document.getElementById('message');

    if (citySelect.value !== "") {
        shippingFeeDiv.style.display = 'block';
        messageDiv.style.display = 'none';
    } else {
        shippingFeeDiv.style.display = 'none';
        messageDiv.style.display = 'block';
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const productCartPrices = document.querySelectorAll('.product-cart-price');
    
    productCartPrices.forEach(priceDiv => {
        const priceText = priceDiv.textContent.trim();
        const extractedPrice = Number(priceText.replace(/[^0-9.-]+/g,""));
        
        if (!isNaN(extractedPrice) && extractedPrice !== 0) {
            priceDiv.textContent = `${extractedPrice.toLocaleString()} ₫`;
        } else {
            priceDiv.textContent = '';
        }
    });
});

document.getElementById('city').addEventListener('change', function() {
    const shippingRadios = document.querySelectorAll('input[name="shipping"]');

    // Check if a city is selected
    if (this.value !== "") {
        // Automatically select the first shipping method
        shippingRadios[0].checked = true;

        // Manually trigger the change event for the selected shipping radio button
        const event = new Event('change');
        shippingRadios[0].dispatchEvent(event);
    }
});


const cart = [
    {
        "image": "images/1.png",
        "quantity": 4,
        "price": 20000,
        "name": "Product A",
        "size": "M"
    },
    {
        "image": "images/1.png",
        "quantity": 1,
        "price": 19000,
        "name": "Product B",
        "size": "L"
    }
    // Add more products as needed
];

function displayCart() {
    const productContainer = document.getElementById('product-details');
    let totalCartPrice = 0;

    cart.forEach(product => {
        const productDiv = document.createElement('div');
        productDiv.classList.add('product-details');

        const productImgContainer = document.createElement('div');
        productImgContainer.classList.add('product-img-container');

        const productImg = document.createElement('img');
        productImg.classList.add('product-img');
        productImg.src = product.image;

        const quantityCircle = document.createElement('div');
        quantityCircle.classList.add('product-quantity-circle');
        quantityCircle.textContent = product.quantity;

        const productInfo = document.createElement('div');
        productInfo.classList.add('product-info');

        const productName = document.createElement('div');
        productName.classList.add('product-name');
        productName.textContent = product.name;

        const productSize = document.createElement('div');
        productSize.classList.add('product-size');
        productSize.textContent = `Size: ${product.size}`;

        productImgContainer.appendChild(productImg);
        productImgContainer.appendChild(quantityCircle);
        productDiv.appendChild(productImgContainer);

        productInfo.appendChild(productName);
        productInfo.appendChild(productSize);
        productDiv.appendChild(productInfo);

        const totalProductPrice = product.price * product.quantity;
        totalCartPrice += totalProductPrice;

        const productCartPrice = document.createElement('div');
        productCartPrice.classList.add('product-cart-price');
        productCartPrice.textContent = `$${totalProductPrice}`;

        productDiv.appendChild(productCartPrice);
        productContainer.appendChild(productDiv);
    });

    const totalCheckout = document.getElementById('total-checkout');
    totalCheckout.querySelector('b').textContent = `$${totalCartPrice}`;
}

displayCart();

document.addEventListener('DOMContentLoaded', function () {
    const shippingRadios = document.querySelectorAll('input[name="shipping"]');
    const totalCheckout = document.getElementById('total-checkout');
    const productsTotal = document.querySelectorAll('.product-cart-price');
    let totalCartPrice = 0;

    productsTotal.forEach(priceDiv => {
        const priceText = priceDiv.textContent.trim();
        const extractedPrice = Number(priceText.replace(/[^0-9.-]+/g,""));

        if (!isNaN(extractedPrice)) {
            totalCartPrice += extractedPrice;
        }
    });

    totalCheckout.querySelector('b').textContent = `${totalCartPrice.toLocaleString()} ₫`;

    shippingRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            const selectedShipping = parseFloat(this.value.replace(',', ''));
            const totalPriceWithShipping = totalCartPrice + selectedShipping;
            totalCheckout.querySelector('b').textContent = `${(totalPriceWithShipping).toLocaleString()} ₫`;
        });
    });
});

const shippingRadios = document.querySelectorAll('input[name="shipping"]');
const orderButton = document.getElementById('orderBtn');

shippingRadios.forEach(radio => {
    radio.addEventListener('change', function () {
        orderButton.disabled = false;
    });
});

document.getElementById('city').addEventListener('change', function() {
    const shippingRadios = document.querySelectorAll('input[name="shipping"]');
    
    // Check if a city is selected
    if (this.value !== "") {
        // Automatically select the first shipping method
        shippingRadios[0].checked = true;
    }
});

document.addEventListener('DOMContentLoaded', function () {
    const productCartPrices = document.querySelectorAll('.product-cart-price');
    const productsTotal = document.getElementById('productsTotal');
    let totalCartPrice = 0;

    productCartPrices.forEach(priceDiv => {
        const priceText = priceDiv.textContent.trim();
        const extractedPrice = Number(priceText.replace(/[^0-9.-]+/g,""));

        if (!isNaN(extractedPrice)) {
            totalCartPrice += extractedPrice;
        }
    });

    productsTotal.textContent = `${totalCartPrice.toLocaleString()} ₫`;

    const shippingRadios = document.querySelectorAll('input[name="shipping"]');
    const shippingCost = document.getElementById('shippingCost');
    const displayShippingCost = document.getElementById('displayShippingCost');
    let selectedShippingCost = 0;

    shippingRadios.forEach(radio => {
        radio.addEventListener('change', function () {
            selectedShippingCost = parseFloat(this.value.replace(',', ''));
            const totalPriceWithShipping = totalCartPrice + selectedShippingCost;
            const shippingCostText = `${selectedShippingCost.toLocaleString()} ₫`;

            displayShippingCost.textContent = shippingCostText;
            const totalPriceText = `${totalPriceWithShipping.toLocaleString()} ₫`;
            document.getElementById('total-checkout').querySelector('b').textContent = totalPriceText;

            // Show the shipping cost field only when a shipping method is chosen
            shippingCost.style.display = 'block';
        });
    });
});

function handleOrderButtonClick() {
    if (!document.forms[0].checkValidity()) {
        return false;
    }

    alert('Order placed!');
    setTimeout(function () {
        window.location.href = 'home.html';
    }, 5000);
    return false;
}




// Sample code that save data to database!
// document.addEventListener('DOMContentLoaded', function () {
//     const form = document.querySelector('form');

//     form.addEventListener('submit', function (event) {
//         event.preventDefault(); // Prevents default form submission

//         const fullName = document.getElementById('fname').value;
//         const email = document.getElementById('email').value;
//         const phone = document.getElementById('phone').value;
//         const city = getSelectedName('city');
//         const district = getSelectedName('district');
//         const ward = getSelectedName('ward');
//         const payment = getSelectedPayment();
//         const shipping = getSelectedShipping();
//         const total = document.getElementById('total-checkout').textContent;

//         const formData = {
//             fullname: fullName,
//             email,
//             phone,
//             city,
//             district,
//             ward,
//             payment,
//             shipping,
//             total,
//             // Add the rest of the form field values here...
//         };

//         localStorage.setItem('formData', JSON.stringify(formData));
//         console.log('Form data saved to local storage:', formData);
//         alert('Form data has been saved locally.');
//     });
// });




// function getSelectedName(elementId) {
//     const selectElement = document.getElementById(elementId);
//     return selectElement.options[selectElement.selectedIndex].text;
// }

// function getSelectedPayment() {
//     const paymentCheckbox = document.querySelector('input[type="checkbox"][name="payment"]');
//     return paymentCheckbox.checked ? paymentCheckbox.parentElement.textContent.trim() : 'Payment method not selected';
// }

// function getSelectedShipping() {
//     const shippingRadios = document.querySelectorAll('input[type="radio"][name="shipping"]');
//     for (const radio of shippingRadios) {
//         if (radio.checked) {
//             return radio.parentElement.textContent.trim();
//         }
//     }
//     return 'Shipping method not selected';
// }


// function getSelectedName(elementId) {
//     const selectElement = document.getElementById(elementId);
//     const selectedId = selectElement.value;
//     const options = selectElement.options;
    
//     for (let i = 0; i < options.length; i++) {
//         if (options[i].value === selectedId) {
//             return options[i].textContent;
//         }
//     }
//     return '';
// }