import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import axios from 'axios';

interface Message {
  role: 'user' | 'model';
  parts: { text: string }[];
}

interface ChatState {
  messages: Message[];
  isOpen: boolean;
  isLoading: boolean;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

const initialState: ChatState = {
  messages: [],
  isOpen: false,
  isLoading: false,
};

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async ({ text, history }: { text: string; history: Message[] }, { rejectWithValue }) => {
    try {
      const response = await axios.post(`${API_URL}/chat`, {
        history,
        message: text,
      });
      return response.data.text;
    } catch (error) {
      return rejectWithValue("Sorry, I'm having trouble connecting right now. Please try again later.");
    }
  }
);

const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    toggleChat: (state) => {
      state.isOpen = !state.isOpen;
    },
    clearChat: (state) => {
      state.messages = [];
    },
    addUserMessage: (state, action: PayloadAction<string>) => {
      state.messages.push({
        role: 'user',
        parts: [{ text: action.payload }],
      });
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(sendMessage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(sendMessage.fulfilled, (state, action) => {
        state.messages.push({
          role: 'model',
          parts: [{ text: action.payload }],
        });
        state.isLoading = false;
      })
      .addCase(sendMessage.rejected, (state, action) => {
        state.messages.push({
          role: 'model',
          parts: [{ text: action.payload as string }],
        });
        state.isLoading = false;
      });
  },
});

export const { toggleChat, clearChat, addUserMessage } = chatSlice.actions;
export default chatSlice.reducer;
