const SignupFormValidator = require('../utils/validate/signup-validate');

document.addEventListener('DOMContentLoaded', event => {

    const signupForm = document.getElementById('signup-form');
    const signupFormValidator = new SignupFormValidator('signup-form');

    signupForm.addEventListener('submit', (form) => {
        form.preventDefault();

        if (SignupFormValidator.prototype.isValid) {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    alert('Account successfully created');
                    signupForm.submit();
                })
        }
    });
});