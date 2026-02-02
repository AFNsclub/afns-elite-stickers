let players = JSON.parse(localStorage.getItem("players")) || [];

const a = document.getElementById("playerA");
const b = document.getElementById("playerB");
const w = document.getElementById("winner");

function loadPlayers() {
  players.forEach(p => {
    a.innerHTML += `<option>${p.name}</option>`;
    b.innerHTML += `<option>${p.name}</option>`;
    w.innerHTML += `<option>${p.name}</option>`;
  });
}

loadPlayers();

function submitMatch() {
  let pa = a.value;
  let pb = b.value;
  let win = w.value;

  if (pa === pb) {
    alert("Same player not allowed");
    return;
  }

  players = players.map(p => {
    if (p.name === win) {
      p.rating = Math.min(100, p.rating + 10);
      p.win++;
    } else if (p.name === pa || p.name === pb) {
      p.rating = Math.max(0, p.rating - 5);
      p.lose++;
    }
    return p;
  });

  localStorage.setItem("players", JSON.stringify(players));
  document.getElementById("msg").innerText = "Match Saved Successfully!";
}
