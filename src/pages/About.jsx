import React from "react";
import Navbar from "../components/navbar/Navbar";
import { Box, Typography } from "@mui/material";

const About = () => {
  return (
    <Box
      style={{
        backgroundImage: `url("/loginbackground.svg")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment: "fixed",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Navbar />
      <Box
        sx={{
          marginTop: 10,
          marginBottom: 10,
          backgroundColor: "rgba(27,20,89,0.5)",
          borderRadius: 2,
          padding: 3,
          maxWidth: 1000,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box
          mt={4}
          style={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <Typography variant="h3" style={{ fontWeight: 16, color: "#F1870C" }}>
            About Us
          </Typography>
        </Box>
        <Box my={1}>
          <Typography
            variant="body1"
            style={{
              fontWeight: "bold",
              fontSize: 14,
              paddingTop: "10px",
              color: "white",
            }}
          >
            Buckle up, we're here to help you soar to new heights! By pilots,
            for pilots.
          </Typography>
        </Box>
        <Box my={1}>
          <Typography
            variant="body1"
            style={{
              fontWeight: "bold",
              fontSize: 14,
              paddingTop: "10px",
              color: "white",
            }}
          >
            Exams can be challenging and stressful. We aim to assist you in
            practice, ensuring you feel confident on your big day.
          </Typography>
        </Box>
        <Box my={1}>
          <Typography
            variant="body1"
            style={{
              fontWeight: "bold",
              fontSize: 14,
              paddingTop: "10px",
              color: "white",
            }}
          >
            Airexam prepares you for your EASA - FCL exams, boasting the largest
            and most up-to-date database for your EASA - FCL examinations.
          </Typography>
        </Box>
        <Box my={1} style={{ textAlign: "center" }}>
          {" "}
          {/* Added textAlign style */}
          <Typography
            variant="body1"
            style={{
              fontWeight: "bold",
              fontSize: 14,
              paddingTop: "10px",
              color: "white",
            }}
          >
            We provide guidance in the form of explanations for all questions,
            authored by experienced pilots. Our support team is available for
            technical inquiries and is ready to assist you.
          </Typography>
        </Box>
        <Box my={1} style={{ textAlign: "center" }}>
          {" "}
          {/* Added textAlign style */}
          <Typography
            variant="body1"
            style={{
              fontWeight: "bold",
              fontSize: 14,
              paddingTop: "10px",
              color: "white",
            }}
          >
            Located in Dubai, UAE, our team passionately develops new features
            and upgrades to ensure you have access to a current database in a
            user-friendly environment.
          </Typography>
        </Box>
        <Box my={1} style={{ textAlign: "center" }}>
          {" "}
          {/* Added textAlign style */}
          <Typography
            variant="body1"
            style={{
              fontWeight: "bold",
              fontSize: 14,
              paddingTop: "10px",
              color: "white",
            }}
          >
            Airexam has been founded in 2023, by AQWA SOLOUTIONS and has
            achieved numerous goals, either set by ourselves or inspired by your
            feedback. For this, we sincerely thank you.
          </Typography>
        </Box>
        <Box mt={4} justifyContent="right" alignItems="right">
          <Typography variant="caption">
            Omnilink. all rights reserved © 2023
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default About;
