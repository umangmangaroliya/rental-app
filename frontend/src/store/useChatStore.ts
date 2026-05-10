import { create } from 'zustand';
import axios from 'axios';

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface ChatState {
  messages: Message[];
  isOpen: boolean;
  isLoading: boolean;
  toggleChat: () => void;
  sendMessage: (text: string) => Promise<void>;
  clearChat: () => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export const useChatStore = create<ChatState>((set, get) => ({
  messages: [],
  isOpen: false,
  isLoading: false,
  toggleChat: () => set((state) => ({ isOpen: !state.isOpen })),
  sendMessage: async (text: string) => {
    const { messages } = get();
    const userMessage: Message = { role: 'user', parts: [{ text }] };
    
    set((state) => ({ 
      messages: [...state.messages, userMessage],
      isLoading: true 
    }));

    try {
      const response = await axios.post(`${API_URL}/chat`, {
        history: messages,
        message: text
      });

      const modelMessage: Message = { 
        role: 'model', 
        parts: [{ text: response.data.text }] 
      };

      set((state) => ({ 
        messages: [...state.messages, modelMessage],
        isLoading: false 
      }));
    } catch (error) {
      console.error("Chat error:", error);
      set({ isLoading: false });
      // Optionally add an error message to the chat
      set((state) => ({
        messages: [...state.messages, { 
          role: 'model', 
          parts: [{ text: "Sorry, I'm having trouble connecting right now. Please try again later." }] 
        }]
      }));
    }
  },
  clearChat: () => set({ messages: [] }),
}));
