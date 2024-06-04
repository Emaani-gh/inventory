import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase, query, ref as rtRef } from "firebase/database";
import { getFirestore } from "firebase/firestore";
import {
  getStorage,
  ref as firebaseStorageRef,
  uploadBytes,
  getDownloadURL,
} from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FirebaseApiKey,
  authDomain: process.env.NEXT_PUBLIC_FirebaseAuthDomain,
  databaseURL: process.env.NEXT_PUBLIC_FirebaseDatabaseURL,
  projectId: process.env.NEXT_PUBLIC_FirebaseProjectId,
  storageBucket: process.env.NEXT_PUBLIC_FirebaseStorageBucket,
  messagingSenderId: process.env.NEXT_PUBLIC_FirebaseMessagingSenderId,
  appId: process.env.NEXT_PUBLIC_FirebaseAppId,
  measurementId: process.env.NEXT_PUBLIC_MeasurementId,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();
const firestoreDb = getFirestore(app);
const realtimeDb = getDatabase(app);
const queryRolesFromRT = query(rtRef(realtimeDb, `/roles/`));
const queryTaxFromRT = query(rtRef(realtimeDb, `/tax/`));
const queryDepartmentFromRT = query(rtRef(realtimeDb, `/departments/`));
const queryCategoryFromRT = query(rtRef(realtimeDb, `/printProducts/`));
const firebaseStorage = getStorage(app);

export {
  app,
  auth,
  rtRef,
  realtimeDb,
  firestoreDb,
  queryRolesFromRT,
  queryDepartmentFromRT,
  queryCategoryFromRT,
  firebaseStorage,
  firebaseStorageRef,
  queryTaxFromRT,
  uploadBytes,
  getDownloadURL,
};
