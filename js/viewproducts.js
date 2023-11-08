const productLink = document.getElementById('product-link');
const productList = document.getElementById('product-list');
const toggleIcon = document.getElementById('toggle-icon');

// productLink.addEventListener('click', function () {
//     if (productList.style.display === 'none') {
//         productList.style.display = 'block'; // Hiển thị danh sách con
//     } else {
//         productList.style.display = 'none'; // Ẩn danh sách con
//     }
// });

productLink.onclick = function() {
    if (productList.style.display === 'none') {
        productList.style.display = 'block'; // Hiển thị danh sách con
    } else {
        productList.style.display = 'none'; // Ẩn danh sách con
    }
}

async function getApiData() {
    try {
        const productApi = 'https://sevent4.onrender.com/api/products';
        const productResponse = await fetch(productApi);
        const products = await productResponse.json();

        products.forEach(product => {
            document.getElementById('products').innerHTML += `
            <div class="product-box " style="height: 69vh; width: 18vw;">
            <div class="product-thumbnail">
                    <img class="original" src="${product.imgUrl[0]}">
                    <img class="hover" src="${product.imgUrl[1]}">
            </div>
            <div class="product-info a-left">
                <p class="product-name text2line" style="margin:0;">
                ${product.name}</p>
                <span class="price product-price">${product.price}<u>đ</u></span>
            </div>       
            </div>
            `;
        });
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
    }
}
getApiData()
