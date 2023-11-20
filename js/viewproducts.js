const productLink = document.getElementById('product-link');
const productList = document.getElementById('product-list');
const toggleIcon = document.getElementById('toggle-icon');

getProducts();

productLink.onclick = function () {
    if (productList.style.display === 'none') {
        productList.style.display = 'block'; 
    } else {
        productList.style.display = 'none'; 
    }
}

async function getProducts() {
    const url = 'https://fourt7.onrender.com/api/products';
    const productsResponse = await fetch(url);
    const products = await productsResponse.json();
    products.forEach((product) => {
        if (product.imgUrl.length > 1) {
            document.getElementById('products').innerHTML += `
            <div style="border: 1px solid #ddd; width: 84%; margin-bottom: 5vh; margin-left: 2vw;">
                <div class="product-box">
                    <div class="product-thumbnail">
                        <img class="original" src="${product.imgUrl[0]}">
                        <img class="hover" src="${product.imgUrl[1]}">
                        <div class="hover-part">
                            <div class="pumpup-item" style="border-right: 1px solid white">
                            <button class="look-button" id="${product.productId}">
                                Quick view
                                <span>
                                    <img
                                    src="https://res.cloudinary.com/dfz0xsh2d/image/upload/v1699004047/Image_OJT7T4_Project1/Session3_body/eye_zfoznw.png"
                                    style="display: inline; width: 10px; height: auto"
                                    />
                                </span>
                            </button>
                            </div>
                            <div class="pumpup-item">
                            <button class="details-button" id="${product.id}">
                                Buy now
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
                    <p style="margin:0;">${product.name}</p>
                    <p style="margin:0;">${product.price.toLocaleString()} VND</p>
                </div> 
            </div>
            `;
        } else {
            document.getElementById('products').innerHTML += `
            <div style="border: 1px solid #ddd; width: 84%; margin-bottom: 5vh; margin-left: 2vw;">
                <div class="product-box">
                    <div class="product-thumbnail">
                        <img src="${product.imgUrl[0]}">
                        <div class="hover-part">
                            <div class="pumpup-item" style="border-right: 1px solid white">
                            <button class="look-button" id="${product.productId}">
                                Quick view
                                <span>
                                    <img
                                    src="https://res.cloudinary.com/dfz0xsh2d/image/upload/v1699004047/Image_OJT7T4_Project1/Session3_body/eye_zfoznw.png"
                                    style="display: inline; width: 10px; height: auto"
                                    />
                                </span>
                            </button>
                            </div>
                            <div class="pumpup-item">
                            <button class="details-button" id="${product.id}">
                                Buy now
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
                    <p style="margin:0;">${product.name}</p>
                    <p style="margin:0;">${product.price.toLocaleString()} VND</p>
                </div> 
            </div>
            `;
        };
    });

var detailsButtons = document.querySelectorAll(".details-button");
detailsButtons.forEach((detailsBtn) => {
    detailsBtn.addEventListener("click", () => {
        window.location.href = `https://develop-deploy--sparkly-pony-45d9b1.netlify.app/productDetail.html?id=${detailsBtn.id}`;
    });
})

//Modal
var modal = document.getElementById("product-modal");
var lookButtons = document.querySelectorAll(".look-button");
lookButtons.forEach((lookBtn) => {
    lookBtn.onclick = function() {
        modal.style.display = "block";
        var productId = lookBtn.id; 
        console.log(productId)
        productDetails(productId)
    }
})

window.onclick = function (event) {
        if (event.target == modal) {
            modal.style.display = "none";
        }
}


function productDetails(proId){
    products.forEach((product) => {
        if(product.productId === proId){
            console.log(product.id)
            modal.innerHTML =
            `<div class="product-details" id="${product.productId}" >
                <div style="display: flex;">
                    <div class="left-block-modal">
                        <img id="displayImg" class="displayImg" src="${product.imgUrl[0]}"
                        style="width: 100%; margin: 2%;"/>
                        <div class="product-pictures-container">
                            <div id="product-pictures" class="product-pictures">              
                            </div>
                        </div>
                    </div>
                    <div class="right-block-modal">
                        <p style="margin-bottom: 0;">${product.name}</p>
                        <p style="font-size: 2vh;">${product.productId}</p>
                        <hr>
                        <p>${product.price.toLocaleString()} VND</p>
                        <hr>
                        <p style="font-size: 2vh; margin-bottom: 0">Size:</p>
                        <form id="add-to-cart-form" class="${proId}" onsubmit="return false">
                            <div>
                                <input type="radio" id="sizeL" name="size" value="L">
                                <label for="sizeL">L</label>
                                <input type="radio" id="sizeM" name="size" value="M" style="margin-left: 10%">
                                <label for="sizeM">M</label>
                                <input type="radio" id="sizeS" name="size" value="S" style="margin-left: 10%">
                                <label for="sizeS">S</label>
                            </div>
                            <button type="submit" class="add-cart-btn" onclick="window.location.href = 'https://develop-deploy--sparkly-pony-45d9b1.netlify.app/productDetail.html?id=${product.id}'">
                                Add to cart
                            </button>
                        </form>
                        <div style="text-align: center;">
                            <p style="font-size: 2vh;"> Or <b>more details</b></p>
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
            let imgUrlSlide = product.imgUrl;
            imgUrlSlide.forEach(img => {
                document.getElementById("product-pictures").innerHTML += 
                `<div class="product-picture">
                    <img onclick="changeImg(this.src)" class="slideImg" src="${img}"/>
                </div>`
                });
            }
        })
}

// Search feature
const searchInput = document.getElementById('searchInput');
searchInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
        searchByName();
    }
});

    function searchByName() {
        const searchTerm = searchInput.value.toLowerCase();

        const filteredProducts = [];
        document.getElementById('products').innerHTML = '';

        products.forEach((product) => {
            if (product.name.toLowerCase().includes(searchTerm)) {
                filteredProducts.push(product);
            }
        });

        filteredProducts.forEach((product) => {
            if (product.imgUrl.length > 1) {
                document.getElementById('products').innerHTML += `
            <div style="border: 1px solid #ddd; width: 84%; margin-bottom: 5vh; margin-left: 2vw;">
                <div class="product-box">
                    <div class="product-thumbnail">
                        <img class="original" src="${product.imgUrl[0]}">
                        <img class="hover" src="${product.imgUrl[1]}">
                        <div class="hover-part">
                            <div class="pumpup-item" style="border-right: 1px solid white">
                            <button class="look-button" id="${product.productId}">
                                Quick view
                                <span>
                                    <img
                                    src="https://res.cloudinary.com/dfz0xsh2d/image/upload/v1699004047/Image_OJT7T4_Project1/Session3_body/eye_zfoznw.png"
                                    style="display: inline; width: 10px; height: auto"
                                    />
                                </span>
                            </button>
                            </div>
                            <div class="pumpup-item">
                            <button class="details-button" id="${product.id}">
                                Buy now
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
                    <p style="margin:0;">${product.name}</p>
                    <p style="margin:0;">${product.price.toLocaleString()} VND</p>
                </div> 
            </div>
            `;
            } else {
                document.getElementById('products').innerHTML += `
            <div style="border: 1px solid #ddd; width: 84%; margin-bottom: 5vh; margin-left: 2vw;">
                <div class="product-box">
                    <div class="product-thumbnail">
                        <img src="${product.imgUrl[0]}">
                        <div class="hover-part">
                            <div class="pumpup-item" style="border-right: 1px solid white">
                            <button class="look-button" id="${product.productId}">
                                Quick view
                                <span>
                                    <img
                                    src="https://res.cloudinary.com/dfz0xsh2d/image/upload/v1699004047/Image_OJT7T4_Project1/Session3_body/eye_zfoznw.png"
                                    style="display: inline; width: 10px; height: auto"
                                    />
                                </span>
                            </button>
                            </div>
                            <div class="pumpup-item">
                            <button class="details-button" id="${product.id}">
                                Buy now
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
                    <p style="margin:0;">${product.name}</p>
                    <p style="margin:0;">${product.price.toLocaleString()} VND</p>
                </div> 
            </div>
            `;
            };
        });

        var modal = document.getElementById("product-modal");
        var detailsButtons = document.querySelectorAll(".details-button");
        detailsButtons.forEach((detailsBtn) => {
            detailsBtn.addEventListener("click", () => {
                window.location.href = `https://develop-deploy--sparkly-pony-45d9b1.netlify.app/productDetail.html?id=${detailsBtn.id}`;
            });
        })

        var lookButtons = document.querySelectorAll(".look-button");
        lookButtons.forEach((lookBtn) => {
            lookBtn.onclick = function () {
                modal.style.display = "block";
                var productId = lookBtn.id;
                console.log(productId)
                productDetails(productId)
            }
        })

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        function productDetails(id) {
            products.forEach((product) => {
                if (product.productId === id) {
                    modal.innerHTML =
                        `<div class="product-details" id="${product.productId}" >
                    <div style="display: flex;">
                        <div class="left-block-modal">
                            <img id="displayImg" class="displayImg" src="${product.imgUrl[0]}"
                            style="width: 100%; margin: 2%;"/>
                            <div class="product-pictures-container">
                                <div id="product-pictures" class="product-pictures">
                                    
                                </div>
                            </div>
                        </div>
                        <div class="right-block-modal">
                            <p style="margin-bottom: 0;">${product.name}</p>
                            <p style="font-size: 2vh;">${product.productId}</p>
                            <hr>
                            <p>${product.price.toLocaleString()} <u>đ</u></p>
                            <hr>
                            <p style="font-size: 2vh; margin-bottom: 0">Size:</p>
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
                                    Add to cart
                                </button>
                            </form>
                            <div style="text-align: center;">
                                <p style="font-size: 2vh;"> Or <b>more details</b></p>
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
                    let imgUrlSlide = product.imgUrl;
                    imgUrlSlide.forEach(img => {
                        document.getElementById("product-pictures").innerHTML +=
                            `<div class="product-picture">
                        <img onclick="changeImg(this.src)" class="slideImg" src="${img}"/>
                    </div>`
                    });
                }
            })
        }
    }

    // Sort feature
    document.getElementById('filter-btn').addEventListener('click', function () {
        filterByPrice();
    });

    function filterByPrice() {
        const minPrice = parseInt(document.getElementById('min-price').value) || 0;
        const maxPrice = parseInt(document.getElementById('max-price').value) || 10000000;

        document.getElementById('products').innerHTML = '';

        products.forEach((product) => {
            const productPrice = product.price;

            if (productPrice >= minPrice && productPrice <= maxPrice) {
                document.getElementById('products').innerHTML += `
            <div style="border: 1px solid #ddd; width: 84%; margin-bottom: 5vh; margin-left: 2vw;">
                <div class="product-box">
                    <div class="product-thumbnail">
                        <img class="original" src="${product.imgUrl[0]}">
                        <img class="hover" src="${product.imgUrl[1]}">
                        <div class="hover-part">
                            <div class="pumpup-item" style="border-right: 1px solid white">
                            <button class="look-button" id="${product.productId}">
                                Quick view
                                <span>
                                    <img
                                    src="https://res.cloudinary.com/dfz0xsh2d/image/upload/v1699004047/Image_OJT7T4_Project1/Session3_body/eye_zfoznw.png"
                                    style="display: inline; width: 10px; height: auto"
                                    />
                                </span>
                            </button>
                            </div>
                            <div class="pumpup-item">
                            <button class="details-button" id="${product.id}">
                                Buy now
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
                    <p style="margin:0;">${product.name}</p>
                    <p style="margin:0;">${product.price.toLocaleString()} VND</p>
                </div> 
            </div>
            `;
            }
        });

        var modal = document.getElementById("product-modal");
        var detailsButtons = document.querySelectorAll(".details-button");
        detailsButtons.forEach((detailsBtn) => {
            detailsBtn.addEventListener("click", () => {
                window.location.href = `https://develop-deploy--sparkly-pony-45d9b1.netlify.app/productDetail.html?id=${detailsBtn.id}`;
            });
        })

        var lookButtons = document.querySelectorAll(".look-button");
        lookButtons.forEach((lookBtn) => {
            lookBtn.onclick = function () {
                modal.style.display = "block";
                var productId = lookBtn.id;
                console.log(productId)
                productDetails(productId)
            }
        })

        window.onclick = function (event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }

        function productDetails(id) {
            products.forEach((product) => {
                if (product.productId === id) {
                    modal.innerHTML =
                        `<div class="product-details" id="${product.productId}" >
                    <div style="display: flex;">
                        <div class="left-block-modal">
                            <img id="displayImg" class="displayImg" src="${product.imgUrl[0]}"
                            style="width: 100%; margin: 2%;"/>
                            <div class="product-pictures-container">
                                <div id="product-pictures" class="product-pictures">
                                    
                                </div>
                            </div>
                        </div>
                        <div class="right-block-modal">
                            <p style="margin-bottom: 0;">${product.name}</p>
                            <p style="font-size: 2vh;">${product.productId}</p>
                            <hr>
                            <p>${product.price.toLocaleString()} <u>đ</u></p>
                            <hr>
                            <p style="font-size: 2vh; margin-bottom: 0">Size:</p>
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
                                    Add to cart
                                </button>
                            </form>
                            <div style="text-align: center;">
                                <p style="font-size: 2vh;"> Or <b>more details</b></p>
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
                    let imgUrlSlide = product.imgUrl;
                    imgUrlSlide.forEach(img => {
                        document.getElementById("product-pictures").innerHTML +=
                            `<div class="product-picture">
                        <img onclick="changeImg(this.src)" class="slideImg" src="${img}"/>
                    </div>`
                    });
                }
            })
        }
    }

let originalProducts;

    function sortProducts() {
        const sortOrder = document.getElementById("sortOrder").value;
        const productsContainer = document.getElementById("products");
    
        // Check if the originalProducts is not set
        if (!originalProducts) {
            // Set the originalProducts using the current children of the container
            originalProducts = Array.from(productsContainer.children);
        }
    
        const filteredProducts = Array.from(productsContainer.children);
        productsContainer.filteredProducts = filteredProducts;
    
        let sortedProducts;
    
        if (sortOrder === "default") {
            // Restore the original list of products
            productsContainer.innerHTML = '';
            originalProducts.forEach(product => productsContainer.appendChild(product));
        } else {
            sortedProducts = getSortedProducts(filteredProducts, sortOrder);
            productsContainer.innerHTML = '';
            sortedProducts.forEach(product => productsContainer.appendChild(product));
        }
    }

    function getSortedProducts(products, order) {
        return products.slice().sort((a, b) => {
            const productA = getProductData(a);
            const productB = getProductData(b);

            switch (order) {
                case "lowToHigh":
                    return productA.price - productB.price;
                case "highToLow":
                    return productB.price - productA.price;
                case "nameAZ":
                    return productA.name.localeCompare(productB.name);
                case "nameZA":
                    return productB.name.localeCompare(productA.name);
                default:
                    return 0;
            }
        });
    }

    function getProductData(productElement) {
        return {
            price: parseInt(productElement.querySelector('.product-info p:last-child').textContent.replace('VND', '').trim()),
            name: productElement.querySelector('.product-info p:first-child').textContent.trim()
        };
    }

    const dropdownOptions = document.querySelectorAll('.dropdown-content a');
    dropdownOptions.forEach(option => {
        option.addEventListener('click', () => {
            document.querySelector('.dropbtn p').innerText = option.innerText;
            const sortType = option.getAttribute('data-sort');
            const productsContainer = document.getElementById('products');
            const products = Array.from(productsContainer.children);
            const sortedProducts = sortProducts(sortType, products);
            productsContainer.innerHTML = '';
            sortedProducts.forEach(product => {
                productsContainer.appendChild(product);
            });
        });
    });

    document.getElementById("sortOrder").addEventListener("change", sortProducts);

    document.addEventListener("DOMContentLoaded", function () {
        document.getElementById("sortOrder").dispatchEvent(new Event("change"));
    });
}