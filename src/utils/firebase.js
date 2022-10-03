import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

export const firebaseApp = initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: 'birthday-app-8901c.firebaseapp.com',
  projectId: 'birthday-app-8901c',
  storageBucket: 'birthday-app-8901c.appspot.com',
  messagingSenderId: '711762013579',
  appId: '1:711762013579:web:937dcac2985a12f1be938e',
  measurementId: 'G-1L4EXV4F9M',
});

export const db = getFirestore(firebaseApp);
