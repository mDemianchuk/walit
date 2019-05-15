const express = require('express');
const router = express.Router();
const authHelper = require('../src/dao/auth-helper');
const daoHelper = require('../src/dao/dao-helper');

router.get('/', (req, res) => res.render('sign-up'));

router.post('/', (req, res) => {
    const email = req.body.email;
    const password = req.body.password;

    const defaultSettings = {
        currency: '$',
        limit: 2000,
        goal: 2000
    };

    authHelper.createUserWithEmailAndPassword(email, password)
        .then(() => authHelper.getUserIdIfSignedIn())
        .then(userId => getUserSettingsDocument(userId))
        .then(document => daoHelper.setDocumentField(document, defaultSettings))
        .then(() => res.redirect('/login'))
        .catch(() => res.redirect('/sign-up'));
});

function getUserSettingsDocument(userId) {
    return daoHelper.getDocumentByPath(`walit-settings/${userId}`);
}

module.exports = router;
