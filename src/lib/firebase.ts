import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";

import { getFirebaseConfig } from "./firebase-config.functions";

let appPromise: Promise<FirebaseApp> | null = null;

export function getFirebaseApp() {
  if (!appPromise) {
    appPromise = (async () => {
      const existing = getApps();
      if (existing.length) return existing[0]!;
      const config = await getFirebaseConfig();
      return initializeApp(config);
    })();
  }
  return appPromise;
}

export async function getDb(): Promise<Firestore> {
  return getFirestore(await getFirebaseApp());
}

export async function getFirebaseAuth(): Promise<Auth> {
  return getAuth(await getFirebaseApp());
}
