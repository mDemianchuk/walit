const firebase = require('firebase/app');

const config = {
    apiKey: "AIzaSyDYZEY_AVfgdayz0fy5-XruR6L6PN07uow",
    authDomain: "mdemianchuk-walit.firebaseapp.com",
    databaseURL: "https://mdemianchuk-walit.firebaseio.com",
    projectId: "mdemianchuk-walit",
    storageBucket: "mdemianchuk-walit.appspot.com",
    messagingSenderId: "28154671558"
};

function initializeDataBase() {
    firebase.initializeApp(config);
}

module.exports = {
    initializeDataBase
};
