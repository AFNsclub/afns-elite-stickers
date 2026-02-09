<script type="module">
import {
  getAuth,
  setPersistence,
  browserLocalPersistence,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";

/* 🔥 FIREBASE INIT (ONLY ONCE) */
const firebaseConfig = {
  apiKey: "AIzaSyBtXDuXLJyb10ZkHH8lpxT5",
  authDomain: "afnsclub.firebaseapp.com",
  projectId: "afnsclub"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

/* 🔐 SESSION FIX (MOST IMPORTANT) */
setPersistence(auth, browserLocalPersistence);

/* ✅ MAIN OWNER / ADMINS */
const ADMIN_EMAILS = [
  "sisaif167@gmail.com"
];

/* ===============================
   🔐 ADMIN GUARD (FINAL LOGIC)
================================ */
onAuthStateChanged(auth, user => {
  const path = location.pathname.toLowerCase();

  const isAdminPage =
    path.includes("admin") ||
    path.includes("add-match") ||
    path.includes("role") ||
    path.includes("rules");

  const isAdminLogin = path.includes("admin-login");

  /* 🔴 Not logged in + admin page */
  if (!user && isAdminPage) {
    location.replace("admin-login.html");
    return;
  }

  /* 🔴 Logged in but NOT admin */
  if (user && isAdminPage && !ADMIN_EMAILS.includes(user.email)) {
    signOut(auth).then(() => {
      location.replace("admin-login.html");
    });
    return;
  }

  /* 🟢 Admin already logged → skip login page */
  if (user && isAdminLogin && ADMIN_EMAILS.includes(user.email)) {
    location.replace("admin.html");
  }
});

/* ===============================
   🔐 ADMIN LOGIN
================================ */
window.adminLogin = function () {
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errorBox = document.getElementById("error");

  errorBox.innerText = "";

  if (!email || !password) {
    errorBox.innerText = "Email & password required";
    return;
  }

  signInWithEmailAndPassword(auth, email, password)
    .then(res => {
      if (!ADMIN_EMAILS.includes(res.user.email)) {
        signOut(auth);
        errorBox.innerText = "❌ Not authorized admin";
        return;
      }
      location.replace("admin.html");
    })
    .catch(() => {
      errorBox.innerText = "❌ Login failed";
    });
};

/* ===============================
   🔁 FORGOT PASSWORD
================================ */
window.forgotPassword = function () {
  const email = document.getElementById("email").value.trim();
  const errorBox = document.getElementById("error");

  if (!email) {
    errorBox.innerText = "Enter admin email first";
    return;
  }

  sendPasswordResetEmail(auth, email)
    .then(() => {
      errorBox.style.color = "#22c55e";
      errorBox.innerText = "✅ Reset link sent";
    })
    .catch(() => {
      errorBox.innerText = "❌ Failed to send reset";
    });
};

/* ===============================
   🚪 LOGOUT
================================ */
window.logoutAdmin = function () {
  signOut(auth).then(() => {
    location.replace("admin-login.html");
  });
};
</script>
