function submitMatch(p1,p2,winner){
    let players = JSON.parse(localStorage.getItem("players")) || {};
    let history = JSON.parse(localStorage.getItem("matchHistory")) || {};

    if(!history[p1]) history[p1]=[];
    if(!history[p2]) history[p2]=[];

    let date = new Date().toLocaleString();

    let p1Result,p2Result,p1Change,p2Change;

    if(winner===p1){
        p1Result="Win"; p2Result="Loss";
        p1Change="+10"; p2Change="-10";
        players[p1]+=10; players[p2]-=10;
    }else if(winner===p2){
        p1Result="Loss"; p2Result="Win";
        p1Change="-10"; p2Change="+10";
        players[p1]-=10; players[p2]+=10;
    }else{
        p1Result="Draw"; p2Result="Draw";
        p1Change="+2"; p2Change="+2";
        players[p1]+=2; players[p2]+=2;
    }

    history[p1].push({
        opponent:p2,
        result:p1Result,
        ratingChange:p1Change,
        date
    });

    history[p2].push({
        opponent:p1,
        result:p2Result,
        ratingChange:p2Change,
        date
    });

    localStorage.setItem("players",JSON.stringify(players));
    localStorage.setItem("matchHistory",JSON.stringify(history));

    alert("Match Saved Successfully");
            }
