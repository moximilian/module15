// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider} from "firebase/auth"
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNGTNy0wMk7Ytm_prP2xsstElTsOCQXLs",
  authDomain: "react-db-3113e.firebaseapp.com",
  projectId: "react-db-3113e",
  storageBucket: "react-db-3113e.appspot.com",
  messagingSenderId: "224179352660",
  appId: "1:224179352660:web:b9e5571933e8c08d3d69c1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);