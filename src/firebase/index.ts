import {
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  reauthenticateWithCredential,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
} from 'firebase/auth';
import {
  collection,
  query,
  orderBy,
  getDoc,
  getDocs,
  doc,
  updateDoc,
  setDoc,
} from 'firebase/firestore';

import { app, auth, db } from './firebase';
import firebaseErrors from './errorMessages';

export {
  // instances
  app,
  auth,
  db,
  // Auth
  onAuthStateChanged,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  reauthenticateWithCredential,
  signOut,
  sendPasswordResetEmail,
  updateProfile,
  User,
  // Firestore
  collection,
  getDoc,
  getDocs,
  query,
  orderBy,
  doc,
  setDoc,
  updateDoc,
  // errors
  firebaseErrors,
};
