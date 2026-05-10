"use client";

import { cn } from '@/lib/utils';
import { useAppDispatch, useAppSelector } from '@/store/hooks';
import { addUserMessage, clearChat, sendMessage, toggleChat } from '@/store/slices/chatSlice';
import { MessageCircle, Minus, Send, Trash2, X } from 'lucide-react';
import React, { useEffect, useRef, useState } from 'react';

export const ChatBot: React.FC = () => {
  const dispatch = useAppDispatch();
  const { messages, isOpen, isLoading } = useAppSelector((state) => state.chat);
  const [input, setInput] = useState('');
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSend = async (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;

    const text = input;
    setInput('');
    dispatch(addUserMessage(text));
    dispatch(sendMessage({ text, history: messages }));
  };

  const handleToggleChat = () => {
    dispatch(toggleChat());
  };

  const handleClearChat = () => {
    dispatch(clearChat());
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">
      {/* Chat Window */}
      <div
        className={cn(
          "mb-4 w-80 sm:w-96 overflow-hidden transition-all duration-500 ease-in-out transform origin-bottom-right",
          isOpen ? "scale-100 opacity-100" : "scale-0 opacity-0 pointer-events-none h-0"
        )}
      >
        <div className="bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl border border-white/20 dark:border-zinc-800/50 shadow-2xl rounded-3xl flex flex-col h-[500px]">
          {/* Header */}
          <div className="p-4 border-b border-zinc-200 dark:border-zinc-800 flex items-center justify-between bg-gradient-to-r from-blue-500/10 to-indigo-500/10">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-blue-600 flex items-center justify-center shadow-lg shadow-blue-500/20">
                <MessageCircle className="text-white w-5 h-5" />
              </div>
              <div>
                <h3 className="font-semibold text-zinc-900 dark:text-white">RentLux Assistant</h3>
                <p className="text-xs text-zinc-500 flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                  Online
                </p>
              </div>
            </div>
            <div className="flex items-center gap-1">
              <button
                onClick={handleClearChat}
                className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-xl transition-colors text-zinc-500"
                title="Clear Chat"
              >
                <Trash2 className="w-4 h-4" />
              </button>
              <button
                onClick={handleToggleChat}
                className="p-2 hover:bg-zinc-200 dark:hover:bg-zinc-800 rounded-xl transition-colors text-zinc-500"
              >
                <Minus className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto p-4 space-y-4 scrollbar-hide"
          >
            {messages.length === 0 && (
              <div className="text-center py-10 px-6">
                <div className="w-16 h-16 rounded-full bg-blue-100 dark:bg-blue-900/30 flex items-center justify-center mx-auto mb-4">
                  <MessageCircle className="w-8 h-8 text-blue-600" />
                </div>
                <h4 className="text-zinc-900 dark:text-white font-medium mb-1">Hello!</h4>
                <p className="text-sm text-zinc-500">I'm your RentLux personal stylist. How can I help you today?</p>
              </div>
            )}

            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={cn(
                  "flex",
                  msg.role === 'user' ? "justify-end" : "justify-start"
                )}
              >
                <div
                  className={cn(
                    "max-w-[85%] px-4 py-2.5 rounded-2xl text-sm shadow-sm",
                    msg.role === 'user'
                      ? "bg-blue-600 text-white rounded-tr-none"
                      : "bg-white dark:bg-zinc-800 text-zinc-800 dark:text-zinc-200 border border-zinc-100 dark:border-zinc-700 rounded-tl-none"
                  )}
                >
                  {msg.parts[0].text}
                </div>
              </div>
            ))}

            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white dark:bg-zinc-800 border border-zinc-100 dark:border-zinc-700 px-4 py-3 rounded-2xl rounded-tl-none shadow-sm">
                  <div className="flex gap-1">
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.3s]" />
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce [animation-delay:-0.15s]" />
                    <span className="w-1.5 h-1.5 bg-zinc-400 rounded-full animate-bounce" />
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <form
            onSubmit={handleSend}
            className="p-4 bg-zinc-50/50 dark:bg-zinc-900/50 border-t border-zinc-200 dark:border-zinc-800"
          >
            <div className="relative flex items-center">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="w-full bg-white dark:bg-zinc-800 border border-zinc-200 dark:border-zinc-700 rounded-2xl px-4 py-3 pr-12 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 transition-all dark:text-white"
              />
              <button
                type="submit"
                disabled={!input.trim() || isLoading}
                className="absolute right-2 p-2 bg-blue-600 hover:bg-blue-700 disabled:bg-zinc-400 text-white rounded-xl transition-all shadow-lg shadow-blue-500/20 active:scale-95"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <p className="text-[10px] text-center text-zinc-400 mt-2">
              Powered by RentLux AI
            </p>
          </form>
        </div>
      </div>

      {/* Toggle Button */}
      <button
        onClick={handleToggleChat}
        className={cn(
          "w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 transform active:scale-90",
          isOpen
            ? "bg-zinc-900 dark:bg-white text-white dark:text-zinc-900 rotate-90"
            : "bg-blue-600 text-white hover:bg-blue-700 scale-100"
        )}
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
        {!isOpen && messages.length > 0 && (
          <span className="absolute -top-1 -right-1 w-5 h-5 bg-rose-500 text-white text-[10px] font-bold rounded-full flex items-center justify-center border-2 border-white dark:border-zinc-900">
            {messages.length}
          </span>
        )}
      </button>
    </div>
  );
};
