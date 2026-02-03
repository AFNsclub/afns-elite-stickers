const uid = new URLSearchParams(window.location.search).get("uid") || "demo";

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

const key = "player_"+uid;
const data = JSON.parse(localStorage.getItem(key)) || {
  name:"Player",
  phone:"",
  email:"",
  gameId:"",
  device:"",
  fb:"",
  wins:0,
  losses:0,
  goals:0,
  gd:0
};

// LOAD
motivationText.textContent = getTodayMotivation(uid);
playerName.textContent = data.name;
avatar.textContent = data.name[0] || "?";

phoneText.textContent = data.phone || "—";
emailText.textContent = data.email || "—";
gameIdText.textContent = data.gameId || "—";
deviceText.textContent = data.device || "—";
fbLink.href = data.fb || "#";

wins.textContent = data.wins;
losses.textContent = data.losses;
goals.textContent = data.goals;
gd.textContent = data.gd;

// INPUTS
phoneInput.value = data.phone;
emailInput.value = data.email;
gameIdInput.value = data.gameId;
deviceInput.value = data.device;
fbInput.value = data.fb;

// SAVE
function saveProfile(){
  data.phone = phoneInput.value;
  data.email = emailInput.value;
  data.gameId = gameIdInput.value;
  data.device = deviceInput.value;
  data.fb = fbInput.value;

  localStorage.setItem(key, JSON.stringify(data));
  alert("Profile Saved ✅");
  location.reload();
}
