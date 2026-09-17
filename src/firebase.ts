import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

// Config comes from Vite env vars (VITE_*) so the actual values never sit
// as plain text in source control: locally they're read from a .env file
// (gitignored, see .env.example for the keys you need); in the deployed
// build they're injected as GitHub Actions repo secrets at build time
// (see .github/workflows/deploy.yml).
const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_FIREBASE_DATABASE_URL,
  projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_FIREBASE_APP_ID
};

export const app = initializeApp(firebaseConfig);
export const db = getDatabase(app);
