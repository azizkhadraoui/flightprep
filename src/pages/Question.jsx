import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar/Navbar';
import { Box, Typography, Grid, Button } from '@mui/material';
import './questions.css';
import QuestionComponent from '../components/questionelements/QuestionComponent';
import ExplanationComponent from '../components/questionelements/ExplanationComponent';
import NotesComponent from '../components/questionelements/NoteComponent';
import Comments from '../components/questionelements/Comments';
import QuestionsMatrix from '../components/questionelements/QuestionsMatrix';
import firebase from '../base';

const Question = () => {


  // Get the user ID from your authentication system or wherever it's available
  const userId = 'yourUserId'; // Replace with the actual user ID

  // Create a reference to the Firebase database
  const db = firebase.database();
  const userProgressRef = db.ref(`userProgress/${userId}`); // Replace with the correct Firebase path

  // Function to save user's progress data to Firebase
  const saveUserProgress = () => {
    userProgressRef.set({
      currentQuestion,
      selectedAnswer,
    });
  };

  // Watch for changes in currentQuestion and selectedAnswer and save progress
  useEffect(() => {
    if (userId) {
      saveUserProgress(); // Save the user's progress initially

      // Save the user's progress whenever currentQuestion or selectedAnswer changes
      const progressInterval = setInterval(() => {
        saveUserProgress();
      }, 10000); // Save every 10 seconds, adjust as needed

      // Cleanup the interval when the component unmounts
      return () => {
        clearInterval(progressInterval);
      };
    }
  }, [userId, currentQuestion, selectedAnswer]);



  // Function to format time as HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Array(questions.length).fill(null));

  const [contentType, setContentType] = useState('question');
  const handleButtonClick = (buttonType) => {
    setContentType(buttonType);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:8800/data');
        const data = response.data;
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
    };

    fetchData();
  }, []);


  return (
    
    <div
      style={{
        backgroundImage: `url("/loginbackground.svg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        height: '100vh',
      }}
    >
      <Navbar />
      <div 
        style={{
            width: 500,
            height: 60,
        }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" padding="20px" width="80%">
          <Grid container alignItems="left">
            <Grid item>
              <Typography
                variant="h6"
                sx={{
                  width: '200px',
                  height: '20px',
                  flexShrink: 0,
                  color: '#F1870C',
                  textAlign: 'center',
                  fontFamily: 'Mulish',
                  fontSize: '32px',
                  fontWeight: 800,
                }}
              >
                QN°{currentQuestion + 1}/{questions.length}
              </Typography>
            </Grid>
            <Grid item>
              <img src='/pin.svg' alt="Pin" style={{ marginRight: '8px' }} />
            </Grid>
          </Grid>
          <Grid container alignItems="left" marginLeft={'500px'}>
            <Grid item>
              <img src='/clock.svg' alt="Clock" style={{ marginRight: '8px' }} />
            </Grid>
          </Grid>
          <Grid container alignItems="left">
            <Grid item>
              <Typography variant="body1" sx={{ fontSize: '18px', color: '#FFF', marginRight: '8px' }}>
                {formatTime(3600)}
              </Typography>
            </Grid>
          </Grid>
          <Grid container alignItems="left">
            <Grid item>
                <Button onClick={handleNextQuestion}><img src='/arrow.svg' alt="Arrow" /></Button>
            </Grid>
          </Grid>
        </Box>
        <div 
        style={{
            width: 500,
            height: 60,
        }}>
        <Box display="flex" justifyContent="space-between" alignItems="center" marginTop="20px" marginLeft="20px">
          <Button
            variant="text"
            onClick={() => handleButtonClick('question')}
            sx={{
                color: '#FFF',
                fontFamily: 'Mulish',
                fontSize: '16px',  // Reduced font size
                fontWeight: 800,
                marginLeft: '30px',  // Space between buttons
                '&:hover': {
                  color: '#F1870C',
                },
            }}
          >
            <img src="/play.svg" alt="" />
            Question
          </Button>
          <Button
            variant="text"
            onClick={() => handleButtonClick('explanation')}
            sx={{
                color: '#FFF',
                fontFamily: 'Mulish',
                fontSize: '16px',  // Reduced font size
                fontWeight: 800,
                marginLeft: '90px',  // Space between buttons

                '&:hover': {
                  color: '#F1870C',
                },
            }}
          >
            <img src="/explanation.svg" alt="" />
            Explanation
          </Button>
          <Button
            variant="text"
            onClick={() => handleButtonClick('statistics')}
            sx={{
                color: '#FFF',
                fontFamily: 'Mulish',
                fontSize: '16px',  // Reduced font size
                fontWeight: 800,
                marginLeft: '90px',  // Space between buttons
                '&:hover': {
                  color: '#F1870C',
                },
            }}
          >
            <img src="/statistics.svg" alt="" />
            Statistics
          </Button>
          <Button
            variant="text"
            onClick={() => handleButtonClick('comments')}
            sx={{
                color: '#FFF',
                fontFamily: 'Mulish',
                fontSize: '16px',  // Reduced font size
                fontWeight: 800,
                marginLeft: '90px',  // Space between buttons
                '&:hover': {
                  color: '#F1870C',
                },
            }}
          >
            <img src="/comments.svg" alt="" />
            Comments
          </Button>
          <Button
            variant="text"
            onClick={() => handleButtonClick('notes')}
            sx={{
                color: '#FFF',
                fontFamily: 'Mulish',
                fontSize: '16px',  // Reduced font size
                fontWeight: 800,
                marginLeft: '90px',  // Space between buttons
                '&:hover': {
                  color: '#F1870C',
                },
            }}
          >
            <img src="/notes.svg" alt="" />
            Notes
          </Button>
          <Button
            variant="text"
            onClick={() => handleButtonClick('fltComp')}
            sx={{
                color: '#FFF',
                fontFamily: 'Mulish',
                fontSize: '16px',  // Reduced font size
                fontWeight: 800,
                marginLeft: '90px',  // Space between buttons
                '&:hover': {
                  color: '#F1870C',
                },
            }}
          >
            <img src="/compass.svg" alt="" />
            Flt Comp
          </Button>
        </Box>
            <div>
            {contentType === 'question' && 
              <QuestionComponent
              questions={questions}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
            />            
            }
            {contentType === 'explanation' && 
            <ExplanationComponent 
            questions={questions} 
            currentQuestion={currentQuestion}
            />
            }
            {contentType === 'notes' &&
              <NotesComponent 
              questions={questions} 
              currentQuestion={currentQuestion} 
            />
            }
            {contentType === 'question' && (
              <QuestionComponent
              questions={questions}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
            />
            )}
            </div>
        </div>
        <div styles={{ marginRight : '20px', marginLeft: '20px'}}>
          <QuestionsMatrix/>
        </div>
      </div>
      
</div>

  );
};

export default Question;