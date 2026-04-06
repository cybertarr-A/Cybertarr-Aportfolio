"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useSystemStore } from "@/store/systemStore";

export function NeonRobot() {
    const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);
    const { robotSpeech, setRobotSpeech, addLog } = useSystemStore();

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            setMousePos({
                x: (e.clientX / window.innerWidth) * 2 - 1,
                y: -(e.clientY / window.innerHeight) * 2 + 1
            });
        };
        window.addEventListener("mousemove", handleMouseMove);

        setTimeout(() => {
            setRobotSpeech("SYSTEM INITIALIZED. AWAITING INPUT.");
            addLog("AI_UNIT", "System greeting initialized.");
        }, 3000);

        setTimeout(() => setRobotSpeech(null), 8000);

        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [setRobotSpeech, addLog]);

    const handleHover = () => {
        setIsHovered(true);
        setRobotSpeech("SCANNING SIGNATURE...");
        addLog("AI_UNIT", "Direct entity interaction detected. Analyzing...");
        setTimeout(() => setRobotSpeech(null), 4000);
    };

    // Calculate eye tracking inside visor
    const eyeX = mousePos.x * 15;
    const eyeY = -mousePos.y * 5;

    // Head subtle tilt
    const headRotate = mousePos.x * 12;
    const headX = mousePos.x * 20;
    const headY = -mousePos.y * 10;

    // Arm tracking (point towards mouse)
    const armRotateLeft = mousePos.x * 20 + mousePos.y * 10;
    const armRotateRight = mousePos.x * 20 - mousePos.y * 10;

    return (
        <div className="fixed bottom-12 right-12 z-50 flex items-end gap-6 pointer-events-none perspective-1000">
            {/* Holographic Speech Log */}
            <AnimatePresence>
                {robotSpeech && (
                    <motion.div
                        initial={{ opacity: 0, y: 20, scale: 0.9, x: 20 }}
                        animate={{ opacity: 1, y: 0, scale: 1, x: 0 }}
                        exit={{ opacity: 0, scale: 0.9, filter: "blur(4px)", x: 20 }}
                        className="bg-[#001122]/80 backdrop-blur-md border border-[#00E6FF]/40 rounded-lg shadow-[0_0_20px_rgba(0,230,255,0.2)] font-mono text-sm origin-bottom-right mb-24 pointer-events-auto relative overflow-hidden"
                    >
                        <div className="px-5 py-3 flex items-start gap-4">
                            <div className="flex flex-col items-center mt-1">
                                <motion.div 
                                    className="w-2 h-2 rounded-sm bg-[#00E6FF]"
                                    animate={{ opacity: [1, 0.4, 1] }} 
                                    transition={{ duration: 1.5, repeat: Infinity }}
                                />
                            </div>
                            <div>
                                <span className="text-[#8A3FFC] text-[10px] tracking-widest block mb-1">UNIT://ECHO-7</span>
                                <span className="text-[#00E6FF] tracking-wide">{robotSpeech}</span>
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Floating Mecha Robot */}
            <motion.div 
                className="relative w-40 h-40 cursor-crosshair pointer-events-auto"
                onMouseEnter={handleHover}
                onMouseLeave={() => setIsHovered(false)}
                animate={{ y: [0, -15, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            >
                {/* Engine Glow Underneath */}
                <motion.div 
                    className="absolute bottom-4 left-1/2 -translate-x-1/2 w-20 h-20 bg-[#00E6FF] rounded-full blur-[40px]"
                    animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.5, 0.3] }}
                    transition={{ duration: 0.5, repeat: Infinity }}
                />

                <svg
                    viewBox="0 0 200 200"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-full h-full drop-shadow-[0_0_10px_rgba(0,230,255,0.4)]"
                >
                    {/* Left Thruster Arm */}
                    <motion.g 
                        style={{ originX: "60px", originY: "110px" }}
                        animate={{ rotate: armRotateLeft }}
                    >
                        {/* Shoulder */}
                        <circle cx="60" cy="110" r="12" fill="#1C1C28" stroke="#00E6FF" strokeWidth="2" />
                        {/* Gun/Thruster barrel */}
                        <path d="M60 110 L30 140 L20 135 L45 100 Z" fill="#0D0D14" stroke="#8A3FFC" />
                        {isHovered && (
                            <motion.circle 
                                cx="25" cy="138" r="5" fill="#00E6FF"
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 0.3, repeat: Infinity }}
                            />
                        )}
                    </motion.g>

                    {/* Right Thruster Arm */}
                    <motion.g 
                        style={{ originX: "140px", originY: "110px" }}
                        animate={{ rotate: armRotateRight }}
                    >
                        {/* Shoulder */}
                        <circle cx="140" cy="110" r="12" fill="#1C1C28" stroke="#00E6FF" strokeWidth="2" />
                        {/* Gun/Thruster barrel */}
                        <path d="M140 110 L170 140 L180 135 L155 100 Z" fill="#0D0D14" stroke="#8A3FFC" />
                        {isHovered && (
                            <motion.circle 
                                cx="175" cy="138" r="5" fill="#00E6FF"
                                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                                transition={{ duration: 0.3, repeat: Infinity }}
                            />
                        )}
                    </motion.g>

                    {/* Main Torso Block */}
                    <path d="M65 140 L135 140 L150 90 L50 90 Z" fill="#13131F" stroke="#00E6FF" strokeWidth="2" strokeLinejoin="round" />
                    <path d="M75 140 L100 170 L125 140 Z" fill="#0A0A10" stroke="#00E6FF" strokeWidth="2" strokeLinejoin="round" />

                    {/* Torso Core / Reactor */}
                    <circle cx="100" cy="115" r="15" fill="#001a33" />
                    <motion.circle 
                        cx="100" cy="115" r="8" fill="#00E6FF"
                        animate={{ scale: [1, 1.3, 1] }}
                        transition={{ duration: 2, repeat: Infinity }}
                    />
                    
                    {/* Head Group - Translates and Rotates with mouse */}
                    <motion.g
                        animate={{ x: headX, y: headY, rotate: headRotate }}
                        style={{ originX: "100px", originY: "65px" }}
                    >
                        {/* Neck Joint */}
                        <rect x="90" y="75" width="20" height="15" fill="#1C1C28" stroke="#8A3FFC" strokeWidth="2" />

                        {/* Head Casing */}
                        <path 
                            d="M60 40 L140 40 L150 75 L50 75 Z" 
                            fill="#1A1A24" stroke="#00E6FF" strokeWidth="2" strokeLinejoin="round" 
                        />
                        <path 
                            d="M65 25 L135 25 L140 40 L60 40 Z" 
                            fill="#0D0D14" stroke="#00E6FF" strokeWidth="2" strokeLinejoin="round" 
                        />

                        {/* Visor Area */}
                        <path d="M55 50 L145 50 L140 70 L60 70 Z" fill="#000000" />
                        
                        {/* Cyan Visor Screen */}
                        <path d="M60 52 L140 52 L137 68 L63 68 Z" fill="rgba(0, 230, 255, 0.15)" stroke="#00E6FF" strokeWidth="1" />

                        {/* Eye Tracking Group inside Visor */}
                        <motion.g animate={{ x: eyeX, y: eyeY }}>
                            {isHovered ? (
                                <>
                                    {/* Angry / Focused Eyes */}
                                    <path d="M85 55 L100 62 L85 66 Z" fill="#00E6FF" className="animate-pulse" />
                                    <path d="M115 55 L100 62 L115 66 Z" fill="#00E6FF" className="animate-pulse" />
                                </>
                            ) : (
                                <>
                                    {/* Normal Oval Eyes */}
                                    <ellipse cx="90" cy="60" rx="6" ry="4" fill="#00E6FF" />
                                    <ellipse cx="110" cy="60" rx="6" ry="4" fill="#00E6FF" />
                                </>
                            )}
                        </motion.g>

                        {/* Left/Right Audio Sensors (Ears) */}
                        <rect x="42" y="45" width="8" height="25" fill="#1C1C28" stroke="#8A3FFC" />
                        <rect x="150" y="45" width="8" height="25" fill="#1C1C28" stroke="#8A3FFC" />
                    </motion.g>

                    {/* Main Thruster Flames (Animation) */}
                    <motion.path 
                        d="M90 170 L100 195 L110 170 Z" 
                        fill="#00E6FF"
                        animate={{ d: [
                            "M90 170 L100 195 L110 170 Z",
                            "M92 170 L100 185 L108 170 Z",
                            "M90 170 L100 200 L110 170 Z"
                        ]}}
                        transition={{ duration: 0.1, repeat: Infinity }}
                    />
                </svg>

            </motion.div>
        </div>
    );
}
