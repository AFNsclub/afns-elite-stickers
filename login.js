import {
  auth,
  signInWithEmailAndPassword,
  db,
  doc,
  getDoc
} from "./firebase.js";

document.getElementById("loginBtn").onclick = async () => {

  const input = document.getElementById("loginInput").value;
  const password = document.getElementById("password").value;

  let email = input;

  // Username হলে Gmail বের করবে
  if (!input.includes("@")) {
    const userRef = doc(db, "usernames", input);
    const snap = await getDoc(userRef);

    if (!snap.exists()) {
      alert("Username not found");
      return;
    }
    email = snap.data().email;
  }

  try {
    await signInWithEmailAndPassword(auth, email, password);
    alert("Login successful");
    window.location.href = "player.html";
  } catch (e) {
    alert("Wrong password or email");
  }
};
