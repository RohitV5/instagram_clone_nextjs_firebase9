// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {getStorage} from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyARIRYwCR4FhAnHQ7LvWj_Xdd0t4__lS1Y",
  authDomain: "insta-nextjs-v1.firebaseapp.com",
  projectId: "insta-nextjs-v1",
  storageBucket: "insta-nextjs-v1.appspot.com",
  messagingSenderId: "676559349609",
  appId: "1:676559349609:web:384bdb4c9632c10cfbbff8",
  measurementId: "G-4598NW4DS9"
};

// Initialize Firebase
const app = !getApps().length?  initializeApp(firebaseConfig) : getApp();
const db = getFirestore();
const analytics = getAnalytics(app);

export {app, db, storage};