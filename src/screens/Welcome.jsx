// src/screens/Welcome.jsx

import { useEffect } from "react";
import Button from "../components/Button";
import logo from "../assets/matemind-logo.png";
import { useNavigate } from "react-router-dom";
import { signInWithGoogle, getRedirectedUser } from "../firebase/firebaseAuth";
import { useAppContext } from "../context/AppContext";

function Welcome() {
  // Always call hooks at the top
  const navigate = useNavigate();
  const { currentUser, authLoading, setUserName } = useAppContext();

  // Auto-navigate if user is already logged in
  useEffect(() => {
    if (!authLoading && currentUser) {
      setUserName(currentUser.displayName || "Player");
      navigate("/choose-tutor");
    }
  }, [authLoading, currentUser, navigate, setUserName]);

  // Handle redirect-based Google sign-in fallback
  useEffect(() => {
    getRedirectedUser().then((user) => {
      if (user) {
        setUserName(user.displayName || "Player");
        navigate("/choose-tutor");
      }
    });
  }, [navigate, setUserName]);

  // Trigger Google Sign-In (redirect flow)
  const handleGoogleLogin = () => {
    signInWithGoogle(); // This will redirect
  };

  // Guest login
  const handleGuestLogin = () => {
    setUserName("Guest");
    navigate("/choose-tutor");
  };

  // Show loading while auth is being checked
  if (authLoading) {
    return <div className="text-white text-center mt-10">Loading...</div>;
  }

  // Show login options
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
