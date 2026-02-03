/************************************
 * 🔐 LOGIN GUARD (MUST BE ON TOP)
 ************************************/
firebase.auth().onAuthStateChanged((user) => {
  if (!user) {
    // যদি লগইন না থাকে → login page এ পাঠাবে
    window.location.href = "login.html";
  }
});


/************************************
 * 🔥 FIREBASE INITIALIZE
 ************************************/
const firebaseConfig = {
  apiKey: "AIzaSyBtDxu0LJyb10ZkhH8IpxT5s8PcKc4nUxM",
  authDomain: "afnsclub.firebaseapp.com",
  projectId: "afnsclub",
  storageBucket: "afnsclub.firebasestorage.app",
  messagingSenderId: "1088089213558",
  appId: "1:1088089213558:web:bd5e01caaeecaa46bcad57",
  measurementId: "G-WT4XY15N6Y"
};

if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const auth = firebase.auth();
const db = firebase.firestore();


/************************************
 * 👤 LOAD PLAYER DATA
 ************************************/
auth.onAuthStateChanged(async (user) => {
  if (!user) return;

  try {
    const snap = await db.collection("players").doc(user.uid).get();
    if (!snap.exists) return;

    const d = snap.data();

    // UI Fill
    document.getElementById("playerName").innerText = d.playerName;
    document.getElementById("avatar").innerText =
      d.playerName.charAt(0).toUpperCase();

    document.getElementById("mobile").innerText = d.mobile || "-";
    document.getElementById("gmail").innerText = d.gmail || "-";
    document.getElementById("gameId").innerText = d.gameId || "-";
    document.getElementById("device").innerText = d.device || "-";

    document.getElementById("win").innerText = d.win || 0;
    document.getElementById("lose").innerText = d.lose || 0;
    document.getElementById("gd").innerText = d.goalDifference || 0;

  } catch (err) {
    console.error("Player load error:", err);
  }
});


/************************************
 * 🚪 LOGOUT
 ************************************/
function logout() {
  auth.signOut().then(() => {
    window.location.href = "login.html";
  });
  }
