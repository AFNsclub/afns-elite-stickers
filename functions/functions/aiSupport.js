import fetch from "node-fetch";

export async function askAI(userMessage){
  const res = await fetch("https://api.openai.com/v1/chat/completions",{
    method:"POST",
    headers:{
      "Authorization":`Bearer ${process.env.OPENAI_KEY}`,
      "Content-Type":"application/json"
    },
    body:JSON.stringify({
      model:"gpt-4o",
      messages:[
        {role:"system",content:"You are support AI"},
        {role:"user",content:userMessage}
      ]
    })
  });

  const data = await res.json();
  const answer = data.choices[0].message.content;

  return {
    text:answer,
    confidence: Math.min(0.95, answer.length / 300)
  };
}
