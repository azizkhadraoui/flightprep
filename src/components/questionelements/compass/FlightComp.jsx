import React, { useState, useRef } from "react";
import { Button } from "@mui/material";
import { Stage, Layer, Line, Circle } from "react-konva";
import E6B from "./E6B";
import CR3 from "./CR3";

const FlightComp = ({ closeModal }) => {
  const [rotationE6B, setRotationE6B] = useState(0);
  const [rotationCR3, setRotationCR3] = useState(0);
  const [activeComponent, setActiveComponent] = useState(null);
  const [drawingMode, setDrawingMode] = useState(null);
  const [drawingModeActive, setDrawingModeActive] = useState(false);
  const [linesE6B, setLinesE6B] = useState([]);
  const [dotsE6B, setDotsE6B] = useState([]);
  const [linesCR3, setLinesCR3] = useState([]);
  const [dotsCR3, setDotsCR3] = useState([]);
  const isDrawing = useRef(false);
  const [rotatableBounds, setRotatableBounds] = useState(null);
  const [rotatableBounds1, setRotatableBounds1] = useState(null);
  const [rotatableBounds2, setRotatableBounds2] = useState(null);
  const [rotatableBounds3, setRotatableBounds3] = useState(null);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    if (activeComponent === "CR3" && (
      (rotatableBounds && pos.x > rotatableBounds.left && pos.x < rotatableBounds.right && pos.y > rotatableBounds.top && pos.y < rotatableBounds.bottom) ||
      (rotatableBounds1 && pos.x > rotatableBounds1.left && pos.x < rotatableBounds1.right && pos.y > rotatableBounds1.top && pos.y < rotatableBounds1.bottom) ||
      (rotatableBounds2 && pos.x > rotatableBounds2.left && pos.x < rotatableBounds2.right && pos.y > rotatableBounds2.top && pos.y < rotatableBounds2.bottom) ||
      (rotatableBounds3 && pos.x > rotatableBounds3.left && pos.x < rotatableBounds3.right && pos.y > rotatableBounds3.top && pos.y < rotatableBounds3.bottom))) {
      return;
    }
    if (drawingMode === "line") {
      if (activeComponent === "E6B") {
        setLinesE6B([...linesE6B, { points: [pos.x, pos.y, pos.x, pos.y] }]);
      } else if (activeComponent === "CR3") {
        setLinesCR3([...linesCR3, { points: [pos.x, pos.y, pos.x, pos.y] }]);
      }
    } else if (drawingMode === "dot") {
      if (activeComponent === "E6B") {
        setDotsE6B([...dotsE6B, { x: pos.x, y: pos.y }]);
      } else if (activeComponent === "CR3") {
        setDotsCR3([...dotsCR3, { x: pos.x, y: pos.y }]);
      }
    }
  };
  
  const handleMouseMove = (e) => {
    if (!isDrawing.current || drawingMode !== "line") {
      return;
    }
  
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    let lastLine;
    if (activeComponent === "E6B") {
      lastLine = linesE6B[linesE6B.length - 1];
    } else if (activeComponent === "CR3") {
      lastLine = linesCR3[linesCR3.length - 1];
    }
    lastLine.points = [
      lastLine.points[0],
      lastLine.points[1],
      point.x,
      point.y,
    ];
    if (activeComponent === "E6B") {
      linesE6B.splice(linesE6B.length - 1, 1, lastLine);
      setLinesE6B(linesE6B.concat());
    } else if (activeComponent === "CR3") {
      linesCR3.splice(linesCR3.length - 1, 1, lastLine);
      setLinesCR3(linesCR3.concat());
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
  };

  const eraseAll = () => {
    if (activeComponent === "E6B") {
      setLinesE6B([]);
      setDotsE6B([]);
    } else if (activeComponent === "CR3") {
      setLinesCR3([]);
      setDotsCR3([]);
    }
  };

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
      }}
    >
      <div style={{ position: "absolute", top: 0, zIndex: 1 }}>
        <Button variant="contained" onClick={closeModal}>
          X
        </Button>
        <Button variant="contained" onClick={() => setActiveComponent("E6B")}>
          E6B
        </Button>
        <Button variant="contained" onClick={() => setActiveComponent("CR3")}>
          CR3
        </Button>
        {activeComponent && (
          <>
            <Button variant="contained" onClick={() => { setDrawingMode("line"); setDrawingModeActive(true); }}>
              Draw Line
            </Button>
            <Button variant="contained" onClick={() => { setDrawingMode("dot"); setDrawingModeActive(true); }}>
              Draw Dot
            </Button>
            <Button variant="contained" onClick={eraseAll}>
              Erase All
            </Button>
            <Button variant="contained" onClick={() => setDrawingModeActive(false)}>
              Toggle Drawing Mode
            </Button>
          </>
        )}
      </div>
      <div style={{ position: "absolute", top: "50px" }}>
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onMousemove={handleMouseMove}
          onMouseup={handleMouseUp}
        >
          <Layer>
            {(activeComponent === "E6B" ? linesE6B : linesCR3).map((line, i) => (
              <Line key={i} points={line.points} stroke="red" />
            ))}
            {(activeComponent === "E6B" ? dotsE6B : dotsCR3).map((dot, i) => (
              <Circle key={i} x={dot.x} y={dot.y} radius={2} fill="red" />
            ))}
          </Layer>
        </Stage>
      </div>
      {activeComponent === "E6B" && (
        <div style={{ width: "50%", height: "50%"}}>
          <E6B setRotation={setRotationE6B} setRotatableBounds={setRotatableBounds} drawingModeActive={drawingModeActive} />
        </div>
      )}
      {activeComponent === "CR3" && (
        <div style={{ width: "50%", height: "50%" }}>
                    <CR3 setRotation={setRotationCR3} setRotatableBounds1={setRotatableBounds1} setRotatableBounds2={setRotatableBounds2} setRotatableBounds3={setRotatableBounds3} drawingModeActive={drawingModeActive} />
        </div>
      )}
    </div>
  );
};

export default FlightComp;