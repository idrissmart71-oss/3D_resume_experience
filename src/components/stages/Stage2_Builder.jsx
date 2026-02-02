import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Box, MeshTransmissionMaterial } from '@react-three/drei';

export default function Stage2_Builder({ progress }) {
  const polyhedronRef = useRef();
  const uiPanelsRef = useRef([]);

  useFrame((state) => {
    if (polyhedronRef.current) {
      // Rotate polyhedron with dynamic speed
      polyhedronRef.current.rotation.x = state.clock.elapsedTime * 0.2;
      polyhedronRef.current.rotation.y = state.clock.elapsedTime * 0.3;
      
      // Pulse scale
      const scale = 1 + Math.sin(state.clock.elapsedTime * 2) * 0.1;
      polyhedronRef.current.scale.setScalar(scale);
    }

    // Animate UI panels
    uiPanelsRef.current.forEach((panel, i) => {
      if (panel) {
        panel.rotation.y = state.clock.elapsedTime * 0.1 + i;
      }
    });
  });

  return (
    <group>
      {/* Central reactive polyhedron */}
      <mesh ref={polyhedronRef} position={[0, 2, 0]} castShadow>
        <icosahedronGeometry args={[1.5, 0]} />
        <MeshTransmissionMaterial
          color="#aa44ff"
          emissive="#6622aa"
          emissiveIntensity={1}
          thickness={0.5}
          roughness={0}
          transmission={0.9}
        />
      </mesh>

      {/* Floating UI panels */}
      {[...Array(6)].map((_, i) => {
        const angle = (i / 6) * Math.PI * 2;
        const radius = 4;
        return (
          <Box
            key={i}
            ref={(el) => (uiPanelsRef.current[i] = el)}
            args={[1.5, 2, 0.05]}
            position={[
              Math.cos(angle) * radius,
              2 + Math.sin(i) * 0.5,
              Math.sin(angle) * radius,
            ]}
          >
            <meshStandardMaterial
              color="#ffffff"
              emissive="#aa44ff"
              emissiveIntensity={0.3}
              transparent
              opacity={0.7}
            />
          </Box>
        );
      })}

      {/* Circuit board ground */}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.5, 0]} receiveShadow>
        <planeGeometry args={[40, 40, 20, 20]} />
        <meshStandardMaterial
          color="#0a0520"
          emissive="#6622aa"
          emissiveIntensity={0.2}
          wireframe
        />
      </mesh>

      {/* Accent lights */}
      <pointLight position={[0, 5, 0]} intensity={1} color="#aa44ff" distance={15} />
      <pointLight position={[5, 2, 5]} intensity={0.8} color="#44aaff" distance={10} />
      <pointLight position={[-5, 2, -5]} intensity={0.8} color="#ff8844" distance={10} />
    </group>
  );
}
