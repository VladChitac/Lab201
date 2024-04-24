import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getDatabase, ref, set } from "firebase/database";
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from 'firebase/analytics';

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBtASP4bmd6YsCvSWega9DHpw6sKcXAOyw",
  authDomain: "fir-kate-ee384.firebaseapp.com",
  databaseURL: "https://fir-kate-ee384-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "fir-kate-ee384",
  storageBucket: "fir-kate-ee384.appspot.com",
  messagingSenderId: "173195721916",
  appId: "1:173195721916:web:9714f47acf8445b858a4b9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const FIREBASE_AUTH = getAuth(app);
const db = getFirestore(app);
const analytics = getAnalytics(app);

// Function to save text data to Firebase Realtime Database
export const saveTextToFirebase = (textData) => {
  // Get a reference to the database
  const database = getDatabase(app);

  // Reference to the root of the database
  const databaseRef = ref(database, 'Information');

  // Set the text data to a specific node in the database
  set(databaseRef, textData)
    .then(() => {
      console.log("Text data saved successfully!");
    })
    .catch((error) => {
      console.error("Error saving text data: ", error);
    });
};

export { app, FIREBASE_AUTH, db, analytics, FIREBASE_AUTH as auth };