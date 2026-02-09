import {
  getFirestore,
  doc,
  setDoc,
  deleteDoc
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-firestore.js";

import {
  getAuth,
  onAuthStateChanged
} from "https://www.gstatic.com/firebasejs/10.7.1/firebase-auth.js";

/* ======================
   🔥 INIT
====================== */
const auth = getAuth();
const db = getFirestore();

/* ======================
   🔐 OWNER CHECK
====================== */
let isOwner = false;

onAuthStateChanged(auth, async (user) => {
  if (!user) {
    location.replace("admin-login.html");
    return;
  }

  const adminRef = doc(db, "admins", user.uid);
  const snap = await adminRef.get?.() || null;

  if (snap && snap.exists && snap.data().role === "owner") {
    isOwner = true;
  }

  if (!isOwner) {
    alert("❌ Only OWNER can change roles");
  }
});

/* ======================
   🔁 ROLE CHANGE
====================== */
window.saveRole = async function (uid, username) {
  if (!isOwner) {
    alert("❌ Permission denied");
    return;
  }

  const select = document.getElementById(`role-${uid}`);
  if (!select) return;

  const role = select.value;

  /* ❌ Remove admin */
  if (!role) {
    await deleteDoc(doc(db, "admins", uid));
    alert("❌ Admin role removed");
    return;
  }

  /* ✅ Permissions by role */
  const permissions = {
    addMatch: role !== "captain",
    editMatch: role !== "captain",
    deleteMatch: role === "owner" || role === "manager",
    seasonReset: role === "owner"
  };

  /* ✅ Save admin */
  await setDoc(doc(db, "admins", uid), {
    role,
    active: true,
    username,
    permissions,
    updatedAt: new Date()
  });

  alert("✅ Role updated successfully");
};

/* ======================
   🗑 REMOVE ADMIN
====================== */
window.removeAdmin = async function (uid) {
  if (!isOwner) {
    alert("❌ Permission denied");
    return;
  }

  if (!confirm("Remove admin role permanently?")) return;

  await deleteDoc(doc(db, "admins", uid));
  alert("❌ Admin removed");
};
