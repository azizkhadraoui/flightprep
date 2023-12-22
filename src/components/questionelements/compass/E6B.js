import React, { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import "./StackedDivs.css";

const E6B = ({ setRotation, setRotatableBounds}) => {
  const [rotation1, setRotation1] = useState(0);
  const divRef = useRef(null);
  const [divSize, setDivSize] = useState({ width: 0, height: 0 });
  const rotatableRef = useRef(null);
  

  useEffect(() => {
    if (divRef.current) {
      setDivSize({
        width: divRef.current.offsetWidth,
        height: divRef.current.offsetHeight,
      });
    }
  }, []);
  useEffect(() => {
    if (rotatableRef.current) {
      const bounds = rotatableRef.current.getBoundingClientRect();
      setRotatableBounds(bounds);
    }
  }, [rotation1]);

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
      className="stacked-div"
      ref={divRef}
      style={{ width: "100%", height: "100%" }}
    >
      <div className="diagonal-div">
        <Draggable axis="y">
          <div className="top-div">
            <div
              className="rotatable"
              ref={rotatableRef}
              style={{ transform: `rotate(${rotation1}deg)` }}
              onMouseDown={(e) => handleMouseDown(e, rotation1, setRotation1)}
            ></div>
          </div>
        </Draggable>
      </div>
    </div>
  );
};

export default E6B;
