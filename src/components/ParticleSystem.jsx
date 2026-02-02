import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

export default function ParticleSystem({ stage }) {
  const particlesRef = useRef();
  
  // Generate particle positions
  const particleCount = 5000;
  const positions = useMemo(() => {
    const pos = new Float32Array(particleCount * 3);
    for (let i = 0; i < particleCount; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 50;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 50;
    }
    return pos;
  }, []);

  // Animate particles
  useFrame((state) => {
    if (!particlesRef.current) return;
    
    const positions = particlesRef.current.geometry.attributes.position.array;
    
    for (let i = 0; i < particleCount; i++) {
      // Gentle upward drift
      positions[i * 3 + 1] += 0.01;
      
      // Wrap particles vertically
      if (positions[i * 3 + 1] > 25) {
        positions[i * 3 + 1] = -25;
      }
      
      // Stage-specific motion
      if (stage === 2) {
        // Data stream effect for Engineer stage
        positions[i * 3 + 1] += 0.02;
      }
    }
    
    particlesRef.current.geometry.attributes.position.needsUpdate = true;
    
    // Rotate particle system slowly
    particlesRef.current.rotation.y = state.clock.elapsedTime * 0.02;
  });

  return (
    <points ref={particlesRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particleCount}
          array={positions}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.08}
        color="#4a9eff"
        transparent
        opacity={0.6}
        sizeAttenuation
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}
