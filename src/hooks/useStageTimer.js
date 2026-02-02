import { useState } from 'react';
import { useFrame } from '@react-three/fiber';

const STAGE_DURATION = 12000; // 12 seconds per stage
const TRANSITION_DURATION = 2000; // 2 second transition

export function useStageTimer() {
  const [currentStage, setCurrentStage] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);

  useFrame((state) => {
    const elapsed = state.clock.elapsedTime * 1000;
    const totalCycle = STAGE_DURATION + TRANSITION_DURATION;
    const stageIndex = Math.floor(elapsed / totalCycle) % 5;
    const cycleProgress = (elapsed % totalCycle) / totalCycle;
    
    // Calculate if in transition phase
    const transitionStart = STAGE_DURATION / totalCycle;
    const inTransition = cycleProgress >= transitionStart;
    
    setCurrentStage(stageIndex);
    setProgress(cycleProgress);
    setIsTransitioning(inTransition);
  });

  return { currentStage, progress, isTransitioning };
}
