"use client";

import { useMemo, useRef } from "react";
import { useFrame, useThree } from "@react-three/fiber";
import * as THREE from "three";

// Custom shader material for the swarm particles
const particleVertexShader = `
  uniform float uTime;
  uniform vec2 uMouse;
  attribute float aScale;
  attribute float aRandomPhase;
  varying vec3 vColor;
  
  void main() {
    vec3 pos = position;
    
    // Wave animation
    float wave = sin(pos.x * 2.0 + uTime + aRandomPhase) * 0.1;
    wave += cos(pos.y * 1.5 + uTime * 0.8) * 0.1;
    pos.z += wave;

    // Mouse repulsion physics
    vec4 mvPosition = modelViewMatrix * vec4(pos, 1.0);
    vec3 screenPos = (projectionMatrix * mvPosition).xyz;
    
    vec2 p2d = vec2(pos.x, pos.y);
    float dist = distance(p2d, vec2(uMouse.x * 10.0, uMouse.y * 10.0));
    
    if (dist < 3.0) {
      float force = (3.0 - dist) / 3.0; // 0 to 1
      vec2 dir = normalize(p2d - vec2(uMouse.x * 10.0, uMouse.y * 10.0));
      pos.x += dir.x * force * 0.5;
      pos.y += dir.y * force * 0.5;
      pos.z += force * 1.5;
    }

    vColor = vec3(0.0, 0.9, 1.0) * (aScale * 0.8 + 0.2); // primary color mixing

    gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
    gl_PointSize = (15.0 * aScale) / -gl_Position.z;
    
    // Pulse size based on time
    gl_PointSize *= (1.0 + sin(uTime * 2.0 + aRandomPhase) * 0.2);
  }
`;

const particleFragmentShader = `
  varying vec3 vColor;
  
  void main() {
    float r = distance(gl_PointCoord, vec2(0.5));
    if (r > 0.5) discard;
    
    // Soft particle glow
    float alpha = 1.0 - (r * 2.0);
    alpha = pow(alpha, 1.5);
    
    gl_FragColor = vec4(vColor, alpha * 0.8);
  }
`;

export function ParticleSwarm() {
  const pointsRef = useRef<THREE.Points>(null);
  const materialRef = useRef<THREE.ShaderMaterial>(null);
  const { viewport } = useThree();

  const particleCount = 4000;

  const [positions, scales, randomPhases] = useMemo(() => {
    const p = new Float32Array(particleCount * 3);
    const s = new Float32Array(particleCount);
    const rp = new Float32Array(particleCount);

    for (let i = 0; i < particleCount; i++) {
        // Distribute in a wide cylinder/torus shape
        const radius = 2 + Math.random() * 8;
        const theta = Math.random() * Math.PI * 2;
        const height = (Math.random() - 0.5) * 15;

        p[i * 3] = Math.cos(theta) * radius;
        p[i * 3 + 1] = height;
        p[i * 3 + 2] = Math.sin(theta) * radius + (Math.random() - 0.5) * 2;

        s[i] = Math.random();
        rp[i] = Math.random() * Math.PI * 2;
    }

    return [p, s, rp];
  }, [particleCount]);

  const uniforms = useMemo(() => ({
    uTime: { value: 0 },
    uMouse: { value: new THREE.Vector2(0, 0) },
  }), []);

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    if (materialRef.current) {
        materialRef.current.uniforms.uTime.value = time;
        // Normalize mouse to view coordinates
        materialRef.current.uniforms.uMouse.value.set(
            (state.pointer.x * viewport.width) / 2,
            (state.pointer.y * viewport.height) / 2
        );
    }

    if (pointsRef.current) {
        // Slow rotation
        pointsRef.current.rotation.y = time * 0.05;
        
        // Tie camera/group positioning vaguely to scroll
        // The page scroll affects the local position slightly for depth effect
        const scrollOffset = window.scrollY / (document.body.scrollHeight - window.innerHeight);
        const targetY = scrollOffset * 10;
        
        pointsRef.current.position.y = THREE.MathUtils.lerp(
            pointsRef.current.position.y,
            targetY,
            0.05
        );
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          args={[positions, 3]}
        />
        <bufferAttribute
          attach="attributes-aScale"
          args={[scales, 1]}
        />
        <bufferAttribute
          attach="attributes-aRandomPhase"
          args={[randomPhases, 1]}
        />
      </bufferGeometry>
      <shaderMaterial
        ref={materialRef}
        vertexShader={particleVertexShader}
        fragmentShader={particleFragmentShader}
        uniforms={uniforms}
        transparent
        depthWrite={false}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
