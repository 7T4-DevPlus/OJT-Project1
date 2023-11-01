const showPopupButton = document.getElementById("show-popup");
const closePopupButton = document.getElementById("close-popup");
const popup = document.getElementById("popup");

showPopupButton.addEventListener("click", () => {
    popup.style.display = "block";
});

closePopupButton.addEventListener("click", () => {
    popup.style.display = "none";
});
