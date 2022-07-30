import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBocbADxw1Br9bWjIT2XEjdyD4c8xovetE",
  authDomain: "bikemess-web.firebaseapp.com",
  projectId: "bikemess-web",
  storageBucket: "bikemess-web.appspot.com",
  messagingSenderId: "405303059980",
  appId: "1:405303059980:web:bf8f1899b8752024087029",
  measurementId: "G-FX3JFW8XFK",
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


