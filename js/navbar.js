const navSlide = () => {
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li')
    
    burger.addEventListener('click',()=> {
        //toggle nav
        nav.classList.toggle('nav-active');

          // animate links
        navLinks.forEach((link, index) => {
            if (link.style.animation){
                link.style.animation = ''
            }
            else{
                link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.6 }s`;
            }  
        });
        //burger animation
        burger.classList.toggle('toggle');
  
    });

}
navSlide();

const homePage = document.getElementById("homePage");
const productPage = document.getElementById("productPage");
const contactPage = document.getElementById("contactPage");
const userBtn = document.getElementById('userBtn');
const cartBtn = document.getElementById('cartBtn');

homePage.addEventListener("click", () => {
    window.top.location.href = `http://127.0.0.1:5501/b/OJT-Project1/home.html`;
});

productPage.addEventListener("click", () => {
    window.top.location.href = `http://127.0.0.1:5501/b/OJT-Project1/products.html`;
});

contactPage.addEventListener("click", () => {
    window.top.location.href = `http://127.0.0.1:5500/contact.html`;
});

userBtn.addEventListener("click", () => {
    window.top.location.href = `http://127.0.0.1:5500/userProfile.html`;
})

cartBtn.addEventListener("click", () => {
    if(!localStorage.getItem("userId")){
        window.top.location.href = "http://127.0.0.1:5500/loginsignup.html";
        alert("please login to have your own cart!")
    }else{
        window.top.location.href = `http://127.0.0.1:5500/cart.html`;
    }
})



// const searchButton = document.getElementById('search-btn');
    
// searchButton.addEventListener('click', function() {
//      window.top.location.href = `http://127.0.0.1:5501/b/OJT-Project1/products.html`;
     
// });

    console.log("DOM content loaded");
    // ... (rest of your code)
    const searchButton = document.getElementById('search-btn');

    searchButton.addEventListener('click', function () {
        // Redirect to the product page
        window.location.href = 'http://127.0.0.1:5501/b/OJT-Project1/products.html';

        // Set a timeout to ensure the redirect happens before focusing on the search input
        setTimeout(function () {
            // Focus on the search input box on the products.html page
            const searchInput = window.parent.document.getElementById('searchInput');
            if (searchInput) {
                searchInput.focus();
            }
        }, 100); // Adjust the timeout value as needed
    });

    



// var searchBtn = document.getElementById('search-btn')
// var searchValue = document.getElementById('searchBox')
// searchBtn.onclick = function() {
// // Set Item
//     console.log("a", searchValue.value);
//     var searchName = searchValue.value;
//     localStorage.setItem("searchName", searchName);
// }

// Retrieve
// document.getElementById("searchBox").innerHTML = localStorage.getItem("searchName");

// document.addEventListener("DOMContentLoaded", async function () {
//     // console.log̣̣("loaded");
//     var productsApi = "https://fourt7.onrender.com/api/products"
//     var productsResponse = await fetch(productsApi);
//     var data = await productsResponse.json();
//     console.log(data)
//     const productsName = [];

//     data.forEach(product => {
//         productsName.push(product.name)
//     })
//     console.log(productsName)

//     const searchInput = document.getElementById("searchNav");
//     const searchResults = document.getElementById("searchResults");

//     searchInput.addEventListener("input", function () {
//         const query = searchInput.value.toLowerCase();
//         const filteredData = productsName.filter(item => item.toLowerCase().includes(query));

//         displayResults(filteredData);
//     });
//     function displayResults(results) {
//         searchResults.innerHTML = "";
        
//         results.forEach(result => {
//             const li = document.createElement("li");
//             li.textContent = result;

//             li.addEventListener("click", function () {
//                 searchInput.value = result;
//                 searchResults.style.display = "none";
//             });

//             searchResults.appendChild(li);
//         });

//         // Show or hide the search results based on the number of results
//         searchResults.style.display = results.length > 0 ? "block" : "none";
//     };

//     // Hide search results when clicking outside the search container
//     document.addEventListener("click", function (event) {
//         if (!event.target.closest(".search-container")) {
//             searchResults.style.display = "none";
//         }
//     });
// });

