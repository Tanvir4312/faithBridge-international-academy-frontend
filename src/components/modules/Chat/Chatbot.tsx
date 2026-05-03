"use client";

import { useState, useRef, useEffect } from "react";
import { useChat } from "@ai-sdk/react";
import { motion, AnimatePresence } from "framer-motion";
import {
  MessageCircle,
  X,
  Send,
  User,
  Bot,
  AlertCircle,
  GraduationCap,
  Phone,
  Clock,
  CreditCard,
  ChevronRight,
  Mail,
} from "lucide-react";
import { TextStreamChatTransport } from "ai";

const QUICK_ACTIONS = [
  {
    label: "Admission Info",
    value: "When does admission start and what is the fee?",
    icon: GraduationCap,
    color: "from-emerald-500 to-teal-500",
  },
  {
    label: "Contact Number",
    value: "What is the contact number of the school?",
    icon: Phone,
    color: "from-blue-500 to-cyan-500",
  },
  {
    label: "Email Address",
    value: "What is the email address of the school?",
    icon: Mail,
    color: "from-blue-500 to-cyan-500",
  },

  {
    label: "Admission Payment",
    value: "What are the available payment methods for admission fees?",
    icon: CreditCard,
    color: "from-purple-500 to-pink-500",
  },
];

export default function Chatbot() {
  const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;
  const [isOpen, setIsOpen] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const [input, setInput] = useState("");

  const { messages, sendMessage, status, error } = useChat({
    transport: new TextStreamChatTransport({
      api: `${API_BASE_URL}/chat`,
    }),
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

  const handleQuickAction = (value: string) => {
    if (isLoading) return;
    sendMessage({ text: value });
  };

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isLoading]);

  return (
    <div className="fixed bottom-6 left-6 z-50 flex flex-col items-start">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, x: -10 }}
            animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
            exit={{ opacity: 0, y: 20, scale: 0.95, x: -10 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="mb-4 w-[340px] sm:w-[400px] bg-white dark:bg-slate-900 rounded-2xl shadow-2xl border border-slate-200 dark:border-slate-800 flex flex-col h-[500px]"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-emerald-600 to-teal-600 dark:from-emerald-700 dark:to-teal-700 p-4 flex justify-between items-center text-white rounded-t-2xl">
              <div className="flex items-center gap-3">
                <div className="relative">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <Bot size={22} className="text-white" />
                  </div>
                  <span className="absolute -bottom-0.5 -right-0.5 w-3 h-3 bg-green-400 border-2 border-emerald-600 rounded-full"></span>
                </div>
                <div>
                  <h3 className="font-bold text-sm leading-tight">Faithy</h3>
                  <div className="flex items-center gap-1.5">
                    <span className="w-1.5 h-1.5 bg-green-300 rounded-full animate-pulse" />
                    <span className="text-[10px] text-emerald-100 uppercase tracking-widest font-semibold">
                      Online
                    </span>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1.5 hover:bg-white/20 rounded-lg transition-colors"
              >
                <X size={18} />
              </button>
            </div>

            {/* Messages Area */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50/50 dark:bg-slate-950/50 custom-scrollbar">
              {/* Welcome + Quick Actions when no messages */}
              {messages.length === 0 && !isLoading && (
                <div className="space-y-5">
                  {/* Welcome */}
                  <div className="text-center py-4">
                    <div className="w-14 h-14 bg-gradient-to-br from-emerald-100 to-teal-100 dark:from-emerald-900/40 dark:to-teal-900/40 rounded-full flex items-center justify-center mx-auto mb-3">
                      <Bot className="w-7 h-7 text-emerald-600 dark:text-emerald-400" />
                    </div>
                    <h4 className="font-bold text-slate-800 dark:text-slate-200 text-sm">
                      Hello! I&apos;m Faithy 👋
                    </h4>
                    <p className="text-xs text-slate-500 dark:text-slate-400 mt-1 px-4 leading-relaxed">
                      Your FaithBridge Academy assistant. Ask me anything about
                      admissions, fees, timings & more!
                    </p>
                  </div>

                  {/* Quick Actions */}
                  <div>
                    <p className="text-[10px] font-bold uppercase text-slate-400 tracking-widest mb-2.5 ml-1">
                      Quick Questions
                    </p>
                    <div className="grid grid-cols-2 gap-2">
                      {QUICK_ACTIONS.map((action) => {
                        const Icon = action.icon;
                        return (
                          <button
                            key={action.label}
                            onClick={() => handleQuickAction(action.value)}
                            className="group relative flex items-center gap-2 p-3 rounded-xl bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 hover:border-emerald-300 dark:hover:border-emerald-600 transition-all duration-200 hover:shadow-md text-left"
                          >
                            <div
                              className={`w-8 h-8 rounded-lg bg-gradient-to-br ${action.color} flex items-center justify-center shrink-0`}
                            >
                              <Icon size={14} className="text-white" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <span className="text-[11px] font-semibold text-slate-700 dark:text-slate-200 block truncate">
                                {action.label}
                              </span>
                            </div>
                            <ChevronRight
                              size={12}
                              className="text-slate-300 dark:text-slate-600 group-hover:text-emerald-500 group-hover:translate-x-0.5 transition-all shrink-0"
                            />
                          </button>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              {/* Messages */}
              {messages.map((m) => (
                <div
                  key={m.id}
                  className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`flex items-start gap-2 max-w-[85%] ${m.role === "user" ? "flex-row-reverse" : "flex-row"
                      }`}
                  >
                    <div
                      className={`w-7 h-7 shrink-0 rounded-full flex items-center justify-center ${m.role === "user"
                        ? "bg-slate-200 dark:bg-slate-700 text-slate-600 dark:text-slate-300"
                        : "bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600"
                        }`}
                    >
                      {m.role === "user" ? (
                        <User size={13} />
                      ) : (
                        <Bot size={13} />
                      )}
                    </div>
                    <div
                      className={`p-3 rounded-2xl text-sm leading-relaxed ${m.role === "user"
                        ? "bg-emerald-600 text-white rounded-tr-none shadow-sm"
                        : "bg-white dark:bg-slate-800 text-slate-700 dark:text-slate-200 rounded-tl-none border border-slate-200 dark:border-slate-700 shadow-sm"
                        }`}
                    >
                      {m.parts
                        ? m.parts
                          .filter((p: any) => p.type === "text")
                          .map((p: any, i: number) => (
                            <span key={i}>{p.text}</span>
                          ))
                        : (m as any).content}
                    </div>
                  </div>
                </div>
              ))}

              {/* Loading / Thinking State */}
              {isLoading &&
                messages.length > 0 &&
                messages[messages.length - 1].role === "user" && (
                  <div className="flex justify-start">
                    <div className="flex items-start gap-2 max-w-[85%]">
                      <div className="w-7 h-7 shrink-0 rounded-full flex items-center justify-center bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600">
                        <Bot size={13} />
                      </div>
                      <div className="bg-white dark:bg-slate-800 p-3 rounded-2xl rounded-tl-none border border-slate-200 dark:border-slate-700 flex items-center gap-1.5 shadow-sm">
                        <span
                          className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"
                          style={{ animationDelay: "0ms" }}
                        ></span>
                        <span
                          className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"
                          style={{ animationDelay: "150ms" }}
                        ></span>
                        <span
                          className="w-1.5 h-1.5 bg-emerald-400 rounded-full animate-bounce"
                          style={{ animationDelay: "300ms" }}
                        ></span>
                      </div>
                    </div>
                  </div>
                )}

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 text-red-600 dark:text-red-400 text-xs rounded-xl border border-red-200 dark:border-red-800/30">
                  <AlertCircle size={14} />
                  <span>Failed to send message. Please try again.</span>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <form
              onSubmit={handleSubmit}
              className="p-3 bg-white dark:bg-slate-900 border-t border-slate-100 dark:border-slate-800"
            >
              <div className="relative flex items-center">
                <input
                  type="text"
                  value={input}
                  onChange={handleInputChange}
                  placeholder="Ask Faithy anything..."
                  className="w-full bg-slate-100 dark:bg-slate-800 border-none rounded-full py-2.5 pl-4 pr-12 text-sm focus:ring-2 focus:ring-emerald-500/30 outline-none text-slate-800 dark:text-slate-200 placeholder:text-slate-400"
                  disabled={isLoading}
                />
                <button
                  type="submit"
                  disabled={!input.trim() || isLoading}
                  className="absolute right-1.5 w-8 h-8 bg-emerald-600 hover:bg-emerald-700 text-white rounded-full flex items-center justify-center disabled:opacity-40 transition-all active:scale-95 shadow-sm"
                >
                  <Send
                    size={14}
                    className={
                      input.trim()
                        ? "translate-x-[-1px] translate-y-[1px]"
                        : ""
                    }
                  />
                </button>
              </div>
              <p className="text-[9px] text-center text-slate-400 mt-1.5 font-medium">
                Faithy can make mistakes. Verify important info.
              </p>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Launcher - LEFT SIDE */}
      <motion.button
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.92 }}
        onClick={() => setIsOpen(!isOpen)}
        className={`w-14 h-14 rounded-full shadow-2xl flex items-center justify-center transition-all duration-300 group ${isOpen
          ? "bg-slate-800 dark:bg-slate-200"
          : "bg-gradient-to-br from-emerald-500 to-teal-600"
          }`}
      >
        {isOpen ? (
          <X className="text-white dark:text-slate-800 group-hover:rotate-90 transition-transform duration-300" size={22} />
        ) : (
          <div className="relative">
            <MessageCircle className="text-white w-6 h-6" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-emerald-500 animate-ping" />
            <span className="absolute -top-1 -right-1 w-3 h-3 bg-rose-500 rounded-full border-2 border-emerald-500" />
          </div>
        )}
      </motion.button>

      {/* Custom scrollbar styles */}
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
