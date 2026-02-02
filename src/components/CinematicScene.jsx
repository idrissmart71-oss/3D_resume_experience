import React from 'react';
import { Canvas } from '@react-three/fiber';
import { EffectComposer, Bloom, Vignette, Noise } from '@react-three/postprocessing';
import SceneController from './SceneController';

export default function CinematicScene({ forceStage }) {
  return (
    <Canvas
      id="cinematic-canvas"
      camera={{ position: [0, 2, 10], fov: 50 }}
      gl={{ antialias: true, alpha: false }}
      dpr={[1, 2]}
    >
      {/* Fog for depth */}
      <fog attach="fog" args={['#000510', 5, 50]} />
      
      {/* Main scene content */}
      <SceneController forceStage={forceStage} />
      
      {/* Post-processing effects */}
      <EffectComposer>
        <Bloom 
          intensity={0.9}
          luminanceThreshold={0.2}
          luminanceSmoothing={0.9}
        />
        <Vignette darkness={0.5} offset={0.3} />
        <Noise opacity={0.018} />
      </EffectComposer>
    </Canvas>
  );
}
