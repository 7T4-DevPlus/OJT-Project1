function toggleErrorMessageOnBlur(input, errorElement) {
    if (input.validity.valueMissing && input.value === "") {
        errorElement.classList.add('active');
        errorElement.textContent = "This field is required.";
    } else {
        errorElement.classList.remove('active');
        errorElement.textContent = " ";
    }
}

function togglePasswordVisibility(inputFieldId, eyeIconId) {
    const inputField = document.getElementById(inputFieldId);
    const eyeIcon = document.getElementById(eyeIconId);

    if (inputField.type === 'password') {
        inputField.type = 'text';
        eyeIcon.classList.remove('fa-eye-slash');
        eyeIcon.classList.add('fa-eye');
    } else {
        inputField.type = 'password';
        eyeIcon.classList.remove('fa-eye');
        eyeIcon.classList.add('fa-eye-slash');
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

const signupForm = document.getElementById('signup-form');

signupForm.addEventListener('submit', function (event) {
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
});

const signinForm = document.getElementById('signin-form');

signinForm.addEventListener('submit', function (event) {
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
});
