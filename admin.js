function go(){
  const type = document.getElementById("type").value;
  if(!type) return alert("Select tournament type");

  localStorage.setItem("tournamentType", type);
  location.href = "tournament.html";
}
