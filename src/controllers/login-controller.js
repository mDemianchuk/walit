const loginValidator = require('../utils/validate/login-validator');
const authHelper = require('../dao/auth-helper');

document.addEventListener('DOMContentLoaded', event => {
    const loginForm = document.getElementById('login-form');
    const loginFormValidator = loginValidator.getLoginValidator('login-form');

    loginForm.addEventListener('submit', (form) => {
        form.preventDefault();

        if (loginFormValidator.isValid) {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            authHelper.initializeSession()
                .then(() => authHelper.signInWithEmailAndPassword(email, password))
                .then(() => loginForm.submit())
                .catch((error) => alert(error.message));
        }
    });

});

