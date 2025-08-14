// src/firebase/firebase.js
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAgTmHWmQsBTSgcA2D_qnJE4S4VpWPlb-Q",
  authDomain: "matemind-42191.firebaseapp.com",
  projectId: "matemind-42191",
  storageBucket: "matemind-42191.firebasestorage.app",
  messagingSenderId: "862254987892",
  appId: "1:862254987892:web:076565836ae20fda916f21",
  measurementId: "G-PVK21EC6S9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);                       // Auth instance
export const provider = new GoogleAuthProvider();       // ✅ Google provider
export const db = getFirestore(app);                    // Firestore instance
