<script type="module">
  // 🔥 Firebase SDK
  import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
  import { getAuth, signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
  import { getFirestore, doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

  // 🔥 YOUR FIREBASE CONFIG (নিজেরটা এখানে বসানো)
  const firebaseConfig = {
    apiKey: "YOUR_API_KEY",
    authDomain: "YOUR_PROJECT.firebaseapp.com",
    projectId: "YOUR_PROJECT_ID",
    storageBucket: "YOUR_PROJECT.appspot.com",
    messagingSenderId: "XXXX",
    appId: "XXXX"
  };

  // Init
  const app = initializeApp(firebaseConfig);
  const auth = getAuth(app);
  const db = getFirestore(app);

  // Elements
  const loginBtn = document.getElementById("loginBtn");
  const emailInput = document.getElementById("email");
  const passInput = document.getElementById("password");
  const errorBox = document.getElementById("error");

  loginBtn.addEventListener("click", async () => {
    errorBox.innerText = "";

    const email = emailInput.value.trim();
    const password = passInput.value;

    if (!email || !password) {
      errorBox.innerText = "Email and password required";
      return;
    }

    try {
      // 🔐 Firebase Auth Login
      const cred = await signInWithEmailAndPassword(auth, email, password);
      const user = cred.user;

      // 🔎 Firestore Admin Check
      const adminRef = doc(db, "admins", user.email);
      const adminSnap = await getDoc(adminRef);

      if (!adminSnap.exists()) {
        errorBox.innerText = "You are not an authorized admin";
        return;
      }

      const adminData = adminSnap.data();

      if (adminData.active !== true) {
        errorBox.innerText = "Admin account disabled";
        return;
      }

      // ✅ SUCCESS
      window.location.href = "admin-dashboard.html";

    } catch (err) {
      errorBox.innerText = err.message;
    }
  });
</script>
