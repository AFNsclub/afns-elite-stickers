/* ---------- CURRENT CHAMPION DATA ---------- */
/* পরে Admin panel / Firebase থেকে update করা যাবে */

const currentChampion = {
  name: "Team Black",
  type: "Team Tournament",   // Single Tournament / Team Tournament
  tournament: "Knockout Championship",
  date: "2025-06-01"
};

/* ---------- LOAD UI ---------- */
document.getElementById("championName").innerText = currentChampion.name;
document.getElementById("championType").innerText = currentChampion.type;
document.getElementById("tournamentName").innerText = currentChampion.tournament;
document.getElementById("championDate").innerText = currentChampion.date;

document.getElementById("championBadge").innerText =
  currentChampion.type === "Team Tournament"
  ? "👥 TEAM CHAMPION"
  : "🎮 SINGLE CHAMPION";
