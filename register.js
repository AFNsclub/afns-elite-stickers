// 🔥 Firebase Config (নিজেরটা বসাবে)
const firebaseConfig = {
  apiKey:"AIzaSyBtDxu0LJyb10ZkhH8IpxT5s8PcKc4nUxM",
  authDomain:"afnsclub.firebaseapp.com",
  projectId:"afnsclub",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

const form = document.getElementById("registerForm");
const msg = document.getElementById("msg");
const btn = document.getElementById("createBtn");

form.addEventListener("submit", async (e) => {
  e.preventDefault();
  msg.innerText = "";
  btn.innerText = "Creating...";
  btn.disabled = true;

  const username = document.getElementById("username").value.trim();
  const email = document.getElementById("email").value.trim();
  const phone = document.getElementById("phone").value.trim();
  const facebook = document.getElementById("facebook").value.trim();
  const gameId = document.getElementById("gameId").value.trim();
  const device = document.getElementById("device").value.trim();
  const password = document.getElementById("password").value.trim();

  // 🇧🇩 Bangladesh number validation
  if (!/^01[3-9]\d{8}$/.test(phone)) {
    msg.innerText = "❌ Invalid Bangladesh number";
    btn.innerText = "Create Account";
    btn.disabled = false;
    return;
  }

  try {
    // 🔐 Create Auth User
    const userCred = await auth.createUserWithEmailAndPassword(email, password);
    const uid = userCred.user.uid;

    // 💾 Save Firestore Data
    await db.collection("players").doc(uid).set({
      username,
      email,
      phone,
      facebook,
      gameId,
      device,
      win: 0,
      lose: 0,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    });

    msg.style.color = "lime";
    msg.innerText = "✅ Account Created Successfully!";
    form.reset();

  } catch (err) {
    msg.style.color = "red";
    msg.innerText = err.message;

    // ❗ If Firestore fail → delete auth user
    if (auth.currentUser) {
      await auth.currentUser.delete();
    }
  }

  btn.innerText = "Create Account";
  btn.disabled = false;
});
