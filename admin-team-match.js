const db = firebase.firestore();

const matchesDiv = document.getElementById("matches");

// add new 1v1 row
function addMatch() {
  const div = document.createElement("div");
  div.className = "row";
  div.innerHTML = `
    <input placeholder="Team A Player UID">
    <input type="number" placeholder="Goals">
    <input type="number" placeholder="Goals">
    <input placeholder="Team B Player UID">
  `;
  matchesDiv.appendChild(div);
}

// save all matches
async function saveTeamMatch() {
  const rows = document.querySelectorAll(".row");

  for (let row of rows) {
    const inputs = row.querySelectorAll("input");

    const playerA = inputs[0].value.trim();
    const goalsA = parseInt(inputs[1].value);
    const goalsB = parseInt(inputs[2].value);
    const playerB = inputs[3].value.trim();

    if (!playerA || !playerB) continue;

    let resultA = "draw";
    let resultB = "draw";

    if (goalsA > goalsB) {
      resultA = "win";
      resultB = "loss";
    } else if (goalsA < goalsB) {
      resultA = "loss";
      resultB = "win";
    }

    await updatePlayer(playerA, goalsA, goalsB, resultA);
    await updatePlayer(playerB, goalsB, goalsA, resultB);
  }

  alert("✅ Tournament match saved successfully!");
}

// update single player
async function updatePlayer(uid, gf, ga, result) {
  const ref = db.collection("players").doc(uid);

  await db.runTransaction(async (t) => {
    const doc = await t.get(ref);
    if (!doc.exists) return;

    const d = doc.data();

    t.update(ref, {
      wins: d.wins + (result === "win" ? 1 : 0),
      losses: d.losses + (result === "loss" ? 1 : 0),
      draws: d.draws + (result === "draw" ? 1 : 0),
      goalsFor: d.goalsFor + gf,
      goalsAgainst: d.goalsAgainst + ga,
      goalDifference: (d.goalsFor + gf) - (d.goalsAgainst + ga)
    });
  });
}
