import { useRef, useMemo } from 'react';
import { useFrame } from '@react-three/fiber';
import { Instance, Instances, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function Stage5_Future({ progress }) {
  const infinityRef = useRef();
  const cityRef = useRef();

  // Generate city buildings
  const buildings = useMemo(() => {
    const b = [];
    for (let i = 0; i < 50; i++) {
      b.push({
        position: [
          (Math.random() - 0.5) * 40,
          Math.random() * 8,
          (Math.random() - 0.5) * 40,
        ],
        height: 2 + Math.random() * 10,
      });
    }
    return b;
  }, []);

  useFrame((state) => {
    if (infinityRef.current) {
      infinityRef.current.rotation.z = state.clock.elapsedTime * 0.3;
    }

    if (cityRef.current) {
      cityRef.current.rotation.y = state.clock.elapsedTime * 0.05;
    }
  });

  return (
    <group>
      {/* Infinity symbol core */}
      <mesh ref={infinityRef} position={[0, 5, 0]}>
        <torusKnotGeometry args={[2, 0.4, 128, 16, 2, 3]} />
        <MeshDistortMaterial
          color="#ffaa44"
          emissive="#ff6622"
          emissiveIntensity={1.5}
          distort={0.2}
          speed={3}
        />
      </mesh>

      {/* City of light */}
      <group ref={cityRef}>
        <Instances>
          <boxGeometry />
          <meshStandardMaterial
            color="#aa66ff"
            emissive="#6633aa"
            emissiveIntensity={0.8}
            wireframe
          />
          {buildings.map((building, i) => (
            <Instance
              key={i}
              position={building.position}
              scale={[0.5, building.height, 0.5]}
            />
          ))}
        </Instances>
      </group>

      {/* Sky particles (stars) */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={2000}
            array={new Float32Array(
              Array.from({ length: 2000 }, () => [
                (Math.random() - 0.5) * 100,
                Math.random() * 50,
                (Math.random() - 0.5) * 100,
              ]).flat()
            )}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          color="#ffffff"
          transparent
          opacity={0.8}
          blending={THREE.AdditiveBlending}
        />
      </points>

      {/* Epic lighting */}
      <pointLight position={[0, 10, 0]} intensity={2} color="#ffaa44" distance={30} />
      <pointLight position={[10, 5, 10]} intensity={1} color="#aa66ff" />
      <pointLight position={[-10, 5, -10]} intensity={1} color="#ff6622" />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
        <planeGeometry args={[100, 100]} />
        <meshStandardMaterial color="#100520" emissive="#2a1050" emissiveIntensity={0.2} />
      </mesh>
    </group>
  );
}
