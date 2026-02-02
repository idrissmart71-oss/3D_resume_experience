import React from 'react';
import { useStageTimer } from '../hooks/useStageTimer';
import CameraRig from './CameraRig';
import GlobalLighting from './GlobalLighting';
import ParticleSystem from './ParticleSystem';
import Stage1_Origin from './stages/Stage1_Origin';
import Stage2_Builder from './stages/Stage2_Builder';
import Stage3_Engineer from './stages/Stage3_Engineer';
import Stage4_Innovation from './stages/Stage4_Innovation';
import Stage5_Future from './stages/Stage5_Future';

const stages = [
  { Component: Stage1_Origin, fogColor: '#000510', name: 'Origin' },
  { Component: Stage2_Builder, fogColor: '#0a0520', name: 'Builder' },
  { Component: Stage3_Engineer, fogColor: '#001020', name: 'Engineer' },
  { Component: Stage4_Innovation, fogColor: '#201005', name: 'Innovation' },
  { Component: Stage5_Future, fogColor: '#100520', name: 'Future' },
];

export default function SceneController({ forceStage }) {
  const { currentStage: autoStage, progress, isTransitioning } = useStageTimer();
  const currentStage = forceStage !== null && forceStage !== undefined ? forceStage : autoStage;
  const CurrentStage = stages[currentStage].Component;
  
  return (
    <>
      <CameraRig stage={currentStage} progress={progress} />
      <GlobalLighting stage={currentStage} progress={progress} />
      <ParticleSystem stage={currentStage} />
      
      {/* Render current stage */}
      <CurrentStage progress={progress} isTransitioning={isTransitioning} />
    </>
  );
}
