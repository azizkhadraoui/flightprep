import React, { useRef, useEffect, useState, useCallback } from "react";

function Canvas() {
  const canvasRef = useRef(null);
  const [drawing, setDrawing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [startY, setStartY] = useState(0);
  const [mode, setMode] = useState("drawLine");
  const [lines, setLines] = useState([]);

  const drawLine = useCallback((context, x1, y1, x2, y2) => {
    context.beginPath();
    context.moveTo(x1, y1);
    context.lineTo(x2, y2);
    context.stroke();
  }, []);

  const drawDot = useCallback((context, x, y) => {
    context.beginPath();
    context.arc(x, y, 5, 0, 2 * Math.PI);
    context.fill();
  }, []);

  const onMouseDown = useCallback(
    (event) => {
      if (event) {
        const offsetX = event.nativeEvent.offsetX;
        const offsetY = event.nativeEvent.offsetY;
        setDrawing(true);
        setStartX(offsetX);
        setStartY(offsetY);
        if (mode === "drawDot") {
          const canvas = canvasRef.current;
          const context = canvas.getContext("2d");
          drawDot(context, offsetX, offsetY);
        }
      }
    },
    [mode, drawDot]
  );

  const onMouseMove = useCallback(
    (event) => {
      if (event) {
        const offsetX = event.nativeEvent.offsetX;
        const offsetY = event.nativeEvent.offsetY;
        if (!drawing) return;
        const canvas = canvasRef.current;
        const context = canvas.getContext("2d");
        if (mode === "drawLine") {
          drawLine(context, startX, startY, offsetX, offsetY);
          setStartX(offsetX);
          setStartY(offsetY);
        } else if (mode === "measure") {
          const distance = Math.hypot(startX - offsetX, startY - offsetY);
          context.clearRect(0, 0, canvas.width, canvas.height);
          lines.forEach((line) => drawLine(context, ...line));
          drawLine(context, startX, startY, offsetX, offsetY);
          context.font = "20px Arial";
          context.fillText(distance.toFixed(2), offsetX, offsetY - 10);
        } else if (mode === "erase") {
          context.globalCompositeOperation = "destination-out";
          context.arc(offsetX, offsetY, 10, 0, Math.PI * 2, false);
          context.fill();
          context.globalCompositeOperation = "source-over";
        }
      }
    },
    [mode, drawing, startX, startY, lines, drawLine]
  );

  const onMouseUp = useCallback(
    (event) => {
      if (mode === "drawLine") {
        setLines((prevLines) => [
          ...prevLines,
          [
            startX,
            startY,
            event.nativeEvent.offsetX,
            event.nativeEvent.offsetY,
          ],
        ]);
      }
      setDrawing(false);
    },
    [mode, startX, startY]
  );

  const clearCanvas = useCallback(() => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.clearRect(0, 0, canvas.width, canvas.height);
    setLines([]);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.addEventListener("mousedown", onMouseDown);
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mouseup", onMouseUp);

    return () => {
      canvas.removeEventListener("mousedown", onMouseDown);
      canvas.removeEventListener("mousemove", onMouseMove);
      canvas.removeEventListener("mouseup", onMouseUp);
    };
  }, [onMouseDown, onMouseMove, onMouseUp]);

  return (
    <div>
      <canvas ref={canvasRef} style={{ border: "1px solid black" }}></canvas>
      <button onClick={() => setMode("drawLine")}>Draw Line</button>
      <button onClick={() => setMode("drawDot")}>Draw Dot</button>
      <button onClick={() => setMode("measure")}>Measure</button>
      <button onClick={clearCanvas}>Clear</button>
      <button onClick={() => setMode("erase")}>Erase</button>
    </div>
  );
}

export default Canvas;
