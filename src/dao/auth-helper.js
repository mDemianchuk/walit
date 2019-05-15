const firebase = require('firebase/app');
require('@firebase/auth');

function initializeSession() {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}

function signInWithEmailAndPassword(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
}

function createUserWithEmailAndPassword(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
}

function getCurrentUser() {
    return firebase.auth().currentUser;
}

function getUserIdIfSignedIn() {
    return new Promise((resolve, reject) => {
        addSignInObserver(user => {
            if (user) {
                resolve(user.uid);
            } else {
                reject();
            }
        })
    });
}

function addSignInObserver(observer) {
    firebase.auth().onAuthStateChanged(observer);
}

function signOut() {
    return firebase.auth().signOut();
}

module.exports = {
    initializeSession,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    getCurrentUser,
    getUserIdIfSignedIn,
    signOut
};