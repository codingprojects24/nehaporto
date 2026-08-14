import { useEffect, useState } from "react";
import type { User } from "firebase/auth";

import { syncUserToFirestore } from "@/lib/content";
import { getFirebaseAuth } from "@/lib/firebase";

export function useAuth() {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let unsub: (() => void) | undefined;
    let cancelled = false;
    (async () => {
      const { onAuthStateChanged } = await import("firebase/auth");
      const auth = await getFirebaseAuth();
      if (cancelled) return;
      unsub = onAuthStateChanged(auth, (next) => {
        setUser(next);
        setLoading(false);
        if (next) {
          void syncUserToFirestore({ uid: next.uid, email: next.email });
        }
      });
    })().catch(() => setLoading(false));
    return () => {
      cancelled = true;
      unsub?.();
    };
  }, []);

  return { user, loading };
}

export async function signIn(email: string, password: string) {
  const { signInWithEmailAndPassword } = await import("firebase/auth");
  const auth = await getFirebaseAuth();
  const credential = await signInWithEmailAndPassword(auth, email, password);
  if (credential.user) {
    await syncUserToFirestore({
      uid: credential.user.uid,
      email: credential.user.email,
    });
  }
  return credential.user;
}

export async function signOutAdmin() {
  const { signOut } = await import("firebase/auth");
  const auth = await getFirebaseAuth();
  await signOut(auth);
}
