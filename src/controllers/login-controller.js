const loginValidator = require('../utils/validate/login-validator');

document.addEventListener('DOMContentLoaded', () => {
    const loginForm = document.getElementById('login-form');
    const loginFormValidator = loginValidator.getLoginValidator('login-form');

    loginForm.addEventListener('submit', event => {
        event.preventDefault();
        if (loginFormValidator.isValid) {
            loginForm.submit();
        }
    });
});
