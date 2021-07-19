import firebase from "firebase";

const firebaseConfig = {
  apiKey: "AIzaSyDMTlWHMfKNzc9eIesH7SnS0fhnrL63KUU",
  authDomain: "listit-1e108.firebaseapp.com",
  projectId: "listit-1e108",
  storageBucket: "listit-1e108.appspot.com",
  messagingSenderId: "634311376089",
  appId: "1:634311376089:web:999022f82d0f32f1fb12c8",
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);

export default firebase;
