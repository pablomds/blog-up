import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
  deleteUser
} from "firebase/auth";
import { User } from "firebase/auth";

import { auth } from "@/Firebase/firebaseConfig";

const googleProvider = new GoogleAuthProvider();


const signInWithGoogle = async () => {
  try {
    await signInWithPopup(auth, googleProvider);
  } catch (error) {
    console.error("Error occured : ", error);
  }
};

const logInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<
| { status: "success"; user: User }
| { status: "failed"; internalError: boolean }
> => {
  try {
    const { user } = await signInWithEmailAndPassword(auth, email, password);
    return { status: "success", user }
  } catch (error) {
    console.error("Error Occured On logInWithEmailAndPassword() ", error);
    return {
      status: "failed",
      internalError: true
    }
  }
};

const signUpWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<string | void> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const uid = res.user.uid;
    return uid;
  } catch (error) {
    console.error("Error On signUpWithEmailAndPassword() ", error);
  }
};

export const deleteAuthenticatedUser = async (user: User): Promise<void> => {
  try {
      await deleteUser(user);
  } catch (error) {
      console.error("Error deleting user:", error);
  }
};

const sendPasswordReset = async (email: string) => {
  try {
    await sendPasswordResetEmail(auth, email);
    alert("Password reset link sent!");
  } catch (err) {
    console.error(err);
  }
};

const isLoggedIn = async (): Promise<boolean> => {
  try {
    await new Promise((resolve, reject) =>
      auth.onAuthStateChanged(
        (user) => {
          if (user) {
            // User is signed in.
            resolve(user);
          } else {
            // No user is signed in.
            reject("no user logged in");
          }
        },
        // Prevent console error
        (error) => reject(error)
      )
    );
    return true;
  } catch (error) {
    return false;
  }
};

const logout = () => signOut(auth);

export {
  signInWithGoogle,
  logInWithEmailAndPassword,
  signUpWithEmailAndPassword,
  sendPasswordReset,
  logout,
  isLoggedIn,
};
