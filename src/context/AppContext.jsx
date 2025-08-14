// src/context/AppContext.jsx

import { createContext, useContext, useState, useEffect } from "react";
import { auth, db } from "../firebase/firebase.js";
import { onAuthStateChanged } from "firebase/auth";
import { doc, getDoc, setDoc } from "firebase/firestore";

// Create global app context
const AppContext = createContext();

// Provide context to all components
export const AppProvider = ({ children }) => {
  const [selectedTutor, setSelectedTutor] = useState(null);
  const [userName, setUserName] = useState("");
  const [currentUser, setCurrentUser] = useState(null);
  const [userProgress, setUserProgress] = useState(null);

  // ✅ Track whether auth check is still loading
  const [authLoading, setAuthLoading] = useState(true);

  // Listen to auth changes
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const name = user.displayName || "Player";
        setCurrentUser(user);
        setUserName(name);

        const userRef = doc(db, "users", user.uid);
        const userSnap = await getDoc(userRef);

        if (!userSnap.exists()) {
          const newProgress = {
            name,
            lastTutor: null,
            lastLessonIndex: 0,
            progress: {
              lessonPlan: [],
              completed: [],
            },
          };
          await setDoc(userRef, newProgress);
          setUserProgress(newProgress);
        } else {
          setUserProgress(userSnap.data());
        }
      } else {
        setCurrentUser(null);
        setUserName("");
        setUserProgress(null);
      }

      // ✅ Done checking auth state
      setAuthLoading(false);
    });

    return () => unsubscribe();
  }, []);

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
        authLoading, // ✅ Expose loading flag
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

// Hook to use the context
export const useAppContext = () => useContext(AppContext);
