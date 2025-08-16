import {
  GoogleAuthProvider,
  signInWithRedirect,
  getRedirectResult,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from "firebase/auth";
import { auth } from "./firebase";

// Google Auth Provider instance
const provider = new GoogleAuthProvider();

// --- REDIRECT FLOW ---

/**
 * Initiates Google sign-in using redirect.
 */
export const signInWithGoogleRedirect = () => signInWithRedirect(auth, provider);

/**
 * Gets the user after redirect sign-in.
 * @returns {Promise<User|null>}
 */
export const getRedirectedUser = async () => {
  const result = await getRedirectResult(auth);
  return result?.user || null;
};

// --- POPUP FLOW ---

/**
 * Signs in the user with Google using a popup window.
 * @returns {Promise<User>} A Promise that resolves with the user's info.
 */
export async function signInWithGooglePopup() {
  try {
    const result = await signInWithPopup(auth, provider);
    // This gives you a Google Access Token. You can use it to access the Google API.
    const credential = GoogleAuthProvider.credentialFromResult(result);
    const token = credential?.accessToken;
    // The signed-in user info.
    const user = result.user;
    console.log("Successfully signed in with Google!", user);
    return user;
  } catch (error) {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    // The email of the user's account used.
    const email = error.customData?.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error) || null;
    console.error("Error signing in with Google:", errorMessage, errorCode, email, credential);
    throw error; // Re-throw to allow your component to handle it
  }
}

// --- SIGN OUT ---

/**
 * Signs out the currently authenticated user.
 */
export async function signOutUser() {
  try {
    await signOut(auth);
    console.log("User signed out successfully!");
  } catch (error) {
    console.error("Error signing out:", error.message);
    throw error;
  }
}

/**
 * Alias for signOut.
 */
export const logout = () => signOut(auth);

// --- AUTH STATE OBSERVER ---

/**
 * Observes the user's authentication state.
 * @param {function} callback - Function to call when auth state changes (receives user object or null).
 * @returns {function} An unsubscribe function.
 */
export function subscribeToAuthChanges(callback) {
  return onAuthStateChanged(auth, user => {
    callback(user);
  });
}