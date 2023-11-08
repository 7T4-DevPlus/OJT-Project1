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