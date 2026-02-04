function go(){
  const type = document.getElementById("type").value;
  const action = document.getElementById("action")?.value || "";

  if(!type){
    alert("Select tournament type");
    return;
  }

  // 🔥 PvP (Single Player vs Player)
  if(type === "pvp"){
    location.href = "pvp-result.html";
    return;
  }

  // 🏆 Tournament logic
  if(!action){
    alert("Select action");
    return;
  }

  localStorage.setItem("tournamentType", type);
  localStorage.setItem("tournamentAction", action);

  if(action === "create"){
    location.href = "tournament-create.html";
  }else{
    location.href = "tournament-manage.html";
  }
}
