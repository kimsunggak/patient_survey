import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AizaSyDfLPqbboIEX9GTFBv4Eqmzk8FedV3Xgs",
  authDomain: "patient-survey-7591f.firebaseapp.com",
  projectId: "patient-survey-7591f",
  storageBucket: "patient-survey-7591f.appspot.com",
  messagingSenderId: "258029501503",
  appId: "1:258029501503:web:5dc80e6337fe177804c8a"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
