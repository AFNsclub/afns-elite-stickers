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

/* 🔥 YOUR FIREBASE CONFIG (YOU ALREADY GAVE THIS) */
const firebaseConfig = {
  apiKey: "AIzaSyBtDxu0LJyb10ZkhH8IpxT5s8PcKc4nUxM",
  authDomain: "afnsclub.firebaseapp.com",
  projectId: "afnsclub",
  storageBucket: "afnsclub.firebasestorage.app",
  messagingSenderId: "1088089213558",
  appId: "1:1088089213558:web:bd5e01caaeecaa46bcad57"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

/* 🔐 LOGIN FUNCTION */
window.loginAdmin = async () => {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  error.textContent = "";

  if (!email || !password) {
    error.textContent = "Email & Password required";
    return;
  }

  try {
    const res = await signInWithEmailAndPassword(auth, email, password);
    const user = res.user;

    // 🔥 CHECK ADMIN COLLECTION
    const adminRef = doc(db, "admins", user.email);
    const snap = await getDoc(adminRef);

    if (!snap.exists() || snap.data().active !== true) {
      error.textContent = "Not authorized admin";
      return;
    }

    // ✅ SUCCESS
    window.location.href = "admin-dashboard.html";

  } catch (e) {
    error.textContent = e.message;
  }
};
