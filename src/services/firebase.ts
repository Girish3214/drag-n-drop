// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, GoogleAuthProvider } from "firebase/auth";

// import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "todo-list-bfd1b.firebaseapp.com",
  projectId: "todo-list-bfd1b",
  storageBucket: "todo-list-bfd1b.firebasestorage.app",
  messagingSenderId: "448549797663",
  appId: process.env.APP_ID,
  measurementId: "G-B1ML3R95HH",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Firestore
const db = getFirestore(app);

const auth = getAuth(app);
const googleProvider = new GoogleAuthProvider();

export default app;
export { app, db, googleProvider, auth };
