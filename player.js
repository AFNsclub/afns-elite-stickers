let uid = null;

// Firebase auth থেকে UID নেবে
const waitForUID = setInterval(()=>{
  if(window.__UID__){
    uid = window.__UID__;
    clearInterval(waitForUID);
    initPlayer();
  }
},50);

function initPlayer(){

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

motivationText.textContent = getTodayMotivation(uid);
playerName.textContent = data.name;
avatar.textContent = data.name.charAt(0).toUpperCase();

phoneText.textContent = data.phone || "—";
emailText.textContent = data.email || "—";
gameIdText.textContent = data.gameId || "—";
deviceText.textContent = data.device || "—";
fbLink.href = data.fb || "#";

wins.textContent = data.wins;
losses.textContent = data.losses;
goals.textContent = data.goals;
gd.textContent = data.gd;

nameInput.value = data.name;
phoneInput.value = data.phone;
emailInput.value = data.email;
gameIdInput.value = data.gameId;
deviceInput.value = data.device;
fbInput.value = data.fb;

window.saveProfile = function(){
  data.name = nameInput.value || "Player";
  data.phone = phoneInput.value;
  data.email = emailInput.value;
  data.gameId = gameIdInput.value;
  data.device = deviceInput.value;
  data.fb = fbInput.value;

  localStorage.setItem(key, JSON.stringify(data));
  alert("Profile Saved ✅");
  location.reload();
};

/* ---------- RANK ---------- */
function calculateRank(){
  let players = [];
  for(let i=0;i<localStorage.length;i++){
    const k = localStorage.key(i);
    if(k.startsWith("player_")){
      players.push(JSON.parse(localStorage.getItem(k)));
    }
  }

  players.sort((a,b)=>{
    if(b.wins !== a.wins) return b.wins - a.wins;
    if(b.gd !== a.gd) return b.gd - a.gd;
    return b.goals - a.goals;
  });

  const index = players.findIndex(p => p.name === data.name);
  const rank = index + 1;

  let trophy = "";
  if(rank === 1) trophy=" 🥇";
  else if(rank === 2) trophy=" 🥈";
  else if(rank === 3) trophy=" 🥉";

  rankText.textContent = "#" + rank + trophy;
}

calculateRank();
}
