import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";
import "firebase/functions";
import "firebase/storage";
const firebaseConfig = {
    apiKey: "AIzaSyBCabYRY0iAxAy5pYkoMrI-aMqlCOPm8bs",
    authDomain: "chatapp-80fd4.firebaseapp.com",
    projectId: "chatapp-80fd4",
    storageBucket: "chatapp-80fd4.appspot.com",
    messagingSenderId: "438376028178",
    appId: "1:438376028178:web:348dacd17598d4663d60cb"
  };
  // Initialize the app
  let app;
// If the firebase apps have
// not been initialized
if(firebase.apps.length=== 0){
  // Then initialize firebase application
  app = firebase.initializeApp(firebaseConfig)
}
else{
 // Otherwise use the 
 //firebase app that 
 //is already initialized
 app = firebase.app();
}
const db = app.firestore();
const auth = firebase.auth();
export {db, auth};