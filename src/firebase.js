import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyCV-H0nBa4DzlYbq0IRNBRIHqn111Eiw5U",
    authDomain: "fintxyug.firebaseapp.com",
    projectId: "fintxyug",
    storageBucket: "fintxyug.firebasestorage.app",
    messagingSenderId: "304366793181",
    appId: "1:304366793181:web:3ea3fb3d60e69b9ecd4634",
    measurementId: "G-5EYQN246P7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);

export { app, analytics, auth, db };
