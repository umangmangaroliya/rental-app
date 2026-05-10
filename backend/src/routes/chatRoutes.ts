import { Router, Request, Response } from "express";
import { sendMessage, Message } from "../services/geminiService";

const router = Router();

router.post("/", async (req: Request, res: Response) => {
  try {
    const { history, message } = req.body;

    if (!message) {
      res.status(400).json({ error: "Message is required" });
      return;
    }

    const responseText = await sendMessage(history || [], message);
    res.json({ text: responseText });
  } catch (error: any) {
    console.error("Chat error:", error);
    res.status(500).json({ error: error.message || "Internal server error" });
  }
});

export default router;
