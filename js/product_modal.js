var modal = document.getElementById("product-modal");
var lookBtn = document.getElementById("look-button");
var closeBtn = document.getElementsByClassName("close")[0];

lookBtn.onclick = function() {
    modal.style.display = "block";
}

closeBtn.onclick = function() {
    modal.style.display = "none";
}

window.onclick = function(event) {
    if (event.target == modal) {
        modal.style.display = "none";
    }
}

// STYLE
// var styleChoice1 = document.getElementById("style-choice1");
// var styleChoice2 = document.getElementById("style-choice2");
// var style1 = document.getElementById("style1");
// var style2 = document.getElementById("style2");

// style1.addEventListener("click", () => {
//     if(styleChoice1.classList.contains("style-choice"))
//     {
//         styleChoice1.classList.remove("style-choice");
//         styleChoice1.classList.toggle("style-chosen");
//     }
//     if(styleChoice2.classList.contains("style-chosen"))
//     {
//         styleChoice2.classList.remove("style-chosen");
//         styleChoice2.classList.toggle("style-choice");
//     }
    
// });
// style2.addEventListener("click", () => {
//     if(styleChoice2.classList.contains("style-choice"))
//     {
//         styleChoice2.classList.remove("style-choice");
//         styleChoice2.classList.toggle("style-chosen");
//     }
//     if(styleChoice1.classList.contains("style-chosen"))
//     {
//         styleChoice1.classList.remove("style-chosen");
//         styleChoice1.classList.toggle("style-choice");
//     }
// });



// SIZE
var size = document.getElementById("sizeCustom");
var sizeL = document.getElementById("sizeLarge");
var sizeM = document.getElementById("sizeMedium");
var sizeS = document.getElementById("sizeSmall");

size.addEventListener("click", () => {
    if(size.classList.contains("size-choice"))
    {
        size.classList.remove("size-choice");
        size.classList.toggle("size-chosen");
    }

    if(sizeL.classList.contains("size-chosen"))
    {
        sizeL.classList.remove("size-chosen");
        sizeL.classList.toggle("size-choice");
    } else if(sizeM.classList.contains("size-chosen"))
    {
        sizeM.classList.remove("size-chosen");
        sizeM.classList.toggle("size-choice");
    } else if(sizeS.classList.contains("size-chosen"))
    {
        sizeS.classList.remove("size-chosen");
        sizeS.classList.toggle("size-choice");
    } 
});

sizeL.addEventListener("click", () => {
    if(sizeL.classList.contains("size-choice"))
    {
        sizeL.classList.remove("size-choice");
        sizeL.classList.toggle("size-chosen");
    }

    if(size.classList.contains("size-chosen"))
    {
        size.classList.remove("size-chosen");
        size.classList.toggle("size-choice");
    } else if(sizeM.classList.contains("size-chosen"))
    {
        sizeM.classList.remove("size-chosen");
        sizeM.classList.toggle("size-choice");
    } else if(sizeS.classList.contains("size-chosen"))
    {
        sizeS.classList.remove("size-chosen");
        sizeS.classList.toggle("size-choice");
    } 
});

sizeM.addEventListener("click", () => {
    if(sizeM.classList.contains("size-choice"))
    {
        sizeM.classList.remove("size-choice");
        sizeM.classList.toggle("size-chosen");
    }

    if(sizeL.classList.contains("size-chosen"))
    {
        sizeL.classList.remove("size-chosen");
        sizeL.classList.toggle("size-choice");
    } else if(size.classList.contains("size-chosen"))
    {
        size.classList.remove("size-chosen");
        size.classList.toggle("size-choice");
    } else if(sizeS.classList.contains("size-chosen"))
    {
        sizeS.classList.remove("size-chosen");
        sizeS.classList.toggle("size-choice");
    }   
});

sizeS.addEventListener("click", () => {
    if(sizeS.classList.contains("size-choice"))
    {
        sizeS.classList.remove("size-choice");
        sizeS.classList.toggle("size-chosen");
    }

    if(sizeL.classList.contains("size-chosen"))
    {
        sizeL.classList.remove("size-chosen");
        sizeL.classList.toggle("size-choice");
    } else if(sizeM.classList.contains("size-chosen"))
    {
        sizeM.classList.remove("size-chosen");
        sizeM.classList.toggle("size-choice");
    } else if(size.classList.contains("size-chosen"))
    {
        size.classList.remove("size-chosen");
        size.classList.toggle("size-choice");
    } 
});

// SLIDE
var displayImg = document.getElementById("displayImg");
// var productImg = document.getElementsByClassName("productImg");

function changeImage(imgUrl) {
    displayImg.src = imgUrl;
}

