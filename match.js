function matchResult(winner, loser){
    let players = JSON.parse(localStorage.players);

    let w = players.find(p=>p.username===winner);
    let l = players.find(p=>p.username===loser);

    w.rating += 20;
    w.wins++;

    l.rating -= 15;
    l.losses++;

    localStorage.players = JSON.stringify(players);
}
