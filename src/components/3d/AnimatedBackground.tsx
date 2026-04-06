"use client";

import { useRef, useMemo, useEffect } from 'react';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const GRID_SIZE = 80; // 80x80 grid = 6400 particles
const SPACING = 0.4; // Distance between particles

export function AnimatedBackground() {
    const etherRef = useRef<THREE.InstancedMesh>(null);
    const { viewport } = useThree();
    
    const globalMouse = useRef(new THREE.Vector2(0, 0));

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            // Map mouse to [-1, 1], with some scaling to match world size better
            globalMouse.current.x = (e.clientX / window.innerWidth) * 2 - 1;
            globalMouse.current.y = -(e.clientY / window.innerHeight) * 2 + 1;
        };
        window.addEventListener("mousemove", handleMouseMove);
        return () => window.removeEventListener("mousemove", handleMouseMove);
    }, []);

    // Create soft glowing droplet for ether
    const glowTexture = useMemo(() => {
        const canvas = document.createElement('canvas');
        canvas.width = 64;
        canvas.height = 64;
        const ctx = canvas.getContext('2d');
        if (!ctx) return null;
        const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
        gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
        gradient.addColorStop(0.3, 'rgba(255, 255, 255, 0.6)');
        gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, 64, 64);
        return new THREE.CanvasTexture(canvas);
    }, []);

    // Generate grid topologies
    const { originalPos } = useMemo(() => {
        const orig = [];
        const offset = (GRID_SIZE * SPACING) / 2;
        
        for (let x = 0; x < GRID_SIZE; x++) {
            for (let z = 0; z < GRID_SIZE; z++) {
                orig.push({
                    x: x * SPACING - offset,
                    z: z * SPACING - offset,
                });
            }
        }
        return { originalPos: orig };
    }, []);

    useFrame((state) => {
        if (!etherRef.current) return;
        
        const time = state.clock.getElapsedTime();
        const dummy = new THREE.Object3D();
        const tempColor = new THREE.Color();
        
        // Raycast-like approximation mapping global mouse to ether floor
        const pointer3D = new THREE.Vector3(
            globalMouse.current.x * (viewport.width / 2) * 1.5,
            0,
            -globalMouse.current.y * (viewport.height / 2) * 2.5
        );

        const colorLow = new THREE.Color('#8A3FFC');  // Deep Purple
        const colorHigh = new THREE.Color('#00E6FF'); // Cyan crests
        
        let i = 0;
        
        for (let x = 0; x < GRID_SIZE; x++) {
            for (let z = 0; z < GRID_SIZE; z++) {
                const ox = originalPos[i].x;
                const oz = originalPos[i].z;
                
                // --- LIQUID MATH ---
                // Complex interference pattern of sine waves for fluid look
                const wave1 = Math.sin(ox * 0.5 + time) * Math.cos(oz * 0.5 + time) * 1.5;
                const wave2 = Math.sin(ox * 0.2 - time * 0.5) * 1.2;
                const wave3 = Math.cos(oz * 0.3 + time * 0.8) * 1.2;
                
                let y = wave1 + wave2 + wave3;
                
                // --- MOUSE RIPPLE PHYSICS ---
                const dist = Math.sqrt(Math.pow(ox - pointer3D.x, 2) + Math.pow(oz - pointer3D.z, 2));
                
                if (dist < 8.0) {
                    // Create an outward rippling push from the cursor
                    const ripple = Math.sin(dist * 2.0 - time * 10.0);
                    // Damping based on distance
                    const force = (8.0 - dist) / 8.0; 
                    y += ripple * force * 2.0;
                }

                // Smooth scaling based on height (peaks are larger)
                const scale = Math.max(0.2, (y + 4) * 0.15);

                dummy.position.set(ox, y - 4, oz); // Shift entire sea down by 4
                dummy.scale.setScalar(scale);
                dummy.updateMatrix();
                etherRef.current.setMatrixAt(i, dummy.matrix);

                // --- ETHER COLOR INTERPOLATION ---
                // Normalize height approx [-4, 4] to [0, 1] for color mixing
                const heightPhase = Math.max(0, Math.min(1, (y + 3) / 6));
                tempColor.lerpColors(colorLow, colorHigh, heightPhase);
                
                // Add extreme white glint on the absolute peaks or mouse ripples
                if (y > 3.0 || (dist < 4.0 && y > 1.0)) {
                    tempColor.lerp(new THREE.Color('#FFFFFF'), 0.5);
                }

                etherRef.current.setColorAt(i, tempColor);
                i++;
            }
        }

        etherRef.current.instanceMatrix.needsUpdate = true;
        if(etherRef.current.instanceColor) etherRef.current.instanceColor.needsUpdate = true;
    });

    return (
        <group rotation={[Math.PI / 8, 0, 0]}>
            <instancedMesh ref={etherRef} args={[undefined, undefined, GRID_SIZE * GRID_SIZE]}>
                {/* We use a simple plane facing the camera to act as a volumetric particle */}
                <planeGeometry args={[1, 1]} />
                <meshBasicMaterial 
                    map={glowTexture as THREE.Texture}
                    color="#FFFFFF"
                    transparent
                    opacity={0.8}
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                    side={THREE.DoubleSide}
                />
            </instancedMesh>
        </group>
    );
}
