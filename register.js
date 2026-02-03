import { auth, db } from "./firebase-init.js";
import { createUserWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";
import { doc, setDoc, serverTimestamp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

window.register = async () => {
  const name = name.value;
  const mobile = mobile.value;
  const email = email.value;
  const password = password.value;
  const device = device.value;
  const gameid = gameid.value;
  const facebook = facebook.value;

  if (!/^01\d{9}$/.test(mobile)) {
    alert("Invalid BD Mobile Number");
    return;
  }

  const user = await createUserWithEmailAndPassword(auth, email, password);

  await setDoc(doc(db, "players", user.user.uid), {
    name,
    mobile,
    email,
    device,
    gameid,
    facebook,
    win: 0,
    lose: 0,
    goalsFor: 0,
    goalsAgainst: 0,
    createdAt: serverTimestamp()
  });

  alert("Registration Successful");
};
