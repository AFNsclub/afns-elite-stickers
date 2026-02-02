function matchResult(winner, loser){
    let players = JSON.parse(localStorage.getItem("players") || "[]");

    let w = players.find(p=>p.username===winner);
    let l = players.find(p=>p.username===loser);

    if(!w || !l) return;

    w.rating += 20;
    w.wins++;

    l.rating -= 15;
    l.losses++;

    localStorage.setItem("players", JSON.stringify(players));
}
