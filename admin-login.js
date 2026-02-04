// 🔥 Firebase imports
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

// 🔥 Firebase config (নিজেরটা বসাবে)
const firebaseConfig = {
  apiKey: "YOUR_API_KEY",
  authDomain: "YOUR_PROJECT.firebaseapp.com",
  projectId: "YOUR_PROJECT_ID",
};

// Init
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);

// 🔐 Login function
window.loginAdmin = async function () {

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  error.innerText = "";

  try {
    // Step 1: Firebase Auth login
    const userCred = await signInWithEmailAndPassword(auth, email, password);
    const user = userCred.user;

    // Step 2: Check admins collection (EMAIL = document ID)
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

    // Step 3: Success
    window.location.href = "admin-dashboard.html";

  } catch (err) {
    error.innerText = err.message;
  }
};
