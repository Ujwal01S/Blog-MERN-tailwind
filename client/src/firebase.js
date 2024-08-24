

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-blog-68d08.firebaseapp.com",
  projectId: "mern-blog-68d08",
  storageBucket: "mern-blog-68d08.appspot.com",
  messagingSenderId: "871812054100",
  appId: "1:871812054100:web:1cdbf489e91048ba7881c1",
  measurementId: "G-26BS92JMTR"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);