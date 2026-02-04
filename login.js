const email = document.getElementById("email");
const password = document.getElementById("password");
const errorBox = document.getElementById("errorBox");

function showError(msg){
  errorBox.innerText = msg;
  errorBox.style.display = "block";
}

function clearError(){
  errorBox.innerText = "";
  errorBox.style.display = "none";
}

function togglePassword(){
  if(password.type === "password"){
    password.type = "text";
    document.querySelector(".toggle").innerText = "Hide";
  }else{
    password.type = "password";
    document.querySelector(".toggle").innerText = "Show";
  }
}

function login(){
  clearError();

  if(!email.value || !password.value){
    showError("⚠️ Gmail এবং Password দিতে হবে");
    return;
  }

  auth.signInWithEmailAndPassword(
    email.value.trim(),
    password.value
  )
  .then(() => {
    window.location.href = "player.html";
  })
  .catch(error => {
    let msg = "Login failed";

    if(
      error.code === "auth/invalid-login-credentials" ||
      error.code === "auth/wrong-password" ||
      error.code === "auth/user-not-found"
    ){
      msg = "❌ আপনার Gmail অথবা Password ভুল";
    }
    else if(error.code === "auth/invalid-email"){
      msg = "❌ Gmail ঠিক নাই";
    }
    else if(error.code === "auth/too-many-requests"){
      msg = "⏳ অনেকবার ভুল চেষ্টা করা হয়েছে, একটু পরে চেষ্টা করুন";
    }

    showError(msg);
  });
}

function forgotPassword(){
  clearError();

  if(!email.value){
    showError("📧 আগে Gmail লিখুন");
    return;
  }

  auth.sendPasswordResetEmail(email.value.trim())
    .then(() => {
      showError("✅ Password reset link Gmail এ পাঠানো হয়েছে");
    })
    .catch(() => {
      showError("❌ Gmail পাওয়া যায়নি");
    });
}
