import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text, Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

export default function Stage1_Origin({ progress }) {
  const coreRef = useRef();
  const codeFragmentsRef = useRef([]);

  // Floating code fragments
  const codeTexts = ['<HTML>', '{JS}', 'CSS', 'REACT', 'NODE'];

  useFrame((state) => {
    if (coreRef.current) {
      // Rotate central DNA helix
      coreRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      coreRef.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.5) * 0.2;
    }

    // Animate code fragments
    codeFragmentsRef.current.forEach((fragment, i) => {
      if (fragment) {
        fragment.position.y = 1 + i * 0.5 + Math.sin(state.clock.elapsedTime + i) * 0.5;
      }
    });
  });

  return (
    <group>
      {/* Central DNA/Circuit Helix */}
      <Float speed={1.5} rotationIntensity={0.5} floatIntensity={0.5}>
        <mesh ref={coreRef} position={[0, 1.5, 0]}>
          <torusKnotGeometry args={[1, 0.3, 128, 32]} />
          <MeshDistortMaterial
            color="#4a9eff"
            emissive="#2255aa"
            emissiveIntensity={0.8}
            distort={0.3}
            speed={2}
          />
        </mesh>
      </Float>

      {/* Floating code fragments */}
      {codeTexts.map((text, i) => (
        <Float key={i} speed={2} rotationIntensity={0.3} floatIntensity={1}>
          <Text
            ref={(el) => (codeFragmentsRef.current[i] = el)}
            position={[
              Math.cos((i / codeTexts.length) * Math.PI * 2) * 3,
              1 + i * 0.5,
              Math.sin((i / codeTexts.length) * Math.PI * 2) * 3,
            ]}
            fontSize={0.3}
            color="#4a9eff"
            anchorX="center"
            anchorY="middle"
          >
            {text}
          </Text>
        </Float>
      ))}

      {/* Ground plane */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -1, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#050510" roughness={0.9} />
      </mesh>

      {/* Ambient glow sphere */}
      <mesh position={[0, 1.5, 0]}>
        <sphereGeometry args={[3, 32, 32]} />
        <meshBasicMaterial
          color="#4a9eff"
          transparent
          opacity={0.05}
          side={THREE.BackSide}
        />
      </mesh>
    </group>
  );
}
