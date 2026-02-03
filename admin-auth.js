import {
  signInWithEmailAndPassword
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

import {
  doc,
  getDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.loginAdmin = async ()=>{
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const error = document.getElementById("error");

  error.innerText="";

  try{
    const cred = await signInWithEmailAndPassword(auth,email,password);
    const uid = cred.user.uid;

    const snap = await getDoc(doc(db,"users",uid));

    if(!snap.exists() || snap.data().role!=="admin"){
      error.innerText="❌ You are not an admin";
      return;
    }

    location.href="admin-dashboard.html";

  }catch(e){
    error.innerText="❌ Invalid email or password";
  }
};
