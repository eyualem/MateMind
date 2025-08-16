// src/screens/Welcome.jsx

import React, { useEffect } from "react";
import Button from "../components/Button";
import logo from "../assets/matemind-logo.png";
import { useNavigate } from "react-router-dom";
import { signInWithGooglePopup } from "../firebase/firebaseAuth";
import { useAppContext } from "../context/AppContext";

function Welcome() {
  // Always call hooks at the top
  const navigate = useNavigate();
  // We only need currentUser, authLoading, and setUserName from context
  const { currentUser, authLoading, setUserName } = useAppContext();

  // This single useEffect is now sufficient to handle all navigation logic.
  // It will run when the authLoading or currentUser state changes.
  useEffect(() => {
    // Check if authentication has finished loading and if a user is logged in.
    // Also, ensure we are on the root path to prevent unwanted navigation from other pages.
    if (!authLoading && currentUser && location.pathname === "/") {
      // Set the user name and navigate to the next screen.
      setUserName(currentUser.displayName || "Player");
      navigate("/choose-tutor");
    }
  }, [authLoading, currentUser, location.pathname]);


  // Trigger Google Sign-In (redirect flow)
  const handleGoogleLogin = () => {
    // This will redirect the user to Google for authentication.
    signInWithGooglePopup(); 
  };

  // Guest login
  const handleGuestLogin = () => {
    setUserName("Guest");
    navigate("/choose-tutor");
  };

  // Show a loading screen while the auth state is being checked.
  if (authLoading) {
    return (
      <div className="min-h-screen bg-blue-900 text-white flex items-center justify-center">
        <div className="text-center text-lg font-medium">Authenticating...</div>
      </div>
    );
  }

  // Show login options once authentication is complete.
  return (
    <div className="min-h-screen bg-blue-900 text-white flex flex-col items-center justify-center gap-8 px-4 text-center">
      <img
        src={logo}
        alt="MateMind Logo"
        className="w-24 h-24 rounded-lg bg-white p-2 mb-6 sm:w-28 sm:h-28"
      />

      <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-light">
        Elevate your game, sharpen your mind
      </h1>

      <div className="flex flex-col gap-4 w-full max-w-xs">
        <Button onClick={handleGoogleLogin}>Continue with Google</Button>
        <Button
          className="bg-gray-200 text-blue-900"
          onClick={handleGuestLogin}
        >
          Continue as Guest
        </Button>
      </div>
    </div>
  );
}

export default Welcome;
