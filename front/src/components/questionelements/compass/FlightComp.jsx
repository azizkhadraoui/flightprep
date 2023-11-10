import React, { useState } from "react";
import Canvas from "./Canvas";

const FlightComp = ({ closeModal }) => {
  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        backgroundColor: "rgba(0, 0, 0, 0.5)",
        zIndex: 9999,
      }}
    >
      <button
        className="close-button"
        sx={{ background: "white" }}
        onClick={closeModal}
      >
        Exit
      </button>
      <Canvas />
    </div>
  );
};

export default FlightComp;
