// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBzGo5w4mFoJULXwnduZCLgQgegFsHfQcs",
  authDomain: "business-directory-8499a.firebaseapp.com",
  projectId: "business-directory-8499a",
  storageBucket: "business-directory-8499a.appspot.com",
  messagingSenderId: "680169722827",
  appId: "1:680169722827:web:10ba80d90aee11d2ab9c4e",
  measurementId: "G-X6JDQSBZRW"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)
export const storage = getStorage(app)
// const analytics = getAnalytics(app);