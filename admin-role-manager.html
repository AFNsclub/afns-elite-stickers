<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<title>Admin Role Manager</title>
<meta name="viewport" content="width=device-width, initial-scale=1.0">

<style>
body{
  background:#020617;
  color:#e5e7eb;
  font-family:sans-serif;
  padding:20px;
}
h2{margin-bottom:14px}

.card{
  background:#0f172a;
  border-radius:10px;
  padding:14px;
  margin-bottom:12px;
  border:1px solid #334155;
}

.row{
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:10px;
}

select,button{
  padding:6px 10px;
  border-radius:6px;
  border:none;
}

button{
  background:#22c55e;
  font-weight:bold;
  cursor:pointer;
}

button.danger{
  background:#ef4444;
}

small{color:#94a3b8}
#error{color:#ff6b6b;margin-top:10px}
</style>
</head>

<body>

<h2>🛡 Admin Role Manager</h2>
<div id="list"></div>
<div id="error"></div>

<!-- 🔥 SCRIPT -->
<script type="module">
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import {
  getFirestore, collection, getDocs,
  doc, setDoc, updateDoc, deleteDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";
import {
  getAuth, onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* 🔥 FIREBASE */
const firebaseConfig={
  apiKey:"AIzaSyBtXDuXLJyb10ZkHH8lpxT5",
  authDomain:"afnsclub.firebaseapp.com",
  projectId:"afnsclub"
};

const app=initializeApp(firebaseConfig);
const db=getFirestore(app);
const auth=getAuth(app);

const list=document.getElementById("list");
const errorBox=document.getElementById("error");

/* 🔐 OWNER GUARD */
let myAdminRole=null;

onAuthStateChanged(auth, async user=>{
  if(!user){
    location.replace("admin-login.html");
    return;
  }

  const snap=await getDocs(collection(db,"admins"));
  snap.forEach(d=>{
    if(d.id===user.uid){
      myAdminRole=d.data().role;
    }
  });

  if(myAdminRole!=="owner"){
    errorBox.innerText="❌ Only OWNER can manage roles";
    return;
  }

  loadPlayers();
});

/* 📥 LOAD PLAYERS */
async function loadPlayers(){
  list.innerHTML="";
  const snap=await getDocs(collection(db,"players"));

  snap.forEach(p=>{
    renderPlayer(p.id,p.data());
  });
}

/* 🎨 UI */
function renderPlayer(uid,data){
  const div=document.createElement("div");
  div.className="card";

  div.innerHTML=`
    <div class="row">
      <div>
        <b>${data.username||"No Name"}</b><br>
        <small>${data.email||""}</small>
      </div>

      <select id="role-${uid}">
        <option value="">Player</option>
        <option value="admin">Admin</option>
        <option value="captain">Captain</option>
        <option value="manager">Manager</option>
        <option value="owner">Owner</option>
      </select>

      <button onclick="saveRole('${uid}','${data.username||""}')">
        Save
      </button>

      <button class="danger" onclick="removeAdmin('${uid}')">
        Remove
      </button>
    </div>
  `;

  list.appendChild(div);
}

/* ======================
   🔥 ROLE CHANGE JS
====================== */
window.saveRole = async function(uid,name){
  const role=document.getElementById(`role-${uid}`).value;

  if(!role){
    await deleteDoc(doc(db,"admins",uid));
    alert("❌ Admin role removed");
    return;
  }

  await setDoc(doc(db,"admins",uid),{
    role,
    active:true,
    name,
    permissions:{
      addMatch: role!=="captain",
      editMatch: role!=="captain",
      deleteMatch: role==="owner"||role==="manager",
      seasonReset: role==="owner"
    }
  });

  alert("✅ Role updated");
};

/* 🗑 REMOVE ADMIN */
window.removeAdmin = async function(uid){
  if(!confirm("Remove admin role?")) return;
  await deleteDoc(doc(db,"admins",uid));
  alert("❌ Admin removed");
};
</script>

</body>
</html>
