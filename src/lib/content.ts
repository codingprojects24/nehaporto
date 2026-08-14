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
    if (!snap.exists()) return seedProfile;
    return { ...seedProfile, ...(snap.data() as Partial<Profile>) };
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
  await addDoc(collection(db, name), data);
}

export async function saveMessage(data: Record<string, unknown>) {
  const db = await getDb();
  await addDoc(collection(db, "messages"), { ...data, createdAt: new Date().toISOString() });
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

/** Seeds Firestore with the bundled starter content for collections that are empty. */
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

export type { Certification, Education, Experience, GalleryItem, Profile, Project, SkillGroup };
