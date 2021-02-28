import firebase from "firebase/app";
import "firebase/firestore";

const config = {
    apiKey: "AIzaSyDlSNvfeialmJwtTuakq1b4GZvYi6ELoNE",
    authDomain: "bc-project-85349.firebaseapp.com",
    projectId: "bc-project-85349",
    storageBucket: "bc-project-85349.appspot.com",
    messagingSenderId: "806960423055",
    appId: "1:806960423055:web:3df94c074dd2ebe7ee50fa",
    measurementId: "G-QXB5R2QGR6"
  };

firebase.initializeApp(config);

var db = firebase.firestore();

export default db;