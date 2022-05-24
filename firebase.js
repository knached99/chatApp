import * as firebase from "firebase";
import "firebase/firestore";
import "firebase/auth";
import "firebase/database";
import "firebase/functions";
import "firebase/storage";
const firebaseConfig = {
    // API Keys not shown 
    apiKey: "",
    authDomain: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: ""
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
