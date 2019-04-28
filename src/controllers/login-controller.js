const LoginFormValidator = require('../utils/validate/login-validate');

document.addEventListener('DOMContentLoaded', event => {
    const loginForm = document.getElementById('login-form');
    const loginFormValidator = new LoginFormValidator('login-form');

    loginForm.addEventListener('submit', (form) => {
        form.preventDefault();

        if (LoginFormValidator.prototype.isValid) {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    loginForm.submit();
                }, () => {
                    alert('Invalid login or password');
                });
        }
    });

});

