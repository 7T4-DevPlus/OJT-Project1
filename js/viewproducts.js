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
            <div 
            style="border: 1px solid #ddd; width: 84%; margin-bottom: 5vh; margin-left: 2vw;">
                <div class="product-box">
                    <div class="product-thumbnail">
                        <img class="original" src="${product.imgUrl[0]}">
                        <img class="hover" src="${product.imgUrl[1]}">
                        <div class="hover-part">
                            <div class="pumpup-item" style="border-right: 1px solid white">
                                Xem nhanh
                                <span>
                                    <img
                                    src="https://res.cloudinary.com/dfz0xsh2d/image/upload/v1699004047/Image_OJT7T4_Project1/Session3_body/eye_zfoznw.png"
                                    style="display: inline; width: 10px; height: auto"
                                    />
                                </span>
                            </div>
                            <div class="pumpup-item">
                                Mua ngay
                                <span>
                                    <img
                                    src="https://res.cloudinary.com/dfz0xsh2d/image/upload/v1699004048/Image_OJT7T4_Project1/Session3_body/cart_gskmks.png"
                                    style="display: inline; width: 10px; height: auto"
                                    />
                                </span>
                            </div>
                        </div>
                    </div>      
                </div>
                <div class="product-info a-left">
                    <p style="margin:0;">${product.name}</p>
                    <p style="margin:0;">${product.price}<u>đ</u></p>
                </div> 
            </div>
            `;
        });
    } catch (error) {
        console.error('Lỗi khi gọi API:', error);
    }
}
getApiData()
