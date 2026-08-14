import { createServerFn } from "@tanstack/react-start";

/**
 * Firebase web config. The API key is a publishable client identifier, but it is
 * stored as a project secret, so it is handed to the browser from the server.
 */
export const getFirebaseConfig = createServerFn({ method: "GET" }).handler(async () => {
  return {
    apiKey: process.env["GOOGLE_API_KEY"] ?? "",
    authDomain: "my-portofolio-7b696.firebaseapp.com",
    projectId: "my-portofolio-7b696",
    storageBucket: "my-portofolio-7b696.firebasestorage.app",
    messagingSenderId: "634879803218",
    appId: "1:634879803218:web:31999921abae1a7b5cc48b",
    measurementId: "G-HWPXELSHSS",
  };
});
