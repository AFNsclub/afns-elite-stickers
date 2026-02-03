import { auth, db } from "./firebase-init.js";
import { doc, getDoc, updateDoc } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

const avatar = document.getElementById("avatar");
const playerName = document.getElementById("playerName");
const playerMobile = document.getElementById("playerMobile");
const playerEmail = document.getElementById("playerEmail");

const wins = document.getElementById("wins");
const losses = document.getElementById("losses");
const goalsFor = document.getElementById("goalsFor");
const goalDiff = document.getElementById("goalDiff");

const deviceInput = document.getElementById("device");
const gameIdInput = document.getElementById("gameId");
const facebookInput = document.getElementById("facebook");

let userId = null;

onAuthStateChanged(auth, async (user) => {
  if (!user) return;

  userId = user.uid;
  const ref = doc(db, "players", userId);
  const snap = await getDoc(ref);

  if (!snap.exists()) return;

  const p = snap.data();

  avatar.innerText = p.playerName?.charAt(0).toUpperCase() || "?";
  playerName.innerText = p.playerName || "Unknown";
  playerMobile.innerText = p.mobile || "";
  playerEmail.innerText = p.email || "";

  wins.innerText = p.wins || 0;
  losses.innerText = p.losses || 0;
  goalsFor.innerText = p.goalsFor || 0;
  goalDiff.innerText = p.goalDifference || 0;

  deviceInput.value = p.device || "";
  gameIdInput.value = p.gameId || "";
  facebookInput.value = p.facebook || "";
});

window.saveProfile = async function () {
  if (!userId) return;

  const ref = doc(db, "players", userId);

  await updateDoc(ref, {
    device: deviceInput.value,
    gameId: gameIdInput.value,
    facebook: facebookInput.value
  });

  alert("Profile updated successfully ✅");
};
