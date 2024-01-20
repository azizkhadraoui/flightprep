import React, { useState, useRef, useEffect } from "react";
import { Button, Switch } from "@mui/material";
import { Stage, Layer, Line, Circle } from "react-konva";
import "./CircularDiv.css";

const CR3 = () => {
  const divRef = useRef(null);
  const [divSize, setDivSize] = useState({ width: 0, height: 0 });
  const [rotation1, setRotation1] = useState(0);
  const [rotation2, setRotation2] = useState(0);
  const [rotation3, setRotation3] = useState(0);
  const rotatableRef1 = useRef(null);
  const rotatableRef2 = useRef(null);
  const rotatableRef3 = useRef(null);
  const [mode, setMode] = useState("control");
  const [lines, setLines] = useState([]);
  const [dots, setDots] = useState([]);
  const isDrawing = useRef(false);
  const [isControlMode, setIsControlMode] = useState(true);
  const [bounds1, setBounds1] = useState(null);
  const [bounds2, setBounds2] = useState(null);
  const [bounds3, setBounds3] = useState(null);

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
      setBounds1(rotatableRef1.current.getBoundingClientRect());
      setBounds2(rotatableRef2.current.getBoundingClientRect());
      setBounds3(rotatableRef3.current.getBoundingClientRect());
    }
  }, [rotation1, rotation2, rotation3]);

  const handleMouseDown = (e, currentRotation, setCurrentRotation) => {
    e.preventDefault();

    let lastPageX = e.pageX;

    function handleMouseMove(e) {
      const delta = lastPageX - e.pageX;
      setCurrentRotation((prevRotation) => {
        const newRotation = prevRotation - delta / 10;
        setCurrentRotation(newRotation);
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

  const handleMouseDownDrawing = (e) => {
    if (!isControlMode) {
      return;
    }
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    if (mode === "control") {
      return;
    }
    if (mode === "drawing" && mode === "line") {
      setLines([...lines, { points: [pos.x, pos.y, pos.x, pos.y] }]);
    } else if (mode === "drawing" && mode === "dot") {
      setDots([...dots, { x: pos.x, y: pos.y }]);
    }
  };

  const handleMouseMoveDrawing = (e) => {
    if (!isDrawing.current || mode !== "drawing" || mode !== "line") {
      return;
    }

    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine = lines[lines.length - 1];
    lastLine.points = [
      lastLine.points[0],
      lastLine.points[1],
      point.x,
      point.y,
    ];
    lines.splice(lines.length - 1, 1, lastLine);
    setLines(lines.concat());
  };

  const handleMouseUpDrawing = () => {
    isDrawing.current = false;
  };

  const eraseAll = () => {
    setLines([]);
    setDots([]);
  };

  return (
    <>
      <Switch
        checked={isControlMode}
        onChange={() => setIsControlMode(!isControlMode)}
      />
      {!isControlMode && (
        <>
          <Button variant="contained" onClick={() => setMode("drawing-line")}>
            Draw Line
          </Button>
          <Button variant="contained" onClick={() => setMode("drawing-dot")}>
            Draw Dot
          </Button>
          <Button variant="contained" onClick={eraseAll}>
            Erase All
          </Button>
        </>
      )}
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
      {!isControlMode && (
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleMouseDownDrawing}
          onMousemove={handleMouseMoveDrawing}
          onMouseup={handleMouseUpDrawing}
        >
          <Layer>
            {lines.map((line, i) => (
              <Line key={i} points={line.points} stroke="red" strokeWidth={2} />
            ))}
            {dots.map((dot, i) => (
              <Circle key={i} x={dot.x} y={dot.y} radius={2} fill="red" />
            ))}
          </Layer>
        </Stage>
      )}
    </>
  );
};
export default CR3;