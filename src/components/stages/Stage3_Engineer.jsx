import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instance, Instances } from '@react-three/drei';
import * as THREE from 'three';

export default function Stage3_Engineer({ progress }) {
  const neuralCoreRef = useRef();
  const dataStreamRef = useRef();

  // Generate server racks
  const serverPositions = useMemo(() => {
    const positions = [];
    for (let x = -10; x <= 10; x += 3) {
      for (let z = -10; z <= 10; z += 3) {
        if (Math.abs(x) > 3 || Math.abs(z) > 3) {
          // Skip center area
          positions.push([x, 2, z]);
        }
      }
    }
    return positions;
  }, []);

  useFrame((state) => {
    if (neuralCoreRef.current) {
      // Pulsing neural network
      const scale = 1 + Math.sin(state.clock.elapsedTime * 1.5) * 0.15;
      neuralCoreRef.current.scale.setScalar(scale);
      neuralCoreRef.current.rotation.y = state.clock.elapsedTime * 0.2;
    }

    if (dataStreamRef.current) {
      // Flowing data particles
      const positions = dataStreamRef.current.geometry.attributes.position.array;
      for (let i = 1; i < positions.length; i += 3) {
        positions[i] += 0.05; // Move upward
        if (positions[i] > 20) positions[i] = 0; // Wrap
      }
      dataStreamRef.current.geometry.attributes.position.needsUpdate = true;
    }
  });

  return (
    <group>
      {/* Neural network core */}
      <mesh ref={neuralCoreRef} position={[0, 3, 0]}>
        <sphereGeometry args={[1.2, 32, 32]} />
        <meshStandardMaterial
          color="#44ffaa"
          emissive="#22aa66"
          emissiveIntensity={1.5}
          wireframe
        />
      </mesh>

      {/* Server racks (instanced for performance) */}
      <Instances>
        <boxGeometry args={[0.8, 4, 0.8]} />
        <meshStandardMaterial color="#1a2a2a" emissive="#44ffaa" emissiveIntensity={0.2} />
        {serverPositions.map((pos, i) => (
          <Instance key={i} position={pos} />
        ))}
      </Instances>

      {/* Data stream particles */}
      <points ref={dataStreamRef}>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={1000}
            array={new Float32Array(
              Array.from({ length: 1000 }, () => [
                (Math.random() - 0.5) * 20,
                Math.random() * 20,
                (Math.random() - 0.5) * 20,
              ]).flat()
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.15}
          color="#44ffaa"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Floor grid */}
      <gridHelper args={[50, 50, '#44ffaa', '#1a2a2a']} position={[0, 0, 0]} />
    </group>
  );
}
