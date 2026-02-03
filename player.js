import { auth, db } from "./firebase-init.js";
import {
  doc,
  getDoc,
  updateDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

const saveBtn = document.getElementById("saveBtn");

auth.onAuthStateChanged(async user => {
  if (!user) {
    location.href = "login.html";
    return;
  }

  const ref = doc(db, "players", user.uid);
  const snap = await getDoc(ref);
  if (!snap.exists()) return;

  const p = snap.data();

  avatar.textContent = p.playerName?.charAt(0).toUpperCase() || "?";
  playerName.textContent = p.playerName || "Player";
  tagline.textContent = p.motivation || "🔥 Play hard. Win smart.";

  wins.textContent = p.wins || 0;
  losses.textContent = p.losses || 0;
  goals.textContent = p.goalsFor || 0;
  gd.textContent = p.goalDifference || 0;

  motivationInput.value = p.motivation || "";
  deviceInput.value = p.device || "";
  gameIdInput.value = p.gameId || "";
  fbInput.value = p.facebook || "";
});

saveBtn.addEventListener("click", async () => {
  const user = auth.currentUser;
  if (!user) return;

  saveBtn.textContent = "Saving...";
  saveBtn.disabled = true;

  try {
    await updateDoc(doc(db, "players", user.uid), {
      motivation: motivationInput.value.trim(),
      device: deviceInput.value.trim(),
      gameId: gameIdInput.value.trim(),
      facebook: fbInput.value.trim()
    });

    tagline.textContent =
      motivationInput.value.trim() || "🔥 Play hard. Win smart.";

    alert("Profile saved successfully ✅");
  } catch (e) {
    alert("Save failed ❌");
  }

  saveBtn.textContent = "Save Changes";
  saveBtn.disabled = false;
});
