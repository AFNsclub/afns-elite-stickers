import { initializeApp } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-app.js";
import { getFirestore, doc, onSnapshot } from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

/* 🔥 FIREBASE CONFIG (তোমারটাই) */
const firebaseConfig = {
  apiKey: "AIzaSyBtDxu0LJyb10ZkhH8IpxT5s8PcKc4nUxM",
  authDomain: "afnsclub.firebaseapp.com",
  projectId: "afnsclub",
  storageBucket: "afnsclub.firebasestorage.app",
  messagingSenderId: "1088089213558",
  appId: "1:1088089213558:web:bd5e01caaeecaa46bcad57"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

/* 🔥 LIVE CHAMPION LISTENER */
const ref = doc(db, "champions", "current");

let championData = null;

onSnapshot(ref, snap=>{
  if(!snap.exists()){
    document.getElementById("status").innerText = "No champion yet";
    return;
  }

  championData = snap.data();

  document.getElementById("status").style.display = "none";
  document.getElementById("content").style.display = "block";

  document.getElementById("cName").innerText = championData.name;
  document.getElementById("cType").innerText = championData.type;
  document.getElementById("cTournament").innerText = championData.tournament;
  document.getElementById("cDate").innerText = championData.date;
});

/* 📄 AUTO PDF */
window.downloadCertificate = function(){
  if(!championData) return;

  const { jsPDF } = window.jspdf;
  const doc = new jsPDF("p","mm","a4");

  doc.setFontSize(22);
  doc.text("CERTIFICATE OF CHAMPION",105,30,{align:"center"});

  doc.setFontSize(14);
  doc.text("This certificate is proudly presented to",105,55,{align:"center"});

  doc.setFontSize(20);
  doc.text(championData.name,105,75,{align:"center"});

  doc.setFontSize(14);
  doc.text(
    `For winning the ${championData.tournament}\n(${championData.type})`,
    105,95,{align:"center"}
  );

  doc.text(`Date: ${championData.date}`,105,130,{align:"center"});

  doc.text("AFN's Elite Strikers",105,160,{align:"center"});
  doc.text("Authorized Tournament Committee",105,170,{align:"center"});

  doc.save("Champion_Certificate.pdf");
};
