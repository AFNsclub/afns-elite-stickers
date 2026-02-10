<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-app.js";
import { getAuth, onAuthStateChanged, signOut } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/9.23.0/firebase-firestore.js";

/* 🔥 FIREBASE CONFIG */
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
const db   = getFirestore(app);

/* 🔐 ADMIN AUTH GUARD (FINAL) */
onAuthStateChanged(auth, async (user) => {
  if (!user) {
    window.location.href = "admin-login.html";
    return;
  }

  try {
    // 🔑 EMAIL = DOC ID
    const snap = await getDoc(doc(db, "admins", user.email));
    if (!snap.exists()) throw "no-admin";

    const admin = snap.data();

    if (admin.active !== true) throw "inactive";
    if (admin.uid && admin.uid !== user.uid) throw "uid-mismatch";

    // ✅ AUTH OK — DO NOTHING (NO REDIRECT)
    console.log("Admin verified:", admin.role);

  } catch (e) {
    console.error(e);
    await signOut(auth);
    alert("Access denied");
    window.location.href = "admin-login.html";
  }
});

/* 🚪 LOGOUT */
window.adminLogout = function () {
  signOut(auth).then(() => {
    window.location.href = "admin-login.html";
  });
};
</script>
