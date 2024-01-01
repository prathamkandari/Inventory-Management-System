// firebase-config.js

import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import { getFirestore } from "firebase/firestore";


const app = firebase.initializeApp({
  apiKey: process.env.API_KEY,
  authDomain: process.env.AUTH_DOMAIN,
  projectId: process.env.PROJECT_ID,
  storageBucket: process.env.STORAGE_BUCKET,
  messagingSenderId: process.env.MESSAGING_SENDER_ID,
  appId: process.env.APP_ID
});

export const auth = app.auth();
export const db = getFirestore(app); // Initialize Firestore using the app instance
export default app;
