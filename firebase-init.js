import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBtXDuXLJyb10ZkHH8lpxT5",
  authDomain: "afnsclub.firebaseapp.com",
  projectId: "afnsclub",
  storageBucket: "afnsclub.appspot.com",
  messagingSenderId: "1088089213558",
  appId: "1:1088089213558:web:bd5e01caaeeca46bcad57"
};

export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
