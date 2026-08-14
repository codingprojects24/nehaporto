import {
  collection,
  deleteDoc,
  doc,
  getDoc,
  getDocs,
  setDoc,
  addDoc,
  updateDoc,
} from "firebase/firestore";

import { getDb } from "./firebase";
import {
  seedCertifications,
  seedEducation,
  seedExperience,
  seedGallery,
  seedProfile,
  seedProjects,
  seedSkills,
} from "./seed-data";
import type {
  Certification,
  Education,
  Experience,
  GalleryItem,
  Profile,
  Project,
  SkillGroup,
} from "./types";

export const collectionSeeds = {
  skills: seedSkills,
  projects: seedProjects,
  experience: seedExperience,
  certifications: seedCertifications,
  education: seedEducation,
  gallery: seedGallery,
} as const;

export type CollectionName = keyof typeof collectionSeeds;

export type Message = {
  id: string;
  name: string;
  email: string;
  subject?: string;
  message: string;
  createdAt?: string;
};

export type UserRecord = {
  uid: string;
  email: string | null;
  role: string;
  createdAt: string;
  lastLoginAt: string;
};

type Ordered = { id: string; order?: number };

function sortByOrder<T extends Ordered>(rows: T[]) {
  return [...rows].sort((a, b) => (a.order ?? 0) - (b.order ?? 0));
}

/** Reads a collection from Firestore, falling back to seed content when empty/unavailable. */
export async function fetchCollection<T extends Ordered>(name: CollectionName): Promise<T[]> {
  try {
    const db = await getDb();
    const snap = await getDocs(collection(db, name));
    if (snap.empty) return sortByOrder(collectionSeeds[name] as unknown as T[]);
    return sortByOrder(snap.docs.map((d) => ({ id: d.id, ...d.data() }) as T));
  } catch (error) {
    console.warn(`[content] falling back to seed data for "${name}"`, error);
    return sortByOrder(collectionSeeds[name] as unknown as T[]);
  }
}

export async function fetchProfile(): Promise<Profile> {
  try {
    const db = await getDb();
    const snap = await getDoc(doc(db, "profile", "main"));
    const data = snap.exists() ? (snap.data() as Partial<Profile>) : {};
    const merged: Profile = { ...seedProfile, ...data };

    // Ensure updated links take precedence over any stale database values
    if (!merged.github || merged.github.toLowerCase().includes("satyanarayana")) {
      merged.github = "https://github.com/vadigenehasatyasridevi-crypto";
    }
    if (!merged.linkedin || merged.linkedin.toLowerCase().includes("satyanarayana")) {
      merged.linkedin = "https://www.linkedin.com/in/neha-satya-sridevi-vadige-86524a330/";
    }
    if (!merged.name || merged.name.toLowerCase().includes("satyanarayana")) {
      merged.name = "Neha satya sridevi vadige";
    }
    merged.instagram = "";

    return merged;
  } catch (error) {
    console.warn("[content] falling back to seed profile", error);
    return seedProfile;
  }
}

export async function saveProfile(profile: Profile) {
  const db = await getDb();
  await setDoc(doc(db, "profile", "main"), profile, { merge: true });
}

export async function createItem(name: CollectionName, data: Record<string, unknown>) {
  const db = await getDb();
  const res = await addDoc(collection(db, name), data);
  return res.id;
}

export async function saveItem(name: CollectionName, id: string, data: Record<string, unknown>) {
  const db = await getDb();
  const ref = doc(db, name, id);
  const existing = await getDoc(ref);
  if (existing.exists()) await updateDoc(ref, data);
  else await setDoc(ref, data);
}

export async function deleteItem(name: CollectionName, id: string) {
  const db = await getDb();
  await deleteDoc(doc(db, name, id));
}

export async function saveMessage(data: Record<string, unknown>) {
  const db = await getDb();
  await addDoc(collection(db, "messages"), { ...data, createdAt: new Date().toISOString() });
}

export async function fetchMessages(): Promise<Message[]> {
  try {
    const db = await getDb();
    const snap = await getDocs(collection(db, "messages"));
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }) as Message);
    return list.sort((a, b) => (b.createdAt || "").localeCompare(a.createdAt || ""));
  } catch (error) {
    console.warn("[content] failed to fetch messages", error);
    return [];
  }
}

export async function deleteMessage(id: string) {
  const db = await getDb();
  await deleteDoc(doc(db, "messages", id));
}

/** Stores or updates user record in Firestore "users" collection with a unique User ID. */
export async function syncUserToFirestore(user: { uid: string; email: string | null }) {
  try {
    const db = await getDb();
    const userRef = doc(db, "users", user.uid);
    const snap = await getDoc(userRef);
    const now = new Date().toISOString();

    if (!snap.exists()) {
      await setDoc(userRef, {
        uid: user.uid,
        email: user.email,
        role: "admin",
        createdAt: now,
        lastLoginAt: now,
      });
    } else {
      await setDoc(
        userRef,
        {
          email: user.email,
          lastLoginAt: now,
        },
        { merge: true },
      );
    }
  } catch (error) {
    console.warn("[content] Failed to sync user record to Firestore", error);
  }
}

/** Seeds Firestore with starter content for collections that are empty. */
export async function seedFirestoreIfEmpty() {
  const db = await getDb();
  const profileRef = doc(db, "profile", "main");
  const profileSnap = await getDoc(profileRef);
  if (!profileSnap.exists()) await setDoc(profileRef, seedProfile);

  for (const name of Object.keys(collectionSeeds) as CollectionName[]) {
    const snap = await getDocs(collection(db, name));
    if (!snap.empty) continue;
    for (const row of collectionSeeds[name]) {
      const { id, ...rest } = row as Ordered & Record<string, unknown>;
      await setDoc(doc(db, name, id), rest);
    }
  }
}

/** Force syncs local seed data to Firestore to quickly initialize an empty database. */
export async function seedFirestoreForce() {
  const db = await getDb();
  const profileRef = doc(db, "profile", "main");
  await setDoc(profileRef, seedProfile, { merge: true });

  for (const name of Object.keys(collectionSeeds) as CollectionName[]) {
    for (const row of collectionSeeds[name]) {
      const { id, ...rest } = row as Ordered & Record<string, unknown>;
      await setDoc(doc(db, name, id), rest);
    }
  }
}

export type { Certification, Education, Experience, GalleryItem, Profile, Project, SkillGroup };
