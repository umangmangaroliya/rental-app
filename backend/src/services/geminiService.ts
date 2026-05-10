import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const getApiKey = () => {
  const key = process.env.GEMINI_API_KEY;
  if (!key || key === 'PLACEHOLDER_API_KEY') {
    return null;
  }
  return key;
};

export interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

export const sendMessage = async (history: Message[], message: string) => {
  const apiKey = getApiKey();
  if (!apiKey) {
    throw new Error("Gemini API key is not configured. Please add GEMINI_API_KEY to your environment.");
  }

  const ai = new GoogleGenAI({ apiKey });

  try {
    const chat = ai.chats.create({
      model: "gemini-3-flash-preview",
      config: {
        systemInstruction: "You are an AI assistant for GJ 5 Fashion, a fashion retail and rental business. You help customers with inquiries about inventory, rentals, and fashion advice. You are professional, stylish, and helpful. You represent the brand with a friendly and upscale tone. Keep responses concise and focused on assisting the customer.",
      },
      history: history,
    });

    const result = await chat.sendMessage({
      message: message,
    });

    if (!result.text) {
      throw new Error("No response from Gemini");
    }

    return result.text;
  } catch (error) {
    console.error("Error in geminiService:", error);
    throw error;
  }
};
