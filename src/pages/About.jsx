import React from 'react'
import Navbar from '../components/navbar/Navbar'
import { Box, Typography } from '@mui/material'

const About = () => {
  return (
    <div
      style={{
        backgroundImage: `url("/loginbackground.svg")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        backgroundAttachment:'fixed',
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-start",
        justifyContent: "flex-start",
      }}
    >
        <Navbar />
          <div style={{height: "100vh",
        padding: "2rem",
        color: "white",
        marginLeft: "25px",}}>
              <Box mt={4}>
        <Typography variant="h3" style={{ fontWeight: 32 }}>
          About Us: 
        </Typography>
      </Box>
      <Box my={2}>
        <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: 28, paddingTop:'40px' }}>
          Buckle up, we're here to help you soar to new heights! By pilots, for pilots.
        </Typography>
      </Box>
      <Box my={2}>
        <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: 28, paddingTop:'40px' }}>
          Exams can be challenging and stressful. We aim to assist you in practice, ensuring you feel confident on your big day.
        </Typography>
      </Box>
      <Box my={2}>
        <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: 28, paddingTop:'40px' }}>
          Airexam prepares you for your EASA - FCL exams, boasting the largest and most up-to-date database for your EASA - FCL examinations.
        </Typography>
      </Box>
      <Box my={2}>
        <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: 28, paddingTop:'40px' }}>
          We provide guidance in the form of explanations for all questions, authored by experienced pilots. Our support team is available for technical inquiries and is ready to assist you.
        </Typography>
      </Box>
      <Box my={2}>
        <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: 28, paddingTop:'40px' }}>
          Located in Dubai, UAE, our team passionately develops new features and upgrades to ensure you have access to a current database in a user-friendly environment.
        </Typography>
      </Box>
      <Box my={2}>
        <Typography variant="body1" style={{ fontWeight: 'bold', fontSize: 28, paddingTop:'40px' }}>
          Airexam has been founded in 2023, by AQWA SOLOUTIONS and has achieved numerous goals, either set by ourselves or inspired by your feedback. For this, we sincerely thank you.
        </Typography>
      </Box>
      <Box mt={4} justifyContent='right' alignItems='right'>
        <Typography variant="caption">
          Omnilink. all rights reserved © 2023
        </Typography>
      </Box>
        </div>
      
    </div>
  )
}

export default About