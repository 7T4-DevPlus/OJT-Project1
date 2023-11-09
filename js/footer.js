const emailInput = document.getElementById('emailInput');
const submitButton = document.getElementById('submitButton');
const message = document.getElementById('message');

// Kiểm tra nếu thông báo đã được đóng trước đó
if (localStorage.getItem('notificationClosed')) {
    message.style.display = 'none';
}

submitButton.addEventListener('click', () => {
    const email = emailInput.value;
    if (isValidEmail(email)) {
        message.textContent = `Địa chỉ email của bạn (${email}) đã được đăng kí.`;
        message.style.color = 'green';
    } else {
        message.textContent = 'Email không hợp lệ. Xin vui lòng nhập lại.';
        message.style.color = 'red';
    }
});

// Đóng thông báo và lưu trạng thái vào Local Storage
message.addEventListener('click', () => {
    message.style.display = 'none';
    localStorage.setItem('notificationClosed', 'true');
});

function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    return emailRegex.test(email);
}