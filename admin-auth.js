// ✅ ALLOWED ADMINS
const ADMIN_EMAILS = [
  "sisaif167@gmail.com"
];

// 🔐 AUTO LOGIN STAY
auth.onAuthStateChanged(user=>{
  if(user && ADMIN_EMAILS.includes(user.email)){
    if(location.pathname.includes("admin-login")){
      location.href = "admin.html";
    }
  }
});

// 🔐 LOGIN
function adminLogin(){
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const errorBox = document.getElementById("error");

  errorBox.innerText = "";

  if(!email || !password){
    errorBox.innerText = "Email & password required";
    return;
  }

  auth.signInWithEmailAndPassword(email, password)
    .then(res=>{
      const userEmail = res.user.email;

      if(!ADMIN_EMAILS.includes(userEmail)){
        auth.signOut();
        errorBox.innerText = "❌ Not authorized admin";
        return;
      }

      // ✅ ADMIN OK
      location.href = "admin.html";
    })
    .catch(err=>{
      errorBox.innerText = "❌ Login failed";
    });
}

// 👁️ PASSWORD SHOW / HIDE
function togglePassword(){
  const p = document.getElementById("password");
  const t = document.querySelector(".toggle");

  if(p.type === "password"){
    p.type = "text";
    t.innerText = "Hide";
  }else{
    p.type = "password";
    t.innerText = "Show";
  }
}

// 🔁 FORGOT PASSWORD (Firebase Email)
function forgotPassword(){
  const email = document.getElementById("email").value.trim();
  const errorBox = document.getElementById("error");

  if(!email){
    errorBox.innerText = "Enter admin email first";
    return;
  }

  auth.sendPasswordResetEmail(email)
    .then(()=>{
      errorBox.style.color = "#22c55e";
      errorBox.innerText = "✅ Reset link sent to email";
    })
    .catch(()=>{
      errorBox.style.color = "#ff6b6b";
      errorBox.innerText = "❌ Failed to send reset email";
    });
}

// 🚪 LOGOUT (admin.html এ ব্যবহার হবে)
function logoutAdmin(){
  auth.signOut().then(()=>{
    location.href = "admin-login.html";
  });
          }
