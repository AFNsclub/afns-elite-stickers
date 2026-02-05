let uid = null;

// 🔐 Firebase Auth UID
firebase.auth().onAuthStateChanged(async (user)=>{
  if(user){
    uid = user.uid;
    initPlayer();
  }
});

/* ================= INIT PLAYER ================= */
async function initPlayer(){

/* ---------- MOTIVATION ---------- */
const MOTIVATIONS = [
  "Train hard, win easy.",
  "No excuses, only results.",
  "Play with heart.",
  "Every match matters.",
  "Discipline beats talent.",
  "Stay calm. Finish strong.",
  "One goal can change everything.",
  "Winners never quit.",
  "Respect the game.",
  "Focus. Fight. Finish."
];

function getTodayMotivation(uid){
  const today = new Date().toISOString().slice(0,10);
  let hash = 0;
  const key = uid + today;
  for(let i=0;i<key.length;i++){
    hash = key.charCodeAt(i) + ((hash<<5)-hash);
  }
  return MOTIVATIONS[Math.abs(hash)%MOTIVATIONS.length];
}

/* ---------- FIRESTORE LOAD ---------- */
const ref = firebase.firestore().collection("players").doc(uid);
let snap = await ref.get();

// ❗ যদি Auth আছে কিন্তু DB নাই → AUTO CREATE
if(!snap.exists){
  await ref.set({
    name: "Player",
    phone: "",
    email: firebase.auth().currentUser.email || "",
    gameId: "",
    device: "",
    facebook: "",
    win: 0,
    lose: 0,
    goals: 0,
    gd: 0,
    createdAt: firebase.firestore.FieldValue.serverTimestamp()
  });
  snap = await ref.get();
}

const data = snap.data();

/* ---------- UI BIND ---------- */
motivationText.textContent = getTodayMotivation(uid);
playerName.textContent = data.name || "Player";
avatar.textContent = (data.name||"P")[0].toUpperCase();

phoneText.textContent = data.phone || "—";
emailText.textContent = data.email || "—";
gameIdText.textContent = data.gameId || "—";
deviceText.textContent = data.device || "—";
fbLink.href = data.facebook || "#";

wins.textContent = data.win || 0;
losses.textContent = data.lose || 0;
goals.textContent = data.goals || 0;
gd.textContent = data.gd || 0;

/* ---------- FORM FILL ---------- */
nameInput.value = data.name || "";
phoneInput.value = data.phone || "";
emailInput.value = data.email || "";
gameIdInput.value = data.gameId || "";
deviceInput.value = data.device || "";
fbInput.value = data.facebook || "";

/* ---------- SAVE PROFILE ---------- */
window.saveProfile = async function(){
  await ref.update({
    name: nameInput.value || "Player",
    phone: phoneInput.value,
    email: emailInput.value,
    gameId: gameIdInput.value,
    device: deviceInput.value,
    facebook: fbInput.value
  });
  alert("Profile Updated ✅");
  location.reload();
};

/* ---------- RANK (GLOBAL) ---------- */
const qs = await firebase.firestore().collection("players").get();
let players = [];
qs.forEach(d => players.push(d.data()));

players.sort((a,b)=>{
  if((b.win||0) !== (a.win||0)) return (b.win||0)-(a.win||0);
  if((b.gd||0) !== (a.gd||0)) return (b.gd||0)-(a.gd||0);
  return (b.goals||0)-(a.goals||0);
});

const index = players.findIndex(p => p.email === data.email);
const rank = index + 1;

let trophy="";
if(rank===1) trophy=" 🥇";
else if(rank===2) trophy=" 🥈";
else if(rank===3) trophy=" 🥉";

rankText.textContent = "#"+rank+trophy;

}
