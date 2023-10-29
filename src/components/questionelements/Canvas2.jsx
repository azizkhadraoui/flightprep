import React, { useState, useRef, useEffect } from "react";
import { button } from "@mui/material";
import { Create, FiberManualRecord, Delete } from "@mui/icons-material";

const Canvas = () => {
  const canvasRef = useRef(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [endX, setEndX] = useState(0);
  const [endY, setEndY] = useState(0);
  const [drawings, setDrawings] = useState([]);
  const [tool, setTool] = useState("line");

  const handleMouseDown = (event) => {
    const canvas = canvasRef.current;
    if (tool === "line" || tool === "measure") {
      setIsDrawing(true);
      setStartX(event.clientX - canvas.offsetLeft);
      setStartY(event.clientY - canvas.offsetTop);
    }
  };

  const handleMouseMove = (event) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    const mouseX = event.clientX - canvas.offsetLeft;
    const mouseY = event.clientY - canvas.offsetTop;

    setEndX(mouseX);
    setEndY(mouseY);

    if (tool === "line" || tool === "measure") {
      context.clearRect(0, 0, canvas.width, canvas.height);
      drawings.forEach((drawing) => {
        if (drawing.type === "line") {
          context.strokeStyle = "red";
          context.lineWidth = 4;
          context.beginPath();
          context.moveTo(drawing.startX, drawing.startY);
          context.lineTo(drawing.endX, drawing.endY);
          context.stroke();
        }
      });

      const newDrawing = { type: tool, startX, startY, endX, endY };
      context.strokeStyle = "red";
      context.lineWidth = 4;
      context.beginPath();
      context.moveTo(startX, startY);
      context.lineTo(mouseX, mouseY);
      context.stroke();
      setDrawings([...drawings, newDrawing]);
    }
  };

  const handleMouseUp = () => {
    if (isDrawing && (tool === "line" || tool === "measure")) {
      setIsDrawing(false);
    }
  };

  const handleErase = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    setDrawings([]);
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    drawings.forEach((drawing) => {
      if (drawing.type === "line") {
        context.strokeStyle = "red";
        context.lineWidth = 4;
        context.beginPath();
        context.moveTo(drawing.startX, drawing.startY);
        context.lineTo(drawing.endX, drawing.endY);
        context.stroke();
      }
    });
  }, [drawings]);

  return (
    <div>
      <div style={{ display: "flex", marginBottom: "15px" }}>
        <button
          variant="contained"
          color={tool === "line" ? "primary" : "default"}
          startIcon={<Create />}
          onClick={() => setTool("line")}
        >
          Draw Line
        </button>
        <button
          variant="contained"
          color="secondary"
          startIcon={<Delete />}
          onClick={handleErase}
        >
          Erase All
        </button>
      </div>
      <canvas
        ref={canvasRef}
        width={800}
        height={600}
        style={{ border: "1px solid black" }}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
      />
    </div>
  );
};

export default Canvas;
