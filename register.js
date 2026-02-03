// register.js

import { auth, db } from "./firebase-init.js";

import {
  createUserWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  setDoc,
  serverTimestamp
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";


// Register function
window.register = async function () {

  // Input values
  const playerName = document.getElementById("playerName").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const gmail = document.getElementById("gmail").value.trim();
  const ownerGameId = document.getElementById("ownerId").value.trim();
  const facebookLink = document.getElementById("facebook").value.trim();

  // Basic empty check
  if (!playerName || !mobile || !gmail || !ownerGameId) {
    alert("সব তথ্য ঠিকভাবে পূরণ করো");
    return;
  }

  // 🇧🇩 Bangladeshi mobile validation
  const bdMobileRegex = /^01[3-9]\d{8}$/;
  if (!bdMobileRegex.test(mobile)) {
    alert("Invalid Bangladeshi mobile number! (01XXXXXXXXX)");
    return;
  }

  // Default password (player পরে change করতে পারবে)
  const defaultPassword = "123456";

  try {
    // Create auth account
    const cred = await createUserWithEmailAndPassword(
      auth,
      gmail,
      defaultPassword
    );

    const uid = cred.user.uid;

    // Save player data to Firestore
    await setDoc(doc(db, "players", uid), {
      playerName: playerName,
      mobile: mobile,
      gmail: gmail,

      ownerGameId: ownerGameId,
      facebookLink: facebookLink || "",

      win: 0,
      lose: 0,
      goalsFor: 0,
      goalsAgainst: 0,
      goalDifference: 0,

      createdAt: serverTimestamp()
    });

    alert("Player account successfully created!");
    window.location.href = "login.html";

  } catch (error) {
    alert(error.message);
  }
};
