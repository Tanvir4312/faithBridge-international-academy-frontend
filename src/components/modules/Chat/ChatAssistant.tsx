"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  Loader2,
  User,
  Bot,
  ChevronRight,
  Maximize2,
  Minimize2
} from "lucide-react";
import Image from "next/image";
import { TextStreamChatTransport } from "ai";

const QUICK_ACTIONS = [
  { label: "Admission Date?", value: "When is the admission date for the next session?" },
  { label: "How to pay fee?", value: "What are the available payment methods for school fees?" },
  { label: "Contact Info", value: "What is the contact information for the school office?" },
  { label: "School Timing", value: "What are the school hours?" },
];

export default function ChatAssistant() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [isOpen, setIsOpen] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error } = useChat({
    transport: new TextStreamChatTransport({ api: `${API_BASE_URL}/chat` }),
    onFinish: () => scrollToBottom(),
  });

  const isLoading = status === "submitted" || status === "streaming";

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInput(e.target.value);
  };

  const handleSubmit = (e?: React.FormEvent) => {
    e?.preventDefault();
    if (!input.trim() || isLoading) return;
    sendMessage({ text: input });
    setInput("");
  };

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  const handleQuickAction = (value: string) => {
    setInput(value);
    // We can't directly trigger handleSubmit here because it expects an event
    // But we can simulate it or just let the user click send
  };

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.8, x: -20 }}
            animate={{
              opacity: 1,
              scale: 1,
              x: 0,
              height: isMinimized ? "auto" : "550px",
              width: "380px"
            }}
            exit={{ opacity: 0, scale: 0.8, x: -20 }}
            className="mb-4 bg-white dark:bg-slate-900 rounded-[2rem] shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="bg-emerald-600 dark:bg-emerald-700 p-4 flex items-center justify-between text-white shadow-lg">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center p-1 overflow-hidden">
                  <Image
                    src="/favicon.jpg"
                    alt="Logo"
                    width={40}
                    height={40}
                    className="object-cover"
                  />
                </div>
                <div>
                  <h3 className="font-bold text-sm">FaithBridge AI Assistant</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-2 h-2 bg-emerald-300 rounded-full animate-pulse" />
                    <span className="text-[10px] text-emerald-100 uppercase tracking-widest font-black">Online Now</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <button
                  onClick={() => setIsMinimized(!isMinimized)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                >
                  {isMinimized ? <Maximize2 size={16} /> : <Minimize2 size={16} />}
                </button>
                <button
                  onClick={() => setIsOpen(false)}
                  className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
            </div>

            {!isMinimized && (
              <>
                {/* Messages Area */}
                <div
                  ref={scrollRef}
                  className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50 dark:bg-slate-950/50 custom-scrollbar"
                >
                  {messages.length === 0 && (
                    <div className="text-center py-8 space-y-4">
                      <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                        <Bot className="w-8 h-8 text-emerald-600" />
                      </div>
                      <h4 className="font-bold text-slate-800 dark:text-slate-200">Hello! I'm Faithy</h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400 px-6">
                        I can help you with admissions, fees, timings, and more. How can I assist you today?
                      </p>
                    </div>
                  )}

                  {messages.map((m: any) => (
                    <div
                      key={m.id}
                      className={`flex ${m.role === 'user' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div className={`flex items-start gap-2 max-w-[85%] ${m.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${m.role === 'user'
                          ? 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-200'
                          : 'bg-emerald-600 text-white'
                          }`}>
                          {m.role === 'user' ? <User size={16} /> : <Bot size={16} />}
                        </div>
                        <div className={`p-3 rounded-2xl text-sm leading-relaxed ${m.role === 'user'
                          ? 'bg-emerald-600 text-white rounded-tr-none shadow-md'
                          : 'bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-700'
                          }`}>
                          {m.parts ? m.parts.filter((p: any) => p.type === "text").map((p: any, i: number) => (
                            <span key={i}>{p.text}</span>
                          )) : (m as any).content}
                        </div>
                      </div>
                    </div>
                  ))}

                  {isLoading && messages[messages.length - 1]?.role !== 'assistant' && (
                    <div className="flex justify-start">
                      <div className="flex items-start gap-2 max-w-[85%]">
                        <div className="w-8 h-8 rounded-full bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-sm">
                          <Bot size={16} />
                        </div>
                        <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none shadow-sm border border-slate-100 dark:border-slate-700 flex items-center gap-1">
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                          <span className="w-1.5 h-1.5 bg-slate-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                        </div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Actions */}
                {messages.length === 0 && (
                  <div className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800">
                    <p className="text-[10px] font-black uppercase text-slate-400 tracking-widest mb-3 ml-1">Quick Actions</p>
                    <div className="flex flex-wrap gap-2">
                      {QUICK_ACTIONS.map((action) => (
                        <button
                          key={action.label}
                          onClick={() => handleQuickAction(action.value)}
                          className="text-[10px] font-bold py-1.5 px-3 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 hover:bg-emerald-600 hover:text-white transition-all border border-slate-200 dark:border-slate-700 flex items-center gap-1 group"
                        >
                          {action.label}
                          <ChevronRight size={12} className="group-hover:translate-x-0.5 transition-transform" />
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Input Area */}
                <form
                  onSubmit={handleSubmit}
                  className="p-4 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800"
                >
                  <div className="relative">
                    <input
                      type="text"
                      value={input}
                      onChange={handleInputChange}
                      placeholder="Type your message..."
                      className="w-full bg-slate-50 dark:bg-slate-800 border border-slate-200 dark:border-slate-700 rounded-2xl py-3 pl-4 pr-12 text-sm outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-700 dark:text-slate-200"
                    />
                    <button
                      type="submit"
                      disabled={!input.trim() || isLoading}
                      className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 bg-emerald-600 text-white rounded-xl flex items-center justify-center disabled:opacity-50 disabled:grayscale transition-all hover:bg-emerald-700 active:scale-95 shadow-md"
                    >
                      {isLoading ? <Loader2 size={16} className="animate-spin" /> : <Send size={16} />}
                    </button>
                  </div>
                  <p className="text-[9px] text-center text-slate-400 mt-2 font-medium italic">
                    FaithBridge AI can make mistakes. Check important info.
                  </p>
                </form>
              </>
            )}
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full flex items-center justify-center shadow-2xl transition-all duration-300 group ${isOpen ? 'bg-slate-900 dark:bg-slate-100' : 'bg-emerald-600'
          }`}
      >
        {isOpen ? (
          <X className="text-white dark:text-slate-900 group-hover:rotate-90 transition-transform duration-300" />
        ) : (
          <div className="relative">
            <MessageCircle className="text-white w-7 h-7" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-emerald-600 animate-ping" />
          </div>
        )}
      </motion.button>

      <style jsx global>{`
        .custom-scrollbar::-webkit-scrollbar {
          width: 4px;
        }
        .custom-scrollbar::-webkit-scrollbar-track {
          background: transparent;
        }
        .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #e2e8f0;
          border-radius: 10px;
        }
        .dark .custom-scrollbar::-webkit-scrollbar-thumb {
          background: #1e293b;
        }
      `}</style>
    </div>
  );
}
