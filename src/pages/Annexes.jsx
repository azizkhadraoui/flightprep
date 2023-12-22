import React from "react";
import Navbar2 from "../components/navbar/Navbar2";
import subjectData from "./subjectData.json"; // import the JSON data
import { Typography, Card, CardContent, ButtonBase } from "@mui/material";


const Annexes = () => {
  return (
    <div
      style={{
        backgroundImage: `url("/loginbackground.svg")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment:'fixed',
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh",
      }}
    >
      <Navbar2 />
      <div
        style={{
          backgroundColor: "white",
          padding: "20px",
          borderRadius: "10px",
          marginTop: "50px",
          textAlign: "center",
          width: "800px",
          marginBottom:'50px',
        }}
      >
        <Typography variant="h4">
          Click to download annexes based on subject:
        </Typography>
        {subjectData
          .sort((a, b) => a.Code - b.Code)
          .map((subject, index) => (
            <ButtonBase
              key={subject.Code}
              style={{ width: "100%", textAlign: "left" }}
            >
              <Card style={{ margin: "10px", width: "100%" }}>
                {" "}
                {/* set the width of the cards */}
                <CardContent>
                  <Typography variant="h6">
                    {index + 1}. {subject.Name}
                  </Typography>
                </CardContent>
              </Card>
            </ButtonBase>
          ))}
      </div>
    </div>
  );
};

export default Annexes;
