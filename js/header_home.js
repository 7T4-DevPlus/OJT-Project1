
const headerEl = document.querySelector("#main")
const leftEl = document.querySelector(".header-left")
const rightEl = document.querySelector(".header-right")

leftEl.addEventListener("mouseover",function (){
    
    headerEl.style.background = "no-repeat right top url(https://res.cloudinary.com/dfz0xsh2d/image/upload/v1699004034/Image_OJT7T4_Project1/Header_home/1_grxvjb.jpg)"
    headerEl.style.backgroundSize = " cover";
    headerEl.style.backgroundPosition = "center";
}) 

rightEl.addEventListener("mouseover",function (){
    
    headerEl.style.background = "no-repeat url(https://res.cloudinary.com/dfz0xsh2d/image/upload/v1699004034/Image_OJT7T4_Project1/Header_home/2_rjznt6.jpg)"
    headerEl.style.backgroundSize = "cover";
    headerEl.style.backgroundPosition = "center";

}) 
