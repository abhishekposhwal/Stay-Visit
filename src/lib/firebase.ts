
import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  projectId: "wanderwise-lxdkp",
  appId: "1:951287364654:web:d60dbe555b906f615ab3bf",
  storageBucket: "wanderwise-lxdkp.firebasestorage.app",
  apiKey: "AIzaSyDkI00XHyRL8EAikq7h1OrBRHsb4WTtwf4",
  authDomain: "wanderwise-lxdkp.firebaseapp.com",
  measurementId: "",
  messagingSenderId: "951287364654"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
const auth = getAuth(app);

export { app, auth };
