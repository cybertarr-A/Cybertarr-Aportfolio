"use client";

import LiquidEther from "./LiquidEther";

export function ClientCanvas() {
  return (
    <div className="fixed inset-0 z-10 pointer-events-none *:pointer-events-auto">
      <LiquidEther
          colors={[ '#001A88', '#0066FF', '#00E6FF' ]} // Deep blue to Cyan
          mouseForce={30}
          cursorSize={150}
          isViscous
          viscous={30}
          iterationsViscous={32}
          iterationsPoisson={32}
          resolution={0.5}
          isBounce={false}
          autoDemo
          autoSpeed={0.5}
          autoIntensity={2.2}
          takeoverDuration={0.25}
          autoResumeDelay={3000}
          autoRampDuration={0.6}
      />
    </div>
  );
}
