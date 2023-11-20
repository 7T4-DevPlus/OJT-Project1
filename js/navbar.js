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
    window.top.location.href = `https://develop-deploy--sparkly-pony-45d9b1.netlify.app/`;
});

productPage.addEventListener("click", () => {
    window.top.location.href = `https://develop-deploy--sparkly-pony-45d9b1.netlify.app/products.html`;
});

contactPage.addEventListener("click", () => {
    window.top.location.href = `https://develop-deploy--sparkly-pony-45d9b1.netlify.app/contact.html`;
});

userBtn.addEventListener("click", () => {
    window.top.location.href = `https://develop-deploy--sparkly-pony-45d9b1.netlify.app/userProfile.html`;
})

cartBtn.addEventListener("click", () => {
    if(!localStorage.getItem("userId")){
        window.top.location.href = "https://develop-deploy--sparkly-pony-45d9b1.netlify.app/loginsignup.html";
        alert("please login to have your own cart!")
    }else{
        window.top.location.href = `https://develop-deploy--sparkly-pony-45d9b1.netlify.app/cart.html`;
    }
})
