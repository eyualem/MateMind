// src/firebase/firebaseAuth.js
import {
    GoogleAuthProvider,
    signInWithRedirect,
    getRedirectResult,
    signOut,
  } from "firebase/auth";
  import { auth } from "./firebase";
  
  const provider = new GoogleAuthProvider();
  
  // Start sign-in with redirect
  export const signInWithGoogle = () => signInWithRedirect(auth, provider);
  
  // Called after redirect
  export const getRedirectedUser = async () => {
    const result = await getRedirectResult(auth);
    return result?.user || null;
  };
  
  export const logout = () => signOut(auth);
  