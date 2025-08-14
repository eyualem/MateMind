// src/utils/saveProgress.js
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../firebase";

export async function saveUserProgress(uid, updatedData) {
  const userRef = doc(db, "users", uid);
  await updateDoc(userRef, updatedData);
}
