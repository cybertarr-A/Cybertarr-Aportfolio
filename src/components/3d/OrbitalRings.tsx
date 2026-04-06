"use client";

import { useMemo, useRef, useState, useEffect } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";
import { useSystemStore } from "@/store/systemStore";

const RING_CONFIGS = [
    { count: 180, radius: 3, speed: 0.2, color: new THREE.Color('#00E6FF') },
    { count: 300, radius: 5, speed: -0.15, color: new THREE.Color('#8A3FFC') },
    { count: 450, radius: 7.5, speed: 0.1, color: new THREE.Color('#00E6FF') }
];

export function OrbitalRings() {
    const meshRef = useRef<THREE.InstancedMesh>(null);
    const { viewport, mouse } = useThree();
    const interactionState = useSystemStore(state => state.interactionState);
    
    // Total instances
    const totalCount = RING_CONFIGS.reduce((sum, config) => sum + config.count, 0);

    // Initial positioning data
    const particles = useMemo(() => {
        const dummy = new THREE.Object3D();
        const positions = new Float32Array(totalCount * 3);
        const originalPositions = new Float32Array(totalCount * 3);
        const colors = new Float32Array(totalCount * 3);
        const sizes = new Float32Array(totalCount);
        const ringIds = new Int32Array(totalCount);
        
        let offset = 0;
        
        RING_CONFIGS.forEach((config, ringIdx) => {
            for (let i = 0; i < config.count; i++) {
                const angle = (i / config.count) * Math.PI * 2;
                const r = config.radius + (Math.random() - 0.5) * 0.4; // slight jitter
                
                const x = Math.cos(angle) * r;
                const z = Math.sin(angle) * r;
                const y = (Math.random() - 0.5) * 0.5;

                positions[offset * 3] = x;
                positions[offset * 3 + 1] = y;
                positions[offset * 3 + 2] = z;

                originalPositions[offset * 3] = x;
                originalPositions[offset * 3 + 1] = y;
                originalPositions[offset * 3 + 2] = z;

                colors[offset * 3] = config.color.r;
                colors[offset * 3 + 1] = config.color.g;
                colors[offset * 3 + 2] = config.color.b;

                // Random pulse offset
                sizes[offset] = Math.random() * Math.PI * 2;
                ringIds[offset] = ringIdx;
                
                offset++;
            }
        });

        return { positions, originalPositions, colors, sizes, ringIds };
    }, [totalCount]);

    const dummy = useMemo(() => new THREE.Object3D(), []);
    const tempColor = useMemo(() => new THREE.Color(), []);
    const globalMouse = useRef(new THREE.Vector2(0, 0));

    // Set initial colors and global mouse tracker
    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            globalMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            globalMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", handleMouseMove);

        if (meshRef.current) {
            for (let i = 0; i < totalCount; i++) {
                tempColor.setRGB(particles.colors[i*3], particles.colors[i*3+1], particles.colors[i*3+2]);
                meshRef.current.setColorAt(i, tempColor);
            }
            if (meshRef.current.instanceColor) {
                meshRef.current.instanceColor.needsUpdate = true;
            }
        }
        
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, [totalCount, particles, tempColor]);

    useFrame((state) => {
        if (!meshRef.current) return;

        const time = state.clock.getElapsedTime();
        const pointer3D = new THREE.Vector3(
            (globalMouse.current.x * viewport.width) / 2,
            (globalMouse.current.y * viewport.height) / 2,
            0
        );

        // State mappings
        const isAIHover = interactionState === 'ai_hover';
        const isAutomationHover = interactionState === 'automation_hover';
        const isRealityHover = interactionState === 'reality_hover';

        let offset = 0;

        RING_CONFIGS.forEach((config, ringIdx) => {
            // Base speed modifications
            let currentSpeed = config.speed;
            
            if (isAIHover && ringIdx === 0) currentSpeed *= 4; // Inner ring accelerates
            if (isAutomationHover) currentSpeed *= 2; // All rings accelerate
            if (isRealityHover) currentSpeed *= 0.1; // System slows down

            const tiltX = isRealityHover ? 0 : Math.sin(time * 0.5 + ringIdx) * 0.1;
            const tiltZ = isRealityHover ? 0 : Math.cos(time * 0.3 + ringIdx) * 0.1;

            for (let i = 0; i < config.count; i++) {
                const ox = particles.originalPositions[offset * 3];
                const oy = particles.originalPositions[offset * 3 + 1];
                const oz = particles.originalPositions[offset * 3 + 2];

                // Orbital Rotation
                const angleOffset = time * currentSpeed;
                const cosA = Math.cos(angleOffset);
                const sinA = Math.sin(angleOffset);
                
                // Rotate flat
                let rx = ox * cosA - oz * sinA;
                let rz = ox * sinA + oz * cosA;
                let ry = oy;

                // Apply Ring Tilt
                const p = new THREE.Vector3(rx, ry, rz);
                p.applyAxisAngle(new THREE.Vector3(1, 0, 0), tiltX);
                p.applyAxisAngle(new THREE.Vector3(0, 0, 1), tiltZ);

                rx = p.x; ry = p.y; rz = p.z;

                // Gravity Distortion (Cursor Proximity)
                const nodePos = new THREE.Vector3(rx, ry, rz);
                // Simple 2D projection distance check
                const screenDist = Math.sqrt(Math.pow(rx - pointer3D.x, 2) + Math.pow(ry - pointer3D.y, 2));

                if (screenDist < 3.0 && !isRealityHover) {
                    const force = (3.0 - screenDist) / 3.0; // 0 to 1
                    
                    // Pull towards cursor slightly in Z, and push away in XY
                    const dir = new THREE.Vector3(rx - pointer3D.x, ry - pointer3D.y, 0).normalize();
                    rx += dir.x * force * 1.5;
                    ry += dir.y * force * 1.5;
                    rz += force * 2.0;
                }

                // Wave pattern on Automation hover
                if (isAutomationHover) {
                    ry += Math.sin(rx * 2 + time * 5) * 0.5;
                }

                // Data Packets (Size Pulsing)
                const pulseIndex = particles.sizes[offset];
                let scale = 0.05; // Base particle size
                
                if (isAIHover) {
                     scale = 0.05 + Math.max(0, Math.sin(time * 10 + pulseIndex)) * 0.08;
                } else {
                     scale = 0.05 + Math.max(0, Math.sin(time * 3 + pulseIndex)) * 0.03;
                }

                dummy.position.set(rx, ry, rz);
                dummy.scale.set(scale, scale, scale);
                dummy.updateMatrix();

                // Dynamic Colors
                const baseR = particles.colors[offset * 3];
                const baseG = particles.colors[offset * 3 + 1];
                const baseB = particles.colors[offset * 3 + 2];

                if (isAIHover) {
                    // Flash electric white
                    const mix = Math.max(0, Math.sin(time * 15 + pulseIndex));
                    tempColor.setRGB(
                        baseR + (1 - baseR) * mix,
                        baseG + (1 - baseG) * mix,
                        baseB + (1 - baseB) * mix
                    );
                } else if (isRealityHover) {
                    // Dim/Stabilize colors
                    tempColor.setRGB(baseR * 0.5, baseG * 0.5, baseB * 0.5);
                } else {
                    tempColor.setRGB(baseR, baseG, baseB);
                }

                if (meshRef.current) {
                    meshRef.current.setMatrixAt(offset, dummy.matrix);
                    meshRef.current.setColorAt(offset, tempColor);
                }

                offset++;
            }
        });

        if (meshRef.current) {
            meshRef.current.instanceMatrix.needsUpdate = true;
            if (meshRef.current.instanceColor) meshRef.current.instanceColor.needsUpdate = true;

            // Group rotation tied vaguely to scroll
            const scrollOffset = window.scrollY / (document.body.scrollHeight || 1);
            meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, scrollOffset * Math.PI * 0.25, 0.05);
        }
    });

    // Circular Glow Texture
    const texture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.2, 'rgba(255, 255, 255, 0.8)');
        gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.2)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
        return new THREE.CanvasTexture(canvas);
    }, []);

    return (
        <group rotation={[Math.PI * 0.15, 0, 0]}>
            <instancedMesh ref={meshRef} args={[undefined, undefined, totalCount]}>
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial 
                    map={texture as THREE.Texture}
                    transparent={true} 
                    depthWrite={false} 
                    blending={THREE.AdditiveBlending}
                />
            </instancedMesh>
        </group>
    );
}
