import React, { useState } from 'react';
import Draggable from 'react-draggable';

const StackedDivs = () => {
  const [rotation1, setRotation1] = useState(0);

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
    <div className='stacked-div'>
      <div className="diagonal-div">
        <Draggable axis="y">
          <div className="top-div">
            <div
              className="rotatable"
              style={{
                transform: `rotate(${rotation1}deg)`,
              }}
              onMouseDown={(e) => handleMouseDown(e, rotation1, setRotation1)}
            ></div>
          </div>
        </Draggable>
      </div>
    </div>
  );
};

export default StackedDivs;
