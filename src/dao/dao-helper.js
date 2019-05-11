function getDocument(documentPath) {
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

function getCollection(collectionPath) {
    return new Promise(resolve => {
        resolve(firebase.firestore().collection(collectionPath));
    })
}

function getCollectionWithCondition(collection, condition) {
    return new Promise(resolve => {
        resolve(collection.where(condition.fieldPath, condition.opStr, condition.value));
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

function updateDocumentField(document, field) {
    return document.update(field);
}

function setDocumentField(document, field) {
    return document.set(field);
}

module.exports = {
    getDocument,
    getDocumentData,
    getCollection,
    getCollectionWithCondition,
    getCollectionData,
    updateDocumentField,
    setDocumentField
};