"use client";

import { motion } from "framer-motion";
import { Terminal, Cpu } from "lucide-react";
import { useSystemStore } from "@/store/systemStore";

export function Hero() {
  const setInteractionState = useSystemStore(state => state.setInteractionState);

  return (
    <section className="min-h-screen flex items-center justify-center relative overlow-hidden">
      <div className="container mx-auto px-6 relative z-10 pointer-events-none">
        <div className="max-w-4xl mx-auto text-center pointer-events-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="text-5xl md:text-7xl font-heading font-bold mb-6 select-none shadow-black drop-shadow-2xl">
              Building Intelligent Systems That Bridge
              <span className="text-gradient block mt-2">
                <span 
                    onMouseEnter={() => setInteractionState('ai_hover')}
                    onMouseLeave={() => setInteractionState('idle')}
                    className="cursor-crosshair hover:text-white transition-colors duration-300"
                >AI</span>,{' '}
                <span 
                    onMouseEnter={() => setInteractionState('automation_hover')}
                    onMouseLeave={() => setInteractionState('idle')}
                    className="cursor-crosshair hover:text-white transition-colors duration-300"
                >Automation</span>, and{' '}
                <span 
                    onMouseEnter={() => setInteractionState('reality_hover')}
                    onMouseLeave={() => setInteractionState('idle')}
                    className="cursor-crosshair hover:text-white transition-colors duration-300"
                >Reality</span>
              </span>
            </h1>
          </motion.div>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.8 }}
            className="text-lg md:text-xl text-gray-300 mb-10 font-mono drop-shadow-lg"
          >
            I am an <strong className="text-primary glow-text">AI Systems Engineer</strong>. I design architecture that moves beyond prototypes into highly deployable, real-world solutions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.8 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4"
          >
            <button className="glass-panel group relative flex items-center gap-2 px-8 py-4 rounded-lg font-mono text-primary border-primary/50 hover:bg-primary/10 transition-all duration-300 cursor-pointer">
              <Terminal className="w-5 h-5" />
              <span>Explore Systems</span>
              <div className="absolute inset-0 rounded-lg glow-box opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>

            <button className="glass-panel group relative flex items-center gap-2 px-8 py-4 rounded-lg font-mono text-secondary border-secondary/50 hover:bg-secondary/10 transition-all duration-300 cursor-pointer">
              <Cpu className="w-5 h-5" />
              <span>View Projects</span>
              <div className="absolute inset-0 rounded-lg shadow-[0_0_20px_rgba(138,63,252,0.2)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </button>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
