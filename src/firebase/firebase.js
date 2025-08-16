import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAgTmHWmQsBTSgcA2D_qnJE4S4VpWPlb-Q",
  authDomain: "matemind-42191.firebaseapp.com",
  projectId: "matemind-42191",
  storageBucket: "matemind-42191.appspot.com", // ✅ fixed
  messagingSenderId: "862254987892",
  appId: "1:862254987892:web:076565836ae20fda916f21",
  measurementId: "G-PVK21EC6S9"
};

const app = initializeApp(firebaseConfig);

// ✅ Only initialize analytics in browser
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}

const auth = getAuth(app);
const db = getFirestore(app);

export { db, auth, app, analytics };
