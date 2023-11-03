
const headerEl = document.querySelector("#main")
const leftEl = document.querySelector(".header-left")
const rightEl = document.querySelector(".header-right")

leftEl.addEventListener("mouseover",function (){
    
    headerEl.style.background = "no-repeat right top url(https://bizweb.dktcdn.net/100/474/290/themes/892181/assets/slider_1.png?1691725029305)"
    headerEl.style.backgroundSize = " cover";
    headerEl.style.backgroundPosition = "center";
}) 

rightEl.addEventListener("mouseover",function (){
    
    headerEl.style.background = "no-repeat url(https://bizweb.dktcdn.net/100/474/290/themes/892181/assets/slider_2.png?1691725029305.dktcdn.net/100/474/290/themes/892181/assets/slider_2.png%253F1691725029305) "
    headerEl.style.backgroundSize = "cover";
    headerEl.style.backgroundPosition = "center";

}) 
