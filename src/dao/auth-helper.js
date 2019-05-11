function initializeSession() {
    return firebase.auth().setPersistence(firebase.auth.Auth.Persistence.SESSION);
}

function signInWithEmailAndPassword(email, password) {
    return firebase.auth().signInWithEmailAndPassword(email, password)
}

function addSignInObserver(observer) {
    firebase.auth().onAuthStateChanged(observer);
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
    addSignInObserver,
    isSignedIn,
    signOut
};