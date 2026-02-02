// Load all players
function getPlayers(){
    return JSON.parse(localStorage.getItem("players") || "[]");
}

// Save players
function savePlayers(players){
    localStorage.setItem("players", JSON.stringify(players));
}

// Match result submit
function submitMatch(winnerUsername, loserUsername){
    let players = getPlayers();

    let winner = players.find(p => p.username === winnerUsername);
    let loser = players.find(p => p.username === loserUsername);

    if(!winner || !loser){
        alert("Player not found!");
        return;
    }

    if(winnerUsername === loserUsername){
        alert("Same player can't play match!");
        return;
    }

    // Rating logic
    winner.rating += 20;
    winner.wins += 1;

    loser.rating -= 15;
    if(loser.rating < 0) loser.rating = 0;
    loser.losses += 1;

    savePlayers(players);

    alert("Match result saved!");
}
