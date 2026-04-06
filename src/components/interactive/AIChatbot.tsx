"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Bot, Send } from "lucide-react";

export function AIChatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{role: 'system'|'user', text: string}[]>([
    { role: 'system', text: 'Cybertarr AI Node online. You can ask about my architecture, tech stack, or availability.' }
  ]);
  const [input, setInput] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    setMessages(prev => [...prev, { role: 'user', text: input }]);
    const currentInput = input.trim();
    setInput("");

    // Simulate basic mock response
    setTimeout(() => {
      let response = "I'm a synthesized agent. To get deeper insights, please contact Jashraj directly or initiate via GitHub.";
      if (currentInput.toLowerCase().includes("skill") || currentInput.toLowerCase().includes("tech")) {
        response = "My primary nodes include Python, Next.js, Kubernetes, FastAPI, and PyTorch.";
      }
      if (currentInput.toLowerCase().includes("hire") || currentInput.toLowerCase().includes("contact") || currentInput.toLowerCase().includes("available")) {
        response = "I am currently accepting inquiries for AI/Systems engineering roles. Connect with me on LinkedIn!";
      }
      setMessages(prev => [...prev, { role: 'system', text: response }]);
    }, 600);
  };

  return (
    <>
      {/* Floating Button */}
      <button 
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 w-14 h-14 rounded-full bg-secondary text-white flex items-center justify-center shadow-[0_0_20px_rgba(138,63,252,0.4)] hover:scale-110 hover:bg-secondary/90 transition-all z-40 group"
      >
        <MessageSquare className="w-6 h-6 group-hover:hidden" />
        <Bot className="w-6 h-6 hidden group-hover:block animate-pulse" />
      </button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.9 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[400px] glass-panel border border-secondary/30 rounded-2xl overflow-hidden shadow-2xl flex flex-col z-50 bg-[#05050A]"
          >
            {/* Header */}
            <div className="p-4 bg-secondary/20 border-b border-secondary/20 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Bot className="w-5 h-5 text-secondary" />
                <span className="font-bold text-white text-sm">Cybertarr AI Node</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Chat Body */}
            <div className="flex-1 overflow-y-auto p-4 flex flex-col gap-3">
              {messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[80%] p-3 rounded-lg text-sm font-mono ${msg.role === 'user' ? 'bg-primary/20 text-white rounded-br-none border border-primary/30' : 'bg-white/5 text-gray-300 rounded-bl-none border border-white/10'}`}>
                    {msg.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSubmit} className="p-4 border-t border-white/10 bg-black/50">
              <div className="relative">
                <input
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  placeholder="Query system..."
                  className="w-full bg-transparent border border-white/20 rounded-full py-2 px-4 pr-10 text-sm text-white focus:outline-none focus:border-secondary transition-colors font-mono"
                />
                <button type="submit" className="absolute right-2 top-1/2 -translate-y-1/2 w-8 h-8 flex items-center justify-center text-secondary hover:text-white transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
