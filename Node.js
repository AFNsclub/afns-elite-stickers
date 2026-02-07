exports.aiHelp = functions.firestore
  .document("help_chats/{id}")
  .onCreate(async (snap, ctx) => {

    const data = snap.data();
    const userMsg = data.messages[0].text;

    const response = await fetch("https://generativelanguage.googleapis.com/v1/models/gemini-pro:generateContent?key=API_KEY",{
      method:"POST",
      headers:{ "Content-Type":"application/json" },
      body:JSON.stringify({
        contents:[{
          parts:[{text:userMsg}]
        }]
      })
    });

    const r = await response.json();
    const aiText = r.candidates[0].content.parts[0].text;

    await snap.ref.update({
      messages: firebase.firestore.FieldValue.arrayUnion({
        from:"ai",
        text: aiText,
        confidence: 0.9,
        time:new Date()
      })
    });
});
