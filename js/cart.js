const userID = localStorage.getItem("userId");

function checkUser() {
    if(!userID){
        window.location.href = "http://127.0.0.1:5500/loginsignup.html";
    }
}
checkUser();


//get
async function getCartDetails() {
    const cartAPI = 'https://fourt7.onrender.com/api/cartItems';
    const cartResponse = await fetch(cartAPI);
    const cartItems = await cartResponse.json();
    
    const productAPI = 'https://fourt7.onrender.com/api/products';
    const productResponse = await fetch(productAPI);
    const products = await productResponse.json();

    const tbody = document.querySelector("tbody");
    // Clear existing rows
    tbody.innerHTML = "";

    let totalPrice = 0;

    cartItems.forEach(ci => {
        if(userID === ci.userId) {
            products.forEach(p => {
                if(ci.productId === p.id) {
                    console.log(p)
                    let subTotalProduct = p.price * ci.productQuantity;
                    totalPrice += subTotalProduct;

                    const row = document.createElement("tr");
                    row.innerHTML = `
                    <td>
                        <img src="${p.imgUrl[0]}">
                    </td>
                    <td>
                        <p class="product"><b>${p.name}</b></p>
                        <p style="margin-top: -10px;">${ci.productSize}</p>
                    </td>
                    <td class="price" style="color: #CDC5B7;">
                        <b>${p.price.toLocaleString()} VND</b>
                    </td>
                    <td>
                        <button class="btn-dec" id="decBtn-${ci.id}">-</button>
                        <input type="text" id="quantity-${ci.id}" value="${ci.productQuantity}" style="border: none" readonly>
                        <button class="btn-inc" id="incBtn-${ci.id}">+</button>
                    </td>
                    <td class="total" style="font-weight: bold; color: #CDC5B7">
                        <input type="text" id="subtotal-${ci.id}" value="${p.price}" style="display:none">
                        ${subTotalProduct.toLocaleString()} VND
                    </td>
                    <td>
                        <button>
                            <img class="btn-delete" id="delBtn-${ci.id}" src="https://res.cloudinary.com/dokzmffiv/image/upload/v1699413048/trash-can-regular_t3adpq.png"/>
                        </button>
                    </td>
                    `;
      
                    tbody.appendChild(row);
                }
            })
        }
    });

    document.getElementById("totalPrice").innerHTML = `
        <p style="margin: 1vh; font-weight: bold; color: #CDC5B7">${totalPrice.toLocaleString()} VND</p>
    `
}
getCartDetails();


document.querySelector("tbody").addEventListener('click', (event) => {
    const target = event.target;

    // Check if the clicked element is a button with a class of "btn-dec" or "btn-inc"
    if (target.classList.contains('btn-dec')) {
        const cartItemId = target.id.split('-')[1];
        decQuantity(cartItemId);
    } else if (target.classList.contains('btn-inc')) {
        const cartItemId = target.id.split('-')[1];
        incQuantity(cartItemId);
    } else if (target.classList.contains('btn-delete')) {
        const cartItemId = target.id.split('-')[1];
        removeProduct(cartItemId);
    }
});

// patch
async function incQuantity(cartItemId) {
    const quantityInput = document.querySelector(`#quantity-${cartItemId}`);
    const currentQuantity = parseInt(quantityInput.value);
    const newQuantity = currentQuantity + 1;

    const subtotal = document.getElementById(`subtotal-${cartItemId}`);
    const subtotalValue = parseInt((subtotal.value * newQuantity));

    updateQuantityInFirebase(cartItemId, newQuantity, subtotalValue);
    quantityInput.value = newQuantity;
}

async function decQuantity(cartItemId) {
    const quantityInput = document.querySelector(`#quantity-${cartItemId}`);
    const currentQuantity = parseInt(quantityInput.value);

    const subtotal = document.getElementById(`subtotal-${cartItemId}`);

    if (currentQuantity > 1) {
        const newQuantity = currentQuantity - 1;
        const subtotalValue = parseInt((subtotal.value * newQuantity));

        updateQuantityInFirebase(cartItemId, newQuantity, subtotalValue);
        quantityInput.value = newQuantity;
    } 
}

// Function to update quantity in Firebase
async function updateQuantityInFirebase(cartItemId, newQuantity, subtotalValue) {
    console.log(newQuantity, " ", subtotalValue);
    const updateAPI = `https://fourt7.onrender.com/api/cartItems/${cartItemId}`;
    const updateResponse = await fetch(updateAPI, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            productQuantity: newQuantity,
            subTotal: subtotalValue,
        }),
    });

    getCartDetails();
}


//delete
async function removeProduct(cartItemId) {
    try {
        const deleteAPI = `https://fourt7.onrender.com/api/cartItems/${cartItemId}`;
        const deleteResponse = await fetch(deleteAPI, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (deleteResponse.ok) {
            getCartDetails();
        } else {
            console.error('Failed to delete cart item:', deleteResponse.statusText);
        }
    } catch (error) {
        console.error('Error during deletion:', error);
    }
}
