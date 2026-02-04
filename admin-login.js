// 🔥 Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 YOUR FIREBASE CONFIG (ALREADY FIXED)
const firebaseConfig = {
  apiKey: "AIzaSyBtDxu0LJyb10ZkhH8IpxT5s8PcKc4nUxM",
  authDomain: "afnsclub.firebaseapp.com",
  projectId: "afnsclub",
  storageBucket: "afnsclub.firebasestorage.app",
  messagingSenderId: "1088089213558",
  appId: "1:1088089213558:web:bd5e01caaeecaa46bcad57"
};

// 🔥 Init Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔐 ADMIN LOGIN FUNCTION
window.loginAdmin = async function () {

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  error.style.color = "red";
  error.innerText = "";

  if (!email || !password) {
    error.innerText = "Email and password required";
    return;
  }

  try {
    // ✅ Step 1: Firebase Auth Login
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const user = userCred.user;

    // ✅ Step 2: Check admin permission (EMAIL = document ID)
    const adminRef = doc(db, "admins", user.email);
    const adminSnap = await getDoc(adminRef);

    if (!adminSnap.exists()) {
      error.innerText = "You are not an authorized admin";
      return;
    }

    if (adminSnap.data().active !== true) {
      error.innerText = "Admin account disabled";
      return;
    }

    // ✅ SUCCESS → DASHBOARD
    window.location.href = "admin-dashboard.html";

  } catch (err) {
    error.innerText = err.message;
  }
};
