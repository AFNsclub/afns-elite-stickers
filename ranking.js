const db = firebase.firestore();

const list = document.getElementById("rankingList");

db.collection("players")
.orderBy("wins", "desc")
.orderBy("goalDifference", "desc")
.orderBy("goalsFor", "desc")
.onSnapshot(snapshot => {

  list.innerHTML = "";
  let rank = 1;

  snapshot.forEach(doc => {
    const p = doc.data();

    let trophy = "";
    if (rank === 1) trophy = "🥇";
    if (rank === 2) trophy = "🥈";
    if (rank === 3) trophy = "🥉";

    const row = document.createElement("div");
    row.className = "row";

    row.innerHTML = `
      <div class="rank">${trophy || rank}</div>

      <div class="name">
        <div class="avatar">${p.playerName.charAt(0).toUpperCase()}</div>
        <div>
          <div>${p.playerName}</div>
        </div>
      </div>

      <div>${p.wins}</div>
      <div>${p.losses}</div>
      <div>${p.goalsFor}</div>
      <div>${p.goalsAgainst}</div>
      <div>${p.goalDifference}</div>
    `;

    list.appendChild(row);
    rank++;
  });
});
