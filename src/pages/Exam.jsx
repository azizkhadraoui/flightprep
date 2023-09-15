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
import ExamQuestion from '../components/questionelements/ExamQuestion';

const Exam = () => {
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
    
      const [remainingTime, setRemainingTime] = useState(3600); // Initial time is 1 hour (3600 seconds)
    
      const [showResults, setShowResults] = useState(false); // Whether to show results
      const [correctlyAnsweredCount, setCorrectlyAnsweredCount] = useState(0);
    
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
    
      // Use setInterval to update the remaining time every second
      useEffect(() => {
        const timer = setInterval(() => {
          if (remainingTime > 0) {
            setRemainingTime(remainingTime - 1);
          } else {
            clearInterval(timer); // Stop the timer when it reaches zero
            setShowResults(true); // Show results when the timer reaches zero
    
            // Calculate the percentage of correctly answered questions
            const correctCount = answeredQuestions.filter((answer) => answer === true).length;
            const percentage = (correctCount / questions.length) * 100;
            setCorrectlyAnsweredCount(percentage);
          }
        }, 1000); // Update every second
    
        // Cleanup the timer when the component unmounts
        return () => clearInterval(timer);
      }, [remainingTime, answeredQuestions, questions.length]);


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
      {showResults && (
        <div
          style={{
            position: 'fixed',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            backgroundColor: '#F1870C',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 0 10px rgba(0, 0, 0, 0.5)',
            color: '#FFF',
          }}
        >
          <Typography variant="h4">Time's up!</Typography>
          <Typography variant="body1">
            You answered {correctlyAnsweredCount.toFixed(2)}% of the questions correctly.
          </Typography>
        </div>
      )}
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
            <div>
            <Typography variant="body1" sx={{ fontSize: '18px', color: '#FFF', marginRight: '8px' }}>
                Time Left: {formatTime(remainingTime)}
            </Typography>
            </div>
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
              <ExamQuestion
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
            {contentType === 'comments' && (
              <Comments
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

export default Exam;