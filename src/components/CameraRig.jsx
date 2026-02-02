import { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';

// Camera paths for each stage (keyframes)
const cameraPaths = {
  0: [ // Stage 1: Origin
    { position: [5, 3, 8], lookAt: [0, 1, 0], duration: 0.4 },
    { position: [0, 2.5, 10], lookAt: [0, 1.5, 0], duration: 0.6 },
  ],
  1: [ // Stage 2: Builder
    { position: [8, 6, 8], lookAt: [0, 2, 0], duration: 0.3 },
    { position: [-2, 3, 12], lookAt: [0, 1, 0], duration: 0.7 },
  ],
  2: [ // Stage 3: Engineer
    { position: [1, 1, 15], lookAt: [0, 3, 0], duration: 0.5 },
    { position: [-5, 4, 10], lookAt: [0, 2, 0], duration: 0.5 },
  ],
  3: [ // Stage 4: Innovation
    { position: [6, 3, 9], lookAt: [0, 1.5, 0], duration: 0.4 },
    { position: [0, 2, 11], lookAt: [0, 1, 0], duration: 0.6 },
  ],
  4: [ // Stage 5: Future
    { position: [0, 8, 20], lookAt: [0, 0, 0], duration: 0.3 },
    { position: [10, 10, 10], lookAt: [0, 0, 0], duration: 0.7 },
  ],
};

export default function CameraRig({ stage, progress }) {
  const cameraRef = useRef();
  const targetPosition = useRef(new THREE.Vector3());
  const targetLookAt = useRef(new THREE.Vector3());

  useFrame(() => {
    if (!cameraRef.current) return;

    const path = cameraPaths[stage];
    if (!path || path.length === 0) return;

    // Find which keyframe segment we're in
    let accumulatedDuration = 0;
    let currentKeyframe, nextKeyframe, segmentProgress;

    for (let i = 0; i < path.length - 1; i++) {
      const segmentDuration = path[i].duration;
      if (progress <= accumulatedDuration + segmentDuration) {
        currentKeyframe = path[i];
        nextKeyframe = path[i + 1];
        segmentProgress = (progress - accumulatedDuration) / segmentDuration;
        break;
      }
      accumulatedDuration += segmentDuration;
    }

    // Default to last keyframe if not found
    if (!currentKeyframe) {
      currentKeyframe = path[path.length - 1];
      nextKeyframe = path[path.length - 1];
      segmentProgress = 1;
    }

    // Smooth interpolation (ease-in-out)
    const t = smoothstep(segmentProgress);

    // Interpolate position
    targetPosition.current.lerpVectors(
      new THREE.Vector3(...currentKeyframe.position),
      new THREE.Vector3(...nextKeyframe.position),
      t
    );

    // Interpolate lookAt
    targetLookAt.current.lerpVectors(
      new THREE.Vector3(...currentKeyframe.lookAt),
      new THREE.Vector3(...nextKeyframe.lookAt),
      t
    );

    // Smooth camera movement
    cameraRef.current.position.lerp(targetPosition.current, 0.1);
    cameraRef.current.lookAt(targetLookAt.current);
  });

  return <PerspectiveCamera ref={cameraRef} makeDefault fov={50} />;
}

// Smooth interpolation function
function smoothstep(t) {
  return t * t * (3 - 2 * t);
}
