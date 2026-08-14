import { useEffect, useState } from "react";
import type { User } from "firebase/auth";

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
  await signInWithEmailAndPassword(auth, email, password);
}

export async function signOutAdmin() {
  const { signOut } = await import("firebase/auth");
  const auth = await getFirebaseAuth();
  await signOut(auth);
}
