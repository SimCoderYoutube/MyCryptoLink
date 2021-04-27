const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp();

const db = admin.firestore();


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
