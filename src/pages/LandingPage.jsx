import React from 'react';
import Navbar from '../components/navbar/Navbar';
import './landing9age.css'

const LandingPage = () => {
  return (
    <div 
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        backgroundImage: `url("/landingpage.svg")`, // Update the path if needed
        backgroundSize: 'cover',
        backgroundPosition: 'top center',
        minHeight: '100vh',
      }}
    >
      <Navbar/>
      <div style={{
        marginLeft: '60px',
        marginTop: '100px',
        backgroundColor: 'radial-gradient(188.27% 113.08% at 73.28% 27.45%, #312783 36.98%, #010101 87.06%, #242535 100%)',
        color: '#FFF',

        padding: '2rem',
        maxWidth: '800px',
      }}>
        <h1 style={{
          fontSize: '41px',
          fontWeight: 650,
          lineHeight: 'normal',
          
        }}>
          Your Ultimate Resource for<br/> <span style={{ color: '#F1870C' }}>Flight Preparation</span>
        </h1>
        <h1 style={{
          fontSize: '41px',
          fontWeight: 800,
          lineHeight: 'normal',
          marginTop: '30px',
          fontFamily: 'Mulish',
        }}>
          AIREXAM
        </h1>
        <p style={{
          fontSize: '18px',
          fontFamily: 'Mulish',
          fontWeight: 400,
          fontStyle: 'normal',
          lineHeight: 'normal',
          color: '#FFF',
          width: '532px',
          height: '94px',
          flexShrink: 0,
          marginTop: '1rem',
        }}>
          Welcome to AIREXAM, your premier online destination for comprehensive flight exam preparation. Whether you're a student pilot embarking on your journey or a seasoned aviator seeking to renew certifications, our website offers a wide range of study materials and resources to help you succeed.
        </p>
      </div>
      <div style={{
        display: 'flex', // Add display: flex
        flexDirection: 'column',
        alignItems: 'center', // Center the items horizontally
        justifyContent: 'center', // Center the content vertically
        backgroundColor: 'radial-gradient(188.27% 113.08% at 73.28% 27.45%, #312783 36.98%, #010101 87.06%, #242535 100%)',
        color: '#FFF',
        fontFamily: 'Mulish',
        padding: '2rem',
        maxWidth: '600px',
        alignSelf: 'center',
        marginTop: '750px',
      }}>
        <h1 style={{
          fontSize: '64px',
          fontWeight: 800,
          lineHeight: 'normal',
          color: '#FFF',
          fontFamily: 'Mulish',
        }}>
          WITH <span style={{ color: '#F1870C' }}>AIREXAM</span>
        </h1>
        <p style={{
          fontSize: '32px',
          fontFamily: 'Mulish',
          fontWeight: 400,
          fontStyle: 'normal',
          lineHeight: 'normal',
          color: '#FFF',
          textAlign: 'center',
          width: '1179px',
          height: '202px',
          flexShrink: 0,
        }}>
          Dive into an extensive collection of tests derived from a multitude of databases. Our carefully curated selection ensures that you have access to a wide range of questions, formats, and difficulty levels. This diversity enables you to gain a deeper understanding of the subject matter and refine your skills across all areas.
        </p>
      </div>
    </div>
  );
};

export default LandingPage;
