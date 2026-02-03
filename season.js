// ===============================
// 🔥 FIREBASE CONFIG (FINAL)
// ===============================
const firebaseConfig = {
  apiKey: "AIzaSyBtDxu0LJyb10ZkhH8IpxT5s8PcKc4nUxM",
  authDomain: "afnsclub.firebaseapp.com",
  projectId: "afnsclub",
  storageBucket: "afnsclub.firebasestorage.app",
  messagingSenderId: "1088089213558",
  appId: "1:1088089213558:web:bd5e01caaeecaa46bcad57"
};

// 🔐 Init guard (error হবে না)
if (!firebase.apps.length) {
  firebase.initializeApp(firebaseConfig);
}

const db = firebase.firestore();

// ===============================
// 🏆 SEASON HISTORY LOAD
// ===============================
document.addEventListener("DOMContentLoaded", () => {
  const seasonList = document.getElementById("seasonList");

  if (!seasonList) {
    console.error("seasonList div not found");
    return;
  }

  db.collection("seasons")
    .orderBy("endedAt", "desc")
    .onSnapshot(snapshot => {
      seasonList.innerHTML = "";

      if (snapshot.empty) {
        seasonList.innerHTML = `
          <p style="color:#8b949e; text-align:center;">
            No season history found
          </p>`;
        return;
      }

      snapshot.forEach(doc => {
        const s = doc.data();

        // ⏱ Timestamp safe convert
        let endDate = "Unknown date";
        if (s.endedAt && s.endedAt.toDate) {
          endDate = s.endedAt.toDate().toDateString();
        }

        const card = document.createElement("div");
        card.className = "season-card";

        card.innerHTML = `
          <div class="season-title">${s.seasonName || "Unnamed Season"}</div>
          <div class="season-date">Ended: ${endDate}</div>

          <div class="trophy gold">🥇 <span>${s.top1 || "-"}</span></div>
          <div class="trophy silver">🥈 <span>${s.top2 || "-"}</span></div>
          <div class="trophy bronze">🥉 <span>${s.top3 || "-"}</span></div>
        `;

        seasonList.appendChild(card);
      });
    }, error => {
      console.error("Season load error:", error);
      seasonList.innerHTML = "Failed to load season history.";
    });
});
