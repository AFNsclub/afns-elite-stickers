import { auth } from "./firebase-init.js";
import { sendPasswordResetEmail } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

window.reset = async () => {
  await sendPasswordResetEmail(auth, email.value);
  alert("Password Reset Email Sent");
};
