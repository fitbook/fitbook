import * as firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'
import firebaseConfig from './firebaseConfig'

// Initialize Firebase
if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig)
}
const Firebase = {
    // auth
    loginWithEmail: (email, password) => {
        return firebase.auth().signInWithEmailAndPassword(email, password)
    },
    signupWithEmail: (email, password) => {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
    },
    signOut: () => {
        return firebase.auth().signOut()
    },
    checkUserAuth: user => {
        return firebase.auth().onAuthStateChanged(user)
    },
    passwordReset: email => {
        return firebase.auth().sendPasswordResetEmail(email)
    },
    getCurrentUser: async () => {
        return new Promise(async (res, rej) => {
            firebase
                .firestore()
                .collection('users')
                .doc(Firebase.getUid())
                .onSnapshot((doc) => {
                    res(doc.data());
                });
        });
    },
    // firestore
    createNewUser: userData => {
        return firebase
            .firestore()
            .collection('users')
            .doc(`${userData.uid}`)
            .set(userData)
    },
    addPost: async ({text, localUri}) => {
        const path = `photos/${Firebase.getUid()}/${Date.now()}`;
        const remoteUri = await Firebase.uploadPhotoAsync(localUri, path);
        const db = firebase.firestore();

        return new Promise((res, rej) => {
            db
                .collection('posts')
                .add({
                    text,
                    uid: Firebase.getUid(),
                    timestamp: Firebase.getTimestamp(),
                    image: remoteUri
                })
                .then(ref => {
                    res(ref);
                })
                .catch(error => {
                    rej(error);
                });
        });
    },
    uploadPhotoAsync: async (uri, filename) => {
        return new Promise(async (res, rej) => {
            const response = await fetch(uri);
            const file = await response.blob();

            let upload = firebase
                .storage()
                .ref(filename)
                .put(file);

            upload.on(
                "state_changed",
                snapshot => {
                },
                err => {
                    rej(err);
                },
                async () => {
                    const url = await upload.snapshot.ref.getDownloadURL();
                    res(url);
                }
            );
        })
    },
    getPosts: () => {
        return new Promise(async (res, rej) => {
            firebase
                .firestore()
                .collection('posts')
                .get()
                .then((querySnapshot) => {
                    let posts = [];
                    querySnapshot.forEach((doc) => {
                        const post = {
                            id: doc.id,
                            text: doc.data().text,
                            timestamp: doc.data().timestamp,
                            image: doc.data().image,
                            avatar: require("../../assets/avatar.png")
                        };
                        posts.push(post);
                    });
                    res(posts);
                })
                .catch(error => {
                    rej(error);
                });
        });
    },
    getUid() {
        return (firebase.auth().currentUser || {}).uid;
    },

    getTimestamp() {
        return Date.now();
    },
    setUserAvatar: async avatar => {
        let remoteUri = null;
        try {
            let db = firebase.firestore()
                .collection('users')
                .doc(Firebase.getUid());

            remoteUri = await Firebase.uploadPhotoAsync(avatar, `avatars/${Firebase.getUid()}`);
            await db.set({avatar: remoteUri}, {merge: true});
        } catch (error) {
            alert(error);
        }
    },

};

export default Firebase
