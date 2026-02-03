const auth = firebase.auth();
const db = firebase.firestore();

let currentUserId = null;

auth.onAuthStateChanged(user => {
  if (!user) {
    window.location.href = "login.html";
    return;
  }

  currentUserId = user.uid;
  loadProfile();
});

function loadProfile(){
  db.collection("players").doc(currentUserId).get()
  .then(doc => {
    if(!doc.exists) return;

    const p = doc.data();

    document.getElementById("playerName").innerText = p.playerName;
    document.getElementById("avatar").innerText = p.playerName.charAt(0).toUpperCase();

    document.getElementById("infoBox").innerHTML = `
      <div>📱 Mobile: ${p.mobile}</div>
      <div>📧 Gmail: ${p.email}</div>
      <div>🎮 Device: ${p.device}</div>
      <div>🆔 Owner/Game ID: ${p.ownerId}</div>
      <div>🔵 Facebook: <a href="${p.facebook}" target="_blank">Open</a></div>
    `;

    document.getElementById("win").innerText = p.wins;
    document.getElementById("loss").innerText = p.losses;
    document.getElementById("gf").innerText = p.goalsFor;
    document.getElementById("ga").innerText = p.goalsAgainst;
    document.getElementById("gd").innerText = p.goalDifference;

    document.getElementById("device").value = p.device;
    document.getElementById("mobile").value = p.mobile;
    document.getElementById("ownerId").value = p.ownerId;
    document.getElementById("facebook").value = p.facebook;
  });
}

function toggleEdit(){
  const box = document.getElementById("editBox");
  box.style.display = box.style.display === "block" ? "none" : "block";
}

function saveProfile(){
  const mobile = document.getElementById("mobile").value;

  if(!mobile.startsWith("01") || mobile.length !== 11){
    alert("Invalid Bangladeshi mobile number");
    return;
  }

  db.collection("players").doc(currentUserId).update({
    device: document.getElementById("device").value,
    mobile,
    ownerId: document.getElementById("ownerId").value,
    facebook: document.getElementById("facebook").value
  })
  .then(()=>{
    alert("Profile Updated");
    toggleEdit();
    loadProfile();
  });
}
