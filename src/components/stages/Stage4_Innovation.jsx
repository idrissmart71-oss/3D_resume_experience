import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Torus, Sphere } from '@react-three/drei';

export default function Stage4_Innovation({ progress }) {
  const gyroscopeRef = useRef();
  const roboticArmRef = useRef();

  useFrame((state) => {
    if (gyroscopeRef.current) {
      // Multi-axis rotation (gyroscope effect)
      gyroscopeRef.current.rotation.x = state.clock.elapsedTime * 0.3;
      gyroscopeRef.current.rotation.y = state.clock.elapsedTime * 0.5;
      gyroscopeRef.current.rotation.z = state.clock.elapsedTime * 0.2;
    }

    if (roboticArmRef.current) {
      // Robotic arm articulation
      roboticArmRef.current.rotation.y = Math.sin(state.clock.elapsedTime) * 0.5;
    }
  });

  return (
    <group>
      {/* Educational gyroscope with orbital rings */}
      <group ref={gyroscopeRef} position={[0, 2.5, 0]}>
        <Torus args={[2, 0.05, 16, 100]}>
          <meshStandardMaterial color="#ffaa00" emissive="#ff8800" emissiveIntensity={1} />
        </Torus>
        <Torus args={[1.5, 0.05, 16, 100]} rotation={[Math.PI / 2, 0, 0]}>
          <meshStandardMaterial color="#ffdd88" emissive="#ffaa00" emissiveIntensity={1} />
        </Torus>
        <Sphere args={[0.3, 32, 32]}>
          <meshStandardMaterial color="#ffffff" emissive="#ffaa00" emissiveIntensity={1.5} />
        </Sphere>
      </group>

      {/* Robotic arm assembly */}
      <group ref={roboticArmRef} position={[-4, 1, 2]}>
        {/* Base */}
        <mesh position={[0, 0, 0]}>
          <cylinderGeometry args={[0.3, 0.4, 0.5, 16]} />
          <meshStandardMaterial color="#888888" metalness={0.8} roughness={0.2} />
        </mesh>
        {/* Arm segment 1 */}
        <mesh position={[0, 1, 0]}>
          <boxGeometry args={[0.2, 2, 0.2]} />
          <meshStandardMaterial color="#666666" metalness={0.7} roughness={0.3} />
        </mesh>
        {/* Arm segment 2 */}
        <mesh position={[0, 2.5, 0]} rotation={[0, 0, Math.PI / 4]}>
          <boxGeometry args={[0.15, 1.5, 0.15]} />
          <meshStandardMaterial color="#999999" metalness={0.7} roughness={0.3} />
        </mesh>
      </group>

      {/* Arduino board hologram */}
      <mesh position={[3, 1.5, -2]} rotation={[-Math.PI / 6, Math.PI / 4, 0]}>
        <boxGeometry args={[1.5, 0.05, 1]} />
        <meshStandardMaterial
          color="#00aa88"
          emissive="#00aa88"
          emissiveIntensity={0.5}
          transparent
          opacity={0.8}
        />
      </mesh>

      {/* Warm educational lighting */}
      <pointLight position={[0, 6, 0]} intensity={1.2} color="#ffdd88" distance={20} />
      <pointLight position={[-5, 3, -5]} intensity={0.8} color="#ff8844" />
      <pointLight position={[5, 3, 5]} intensity={0.8} color="#ffaa00" />

      {/* Ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[30, 30]} />
        <meshStandardMaterial color="#201005" roughness={0.8} />
      </mesh>
    </group>
  );
}
