const express = require('express');
const router = express.Router();
const authHelper = require('../src/dao/auth-helper');

router.get('/', (req, res) => {
    authHelper.signOut()
        .then(() => {
            console.log('logged out');
            res.render('login')
        })
        .catch(error => console.log(error));
});

router.post('/', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;
    authHelper.signInWithEmailAndPassword(email, password)
        .then(() => res.redirect('/overview'))
        .catch(error => console.log(error.message));
});

module.exports = router;
