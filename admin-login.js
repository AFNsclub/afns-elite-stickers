import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getAuth,
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import {
  getFirestore,
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* 🔥 FIREBASE CONFIG */
const firebaseConfig = {
  apiKey: "AIzaSyBtDxu0LJyb10ZkhH8IpxT5s8PcKc4nUxM",
  authDomain: "afnsclub.firebaseapp.com",
  projectId: "afnsclub"
};

const app  = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db   = getFirestore(app);

/* 🔐 ADMIN LOGIN */
window.loginAdmin = async () => {
  const email    = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const error    = document.getElementById("error");

  error.textContent = "";

  if (!email || !password) {
    error.textContent = "Email & Password required";
    return;
  }

  try {
    // 🔑 AUTH LOGIN
    const res  = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // ✅ CHECK ADMIN BY UID (FIXED)
    const adminRef  = doc(db, "admins", user.uid);
    const adminSnap = await getDoc(adminRef);

    if (!adminSnap.exists() || adminSnap.data().active !== true) {
      error.textContent = "❌ You are not an active admin";
      return;
    }

    // ✅ SUCCESS
    window.location.href = "admin.html";

  } catch (e) {
    error.textContent = e.message;
  }
};
