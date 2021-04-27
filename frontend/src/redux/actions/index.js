import firebase from 'firebase'
import { CLEAR_DATA, SET_CURRENT_USER } from '../constants/index'
require('firebase/firestore')

export function clearData() {
    return ((dispatch) => {
        dispatch({ type: CLEAR_DATA })
    })
}
export function reload() {
    return ((dispatch) => {
        dispatch(clearData())
        if (firebase.auth().currentUser != null) {
            dispatch(fetchUser())
        }
    })
}

export const login = (email, password) => dispatch => new Promise((resolve, reject) => {
    firebase.auth().signInWithEmailAndPassword(email, password)
        .then(() => {
            resolve()
        })
        .catch(() => {
            reject()
        })
})

export const loginWithGoogle = () => dispatch => new Promise((resolve, reject) => {
    var provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
        .signInWithPopup(provider)
        .then(() => {
            dispatch(fetchUser()).then(() => {
                resolve()
            }).catch((err) => {
                reject(err)
            });
        }).catch(() => {
            reject()
        });
})



export const register = (name, email, password) => dispatch => new Promise((resolve, reject) => {
    if (name.lenght == 0 || name.lenght == 0 || email.length == 0 || password.length == 0) {
        return reject()
    }
    if (password.length < 6) {
        return reject()
    }
    if (password.length < 6) {
        return reject()
    }
    firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(() => {
            firebase.firestore().collection("users")
                .doc(firebase.auth().currentUser.uid)
                .set({
                    name,
                    email,
                    image: 'default',
                }).then(() => resolve()).catch(() => reject())
        })
        .catch((error) => {
            reject()
        })
})


export const logout = () => dispatch => new Promise((resolve, reject) => {
    firebase.auth().signOut()
        .then((result) => {
            resolve()
        })
        .catch((error) => {
            reject()
        })
})


export const fetchUser = (uid = firebase.auth().currentUser.uid, dispatchBool = true) => dispatch => new Promise((resolve, reject) => {
    firebase.firestore()
        .collection("users")
        .doc(uid)
        .onSnapshot((snapshot, error) => {
            if (snapshot.exists) {
                if (dispatchBool) {
                    dispatch({ type: SET_CURRENT_USER, payload: { uid: firebase.auth().currentUser.uid, ...snapshot.data() } })
                }
                else {
                    resolve({ uid: snapshot.id, ...snapshot.data() })
                }
            }
        })
})

export const fetchUserByEmail = (email = firebase.auth().currentUser.email, dispatchBool = true) => dispatch => new Promise((resolve, reject) => {
    firebase.firestore()
        .collection("users")
        .where("email", '==', email)
        .get()
        .then((snapshot) => {
            snapshot.forEach((user) => {
                console.log({ user })
                if (user.exists) {
                    resolve({ uid: user.id, ...user.data() })
                }
            }

            )
        })
})

export const saveUserProfile = (name, description) => dispatch => new Promise((resolve, reject) => {
    if (name == '' || description == '') {
        return reject(new Error("Please fill out everything"))
    }
    firebase.firestore().collection("users")
        .doc(firebase.auth().currentUser.uid)
        .update({
            name,
            description,
        }).then(() => {
            resolve()
        }).catch(() => {
            return reject(new Error("Something went Wrong"))
        })
})



export const addLink = (token, wallet) => dispatch => new Promise((resolve, reject) => {
    if (token == null || wallet == '') {
        reject({ code: 1, message: "please fill out everything" });
    }

    firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection("links")
        .add({
            token,
            wallet
        })
        .then(() => {
            resolve();
        }).catch((error) => {
            console.log(error)
            reject();
        })
})

export const deleteLink = (wallet) => dispatch => new Promise((resolve, reject) => {
    console.log('deleteLink')
    if (wallet == null || wallet == '') {
        reject({ code: 1, message: "id does not exist" });
    }
    console.log(wallet)
    firebase.firestore()
        .collection('users')
        .doc(firebase.auth().currentUser.uid)
        .collection("links")
        .doc(wallet)
        .delete()
        .then(() => {
            console.log('sucess')
            resolve();
        }).catch((err) => {
            console.log(err)
            reject();
        })
})

export const fetchUserLinks = (uid) => dispatch => new Promise((resolve, reject) => {
    firebase.firestore()
        .collection('users')
        .doc(uid)
        .collection("links")
        .get()
        .then((snapshot) => {
            console.log(uid)
            let links = snapshot.docs.map(doc => {
                const data = doc.data();
                const id = doc.id;
                return { id, ...data }
            })
            resolve(links)
        })
})





