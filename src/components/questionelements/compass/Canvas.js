import React, { useState } from 'react';
import { Stage, Layer, Line, Circle } from 'react-konva';

const Canvas = () => {
  const [tool, setTool] = useState(null);
  const [lines, setLines] = useState([]);
  const [dots, setDots] = useState([]);
  const [currentLine, setCurrentLine] = useState(null);
  const [showCircularDivs, setShowCircularDivs] = useState(false);
  const [showStackedDivs, setShowStackedDivs] = useState(false);

  const handleMouseDown = (e) => {
    if (tool === 'line') {
      setCurrentLine({ points: [e.evt.layerX, e.evt.layerY] });
    } else if (tool === 'dot') {
      setDots([...dots, { x: e.evt.layerX, y: e.evt.layerY }]);
    }
  };

  const handleMouseMove = (e) => {
    if (tool === 'line' && currentLine) {
      setCurrentLine({
        points: [
          currentLine.points[0],
          currentLine.points[1],
          e.evt.layerX,
          e.evt.layerY,
        ],
      });
    }
  };

  const handleMouseUp = () => {
    if (tool === 'line' && currentLine) {
      setLines([...lines, currentLine]);
      setCurrentLine(null);
    }
    setTool('');
  };

  const handleClear = () => {
    setLines([]);
    setDots([]);
  };

  const toggleCircularDivs = () => {
    setShowCircularDivs(!showCircularDivs);
    setShowStackedDivs(false); // Hide the other component if shown
  };

  const toggleStackedDivs = () => {
    setShowStackedDivs(!showStackedDivs);
    setShowCircularDivs(false); // Hide the other component if shown
  };

  return (
    <div>
      <div className="canvas-container">
        {/* Render the canvas */}
        <Stage
          width={window.innerWidth}
          height={window.innerHeight}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
        >
          <Layer>
            {lines.map((line, i) => (
              <Line
                key={i}
                points={line.points}
                stroke="red"
                strokeWidth={2}
                tension={0.5}
                lineCap="round"
                globalCompositeOperation="source-over"
              />
            ))}
            {dots.map((dot, i) => (
              <Circle key={i} x={dot.x} y={dot.y} radius={2} fill="red" />
            ))}
            {currentLine && (
              <Line
                points={currentLine.points}
                stroke="red"
                strokeWidth={2}
                tension={0.5}
                lineCap="round"
                globalCompositeOperation="source-over"
              />
            )}
          </Layer>
        </Stage>
      </div>

      <div className="button-container">
        <button onClick={() => setTool('line')}>Draw Line</button>
        <button onClick={() => setTool('dot')}>Draw Dot</button>
        <button onClick={handleClear}>Clear Drawing</button>
        <button onClick={toggleCircularDivs}>Show Circular Divs</button>
        <button onClick={toggleStackedDivs}>Show Stacked Divs</button>
      </div>
    </div>
  );
};

export default Canvas;
