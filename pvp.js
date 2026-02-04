// ===============================
// PvP Match Result + Ranking Logic
// ===============================

// ---------- Config ----------
const RANK_WIN_POINT = 30;
const RANK_LOSS_POINT = -10;
const RANK_DRAW_POINT = 5;

// ---------- Helpers ----------
function getPlayers() {
  return JSON.parse(localStorage.getItem("players")) || {};
}

function savePlayers(players) {
  localStorage.setItem("players", JSON.stringify(players));
}

function getPvPMatches() {
  return JSON.parse(localStorage.getItem("pvpMatches")) || [];
}

function savePvPMatches(matches) {
  localStorage.setItem("pvpMatches", JSON.stringify(matches));
}

function ensurePlayer(players, name) {
  if (!players[name]) {
    players[name] = {
      name,
      matches: 0,
      wins: 0,
      losses: 0,
      draws: 0,
      rank: 1000,
      history: []
    };
  }
}

// ---------- Core Logic ----------
function submitPvPResult() {
  const p1 = document.getElementById("player1").value.trim();
  const p2 = document.getElementById("player2").value.trim();
  const p1Score = parseInt(document.getElementById("score1").value);
  const p2Score = parseInt(document.getElementById("score2").value);

  if (!p1 || !p2) {
    alert("Player name missing");
    return;
  }

  if (p1 === p2) {
    alert("Same player cannot play PvP");
    return;
  }

  if (isNaN(p1Score) || isNaN(p2Score)) {
    alert("Score missing");
    return;
  }

  const players = getPlayers();
  ensurePlayer(players, p1);
  ensurePlayer(players, p2);

  const match = {
    type: "PvP",
    player1: p1,
    player2: p2,
    score1: p1Score,
    score2: p2Score,
    date: new Date().toISOString()
  };

  // Update stats
  players[p1].matches++;
  players[p2].matches++;

  if (p1Score > p2Score) {
    // P1 WIN
    players[p1].wins++;
    players[p2].losses++;

    players[p1].rank += RANK_WIN_POINT;
    players[p2].rank += RANK_LOSS_POINT;

    match.winner = p1;

  } else if (p2Score > p1Score) {
    // P2 WIN
    players[p2].wins++;
    players[p1].losses++;

    players[p2].rank += RANK_WIN_POINT;
    players[p1].rank += RANK_LOSS_POINT;

    match.winner = p2;

  } else {
    // DRAW
    players[p1].draws++;
    players[p2].draws++;

    players[p1].rank += RANK_DRAW_POINT;
    players[p2].rank += RANK_DRAW_POINT;

    match.winner = "Draw";
  }

  // History push
  players[p1].history.push(match);
  players[p2].history.push(match);

  // Save
  const matches = getPvPMatches();
  matches.push(match);

  savePlayers(players);
  savePvPMatches(matches);

  alert("PvP Result Saved & Ranking Updated ✅");
  window.location.reload();
}

// ---------- Leaderboard ----------
function renderLeaderboard() {
  const players = Object.values(getPlayers());
  players.sort((a, b) => b.rank - a.rank);

  const list = document.getElementById("leaderboard");
  if (!list) return;

  list.innerHTML = "";

  players.forEach((p, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
      #${i + 1} <b>${p.name}</b> 
      | Rank: ${p.rank}
      | W:${p.wins} L:${p.losses} D:${p.draws}
    `;
    list.appendChild(li);
  });
}

// Auto render if leaderboard exists
document.addEventListener("DOMContentLoaded", renderLeaderboard);
