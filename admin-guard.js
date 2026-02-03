import {
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

onAuthStateChanged(auth, async user=>{
  if(!user){
    location.href="admin-login.html";
    return;
  }

  const snap = await getDoc(doc(db,"users",user.uid));

  if(!snap.exists() || snap.data().role!=="admin"){
    location.href="admin-login.html";
  }
});
