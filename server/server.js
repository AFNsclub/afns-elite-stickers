import express from "express";
import cors from "cors";
import OpenAI from "openai";

const app = express();
app.use(cors());
app.use(express.json());

const openai = new OpenAI({
  apiKey: process.env.OPENAI_KEY
});

app.post("/ask-ai", async (req, res) => {
  try {
    const { problem } = req.body;

    const completion = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [
        { role: "system", content: "You are a professional eFootball coach. Give tactical advice in Bangla." },
        { role: "user", content: problem }
      ]
    });

    res.json({ answer: completion.choices[0].message.content });

  } catch (error) {
    res.status(500).json({ error: "AI Server Error" });
  }
});

app.listen(3000, () => console.log("Server running"));
