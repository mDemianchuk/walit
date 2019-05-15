const firebase = require('firebase/app');
require('@firebase/firestore')

function getDocumentByPath(documentPath) {
    return new Promise(resolve => {
        resolve(firebase.firestore().doc(documentPath));
    })
}

function getDocumentData(document) {
    return new Promise(resolve => {
        document.get()
            .then(snapshot => snapshot.data())
            .then(data => resolve(data));
    });
}

function getCollectionByPath(collectionPath) {
    return new Promise(resolve => {
        resolve(firebase.firestore().collection(collectionPath));
    })
}

function getCollectionWithCondition(collection, condition) {
    return new Promise(resolve => {
        resolve(collection.where(condition.fieldPath, condition.opStr, condition.value));
    });
}

function sortCollectionByField(collection, field) {
    return new Promise(resolve => {
        resolve(collection.orderBy(field, 'desc'));
    });
}

function getCollectionData(collection) {
    return new Promise(resolve => {
        const data = [];

        collection.get()
            .then(snapshot => {
                snapshot.forEach(doc => {
                    data.push(doc.data());
                });
            })
            .then(() => resolve(data));
    });
}

function updateDocumentFieldIfValid(document, field) {
    return new Promise(resolve => {
        if(field) {
            document.update(field)
                .then(() => resolve(document));
        } else {
            resolve(document);
        }
    });
}

function setDocumentField(document, field) {
    return document.set(field);
}

function deleteDocument(document) {
    return document.delete();
}

module.exports = {
    getDocumentByPath,
    getDocumentData,
    getCollectionByPath,
    getCollectionWithCondition,
    sortCollectionByField,
    getCollectionData,
    updateDocumentFieldIfValid,
    setDocumentField,
    deleteDocument
};