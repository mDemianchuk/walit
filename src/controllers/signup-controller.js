const signUpValidator = require('../utils/validate/signup-validator');

document.addEventListener('DOMContentLoaded', event => {

    const signUpForm = document.getElementById('signup-form');
    const signUpFormValidator = signUpValidator.getSignUpValidator('signup-form');

    signUpForm.addEventListener('submit', (form) => {
        form.preventDefault();

        if (signUpFormValidator.isValid) {
            const email = document.getElementById('email').value;
            const password = document.getElementById('password').value;

            firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(() => {
                    const user = firebase.auth().currentUser;
                    if (user) {
                        firebase.firestore().collection('walit-settings').doc(user.uid).set({
                            currency: '$',
                            limit: 2000,
                            goal: 2000
                        }).then(() => {
                            alert('Account successfully created');
                            signUpForm.submit();
                        });
                    }
                })
        }
    });
});