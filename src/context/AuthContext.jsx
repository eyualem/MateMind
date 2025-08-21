import { createContext, useContext, useState, useEffect } from "react";
import { useAppContext } from "../context/AppContext";


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const { setUserName, currentUser, setCurrentUser } = useAppContext();

    const [authLoading, setAuthLoading] = useState(true);

    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (user) => {
            setAuthLoading(true);

            if (user) {
                setCurrentUser(user);
                setUserName(user.displayName || "Player");
                // Firestore logic (see below)
            } else {
                setCurrentUser(null);
                setUserName("");
                setUserProgress(null);
            }

            setAuthLoading(false);
        });

        return () => unsubscribe();
    }, []);

}