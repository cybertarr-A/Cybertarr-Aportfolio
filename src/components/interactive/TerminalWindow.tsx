"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Terminal, X } from "lucide-react";

export function TerminalWindow() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [history, setHistory] = useState<{ type: 'input' | 'output', text: string }[]>([
    { type: 'output', text: 'Cybertarr OS v2.0.4' },
    { type: 'output', text: 'Type "help" to see available commands.' }
  ]);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // ctrl + `
      if (e.ctrlKey && e.key === '`') {
        setIsOpen(prev => !prev);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  const handleCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    let output = "";

    switch(trimmed) {
      case "help":
        output = "Available commands: help, about, skills, clear, exit";
        break;
      case "about":
        output = "Jashraj Shah (Cybertarr-A) - AI Systems Engineer mapping reality into intelligent architectures.";
        break;
      case "skills":
        output = "Python, Next.js, Kubernetes, PyTorch, n8n, C++, PostgreSQL, Redis.";
        break;
      case "clear":
        setHistory([]);
        return;
      case "exit":
        setIsOpen(false);
        return;
      case "":
        output = "";
        break;
      default:
        output = `Command not found: ${trimmed}`;
    }

    setHistory(prev => [
      ...prev,
      { type: 'input', text: cmd },
      ...(output ? [{ type: 'output' as const, text: output }] : [])
    ]);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 50, scale: 0.95 }}
            className="fixed bottom-4 right-4 w-full max-w-lg z-50 rounded-xl overflow-hidden glass-panel border border-primary/30 shadow-[0_0_30px_rgba(0,230,255,0.15)] flex flex-col font-mono text-sm"
          >
            {/* Header */}
            <div className="bg-black/80 p-3 flex items-center justify-between border-b border-primary/20">
              <div className="flex items-center gap-2 text-primary">
                <Terminal className="w-4 h-4" />
                <span className="font-bold text-xs">root@cybertarr-os:~</span>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Terminal Body */}
            <div className="p-4 h-64 overflow-y-auto bg-black/60 backdrop-blur-xl flex flex-col gap-2">
              {history.map((line, i) => (
                <div key={i} className={line.type === 'input' ? 'text-gray-300' : 'text-primary'}>
                  {line.type === 'input' && <span className="text-secondary mr-2">$</span>}
                  {line.text}
                </div>
              ))}
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleCommand(input);
                  setInput("");
                }}
                className="flex items-center mt-2 text-gray-300"
              >
                <span className="text-secondary mr-2">$</span>
                <input 
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  className="bg-transparent outline-none flex-1 font-mono"
                  autoComplete="off"
                  spellCheck="false"
                />
              </form>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
