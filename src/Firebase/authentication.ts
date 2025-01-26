import { auth, db } from "./firebaseConfig";

import {
  GoogleAuthProvider,
  signInWithPopup,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

import {
  getFirestore,
  query,
  getDocs,
  collection,
  where,
  addDoc,
} from "firebase/firestore";

const googleProvider = new GoogleAuthProvider();

const signInWithGoogle = async () => {
  try {
    const res = await signInWithPopup(auth, googleProvider);
    const user = res.user;
  } catch (error) {
    console.error("Error occured : ", error);
  }
};

const logInWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<void | string> => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (err) {
    return console.error("Error occured : ", err);
  }
};

const registerWithEmailAndPassword = async (
  email: string,
  password: string
): Promise<string | void> => {
  try {
    const res = await createUserWithEmailAndPassword(auth, email, password);
    const uid = res.user.uid;
    const newUser = { email: email, uid: uid, auth_provider: "local" };
    return newUser.uid;
  } catch (err) {
    console.error("Auth Error : ", err);
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
  registerWithEmailAndPassword,
  sendPasswordReset,
  logout,
  isLoggedIn,
};
