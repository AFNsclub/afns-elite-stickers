import { auth, db } from "./firebase-init.js";
import { signInWithEmailAndPassword, sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, getDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.login = async function () {
  try {
    const emailVal = email.value.trim();
    const passVal = password.value;

    const userCred = await signInWithEmailAndPassword(auth, emailVal, passVal);
    const uid = userCred.user.uid;

    const snap = await getDoc(doc(db, "players", uid));
    const role = snap.exists() ? snap.data().role : "player";

    if (role === "admin") {
      window.location.href = "admin.html";
    } else {
      window.location.href = "player-panel.html";
    }

  } catch (e) {
    alert("Login Failed!");
  }
};

window.resetPassword = function () {
  const emailVal = email.value.trim();
  if (!emailVal) {
    alert("Enter your Gmail first");
    return;
  }

  sendPasswordResetEmail(auth, emailVal)
    .then(() => alert("Password reset email sent"))
    .catch(err => alert(err.message));
};
