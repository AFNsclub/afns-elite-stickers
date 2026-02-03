import { auth } from "./firebase-init.js";
import { signInWithEmailAndPassword } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.login = async () => {
  await signInWithEmailAndPassword(auth, email.value, password.value);
  alert("Login Successful");
};
