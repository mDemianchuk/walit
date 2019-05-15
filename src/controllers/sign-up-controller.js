const signUpValidator = require('../utils/validate/sign-up-validator');

document.addEventListener('DOMContentLoaded', () => {
    const signUpForm = document.getElementById('sign-up-form');
    const signUpFormValidator = signUpValidator.getSignUpValidator('sign-up-form');

    signUpForm.addEventListener('submit', event => {
        event.preventDefault();
        if (signUpFormValidator.isValid) {
            signUpForm.submit();
        }
    });
});