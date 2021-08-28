import firebase from "firebase";
import "firebase/database";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyAHypvAursx2clYwKpZSjfXLN7kpx5OvPo",
  authDomain: "quartz-f62af.firebaseapp.com",
  projectId: "quartz-f62af",
  storageBucket: "quartz-f62af.appspot.com",
  messagingSenderId: "882591381725",
  appId: "1:882591381725:web:80c84794409838c9e40334",
});

var database = firebase.database();

export { firebase, database,firebaseApp };
