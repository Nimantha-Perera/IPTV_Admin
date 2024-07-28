// lib/firebase.js

import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';

const firebaseConfig = {
    apiKey: "AIzaSyDAVaVhobHSIHmM8Hcwt9dJpIO7q_--nDc",
    authDomain: "iptv-36bc0.firebaseapp.com",
    projectId: "iptv-36bc0",
    storageBucket: "iptv-36bc0.appspot.com",
    messagingSenderId: "10714819844",
    appId: "1:10714819844:web:975bc3bc64355f2a92b451",
    measurementId: "G-3M4GG2V7T1"
  };
  

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const firestore = getFirestore(app);
const storage = getStorage(app);

export { auth,signInWithEmailAndPassword, firestore, storage };
