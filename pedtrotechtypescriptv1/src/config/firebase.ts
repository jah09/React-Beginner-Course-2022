// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth,GoogleAuthProvider} from 'firebase/auth'
import {getFirestore} from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyC6nppu66ZjPDkCb1DewTVVlO8UfWa19Wk",
  authDomain: "react-course-945aa.firebaseapp.com",
  projectId: "react-course-945aa",
  storageBucket: "react-course-945aa.appspot.com",
  messagingSenderId: "760832145049",
  appId: "1:760832145049:web:fc8c5e9f43cb579ebdea08"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app);
export const provider= new GoogleAuthProvider();
export const db=getFirestore(app);