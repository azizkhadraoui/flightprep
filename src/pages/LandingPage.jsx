import React from 'react';
import Navbar from '../components/navbar/Navbar';
import './landing9age.css';
import AutorenewIcon from '@mui/icons-material/Autorenew'; // Reload icon
import CloudIcon from '@mui/icons-material/Cloud'; // Cloud icon
import RocketIcon from '@mui/icons-material/Send'; // Rocket icon (Material UI doesn't have a rocket icon, but the 'Send' icon is often used as a substitute)
import BookIcon from '@mui/icons-material/Book'; // Book icon
import StarIcon from '@mui/icons-material/Star'; // Star icon
import SchoolIcon from '@mui/icons-material/School'; // Graduation hat icon
import AOS from "aos";
import "aos/dist/aos.css";


AOS.init();

const LandingPage = () => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        backgroundImage: `url("/landingpage.svg")`,
        backgroundSize: "cover",
        backgroundPosition: "top center",
        backgroundAttachment:'fixed',
        minHeight: "100vh",
      }}
    >
      <Navbar />
      <div
        style={{
          marginTop: "50px",
          marginLeft: "150px",
          backgroundColor:
            "radial-gradient(188.27% 113.08% at 73.28% 27.45%, #312783 36.98%, #010101 87.06%, #242535 100%)",
          color: "#FFF",

          padding: "2rem",
          maxWidth: "800px",
        }}
      >
        <h1
          style={{
            fontSize: "41px",
            fontWeight: 650,
            lineHeight: "normal",
          }}
        >
          Your Ultimate Resource for
          <br /> <span style={{ color: "#F1870C" }}>Flight Preparation</span>
        </h1>
        <h1
          style={{
            fontSize: "41px",
            fontWeight: 800,
            lineHeight: "normal",
            marginTop: "30px",
            fontFamily: "Mulish",
          }}
        >
          AIREXAM
        </h1>
        <p
          style={{
            fontSize: "18px",
            fontFamily: "Mulish",
            fontWeight: 400,
            fontStyle: "normal",
            lineHeight: "normal",
            color: "#FFF",
            width: "532px",
            height: "94px",
            flexShrink: 0,
            marginTop: "1rem",
          }}
        >
          Welcome to AIREXAM, your premier online destination for comprehensive
          flight exam preparation. Whether you're a student pilot embarking on
          your journey or a seasoned aviator seeking to renew certifications,
          our website offers a wide range of study materials and resources to
          help you succeed.
        </p>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          marginTop: "3rem",
        }}
      >
        <h2 style={{ color: "#FFF", fontSize: "2rem" }}>
          Some of our many benefits
        </h2>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "2rem",
            }}
          >
            <AutorenewIcon style={{ fontSize: "3rem", color: "#FFF" }} />
            <h3 style={{ color: "#FFF", fontSize: "1.5rem" }}>UP TO DATE</h3>
            <p style={{ color: "#FFF", fontSize: "1.2rem" }}>
              Our question banks <br />
              are constantly updated.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "2rem",
            }}
          >
            <CloudIcon style={{ fontSize: "3rem", color: "#FFF" }} />
            <h3 style={{ color: "#FFF", fontSize: "1.5rem" }}>CLOUD</h3>
            <p style={{ color: "#FFF", fontSize: "1.2rem" }}>
              You can use any device and simply
              <br />
              synchronize your account.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "2rem",
            }}
          >
            <RocketIcon style={{ fontSize: "3rem", color: "#FFF" }} />
            <h3 style={{ color: "#FFF", fontSize: "1.5rem" }}>COVERAGE</h3>
            <p style={{ color: "#FFF", fontSize: "1.2rem" }}>
              We cover EASA-FCL
              <br /> (Europe) syllabus.
            </p>
          </div>
        </div>
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-around",
            flexWrap: "wrap",
          }}
        >
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "2rem",
            }}
          >
            <BookIcon style={{ fontSize: "3rem", color: "#FFF" }} />
            <h3 style={{ color: "#FFF", fontSize: "1.5rem" }}>LIBRARY</h3>
            <p style={{ color: "#FFF", fontSize: "1.2rem" }}>
              Our Library provides various training
              <br /> and regulatory documents.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "2rem",
            }}
          >
            <StarIcon style={{ fontSize: "3rem", color: "#FFF" }} />
            <h3 style={{ color: "#FFF", fontSize: "1.5rem" }}>UNIQUE</h3>
            <p style={{ color: "#FFF", fontSize: "1.2rem" }}>
              Many unique functions
              <br /> that you will not find anywhere else.
            </p>
          </div>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              margin: "2rem",
            }}
          >
            <SchoolIcon style={{ fontSize: "3rem", color: "#FFF" }} />
            <h3 style={{ color: "#FFF", fontSize: "1.5rem" }}>LMS</h3>
            <p style={{ color: "#FFF", fontSize: "1.2rem" }}>
              Special interface for ATOs.
              <br /> Support your theoretical lectures
              <br /> with our practical tests.
            </p>
          </div>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          flexDirection: "row",
          justifyContent: "space-around",
          alignItems: "center",
          marginTop: "2rem",
        }}
      >
        <div style={{ width: "50%" }}>
          <img
            data-aos="fade-right"
            data-aos-duration="2000"
            src="/smartphone.png"
            alt="Mobile app"
            style={{ width: "100%", objectFit: "cover" }}
          />
        </div>
        <div style={{ width: "50%" }}>
          <h1
            style={{
              color: "#FFF",
              fontSize: "50px",
              textTransform: "uppercase",
              marginLeft: "50px",
            }}
          >
            Mobile app
            <br />
            coming soon
          </h1>
        </div>
      </div>
      <div
        style={{
          display: "flex", // Add display: flex
          flexDirection: "column",
          alignItems: "center", // Center the items horizontally
          justifyContent: "center", // Center the content vertically
          backgroundColor:
            "radial-gradient(188.27% 113.08% at 73.28% 27.45%, #312783 36.98%, #010101 87.06%, #242535 100%)",
          color: "#FFF",
          fontFamily: "Mulish",
          padding: "3rem",
          alignSelf: "center",
        }}
      >
        <h1
          style={{
            fontSize: "50px",
            fontWeight: 600,
            lineHeight: "normal",
            color: "#FFF",
            fontFamily: "Mulish",
          }}
        >
          WITH <span style={{ color: "#F1870C" }}>AIREXAM</span>
        </h1>
        <p
          style={{
            fontSize: "30px",
            fontFamily: "Mulish",
            fontWeight: 400,
            fontStyle: "normal",
            lineHeight: "normal",
            color: "#FFF",
            textAlign: "center",
            width: "1179px",
            height: "202px",
            flexShrink: 0,
          }}
        >
          Dive into an extensive collection of tests derived from a multitude of
          databases. Our carefully curated selection ensures that you have
          access to a wide range of questions, formats, and difficulty levels.
          This diversity enables you to gain a deeper understanding of the
          subject matter and refine your skills across all areas.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
