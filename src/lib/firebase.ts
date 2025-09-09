
import { initializeApp, getApps, getApp, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

function getFirebaseApp() {
  if (typeof window !== "undefined") {
    // On the client, use getApps to avoid re-initializing
    return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
  }
  // On the server, we can probably just initialize it.
  // But to be safe, we can check for existing apps.
  return getApps().length > 0 ? getApp() : initializeApp(firebaseConfig);
}

const app: FirebaseApp = getFirebaseApp();
const auth: Auth = getAuth(app);


export { app, auth };
