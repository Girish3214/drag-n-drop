import { doc, setDoc } from "firebase/firestore";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword, signOut, User } from "firebase/auth";

const createUserWithEmail = async (email: string, password: string) => {
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed up
      const user = userCredential.user;
      return user;
      // ...
    })
    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.message;
      console.log({ errorCode, errorMessage });
    });
};
const addUserToDataBase = async (user: User) => {
  const userDocRef = doc(db, "users", user.email ?? "NA"); // Reference to the user document (using user UID)
  await setDoc(
    userDocRef,
    {
      email: user.email,
      displayName: user.displayName || "", // Add display name if available
      photoURL: user.photoURL || "", // Add profile picture if available
      lastLogin: new Date().toISOString(), // Add timestamp for last login
    },
    { merge: true }
  ); // Use merge to avoid overwriting existing data
};

const handleLogout = async () => {
  try {
    await signOut(auth); // Sign out the user
    console.log("User signed out successfully");
  } catch (error) {
    console.error("Error signing out: ", error);
  }
};

export { createUserWithEmail, addUserToDataBase, handleLogout };
