import React, { useState, useRef } from 'react';
import './CircularDiv.css';
import Canvas from './Canvas';

const CircularDivs = () => {
  const [rotation1, setRotation1] = useState(0);
  const [rotation2, setRotation2] = useState(0);
  const [rotation3, setRotation3] = useState(0);
  const [canvasRotation, setCanvasRotation] = useState(0);

  const handleMouseDown = (e, currentRotation, setCurrentRotation) => {
    e.preventDefault();

    let lastPageX = e.pageX; // Get initial cursor position.

    // Handle mouse movement.
    function handleMouseMove(e) {
      const delta = lastPageX - e.pageX; // Calculate difference between current and last cursor position.
      setCurrentRotation((prevRotation) => prevRotation - delta / 10); // Update rotation.
      lastPageX = e.pageX; // Update last cursor position.
    }

    // Handle mouse release.
    function handleMouseUp() {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
    setCanvasRotation(currentRotation);
  };

  return (
    <div className="circular-div">
    <div className="compass-container">
      <div
        className="layer3-container"
        style={{
          transform: `rotate(${rotation3}deg)`,
        }}
        onMouseDown={(e) => handleMouseDown(e, rotation3, setRotation3)}
      >
        <div className="layer3"></div>
      </div>
      <div
        className="layer2-container"
        style={{
          transform: `rotate(${rotation2}deg)`,
        }}
        onMouseDown={(e) => handleMouseDown(e, rotation2, setRotation2)}
      >
        <div className="layer2"></div>
      </div>
      <div
        className="layer1-container"
        style={{
          transform: `rotate(${rotation1}deg)`,
        }}
        onMouseDown={(e) => handleMouseDown(e, rotation1, setRotation1)}
      >
        <div className="layer1"></div>
      </div>
    </div>
    <Canvas rotation={canvasRotation} />
    </div>
  );
};

export default CircularDivs;
