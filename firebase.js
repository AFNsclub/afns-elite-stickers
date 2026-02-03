<script type="module">
/* Firebase core */
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

/* Firebase Auth */
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* Firestore */
import {
  getFirestore,
  doc,
  setDoc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* ===== YOUR FIREBASE CONFIG ===== */
const firebaseConfig = {
  apiKey: "AIzaSyBtDxu0LJyb10ZkhH8IpxT5s8PcKc4nUxM",
  authDomain: "afnsclub.firebaseapp.com",
  projectId: "afnsclub",
  storageBucket: "afnsclub.firebasestorage.app",
  messagingSenderId: "1088089213558",
  appId: "1:1088089213558:web:bd5e01caaeecaa46bcad57"
};

/* Initialize */
const app = initializeApp(firebaseConfig);

/* Export for all pages */
export const auth = getAuth(app);
export const db = getFirestore(app);

/* Export auth helpers */
export {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
  onAuthStateChanged,
  signOut,
  doc,
  setDoc,
  getDoc
};
</script>
