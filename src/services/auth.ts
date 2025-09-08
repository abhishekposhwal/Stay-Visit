
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  GoogleAuthProvider,
  signInWithPopup,
} from 'firebase/auth';
import { auth } from '@/lib/firebase';

export const signUp = async (email, password) => {
  return createUserWithEmailAndPassword(auth, email, password);
};

export const logIn = async (email, password) => {
  return signInWithEmailAndPassword(auth, email, password);
};

export const logInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();
    return signInWithPopup(auth, provider);
}

export const logOut = async () => {
  return signOut(auth);
};
