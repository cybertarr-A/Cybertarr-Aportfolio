"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export function BootScreen() {
    const [loading, setLoading] = useState(true);
    const [progress, setProgress] = useState(0);
    const [logs, setLogs] = useState<string[]>([]);
    
    // Simulate boot sequence
    useEffect(() => {
        const sequence = [
            "Mounting biological core...",
            "Establishing neural link with CyberTarr-A...",
            "Bypassing security protocols...",
            "Loading React components [OK]",
            "Initializing Three.js WebGL canvas...",
            "Compiling GLSL shaders...",
            "Generating 3D models and materials...",
            "Deploying instance containers to edge...",
            "Decrypting project archives...",
            "System check complete. All nodes connected."
        ];

        let currentLogIndex = 0;
        
        const logInterval = setInterval(() => {
            if (currentLogIndex < sequence.length) {
                setLogs(prev => [...prev, sequence[currentLogIndex]]);
                setProgress(Math.floor(((currentLogIndex + 1) / sequence.length) * 100));
                currentLogIndex++;
            } else {
                clearInterval(logInterval);
                setTimeout(() => setLoading(false), 800);
            }
        }, 200); // Fast log typing

        return () => clearInterval(logInterval);
    }, []);

    return (
        <AnimatePresence>
            {loading && (
                <motion.div
                    initial={{ opacity: 1 }}
                    exit={{ opacity: 0, scale: 1.1, filter: "blur(10px)" }}
                    transition={{ duration: 0.8, ease: "easeInOut" }}
                    className="fixed inset-0 z-[100] bg-[#020204] text-primary font-mono flex flex-col justify-center px-8 md:px-24"
                >
                    <div className="absolute inset-0 bg-[linear-gradient(rgba(0,230,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(0,230,255,0.03)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none opacity-20" />
                    
                    <div className="max-w-3xl w-full mx-auto relative z-10">
                        {/* Terminal Window Header */}
                        <div className="flex gap-2 mb-4 border-b border-primary/20 pb-2">
                            <span className="w-3 h-3 rounded-full bg-red-500/80 animate-pulse" />
                            <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
                            <span className="w-3 h-3 rounded-full bg-green-500/80" />
                        </div>

                        {/* Boot Logs */}
                        <div className="h-48 md:h-64 overflow-hidden mb-8 text-xs md:text-sm text-primary/80">
                            {logs.map((log, index) => (
                                <motion.div 
                                    key={index}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    className="mb-1"
                                >
                                    <span className="text-secondary mr-2">[SYSTEM]</span>
                                    {log}
                                </motion.div>
                            ))}
                            {progress < 100 && (
                                <motion.div 
                                    animate={{ opacity: [1, 0, 1] }} 
                                    transition={{ repeat: Infinity, duration: 0.8 }}
                                    className="mt-1"
                                >
                                    _
                                </motion.div>
                            )}
                        </div>

                        {/* Big Typing Text */}
                        <div className="text-2xl md:text-4xl font-bold text-white mb-8 filter drop-shadow-[0_0_10px_rgba(0,230,255,0.5)]">
                            &gt; Initializing Cybertarr-A Codespace...
                            <motion.span 
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ repeat: Infinity, duration: 0.8 }}
                                className="inline-block"
                            >
                                _
                            </motion.span>
                        </div>

                        {/* Progress Bar */}
                        <div className="w-full h-1 bg-white/10 rounded-full overflow-hidden">
                            <motion.div 
                                className="h-full bg-gradient-to-r from-primary to-secondary"
                                initial={{ width: "0%" }}
                                animate={{ width: `${progress}%` }}
                                transition={{ ease: "linear", duration: 0.2 }}
                            />
                        </div>
                        <div className="mt-2 text-right text-xs text-secondary font-bold tracking-widest">
                            {progress}%
                        </div>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
}
