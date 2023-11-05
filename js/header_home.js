
const headerEl = document.querySelector("#main")
const leftEl = document.querySelector(".header-left")
const rightEl = document.querySelector(".header-right")

leftEl.addEventListener("mouseover",function (){
    
    headerEl.style.background = "no-repeat right top url(https://res.cloudinary.com/dfz0xsh2d/image/upload/v1699114991/Image_OJT7T4_Project1/Header_home/blue_miacfu.jpg)"
    headerEl.style.backgroundSize = " cover";
    headerEl.style.backgroundPosition = "center";
}) 

rightEl.addEventListener("mouseover",function (){
    
    headerEl.style.background = "no-repeat url(https://res.cloudinary.com/dfz0xsh2d/image/upload/v1699114991/Image_OJT7T4_Project1/Header_home/z4849465503657_536a522980a5a23199bd1a8549b3502a_bywbva.jpg)"
    headerEl.style.backgroundSize = "cover";
    headerEl.style.backgroundPosition = "center";

}) 
