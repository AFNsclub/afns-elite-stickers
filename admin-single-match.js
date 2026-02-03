const db = firebase.firestore();

async function saveSingleMatch() {
  const playerA = document.getElementById("playerA").value.trim();
  const playerB = document.getElementById("playerB").value.trim();
  const goalsA = parseInt(document.getElementById("goalsA").value);
  const goalsB = parseInt(document.getElementById("goalsB").value);

  if (!playerA || !playerB) {
    alert("Player UID missing");
    return;
  }

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

  alert("✅ Single match saved");
}

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
