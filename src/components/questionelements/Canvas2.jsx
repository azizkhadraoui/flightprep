import React, { useState, useEffect } from "react";
import { Stage, Layer, Line, Circle, Rect, Ellipse, Path } from "react-konva";
import { Button, IconButton, Tooltip } from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import CreateIcon from "@mui/icons-material/Create";
import RadioButtonUncheckedIcon from "@mui/icons-material/RadioButtonUnchecked";
import SwapVertIcon from "@mui/icons-material/SwapVert";
import PanoramaFishEyeIcon from "@mui/icons-material/PanoramaFishEye";
import StraightenIcon from "@mui/icons-material/Straighten";
import Rotate90DegreesCcwIcon from "@mui/icons-material/Rotate90DegreesCcw";
import GpsFixedIcon from "@mui/icons-material/GpsFixed";
import { useParams } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
import { onAuthStateChanged } from "firebase/auth";
import app from "../../base.js";
import { useLocation } from "react-router-dom";

const db = getFirestore(app);
const auth = getAuth(app);

const DrawingComponent = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const imageUrl = queryParams.get("img");
  console.log(imageUrl);
  const [imgUrl, setImgUrl] = useState(null);
  const [imgWidth, setImgWidth] = useState(0);
  const [imgHeight, setImgHeight] = useState(0);
  const [mode, setMode] = useState("line");
  const [lines, setLines] = useState([]);
  const isDrawing = React.useRef(false);
  const direction = React.useRef("horizontal");
  const [distance, setDistance] = useState(0);
  const [angle, setAngle] = useState(0);
  const [angleLines, setAngleLines] = useState([]);
  const [arcs, setArcs] = useState([]);
  const [distanceLines, setDistanceLines] = useState([]);
  const [distances, setDistances] = useState([]);
  const [crosshairLines, setCrosshairLines] = useState([]);
  const [measurements, setMeasurements] = useState([]);

  useEffect(() => {
    const fetchImage = async () => {
      try {
        const storage = getStorage(app);
        const imgRef = ref(storage, imageUrl);
        const downloadURL = await getDownloadURL(imgRef);
        setImgUrl(downloadURL);
      } catch (error) {
        console.error("Error fetching image:", error);
      }
    };

    fetchImage();
  }, [imageUrl]);

  const img = new window.Image();
  img.src = imgUrl;

  useEffect(() => {
    img.onload = function () {
      setImgWidth(this.width);
      setImgHeight(this.height);
    };
  }, [imgUrl]);

  const handleMouseDown = (e) => {
    isDrawing.current = true;
    const pos = e.target.getStage().getPointerPosition();
    if (mode === "distance") {
      if (distanceLines.length > 0) {
        const lastLine = distanceLines[distanceLines.length - 1];
        setDistanceLines([
          ...distanceLines,
          { points: [lastLine.points[2], lastLine.points[3], pos.x, pos.y] },
        ]);
      } else {
        setDistanceLines([{ points: [pos.x, pos.y, pos.x, pos.y] }]);
      }
    } else if (mode === "angle") {
      if (angleLines.length > 0) {
        const lastLine = angleLines[angleLines.length - 1];
        setAngleLines([
          ...angleLines,
          { points: [lastLine.points[2], lastLine.points[3], pos.x, pos.y] },
        ]);
      } else {
        setAngleLines([{ points: [pos.x, pos.y, pos.x, pos.y] }]);
      }
    } else if (mode === "perpendicular") {
      // Store the starting point for the perpendicular line
      setLines([
        ...lines,
        { tool: mode, points: [pos.x, pos.y, pos.x, pos.y], start: pos },
      ]);
    } else {
      setLines([
        ...lines,
        { tool: mode, points: [pos.x, pos.y, pos.x, pos.y] },
      ]);
    }
  };

  const handleMouseMove = (e) => {
    if (!isDrawing.current) {
      return;
    }
    const stage = e.target.getStage();
    const point = stage.getPointerPosition();
    if (mode === "crosshair") {
      const point = stage.getPointerPosition();

      const verticalLine = {
        points: [point.x, -10000, point.x, 10000], // Extend beyond canvas height
        stroke: "black", // Adjust the color as needed
      };

      const horizontalLine = {
        points: [-10000, point.y, 10000, point.y], // Extend beyond canvas width
        stroke: "black", // Adjust the color as needed
      };

      setCrosshairLines([verticalLine, horizontalLine]);
    } else if (mode === "perpendicular") {
      let lastLine = lines[lines.length - 1];
      const dx = point.x - lastLine.start.x;
      const dy = point.y - lastLine.start.y;

      // Adjust the end point to ensure a perpendicular line
      if (Math.abs(dx) > Math.abs(dy)) {
        lastLine.points = [
          lastLine.start.x,
          lastLine.start.y,
          point.x,
          lastLine.start.y,
        ];
      } else {
        lastLine.points = [
          lastLine.start.x,
          lastLine.start.y,
          lastLine.start.x,
          point.y,
        ];
      }

      lines.splice(lines.length - 1, 1, lastLine);
      setLines(lines.concat());
    } else if (mode === "distance") {
      let lastLine = distanceLines[distanceLines.length - 1];
      lastLine.points = [
        lastLine.points[0],
        lastLine.points[1],
        point.x,
        point.y,
      ];
      distanceLines.splice(distanceLines.length - 1, 1, lastLine);
      setDistanceLines(distanceLines.concat());
    } else if (mode === "angle") {
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
    if (mode === "angle") {
      if (angleLines.length >= 2) {
        const dx1 = angleLines[0].points[2] - angleLines[0].points[0];
        const dy1 = angleLines[0].points[3] - angleLines[0].points[1];
        const dx2 = angleLines[1].points[2] - angleLines[1].points[0];
        const dy2 = angleLines[1].points[3] - angleLines[1].points[1];
        let angle = Math.atan2(dy2, dx2) - Math.atan2(dy1, dx1);
        angle = 180 - Math.round(angle * (180 / Math.PI));
        if (angle < 0) angle += 360;
        if (angle > 180) angle = 360 - angle;
        setAngle(angle);

        // Calculate the start and end points of the arc
        const startX = angleLines[0].points[0] + dx1 / 4;
        const startY = angleLines[0].points[1] + dy1 / 4;
        const endX = angleLines[1].points[0] + (dx2 * 3) / 4;
        const endY = angleLines[1].points[1] + (dy2 * 3) / 4;

        // Generate the SVG path string
        const pathData = `M ${startX} ${startY} A 50 50 0 0 1 ${endX} ${endY}`;

        setArcs([...arcs, { data: pathData }]);
        setLines([...lines, ...angleLines]);
      }
    } else if (mode === "perpendicular") {
      direction.current =
        direction.current === "horizontal" ? "vertical" : "horizontal";
    } else if (mode === "distance") {
      const lastLine = distanceLines[distanceLines.length - 1];
      const dx = lastLine.points[2] - lastLine.points[0];
      const dy = lastLine.points[3] - lastLine.points[1];
      const newDistance = Math.sqrt(dx * dx + dy * dy);
      setDistances([...distances, newDistance]);
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

  const totalDistance = Math.round(distances.reduce((a, b) => a + b, 0));

  const getToolInfo = () => {
    switch (mode) {
      case "distance":
        return `Total Distance: ${totalDistance} mm`;
      case "angle":
        return `Angle: ${angle} °`;
      default:
        return "";
    }
  };

  const eraseAll = () => {
    setLines([]);
    setDistanceLines([]);
    setAngleLines([]);
    setArcs([]);
    setCrosshairLines([]);
  };

  return (
    <div style={{ display: "flex", height: "100vh" }}>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px",
          width: "80px",
          background: "#f0f0f0",
        }}
      >
        <Tooltip title="Draw Line">
          <IconButton onClick={() => setMode("line")}>
            <CreateIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Draw Dot">
          <IconButton onClick={() => setMode("dot")}>
            <RadioButtonUncheckedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Draw Perpendicular">
          <IconButton
            onClick={() => {
              setMode("perpendicular");
              direction.current = "horizontal";
            }}
          >
            <SwapVertIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Draw Ellipse">
          <IconButton onClick={() => setMode("ellipse")}>
            <PanoramaFishEyeIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Measure Distance">
          <IconButton onClick={() => setMode("distance")}>
            <StraightenIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Measure Angle">
          <IconButton onClick={() => setMode("angle")}>
            <Rotate90DegreesCcwIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Crosshair">
          <IconButton onClick={() => setMode("crosshair")}>
            <GpsFixedIcon />
          </IconButton>
        </Tooltip>
        <Tooltip title="Erase All">
          <IconButton onClick={() => eraseAll()}>
            <DeleteIcon />
          </IconButton>
        </Tooltip>
      </div>
      <div
        style={{
          position: "relative",
          flex: 1,
          backgroundImage: `url(${imgUrl})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {mode === "distance" && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
              height: "50px",
              width: "200px",
            }}
          >
            {getToolInfo()}
          </div>
        )}
        {mode === "angle" && (
          <div
            style={{
              position: "absolute",
              top: "10px",
              right: "10px",
              backgroundColor: "white",
              padding: "10px",
              borderRadius: "5px",
              boxShadow: "0 0 5px rgba(0, 0, 0, 0.1)",
              height: "50px",
              width: "200px",
            }}
          >
            {getToolInfo()}
          </div>
        )}
        {imgUrl && (
          <Stage
            width={imgWidth}
            height={imgHeight}
            onMouseDown={handleMouseDown}
            onMousemove={handleMouseMove}
            onMouseup={handleMouseUp}
            style={{ position: "absolute", top: 0, left: 0, opacity: 0 }}
          >
            <Layer>
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
                <Path
                  key={i}
                  data={arc.data}
                  stroke="blue"
                  fill="transparent"
                />
              ))}
              {distanceLines.map((line, i) => (
                <Line key={i} points={line.points} stroke="green" />
              ))}
              {crosshairLines.map((line, index) => (
                <Line key={index} points={line.points} stroke={line.stroke} />
              ))}
            </Layer>
          </Stage>
        )}
      </div>
      <div style={{ marginTop: "10px" }}>
        {measurements.map((measurement, index) => (
          <div key={index}>{measurement}</div>
        ))}
      </div>
    </div>
  );
};

export default DrawingComponent;
