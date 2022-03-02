import { initializeApp } from 'firebase/app';
import { getFirestore } from "firebase/firestore"
import { getAuth, onAuthStateChanged, signInAnonymously } from "firebase/auth";



const firebaseConfig = {
    apiKey: "AIzaSyAbI0wetMDwlzotYNYAxJ2ALrYjujjjK4A",
    authDomain: "chessx-aa2fb.firebaseapp.com",
    projectId: "chessx-aa2fb",
    storageBucket: "chessx-aa2fb.appspot.com",
    messagingSenderId: "569943792520",
    appId: "1:569943792520:web:7afb005ba7bafa917ff83d"
  };
  

const app = initializeApp(firebaseConfig);
const db = getFirestore();



const auth = getAuth();
signInAnonymously(auth)
  .then(() => {
    // Signed in..
    console.log("Signed In");
  })
  .catch((error) => {
    const errorCode = error.code;
    const errorMessage = error.message;
});

onAuthStateChanged(auth, (user) => {
  if (user) {
    // User is signed in, see docs for a list of available properties
    // https://firebase.google.com/docs/reference/js/firebase.User
    const uid = user.uid;
    console.log("User id: ", uid);
    // ...
  } else {
    // User is signed out
    // ...
    console.log("No user signed in");
  }
});

export {
  auth,
  db
}




