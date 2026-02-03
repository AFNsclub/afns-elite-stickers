import { auth, db } from "./firebase-init.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.register = async function () {
  const name = name.value.trim();
  const mobile = mobile.value.trim();
  const device = device.value.trim();
  const ownerId = ownerId.value.trim();
  const fb = fb.value.trim();
  const email = email.value.trim();
  const password = password.value;

  if (!/^01[3-9]\d{8}$/.test(mobile)) {
    alert("Invalid BD mobile number");
    return;
  }

  try {
    const userCred = await createUserWithEmailAndPassword(auth, email, password);
    const uid = userCred.user.uid;

    await setDoc(doc(db, "players", uid), {
      name,
      mobile,
      device,
      ownerId,
      fb,
      email,
      win: 0,
      lose: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      role: "player",
      createdAt: Date.now()
    });

    alert("Registration Successful!");
    window.location.href = "login.html";

  } catch (e) {
    alert(e.message);
  }
};
