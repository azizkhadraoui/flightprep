import React, { useState, useRef, useEffect } from 'react';
import Draggable from 'react-draggable';
import './CircularDiv.css';

const CircularDivs = () => {
  const divRef = useRef(null);
  const [divSize, setDivSize] = useState({ width: 0, height: 0 });

  useEffect(() => {
    if (divRef.current) {
      setDivSize({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      });
    }
  }, []);
  const [rotation1, setRotation1] = useState(0);
  const [rotation2, setRotation2] = useState(0);
  const [rotation3, setRotation3] = useState(0);

  const handleMouseDown = (e, currentRotation, setCurrentRotation) => {
    e.preventDefault();

    let lastPageX = e.pageX;

    function handleMouseMove(e) {
      const delta = lastPageX - e.pageX;
      setCurrentRotation((prevRotation) => prevRotation - delta / 10);
      lastPageX = e.pageX;
    }

    function handleMouseUp() {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    }

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  return (
    <div className="circular-div" ref={divRef} style={{ width: '100%', height: '100%' }}>
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
    </div>
  );
};

export default CircularDivs;