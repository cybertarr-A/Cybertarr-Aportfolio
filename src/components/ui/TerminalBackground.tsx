
"use client";

import { useEffect, useState, useRef } from "react";
import { useSystemStore } from "@/store/systemStore";

// Typewriter component for individual log lines
const TypewriterLine = ({ source, text }: { source: string; text: string }) => {
    const [displayedText, setDisplayedText] = useState("");
    
    useEffect(() => {
        let currentIndex = 0;
        let animationFrameId: number;
        let lastTime = performance.now();

        const typeChar = (time: number) => {
            if (time - lastTime > 20) { // Approx 50cps (20ms delay)
                setDisplayedText(text.slice(0, currentIndex + 1));
                currentIndex++;
                lastTime = time;
            }
            if (currentIndex < text.length) {
                animationFrameId = requestAnimationFrame(typeChar);
            }
        };

        animationFrameId = requestAnimationFrame(typeChar);
        return () => cancelAnimationFrame(animationFrameId);
    }, [text]);

    return (
        <div className="font-mono text-xs opacity-80 mt-1 whitespace-pre-wrap">
            <span className="text-[#8A3FFC] mr-2">[{source}]</span>
            <span className="text-[#00E6FF]">{displayedText}</span>
            {displayedText.length === text.length ? null : <span className="animate-pulse bg-[#00E6FF] w-2 h-3 inline-block ml-1 align-middle" />}
        </div>
    );
};

export function TerminalBackground() {
    const logs = useSystemStore(state => state.logs);
    const endRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        // Auto scroll to bottom
        if (endRef.current) {
            endRef.current.scrollIntoView({ behavior: 'smooth' });
        }
    }, [logs]);

    return (
        <div className="fixed inset-y-0 left-0 w-64 z-0 pointer-events-none overflow-hidden opacity-[0.3] flex flex-col p-6 mix-blend-add [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)] border-r border-[#00E6FF]/10 bg-gradient-to-r from-[#00E6FF]/5 to-transparent">
            {/* Terminal Stream */}
            <div className="flex-1 flex flex-col justify-end">
                {logs.map((log) => (
                    <TypewriterLine key={log.id} source={log.source} text={log.message} />
                ))}
                <div ref={endRef} />
            </div>
            
            {/* Decorative Glitch Layer */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,0,0,0.8)_1px,transparent_1px)] bg-[size:100%_4px] pointer-events-none" />
        </div>
    );
}
