// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-estate-70cdf.firebaseapp.com",
  projectId: "mern-estate-70cdf",
  storageBucket: "mern-estate-70cdf.appspot.com",
  messagingSenderId: "787594100203",
  appId: "1:787594100203:web:d0747409502e3095ae2dae"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);