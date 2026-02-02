import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { 
  PerspectiveCamera, 
  Text3D, 
  Center, 
  Float,
  Environment,
  MeshDistortMaterial,
  Sparkles,
  useTexture
} from '@react-three/drei';
import { EffectComposer, Bloom, DepthOfField, Vignette, ChromaticAberration } from '@react-three/postprocessing';
import * as THREE from 'three';
import './Cinematicexperience.css';

// ═══════════════════════════════════════════════════════════
// CINEMATIC TIMELINE — Like a movie trailer
// ═══════════════════════════════════════════════════════════
const TIMELINE = [
  {
    stage: 0,
    name: 'ORIGIN',
    duration: 14000,
    title: 'THE BEGINNING',
    subtitle: 'Dewas, Madhya Pradesh • 2001',
    text: 'Every legend starts somewhere.',
    narration: [
      'A curious mind in a small town',
      'Taking things apart, putting them together',
      'The spark was already there'
    ],
    camera: [
      { pos: [10, 5, 10], look: [0, 0, 0], fov: 60, time: 0 },
      { pos: [0, 3, 15], look: [0, 1, 0], fov: 50, time: 0.5 },
      { pos: [-8, 4, 8], look: [0, 0, 0], fov: 55, time: 1 }
    ],
    character: { scale: 0.8, aura: 0x4488ff, posture: 'curious' },
    environment: 'dawn'
  },
  {
    stage: 1,
    name: 'BUILDER',
    duration: 14000,
    title: 'THE FORGE',
    subtitle: 'VIT Chennai • 2021-2025',
    text: 'Where code becomes craft.',
    narration: [
      'VIT Chennai — The crucible',
      'GPA 7.69 • 4 years of fire',
      'Every project a masterpiece'
    ],
    camera: [
      { pos: [15, 8, 0], look: [0, 2, 0], fov: 45, time: 0 },
      { pos: [0, 10, 20], look: [0, 0, 0], fov: 40, time: 0.4 },
      { pos: [-12, 6, 12], look: [0, 1, 0], fov: 50, time: 1 }
    ],
    character: { scale: 1.0, aura: 0xaa44ff, posture: 'building' },
    environment: 'studio'
  },
  {
    stage: 2,
    name: 'ENGINEER',
    duration: 14000,
    title: 'THE ARCHITECT',
    subtitle: 'MERN Stack • CouchDB • AWS',
    text: 'Systems at scale. Solutions that endure.',
    narration: [
      'Ethnus Certifications — Back to back',
      'MERN Stack mastery in 3 months',
      'The architect emerges'
    ],
    camera: [
      { pos: [0, 2, 25], look: [0, 2, 0], fov: 35, time: 0 },
      { pos: [18, 12, 18], look: [0, 0, 0], fov: 45, time: 0.5 },
      { pos: [0, 15, 10], look: [0, 0, 0], fov: 50, time: 1 }
    ],
    character: { scale: 1.2, aura: 0x00ffaa, posture: 'commanding' },
    environment: 'matrix'
  },
  {
    stage: 3,
    name: 'INNOVATOR',
    duration: 14000,
    title: 'THE MENTOR',
    subtitle: 'StemRobo Technologies • Now',
    text: 'Building the future. Teaching the next generation.',
    narration: [
      'STEM Innovation Engineer',
      'Robotics • IoT • Education',
      'Making knowledge hands-on'
    ],
    camera: [
      { pos: [-15, 8, 15], look: [0, 2, 0], fov: 50, time: 0 },
      { pos: [0, 5, 20], look: [0, 1, 0], fov: 40, time: 0.6 },
      { pos: [12, 10, -12], look: [0, 0, 0], fov: 55, time: 1 }
    ],
    character: { scale: 1.4, aura: 0xffaa00, posture: 'inspiring' },
    environment: 'golden'
  },
  {
    stage: 4,
    name: 'LEGEND',
    duration: 18000,
    title: 'THE VISIONARY',
    subtitle: 'Python • React • Node • MongoDB • IoT',
    text: 'This is not the end. This is the beginning.',
    narration: [
      'Full-stack warrior',
      'Every tool. Every language.',
      'The journey continues...'
    ],
    camera: [
      { pos: [0, 20, 30], look: [0, 0, 0], fov: 60, time: 0 },
      { pos: [25, 15, 25], look: [0, 0, 0], fov: 50, time: 0.3 },
      { pos: [0, 30, 0], look: [0, 0, 0], fov: 70, time: 1 }
    ],
    character: { scale: 1.6, aura: 0xff3300, posture: 'triumphant' },
    environment: 'epic'
  }
];

// ═══════════════════════════════════════════════════════════
// CHARACTER MODEL — Evolving 3D human figure
// ═══════════════════════════════════════════════════════════
function Character({ stage, progress }) {
  const groupRef = useRef();
  const stageData = TIMELINE[stage];
  
  useFrame((state) => {
    if (!groupRef.current) return;
    
    const t = state.clock.elapsedTime;
    
    // Breathing animation
    groupRef.current.scale.y = stageData.character.scale + Math.sin(t * 1.5) * 0.02;
    
    // Slow rotation based on posture
    if (stageData.character.posture === 'triumphant') {
      groupRef.current.rotation.y = Math.sin(t * 0.3) * 0.3;
    } else {
      groupRef.current.rotation.y = Math.sin(t * 0.2) * 0.15;
    }
  });
  
  return (
    <group ref={groupRef} position={[0, 0, 0]} scale={stageData.character.scale}>
      {/* Head */}
      <mesh position={[0, 1.7, 0]} castShadow>
        <sphereGeometry args={[0.15, 32, 32]} />
        <meshStandardMaterial color="#d4a574" roughness={0.7} metalness={0.1} />
      </mesh>
      
      {/* Torso */}
      <mesh position={[0, 1.2, 0]} castShadow>
        <boxGeometry args={[0.4, 0.6, 0.25]} />
        <meshStandardMaterial 
          color={new THREE.Color(stageData.character.aura).multiplyScalar(0.5)}
          emissive={stageData.character.aura}
          emissiveIntensity={0.3}
        />
      </mesh>
      
      {/* Arms */}
      <mesh position={[-0.25, 1.2, 0]} rotation={[0, 0, 0.3]} castShadow>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>
      <mesh position={[0.25, 1.2, 0]} rotation={[0, 0, -0.3]} castShadow>
        <boxGeometry args={[0.1, 0.5, 0.1]} />
        <meshStandardMaterial color="#d4a574" />
      </mesh>
      
      {/* Legs */}
      <mesh position={[-0.12, 0.6, 0]} castShadow>
        <boxGeometry args={[0.12, 0.7, 0.12]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      <mesh position={[0.12, 0.6, 0]} castShadow>
        <boxGeometry args={[0.12, 0.7, 0.12]} />
        <meshStandardMaterial color="#2a2a2a" />
      </mesh>
      
      {/* Energy Aura */}
      <mesh position={[0, 1.2, 0]}>
        <sphereGeometry args={[0.8, 32, 32]} />
        <MeshDistortMaterial
          color={stageData.character.aura}
          transparent
          opacity={0.15}
          distort={0.4}
          speed={2}
        />
      </mesh>
      
      {/* Sparkles around character */}
      <Sparkles
        count={100}
        scale={2}
        size={2}
        speed={0.3}
        color={stageData.character.aura}
      />
    </group>
  );
}

// ═══════════════════════════════════════════════════════════
// CINEMATIC CAMERA — Dramatic movements
// ═══════════════════════════════════════════════════════════
function CinematicCamera({ stage, progress }) {
  const cameraRef = useRef();
  const { camera } = useThree();
  
  useFrame(() => {
    if (!cameraRef.current) return;
    
    const stageData = TIMELINE[stage];
    const cameraPath = stageData.camera;
    
    // Find current and next keyframe
    let current, next, localProgress;
    for (let i = 0; i < cameraPath.length - 1; i++) {
      if (progress >= cameraPath[i].time && progress < cameraPath[i + 1].time) {
        current = cameraPath[i];
        next = cameraPath[i + 1];
        localProgress = (progress - current.time) / (next.time - current.time);
        break;
      }
    }
    
    if (!current) {
      current = next = cameraPath[cameraPath.length - 1];
      localProgress = 1;
    }
    
    // Smooth easing
    const eased = localProgress * localProgress * (3 - 2 * localProgress);
    
    // Interpolate position
    const pos = new THREE.Vector3(
      THREE.MathUtils.lerp(current.pos[0], next.pos[0], eased),
      THREE.MathUtils.lerp(current.pos[1], next.pos[1], eased),
      THREE.MathUtils.lerp(current.pos[2], next.pos[2], eased)
    );
    
    // Interpolate lookAt
    const look = new THREE.Vector3(
      THREE.MathUtils.lerp(current.look[0], next.look[0], eased),
      THREE.MathUtils.lerp(current.look[1], next.look[1], eased),
      THREE.MathUtils.lerp(current.look[2], next.look[2], eased)
    );
    
    // Apply to camera
    camera.position.lerp(pos, 0.05);
    camera.lookAt(look);
    camera.fov = THREE.MathUtils.lerp(camera.fov, THREE.MathUtils.lerp(current.fov, next.fov, eased), 0.05);
    camera.updateProjectionMatrix();
  });
  
  return <PerspectiveCamera ref={cameraRef} makeDefault />;
}

// ═══════════════════════════════════════════════════════════
// ENVIRONMENT — Dynamic lighting per stage
// ═══════════════════════════════════════════════════════════
function DynamicEnvironment({ stage }) {
  const stageData = TIMELINE[stage];
  
  const envColors = {
    dawn: '#1a3a5a',
    studio: '#2a1a4a',
    matrix: '#0a2a2a',
    golden: '#4a3a1a',
    epic: '#3a1a2a'
  };
  
  return (
    <>
      <fog attach="fog" args={[envColors[stageData.environment] || '#000', 10, 50]} />
      <ambientLight intensity={0.2} />
      <directionalLight
        position={[10, 10, 5]}
        intensity={1}
        castShadow
        shadow-mapSize={[2048, 2048]}
      />
      <pointLight
        position={[0, 5, 0]}
        intensity={2}
        color={stageData.character.aura}
        distance={20}
      />
      <pointLight
        position={[-5, 3, 5]}
        intensity={0.8}
        color={new THREE.Color(stageData.character.aura).offsetHSL(0.5, 0, 0)}
      />
    </>
  );
}

// ═══════════════════════════════════════════════════════════
// MAIN CINEMATIC EXPERIENCE
// ═══════════════════════════════════════════════════════════
export default function CinematicExperience({ started }) {
  const [currentStage, setCurrentStage] = useState(0);
  const [stageProgress, setStageProgress] = useState(0);
  const [showText, setShowText] = useState(false);
  const startTimeRef = useRef(null);
  
  useEffect(() => {
    if (!started) return;
    
    startTimeRef.current = Date.now();
    setShowText(true);
    
    const interval = setInterval(() => {
      const elapsed = Date.now() - startTimeRef.current;
      const currentData = TIMELINE[currentStage];
      const progress = Math.min(elapsed / currentData.duration, 1);
      
      setStageProgress(progress);
      
      // Move to next stage
      if (progress >= 1) {
        if (currentStage < TIMELINE.length - 1) {
          setCurrentStage(prev => prev + 1);
          startTimeRef.current = Date.now();
          setShowText(false);
          setTimeout(() => setShowText(true), 500);
        } else {
          // Loop back to start
          setCurrentStage(0);
          startTimeRef.current = Date.now();
        }
      }
    }, 16); // ~60fps
    
    return () => clearInterval(interval);
  }, [started, currentStage]);
  
  if (!started) return null;
  
  const stageData = TIMELINE[currentStage];
  
  return (
    <>
      {/* 3D Canvas */}
      <Canvas shadows>
        <CinematicCamera stage={currentStage} progress={stageProgress} />
        <DynamicEnvironment stage={currentStage} />
        
        <Character stage={currentStage} progress={stageProgress} />
        
        {/* Ground */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, 0, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.9} />
        </mesh>
        
        {/* Post-processing */}
        <EffectComposer>
          <Bloom intensity={0.8} luminanceThreshold={0.3} luminanceSmoothing={0.9} />
          <DepthOfField focusDistance={0.02} focalLength={0.05} bokehScale={3} />
          <Vignette darkness={0.6} offset={0.3} />
          <ChromaticAberration offset={[0.001, 0.001]} />
        </EffectComposer>
      </Canvas>
      
      {/* Epic Text Overlays */}
      {showText && (
        <div className="cinematic-overlay">
          <div className="epic-title-card">
            <div className="stage-number">ACT {currentStage + 1}</div>
            <div className="stage-title">{stageData.title}</div>
            <div className="stage-subtitle">{stageData.subtitle}</div>
            <div className="stage-text">{stageData.text}</div>
          </div>
          
          <div className="narration-panel">
            {stageData.narration.map((line, i) => (
              <div 
                key={i} 
                className="narration-line"
                style={{ animationDelay: `${i * 0.8}s` }}
              >
                {line}
              </div>
            ))}
          </div>
        </div>
      )}
    </>
  );
}