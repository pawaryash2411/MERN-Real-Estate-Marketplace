// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    // apiKey: import.meta.env.FIREBASE_KEY,
    apiKey: "AIzaSyAjdjJhkdTpaF1v9IPRT9BWUgIhGV6eW0g",
    authDomain: "mern-real-estate-27723.firebaseapp.com",
    projectId: "mern-real-estate-27723",
    storageBucket: "mern-real-estate-27723.appspot.com",
    messagingSenderId: "80738879760",
    appId: "1:80738879760:web:afeb6a2f923de43dee3d95",
    measurementId: "G-NPZH4FNLXP"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);