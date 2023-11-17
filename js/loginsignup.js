// import {  collection, doc, getDocs, addDoc  } from "https://www.gstatic.com/firebasejs/10.6.0/firebase-firestore.js";
// import db from "./database.js"

// const userDB = collection(db, "users");

function toggleErrorMessageOnBlur(input, errorElement) {
    if (input.validity.valueMissing && input.value === "") {
        errorElement.classList.add('active');
        errorElement.textContent = "This field is required.";
    } else {
        errorElement.classList.remove('active');
        errorElement.textContent = " ";
    }
}

document.querySelectorAll('input').forEach(inputField => {
    const errorElement = inputField.nextElementSibling;

    inputField.addEventListener('blur', function () {
        toggleErrorMessageOnBlur(this, errorElement);
    });

    inputField.addEventListener('focus', function () {
        errorElement.textContent = "";
        errorElement.classList.remove('active');
    });
});

const signUpButton = document.getElementById('signUp');
const signInButton = document.getElementById('signIn');
const container = document.getElementById('container');

signUpButton.addEventListener('click', () => {
    container.classList.add("right-panel-active");
});
signInButton.addEventListener('click', () => {
    container.classList.remove("right-panel-active");
});

//sign-up
const signupForm = document.querySelector('.signup-form');
signupForm.addEventListener('submit', async (event) => {
    const emailInput = document.querySelector('input[name="email"]');
    const passwordInput = document.querySelector('input[name="password"]');
    const confirmPasswordInput = document.querySelector('input[name="confirmPassword"]');
    const phoneInput = document.querySelector('input[name="phone"]');

    const emailError = document.querySelector('#emailError');
    const passwordError = document.querySelector('#passwordError');
    const confirmPasswordError = document.querySelector('#confirmPasswordError');
    const phoneError = document.querySelector('#phoneError');

    emailError.textContent = "";
    passwordError.textContent = "";
    confirmPasswordError.textContent = "";
    phoneError.textContent = "";

    if (!emailInput.checkValidity() || !/\S+@\S+\.\S+/.test(emailInput.value)) {
        emailError.classList.add('active');
        emailError.textContent = "The inputted email is not correct.";
        emailInput.value = "";
        event.preventDefault();
    }

    if (!/(?=.*[@#$%^&+=]).{6,}/.test(passwordInput.value)) {
        passwordError.classList.add('active');
        passwordError.textContent = "Need special characters, longer than 6 characters";
        passwordInput.value = "";
        event.preventDefault();
    }

    if (passwordInput.value !== confirmPasswordInput.value) {
        confirmPasswordError.classList.add('active');
        confirmPasswordError.textContent = "The entered passwords do not match.";
        confirmPasswordInput.value = "";
        event.preventDefault();
    }

    if (!phoneInput.checkValidity() || !/^\d{10}$/.test(phoneInput.value)) {
        phoneError.classList.add('active');
        phoneError.textContent = "10-digit phone number only.";
        phoneInput.value = "";
        event.preventDefault();
    }

    event.preventDefault();
    const formData = new FormData(event.target);
    const data = {}; 

    formData.forEach((value, key) => {
        data[key] = value;
    });

    console.log(data) 

    var postUser = {
        name:  data.name,
        email: data.email,
        password: data.password,
        phone: data.phone,
    }

    const postUrl = `https://fourt7.onrender.com/api/users`;

    console.log(JSON.stringify(postUser))
    fetch(postUrl, {
        method: 'POSt',
        body: JSON.stringify(postUser),
        headers: {
            'Content-Type': 'application/json'
            }
        })
        .then(response => response.json())
        .then(a => {
            console.log('Dữ liệu đã được gửi thành công:', a);
            localStorage.setItem("userId", userInfo.id);
            window.location.href = "home.html"
        })
        .catch(error => {
            // console.error('Lỗi cho có', error);
        });
});


//sign-in
const signinForm = document.querySelector('.signin-form');
signinForm.addEventListener('submit', async (event) => {
    const loginEmailInput = document.querySelector('#signin-form input[name="email"]');
    const loginPasswordInput = document.querySelector('#signin-form input[name="password"]');

    const loginEmailError = document.querySelector('#loginEmailError');
    const loginPasswordError = document.querySelector('#loginPasswordError');

    if (!loginEmailInput.checkValidity() || !/\S+@\S+\.\S+/.test(loginEmailInput.value)) {
        loginEmailError.classList.add('active');
        loginEmailError.textContent = "The inputted email is not correct.";
        loginEmailInput.value = "";
        event.preventDefault();
    }

    if (!/(?=.*[@#$%^&+=]).{6,}/.test(loginPasswordInput.value)) {
        loginPasswordError.classList.add('active');
        loginPasswordError.textContent = "Need special characters, longer than 6 characters";
        loginPasswordInput.value = "";
        event.preventDefault();
    }

    event.preventDefault();

    const url = 'https://fourt7.onrender.com/api/users';
    const usersResponse = await fetch(url);
    const users = await usersResponse.json();

    const formData = new FormData(event.target);
    const data = {}; 

    formData.forEach((value, key) => {
        data[key] = value;
    });

    console.log(data)
    users.forEach((userInfo) => {
        console.log(userInfo)
        if(data.email === userInfo.email){
            if(data.password === userInfo.password){
                localStorage.setItem("userId", userInfo.id);
                window.location.href = "home.html"
            }else{
                alert("wrong password!!!");
            }
        }
    });

    // alert("User doesn't exits!");
});
