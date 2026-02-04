const ADMIN_EMAILS = [
  "sisaif167@gmail.com"   // ✅ এই Gmail admin
];

function adminLogin(){
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errorBox = document.getElementById("error");

  errorBox.innerText = "";

  auth.signInWithEmailAndPassword(email, password)
    .then(res=>{
      const userEmail = res.user.email;

      // ✅ SIMPLE ADMIN CHECK
      if(!ADMIN_EMAILS.includes(userEmail)){
        auth.signOut();
        errorBox.innerText = "❌ Not authorized admin";
        return;
      }

      // ✅ ADMIN OK
      window.location.href = "admin.html";
    })
    .catch(()=>{
      errorBox.innerText = "❌ Login failed";
    });
}
