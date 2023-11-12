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

homePage.addEventListener("click", () => {
    window.top.location.href = `http://127.0.0.1:5500/home.html`;
});

productPage.addEventListener("click", () => {
    window.top.location.href = `http://127.0.0.1:5500/products.html`;
});

contactPage.addEventListener("click", () => {
    window.top.location.href = `http://127.0.0.1:5500/contact.html`;
});

const userBtn = document.getElementById('userBtn');
userBtn.addEventListener("click", () => {
    window.top.location.href = `http://127.0.0.1:5500/userProfile.html`;
})