// src/context/AppContext.jsx

import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Create a new context to hold global app state
const AppContext = createContext();

// Context provider component that wraps the app and supplies shared state
export const AppProvider = ({ children }) => {
  // Tracks which tutor the user has selected
  const [selectedTutor, setSelectedTutor] = useState(null);

  // Stores the user's display name (from Firebase or default)
  const [userName, setUserName] = useState("");

  // Stores the user's lesson progress and history from Firestore
  const [userProgress, setUserProgress] = useState(null);

  // Stores the authenticated Firebase user object
  const [currentUser, setCurrentUser] = useState(null);

  // Tracks whether Firebase is still resolving the user's auth state
  const [authLoading, setAuthLoading] = useState(true);

  // Listen for changes in Firebase authentication state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      // Prevent UI from rendering prematurely
      setAuthLoading(true);

      if (user) {
        // User is signed in — update context with user info
        setCurrentUser(user);
        setUserName(user.displayName || "Player");

        // Optional: load or initialize user progress from Firestore here
        // Example:
        // const userRef = doc(db, "users", user.uid);
        // const userSnap = await getDoc(userRef);
        // if (!userSnap.exists()) {
        //   await setDoc(userRef, { ...defaultProgress });
        //   setUserProgress(defaultProgress);
        // } else {
        //   setUserProgress(userSnap.data());
        // }
      } else {
        // User is signed out — clear context
        setCurrentUser(null);
        setUserName("");
        setUserProgress(null);
      }

      // Mark auth check as complete
      setAuthLoading(false);
    });

    // Clean up the listener when the component unmounts
    return () => unsubscribe();
  }, []);

  // Provide shared state and updater functions to all child components
  return (
    <AppContext.Provider
      value={{
        selectedTutor,
        setSelectedTutor,
        userName,
        setUserName,
        currentUser,
        userProgress,
        setUserProgress,
        setCurrentUser,
        // Note: authLoading is tracked but not exposed here — add it if needed
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Custom hook to access the context from any component
export const useAppContext = () => useContext(AppContext);
