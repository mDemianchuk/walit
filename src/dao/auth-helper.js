function initializeSession() {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}

function signInWithEmailAndPassword(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
}

function createUserWithEmailAndPassword(email, password) {
    return firebase.auth().createUserWithEmailAndPassword(email, password)
}

function addSignInObserver(observer) {
    firebase.auth().onAuthStateChanged(observer);
}

function getCurrentUser() {
    return firebase.auth().currentUser;
}

function isSignedIn(user) {
    return user;
}

function signOut() {
    return firebase.auth().signOut();
}

module.exports = {
    initializeSession,
    signInWithEmailAndPassword,
    createUserWithEmailAndPassword,
    addSignInObserver,
    getCurrentUser,
    isSignedIn,
    signOut
};