import { createServerFn } from "@tanstack/react-start";

/**
 * Firebase web config.
 */
export const getFirebaseConfig = createServerFn({ method: "GET" }).handler(async () => {
  return {
    apiKey: process.env["GOOGLE_API_KEY"] || "AIzaSyCFVITRyrMCHlan42ElD5kiZNK858S3Vu4",
    authDomain: "nehaporto.firebaseapp.com",
    projectId: "nehaporto",
    storageBucket: "nehaporto.firebasestorage.app",
    messagingSenderId: "356039771111",
    appId: "1:356039771111:web:7b307c9705f860f6ccb342",
    measurementId: "G-SSB2Z5VP5X",
  };
});
