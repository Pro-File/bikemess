import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBw2VP2GYGog_RaiWXbTJDQS0LFFX3bFuE",
  authDomain: "bikemess-a7f7a.firebaseapp.com",
  projectId: "bikemess-a7f7a",
  storageBucket: "bikemess-a7f7a.appspot.com",
  messagingSenderId: "150208857734",
  appId: "1:150208857734:web:3f8a0f1b371ba700bb3307"
};

// initialize firebase with above config
try {
  firebase.initializeApp(firebaseConfig)
} catch (err) {
  // already initalized
}

export const db = firebase.firestore
export const { auth, storage } = firebase;
// export const currentUser = () => auth().currentUser
// export const serverTimestamp = () => db.FieldValue.serverTimestamp()


