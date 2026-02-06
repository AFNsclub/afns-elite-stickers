<script>
/* =========================================
   SEASON MANAGER (YEARLY 3 SEASONS)
   Months: Jan, May, Sep
========================================= */

const SEASON_START_MONTHS = [0, 4, 8]; // Jan, May, Sep
const BASE_RATING = 50;

/* ===============================
   GET SEASON INDEX
=============================== */
function getSeasonIndex(month){
  if(month >= 8) return 3; // Sep–Dec
  if(month >= 4) return 2; // May–Aug
  return 1;                // Jan–Apr
}

/* ===============================
   CURRENT SEASON ID
=============================== */
function getCurrentSeasonId(){
  const now = new Date();
  const year = now.getFullYear();
  const index = getSeasonIndex(now.getMonth());
  return `${year}-S${index}`;
}

/* ===============================
   ENSURE ACTIVE SEASON
=============================== */
async function ensureSeason(db){
  const seasonId = getCurrentSeasonId();
  const seasonRef = db.collection("seasons").doc(seasonId);
  const snap = await seasonRef.get();

  if(snap.exists && snap.data().active) {
    return seasonId;
  }

  await db.runTransaction(async (t) => {

    // Deactivate old seasons
    const active = await t.get(
      db.collection("seasons").where("active","==",true)
    );

    active.forEach(doc=>{
      t.update(doc.ref,{ active:false, endedAt:firebase.firestore.FieldValue.serverTimestamp() });
    });

    // Create / activate new season
    t.set(seasonRef,{
      active:true,
      seasonId,
      startedAt:firebase.firestore.FieldValue.serverTimestamp(),
      baseRating:BASE_RATING
    },{merge:true});

    // RESET ALL PLAYERS (SAFE)
    const players = await t.get(db.collection("players"));
    players.forEach(p=>{
      t.update(p.ref,{
        rating:BASE_RATING,
        wins:0,
        losses:0,
        seasonId
      });
    });

  });

  console.log("✅ New Season Activated:", seasonId);
  return seasonId;
}

/* ===============================
   GET ACTIVE SEASON (FAST)
=============================== */
async function getActiveSeason(db){
  const q = await db.collection("seasons")
    .where("active","==",true)
    .limit(1)
    .get();

  if(!q.empty) return q.docs[0].id;
  return await ensureSeason(db);
}
</script>
