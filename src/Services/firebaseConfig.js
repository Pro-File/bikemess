import firebase from 'firebase';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCq3sCWry_he6AUVNFdf4mr_dMDDIUj48o",
  authDomain: "bikemess-webapp.firebaseapp.com",
  projectId: "bikemess-webapp",
  storageBucket: "bikemess-webapp.appspot.com",
  messagingSenderId: "1010616670461",
  appId: "1:1010616670461:web:5b0f4db02119fbac728694"
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


