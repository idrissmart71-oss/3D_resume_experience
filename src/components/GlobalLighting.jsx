import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const stageLighting = {
  0: { ambient: '#1a2a3a', key: '#4a9eff', keyIntensity: 1.2, fill: '#ff8844', fillIntensity: 0.4 },
  1: { ambient: '#2a1a3a', key: '#ffffff', keyIntensity: 1.5, fill: '#aa44ff', fillIntensity: 0.6 },
  2: { ambient: '#1a2a2a', key: '#e0f0ff', keyIntensity: 1.3, fill: '#44ffaa', fillIntensity: 0.5 },
  3: { ambient: '#3a2a1a', key: '#ffdd88', keyIntensity: 1.1, fill: '#ff8844', fillIntensity: 0.7 },
  4: { ambient: '#2a1a3a', key: '#ffaa44', keyIntensity: 1.4, fill: '#aa66ff', fillIntensity: 0.5 },
};

export default function GlobalLighting({ stage, progress }) {
  const ambientRef = useRef();
  const keyLightRef = useRef();
  const fillLightRef = useRef();

  useFrame(() => {
    const lighting = stageLighting[stage];
    
    if (ambientRef.current) {
      ambientRef.current.color.lerp(new THREE.Color(lighting.ambient), 0.05);
    }
    
    if (keyLightRef.current) {
      keyLightRef.current.color.lerp(new THREE.Color(lighting.key), 0.05);
      keyLightRef.current.intensity += (lighting.keyIntensity - keyLightRef.current.intensity) * 0.05;
    }
    
    if (fillLightRef.current) {
      fillLightRef.current.color.lerp(new THREE.Color(lighting.fill), 0.05);
      fillLightRef.current.intensity += (lighting.fillIntensity - fillLightRef.current.intensity) * 0.05;
    }
  });

  return (
    <>
      <ambientLight ref={ambientRef} intensity={0.3} />
      <directionalLight 
        ref={keyLightRef}
        position={[5, 8, 5]}
        intensity={1.2}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight 
        ref={fillLightRef}
        position={[-5, 3, -5]}
        intensity={0.5}
      />
      <hemisphereLight groundColor="#000000" intensity={0.2} />
    </>
  );
}
