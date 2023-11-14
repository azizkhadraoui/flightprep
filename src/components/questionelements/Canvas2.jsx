import React, { useState, useEffect } from "react";
import { Stage, Layer, Line, Circle, Rect, Ellipse, Arc } from "react-konva";
import { Button } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import StraightenIcon from '@mui/icons-material/Straighten';
import Rotate90DegreesCcwIcon from '@mui/icons-material/Rotate90DegreesCcw';

const DrawingComponent = () => {
  const [mode, setMode] = useState("line");
  const [lines, setLines] = useState([]);
  const isDrawing = React.useRef(false);
  const direction = React.useRef("horizontal");
  const [distance, setDistance] = useState(0);
  const [angle, setAngle] = useState(0);
  const [angleLines, setAngleLines] = useState([]);
  const [arcs, setArcs] = useState([]);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    if (mode === "distance" || mode === "angle") {
      if (angleLines.length > 0) {
        const lastLine = angleLines[angleLines.length - 1];
        setAngleLines([...angleLines, { points: [lastLine.points[2], lastLine.points[3], pos.x, pos.y] }]);
      } else {
        setAngleLines([{ points: [pos.x, pos.y, pos.x, pos.y] }]);
      }
    } else {
      setLines([...lines, { tool: mode, points: [pos.x, pos.y, pos.x, pos.y] }]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    if (mode === "distance" || mode === "angle") {
      let lastLine = angleLines[angleLines.length - 1];
      lastLine.points = [
        lastLine.points[0],
        lastLine.points[1],
        point.x,
        point.y,
      ];
      angleLines.splice(angleLines.length - 1, 1, lastLine);
      setAngleLines(angleLines.concat());
    } else {
      let lastLine = lines[lines.length - 1];
      lastLine.points = [
        lastLine.points[0],
        lastLine.points[1],
        point.x,
        point.y,
      ];
      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
    }
  };

  const handleMouseUp = () => {
    isDrawing.current = false;
    if (mode === "distance" || mode === "angle") {
      if (angleLines.length === 2) {
        const dx1 = angleLines[0].points[2] - angleLines[0].points[0];
        const dy1 = angleLines[0].points[3] - angleLines[0].points[1];
        const dx2 = angleLines[1].points[2] - angleLines[1].points[0];
        const dy2 = angleLines[1].points[3] - angleLines[1].points[1];
        const angle = Math.atan2(dy2, dx2) - Math.atan2(dy1, dx1);
        setAngle(Math.round(angle * (180 / Math.PI)));
        setArcs([...arcs, { x: angleLines[0].points[2], y: angleLines[0].points[3], angle: Math.abs(angle) }]);
        setLines([...lines, ...angleLines]);
        setAngleLines([]);
      }
    } else if (mode === "perpendicular") {
      direction.current =
        direction.current === "horizontal" ? "vertical" : "horizontal";
    }
  };

  useEffect(() => {
    const lastLine = lines[lines.length - 1];
    if (lastLine && mode === "distance") {
      const dx = lastLine.points[2] - lastLine.points[0];
      const dy = lastLine.points[3] - lastLine.points[1];
      const newDistance = Math.sqrt(dx * dx + dy * dy);
      setDistance(Math.round(newDistance)); // distance in pixels
    }
  }, [lines, mode]);

  return (
    <div>
      <Stage
        width={800}
        height={600}
        onMouseDown={handleMouseDown}
        onMousemove={handleMouseMove}
               onMouseup={handleMouseUp}
      >
        <Layer>
          <Rect width={800} height={600} fill="white" />
          {lines.map((line, i) => (
            <React.Fragment key={i}>
              {(line.tool === "line" ||
                line.tool === "distance" ||
                line.tool === "angle") && (
                <Line points={line.points} stroke="red" />
              )}
              {line.tool === "dot" && (
                <Circle
                  x={line.points[0]}
                  y={line.points[1]}
                  radius={2}
                  fill="red"
                />
              )}
              {line.tool === "perpendicular" && (
                <Line points={line.points} stroke="red" />
              )}
              {line.tool === "ellipse" && (
                <Ellipse
                  x={line.points[0]}
                  y={line.points[1]}
                  radiusX={Math.abs(line.points[2] - line.points[0]) / 2}
                  radiusY={Math.abs(line.points[3] - line.points[1]) / 2}
                  fill="transparent"
                  stroke="red"
                />
              )}
            </React.Fragment>
          ))}
          {angleLines.map((line, i) => (
            <Line key={i} points={line.points} stroke="blue" />
          ))}
          {arcs.map((arc, i) => (
            <Arc
              key={i}
              innerRadius={50}
              outerRadius={50}
              angle={arc.angle}
              fill="transparent"
              stroke="blue"
              x={arc.x}
              y={arc.y}
            />
          ))}
        </Layer>
      </Stage>
      <Button
        variant="contained"
        onClick={() => setMode("line")}
        startIcon={<CreateIcon />}
      >
        Draw Line
      </Button>
      <Button
        variant="contained"
        onClick={() => setMode("dot")}
        startIcon={<RadioButtonUncheckedIcon />}
      >
        Draw Dot
      </Button>
      <Button
        variant="contained"
        onClick={() => {
          setMode("perpendicular");
          direction.current = "horizontal";
        }}
        startIcon={<SwapVertIcon />}
      >
        Draw Perpendicular
      </Button>
      <Button
        variant="contained"
        onClick={() => setMode("ellipse")}
        startIcon={<PanoramaFishEyeIcon />}
      >
        Draw Ellipse
      </Button>
      <Button
        variant="contained"
        onClick={() => setMode("distance")}
        startIcon={<StraightenIcon />}
      >
        Measure Distance
      </Button>
      <Button
        variant="contained"
        onClick={() => setMode("angle")}
        startIcon={<Rotate90DegreesCcwIcon />}
      >
        Measure Angle
      </Button>
      <Button
        variant="contained"
        onClick={() => setLines([])}
        startIcon={<DeleteIcon />}
      >
        Erase All
      </Button>
      {mode === "distance" && (
        <div style={{ backgroundColor: "white" }}>Distance: {distance} mm</div>
      )}
      {mode === "angle" && (
        <div style={{ backgroundColor: "white" }}>Angle: {angle} degrees</div>
      )}
    </div>
  );
};

export default DrawingComponent;