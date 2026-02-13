// 🔥 Firebase SDK Import
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAnalytics } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-analytics.js";
import { 
  getAuth, 
  onAuthStateChanged, 
  signOut 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { 
  getFirestore, 
  doc, 
  getDoc, 
  collection, 
  getDocs 
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// 🔐 Your Firebase Config
const firebaseConfig = {
  apiKey: "AIzaSyBtDxu0LJyb10ZkhH8IpxT5s8PcKc4nUxM",
  authDomain: "afnsclub.firebaseapp.com",
  projectId: "afnsclub",
  storageBucket: "afnsclub.firebasestorage.app",
  messagingSenderId: "1088089213558",
  appId: "1:1088089213558:web:bd5e01caaeecaa46bcad57",
  measurementId: "G-WT4XY15N6Y"
};

// 🚀 Initialize Firebase
const app = initializeApp(firebaseConfig);
getAnalytics(app);

const auth = getAuth(app);
const db = getFirestore(app);

// 🎯 Elements
const roleEl = document.getElementById("adminRole");
const mainContent = document.getElementById("mainContent");
const logoutBtn = document.getElementById("logoutBtn");

// 🔐 Auth Check
onAuthStateChanged(auth, async (user) => {

  if (!user) {
    window.location.href = "login.html";
    return;
  }

  const snap = await getDoc(doc(db, "admins", user.email));

  if (!snap.exists()) {
    alert("Not Authorized");
    await signOut(auth);
    window.location.href = "login.html";
    return;
  }

  const admin = snap.data();

  // 👑 Show Role
  roleEl.innerText = admin.role === "owner"
    ? "👑 OWNER"
    : admin.role?.toUpperCase();

  // 🔥 Permission Check (Owner skip)
  if (admin.role !== "owner") {

    document.querySelectorAll("[class*='perm-']").forEach(el => {

      const match = el.className.match(/perm-(\w+)/);

      if (match) {
        const permName = match[1];

        if (!admin.permission?.[permName]) {
          el.style.display = "none";
        }
      }
    });
  }

  // 📊 Load Stats
  const playersSnap = await getDocs(collection(db, "players"));
  const matchesSnap = await getDocs(collection(db, "matches"));
  const adminsSnap = await getDocs(collection(db, "admins"));

  document.getElementById("totalPlayers").innerText = playersSnap.size;
  document.getElementById("totalMatches").innerText = matchesSnap.size;
  document.getElementById("totalAdmins").innerText = adminsSnap.size;

  // 🔓 Show UI after verification
  mainContent.style.display = "block";
});


// 🚪 Logout
logoutBtn.addEventListener("click", async () => {
  await signOut(auth);
  window.location.href = "login.html";
});
