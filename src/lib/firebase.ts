import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

const FIREBASE_CONFIG = {
  apiKey: "AIzaSyCFVITRyrMCHlan42ElD5kiZNK858S3Vu4",
  authDomain: "nehaporto.firebaseapp.com",
  projectId: "nehaporto",
  storageBucket: "nehaporto.firebasestorage.app",
  messagingSenderId: "356039771111",
  appId: "1:356039771111:web:7b307c9705f860f6ccb342",
  measurementId: "G-SSB2Z5VP5X",
};

let app: FirebaseApp | null = null;

export function getFirebaseApp(): FirebaseApp {
  if (!app) {
    const existing = getApps();
    app = existing.length ? existing[0]! : initializeApp(FIREBASE_CONFIG);
  }
  return app;
}

export function getDb(): Firestore {
  return getFirestore(getFirebaseApp());
}

export function getFirebaseAuth(): Auth {
  return getAuth(getFirebaseApp());
}
