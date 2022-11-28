import { FirebaseApp, initializeApp, getApps, getApp } from 'firebase/app';
import { Auth, initializeAuth, getAuth } from 'firebase/auth';
import { getReactNativePersistence } from 'firebase/auth/react-native';
import { Firestore, getFirestore } from 'firebase/firestore';
import AsyncStorage from '@react-native-async-storage/async-storage';

import firebaseConfig from './firebaseConfig';

let app: FirebaseApp, auth: Auth, db: Firestore;

if (getApps().length === 0) {
  app = initializeApp(firebaseConfig);
  auth = initializeAuth(app, {
    persistence: getReactNativePersistence(AsyncStorage),
  });
} else {
  app = getApp();
  auth = getAuth(app);
}

db = getFirestore(app);

export { app, auth, db };
