"use client";

import { motion } from "framer-motion";
import { Network, Database, Container, ShieldAlert } from "lucide-react";

export function About() {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.2 } },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -20 },
    visible: { opacity: 1, x: 0 },
  };

  return (
    <section id="about" className="py-24 relative z-10 border-t border-white/5">
      <div className="container mx-auto px-6">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 lg:grid-cols-2 gap-16"
        >
          {/* Identity/Positioning */}
          <div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-heading font-bold mb-8 text-white">
              <span className="text-primary mr-2">&gt;</span> Who I Am
            </motion.h2>
            <motion.div variants={itemVariants} className="glass-panel p-8 rounded-xl relative overflow-hidden">
              <div className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-primary to-secondary" />
              <div className="space-y-6 font-mono text-sm leading-relaxed text-gray-300">
                <p>
                  I’m <strong className="text-white">Jashraj Shah (Cybertarr-A)</strong> — an AI Systems Developer and Research-Oriented Engineer focused on building intelligent, real-world systems that combine automation, machine learning, and scalable backend architectures.
                </p>
                <p>
                  My work centers around <strong className="text-primary">AI system design, Python automation, and production-grade backend development</strong>, where I build end-to-end pipelines integrating APIs, data processing, and intelligent decision-making. I specialize in creating systems that move beyond prototypes into usable, deployable solutions.
                </p>
                <p>
                  I’ve worked on projects involving <strong className="text-secondary">AI-powered analytics, cybersecurity automation, multimodal systems, and generative AI</strong>. My approach combines system-level thinking with hands-on engineering to solve complex problems efficiently.
                </p>
              </div>
            </motion.div>
          </div>

          {/* Skill Map / How I Think */}
          <div>
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-heading font-bold mb-8 text-white">
              <span className="text-secondary mr-2">&gt;</span> Architecture & Mindset
            </motion.h2>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <motion.div variants={itemVariants} className="glass-panel p-6 rounded-lg border border-primary/20 hover:border-primary/50 transition-colors group">
                <div className="mb-4 text-primary group-hover:scale-110 transition-transform origin-left">
                  <Network className="w-8 h-8" />
                </div>
                <h3 className="text-white font-bold mb-2">Systems Over Scripts</h3>
                <p className="text-xs text-gray-400 font-mono">I don't just write scripts; I build distributed nodes that form a cohesive intelligence network.</p>
              </motion.div>

              <motion.div variants={itemVariants} className="glass-panel p-6 rounded-lg border border-secondary/20 hover:border-secondary/50 transition-colors group">
                <div className="mb-4 text-secondary group-hover:scale-110 transition-transform origin-left">
                  <Database className="w-8 h-8" />
                </div>
                <h3 className="text-white font-bold mb-2">Data-Driven RAG</h3>
                <p className="text-xs text-gray-400 font-mono">My pipelines structure raw chaos into actionable vectors using high-performance Postgres & Redis.</p>
              </motion.div>

              <motion.div variants={itemVariants} className="glass-panel p-6 rounded-lg border border-white/10 hover:border-white/30 transition-colors group">
                <div className="mb-4 text-gray-300 group-hover:scale-110 transition-transform origin-left">
                  <Container className="w-8 h-8" />
                </div>
                <h3 className="text-white font-bold mb-2">Production First</h3>
                <p className="text-xs text-gray-400 font-mono">Everything I build is Dockerized, strictly typed, and designed to deploy securely anywhere.</p>
              </motion.div>

              <motion.div variants={itemVariants} className="glass-panel p-6 rounded-lg border border-accent/20 hover:border-accent/50 transition-colors group">
                <div className="mb-4 text-accent group-hover:scale-110 transition-transform origin-left">
                  <ShieldAlert className="w-8 h-8" />
                </div>
                <h3 className="text-white font-bold mb-2">Security Automation</h3>
                <p className="text-xs text-gray-400 font-mono">AI isn't a vulnerability, it's a shield. I engineer intelligent bug bounty & SRE tooling.</p>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
