const functions = require('firebase-functions');

// Path: backend/index.js
const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();

// Create and Deploy Your First Cloud Functions
exports.createAccount = functions.auth.user().onCreate((user) => {
    return db
        .collection('users')
        .doc(user.uid)
        .set({
            email: user.email,
            name: user.displayName,
            description: 'here is myCryptoLink',
            image: user.photoURL,
        });
});
