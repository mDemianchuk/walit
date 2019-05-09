const loginValidator = require('../utils/validate/login-validator');

document.addEventListener('DOMContentLoaded', event => {
    const loginForm = document.getElementById('login-form');
    const loginFormValidator = loginValidator.getLoginValidator('login-form');

    loginForm.addEventListener('submit', (form) => {
        form.preventDefault();

        if (loginFormValidator.isValid) {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            firebase.auth().signInWithEmailAndPassword(email, password)
                .then(() => {
                    loginForm.submit();
                }, () => {
                    alert('Invalid login or password');
                }, (error) => {
                    alert(error)
                });
        }
    });

});

