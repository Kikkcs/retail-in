import { initializeApp } from 'firebase/app';
import { initializeFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "XXXX",
  authDomain: "XXXX.firebaseapp.com",
  projectId: "XXXX",
  storageBucket: "XXXX.appspot.com",
  messagingSenderId: "XXXX",
  appId: "XXXX",
};

// Initialize app FIRST
const app = initializeApp(firebaseConfig);

// Use Firestore with web-safe settings
export const db = initializeFirestore(app, {
  experimentalForceLongPolling: true,
});

