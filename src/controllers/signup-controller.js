const signUpValidator = require('../utils/validate/signup-validator');
const authHelper = require('../dao/auth-helper');
const daoHelper = require('../dao/dao-helper');

document.addEventListener('DOMContentLoaded', event => {

    const signUpForm = document.getElementById('signup-form');
    const signUpFormValidator = signUpValidator.getSignUpValidator('signup-form');

    signUpForm.addEventListener('submit', event => {
        event.preventDefault();

        if (signUpFormValidator.isValid) {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            authHelper.createUserWithEmailAndPassword(email, password)
                .then(() => {
                    const user = authHelper.getCurrentUser();
                    if (user) {
                        const defaultSettings = {
                            currency: '$',
                            limit: 2000,
                            goal: 2000
                        };

                        daoHelper.getDocumentByPath(`walit-settings/${user.uid}`)
                            .then(document => daoHelper.setDocumentField(document, defaultSettings))
                            .then(() => {
                                alert('Account successfully created');
                                signUpForm.submit();
                            });
                    }
                })
        }
    });
});