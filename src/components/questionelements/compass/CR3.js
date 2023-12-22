import React, { useState, useRef, useEffect } from "react";
import "./CircularDiv.css";

const CR3 = ({ setRotation, setRotatableBounds1, setRotatableBounds2, setRotatableBounds3 }) => {
  const divRef = useRef(null);
  const [divSize, setDivSize] = useState({ width: 0, height: 0 });
  const [rotation1, setRotation1] = useState(0);
  const [rotation2, setRotation2] = useState(0);
  const [rotation3, setRotation3] = useState(0);
  const rotatableRef1 = useRef(null);
  const rotatableRef2 = useRef(null);
  const rotatableRef3 = useRef(null);

  useEffect(() => {
    if (divRef.current) {
      setDivSize({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      });
    }
  }, []);

  useEffect(() => {
    if (rotatableRef1.current && rotatableRef2.current && rotatableRef3.current) {
      const bounds1 = rotatableRef1.current.getBoundingClientRect();
      const bounds2 = rotatableRef2.current.getBoundingClientRect();
      const bounds3 = rotatableRef3.current.getBoundingClientRect();
      setRotatableBounds1(bounds1);
      setRotatableBounds2(bounds2);
      setRotatableBounds3(bounds3);
    }
  }, [rotation1, rotation2, rotation3]);

  const handleMouseDown = (e, currentRotation, setCurrentRotation) => {
    e.preventDefault();

    let lastPageX = e.pageX;

    function handleMouseMove(e) {
      const delta = lastPageX - e.pageX;
      setCurrentRotation((prevRotation) => {
        const newRotation = prevRotation - delta / 10;
        setRotation(newRotation);
        return newRotation;
      });
      lastPageX = e.pageX;
      
    }

   

    function handleMouseUp() {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
    }

    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <div
      className="circular-div"
      ref={divRef}
      style={{ width: "20px", height: "20px" }}
    >
      <div className="compass-container">
        <div
          className="layer3-container"
      ref={rotatableRef3}
      style={{ transform: `rotate(${rotation3}deg)` }}
      onMouseDown={(e) => handleMouseDown(e, rotation3, setRotation3)}
        >
          <div className="layer3"></div>
        </div>
        <div
         className="layer2-container"
         ref={rotatableRef2}
         style={{ transform: `rotate(${rotation2}deg)` }}
         onMouseDown={(e) => handleMouseDown(e, rotation2, setRotation2)}
        >
          <div className="layer2"></div>
        </div>
        <div
          className="layer1-container"
          ref={rotatableRef1}
          style={{ transform: `rotate(${rotation1}deg)` }}
          onMouseDown={(e) => handleMouseDown(e, rotation1, setRotation1)}
        >
          <div className="layer1"></div>
        </div>
      </div>
    </div>
  );
};

export default CR3;
