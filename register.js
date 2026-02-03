const errorBox = document.getElementById("errorBox");
const successBox = document.getElementById("successBox");

function showError(msg){
  errorBox.innerText = msg;
  errorBox.style.display = "block";
  successBox.style.display = "none";
}

function showSuccess(msg){
  successBox.innerText = msg;
  successBox.style.display = "block";
  errorBox.style.display = "none";
}

function register(){
  const name = document.getElementById("name").value.trim();
  const mobile = document.getElementById("mobile").value.trim();
  const email = document.getElementById("email").value.trim();
  const device = document.getElementById("device").value.trim();
  const gameId = document.getElementById("gameId").value.trim();
  const facebook = document.getElementById("facebook").value.trim();
  const password = document.getElementById("password").value;

  if(!name || !mobile || !email || !password){
    showError("সব ঘর পূরণ করতে হবে");
    return;
  }

  if(!/^01[3-9]\d{8}$/.test(mobile)){
    showError("বাংলাদেশী মোবাইল নাম্বার দিন");
    return;
  }

  auth.createUserWithEmailAndPassword(email,password)
  .then(res=>{
    return db.collection("players").doc(res.user.uid).set({
      name,mobile,email,device,gameId,facebook,
      win:0,lose:0,goalsFor:0,goalsAgainst:0,
      created:firebase.firestore.FieldValue.serverTimestamp()
    });
  })
  .then(()=>{
    showSuccess("Account created! Login করুন");
    setTimeout(()=>location.href="login.html",1500);
  })
  .catch(err=>{
    showError(err.message);
  });
     }
