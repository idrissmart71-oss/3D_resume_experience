import React, { useState, useEffect } from 'react';
import CinematicExperience from './components/Cinematicexperience';
import './App.css';

function App() {
  const [started, setStarted] = useState(false);
  const [showUI, setShowUI] = useState(false);

  useEffect(() => {
    if (started) {
      // Delay UI appearance for cinematic intro
      setTimeout(() => setShowUI(true), 3000);
    }
  }, [started]);

  return (
    <div className="app-container">
      {/* Cinematic 3D Experience */}
      <CinematicExperience started={started} />
      
      {/* Epic Start Screen */}
      {!started && (
        <div className="epic-intro">
          <div className="logo-reveal">
            <div className="studio-text">A JOURNEY THROUGH</div>
            <div className="main-title">
              <span className="char-name">IDRIS</span>
              <span className="char-surname">SAIFY</span>
            </div>
            <div className="subtitle-text">THE CHRONICLES OF INNOVATION</div>
          </div>
          
          <button className="begin-experience" onClick={() => setStarted(true)}>
            <span className="btn-icon">▶</span>
            <span className="btn-text">BEGIN EXPERIENCE</span>
          </button>
          
          <div className="intro-footer">
            <div className="tech-badge">POWERED BY THREE.JS & REACT</div>
            <div className="year">EST. 2021</div>
          </div>
        </div>
      )}

      {/* Minimal Info Overlay - Only shows after intro */}
      {started && showUI && (
        <div className="minimal-ui">
          <div className="top-bar">
            <div className="character-info">
              <div className="role">STEM INNOVATION ENGINEER</div>
              <div className="company">STEMROBO TECHNOLOGIES</div>
            </div>
            <div className="contact-quick">
              <a href="mailto:idrissaify4@gmail.com" className="contact-link">
                ✉ idrissaify4@gmail.com
              </a>
            </div>
          </div>

          <div className="bottom-controls">
            <div className="stage-indicator">
              <div className="indicator-line"></div>
              <div className="stage-dots">
                <div className="dot active" data-stage="Origin"></div>
                <div className="dot" data-stage="Builder"></div>
                <div className="dot" data-stage="Engineer"></div>
                <div className="dot" data-stage="Innovator"></div>
                <div className="dot" data-stage="Legend"></div>
              </div>
            </div>
          </div>

          <div className="skip-info">
            <div className="hint">Press SPACE to pause • ESC for info</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;