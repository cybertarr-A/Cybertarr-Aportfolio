"use client";

import { motion } from "framer-motion";
import { ArrowRight, Bot, Cpu, Database, Server } from "lucide-react";

export function SystemsBuilt() {
  return (
    <section className="py-24 relative z-10 border-t border-white/5 bg-[#05050A]">
      <div className="container mx-auto px-6 max-w-6xl">
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl font-heading font-bold mb-4 text-white text-center"
        >
          <span className="text-accent">&gt;</span> Standard Architecture Flow
        </motion.h2>
        <p className="text-center text-gray-400 font-mono text-sm mb-16">
          Visualizing my typical end-to-end intelligence pipeline.
        </p>

        <div className="relative">
          {/* Main Pipeline Pathway Line */}
          <div className="absolute top-1/2 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary/30 to-transparent -translate-y-1/2 hidden lg:block" />

          <div className="grid grid-cols-1 lg:grid-cols-4 gap-8 relative z-10">
            
            {/* Step 1: Ingestion */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="glass-panel p-6 rounded-xl border border-white/10 flex flex-col items-center text-center relative group"
            >
              <div className="w-16 h-16 rounded-full bg-black/50 border border-primary/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:shadow-[0_0_20px_rgba(0,230,255,0.4)]">
                <Bot className="w-8 h-8 text-primary" />
              </div>
              <h3 className="text-white font-bold mb-2">1. Ingestion / Scrapers</h3>
              <p className="text-xs text-gray-400 font-mono">
                n8n workflows, custom Python scrapers, and external APIs feed raw data into the system.
              </p>
              <ArrowRight className="absolute -right-6 top-1/2 -translate-y-1/2 text-primary/50 hidden lg:block" />
            </motion.div>

            {/* Step 2: Processing Layer */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.3 }}
              className="glass-panel p-6 rounded-xl border border-white/10 flex flex-col items-center text-center relative group"
            >
              <div className="w-16 h-16 rounded-full bg-black/50 border border-secondary/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:shadow-[0_0_20px_rgba(138,63,252,0.4)]">
                <Cpu className="w-8 h-8 text-secondary" />
              </div>
              <h3 className="text-white font-bold mb-2">2. Intelligence (FastAPI)</h3>
              <p className="text-xs text-gray-400 font-mono">
                FastAPI layer handles RAG, LLM orchestration (PyTorch/Langchain), and state prediction.
              </p>
              <ArrowRight className="absolute -right-6 top-1/2 -translate-y-1/2 text-secondary/50 hidden lg:block" />
            </motion.div>

            {/* Step 3: State / Database */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.5 }}
              className="glass-panel p-6 rounded-xl border border-white/10 flex flex-col items-center text-center relative group"
            >
              <div className="w-16 h-16 rounded-full bg-black/50 border border-white/30 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <Database className="w-8 h-8 text-gray-300" />
              </div>
              <h3 className="text-white font-bold mb-2">3. Storage & Vector DB</h3>
              <p className="text-xs text-gray-400 font-mono">
                Redis for caching high-frequency streams, PostgreSQL for relational state, Pinecone/PGVector for embeddings.
              </p>
              <ArrowRight className="absolute -right-6 top-1/2 -translate-y-1/2 text-white/30 hidden lg:block" />
            </motion.div>

            {/* Step 4: Presentation */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.7 }}
              className="glass-panel p-6 rounded-xl border border-white/10 flex flex-col items-center text-center group"
            >
              <div className="w-16 h-16 rounded-full bg-black/50 border border-accent/50 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform group-hover:shadow-[0_0_20px_rgba(255,0,60,0.4)]">
                <Server className="w-8 h-8 text-accent" />
              </div>
              <h3 className="text-white font-bold mb-2">4. Client (React/Next)</h3>
              <p className="text-xs text-gray-400 font-mono">
                Real-time WebSocket or REST data delivery to dynamic dashboards and immersive interfaces.
              </p>
            </motion.div>

          </div>
        </div>
      </div>
    </section>
  );
}
