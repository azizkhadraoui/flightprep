import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar from '../components/navbar/Navbar';
import { Box, Typography, Grid, Button, Card, CardContent } from '@mui/material';
import './questions.css';

const Question = () => {
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

  const handleAnswerClick = (answerKey) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(answerKey);
    }
  };

  const isCorrectAnswer = (answerKey) => {
    return selectedAnswer === answerKey && selectedAnswer === questions[currentQuestion]?.correct;
  };

  const isWrongAnswer = (answerKey) => {
    return selectedAnswer === answerKey && selectedAnswer !== questions[currentQuestion]?.correct;
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

  const handleButtonClick = (buttonType) => {
    // Handle button click logic here
    // Example:
    if (buttonType === 'question') {
      // Do something for 'question' button click
    } else if (buttonType === 'explanation') {
      // Do something for 'explanation' button click
    }
    // Add more cases for other button types if needed
  };

  const handleQuestionClick = (questionIndex) => {
    // Check if the question has been answered correctly
    const isCorrect = questionIndex === currentQuestion; // Replace this with your logic

    // Update the status of the clicked question
    const updatedQuestions = [...answeredQuestions];
    updatedQuestions[questionIndex] = isCorrect ? 'green' : 'answered-question red'; // Use 'answered-question red' for incorrect answers

    // Set the updated status in the state
    setAnsweredQuestions(updatedQuestions);

    // Navigate to the clicked question (if needed)
    setCurrentQuestion(questionIndex); // Update the current question state
  };

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

        {questions.length > 0 && currentQuestion < questions.length ? (
            <Box style={{ marginLeft: '30px' }}>
              <Typography variant="h6">{questions[currentQuestion]?.question}</Typography>
            </Box>
          ) : (
            <Box style={{ marginLeft: '30px' }}>
              <Typography variant="h6">Loading...</Typography>
            </Box>
          )}
          {questions.length > 0 && currentQuestion < questions.length ? (
            <Box style={{ marginLeft: '30px', width: '800px', minHeight: '105px' }}>
              {Object.keys(questions[currentQuestion]).filter(key => ['A', 'B', 'C', 'D'].includes(key)).map(key => (
                <Card
                  key={key}
                  onClick={() => handleAnswerClick(key)}
                  sx={{
                    marginBottom: '10px',
                    backgroundColor: isCorrectAnswer(key) ? 'green' : isWrongAnswer(key) ? 'red' : 'white',
                  }}
                >
                  <CardContent>
                    <Typography variant="body1">{questions[currentQuestion][key]}</Typography>
                  </CardContent>
                </Card>
              ))}
            </Box>
          ) : (
            <Box style={{ marginLeft: '30px', width: '800px', minHeight: '105px' }}>
              <Typography variant="body1">No questions available.</Typography>
            </Box>
          )}
        </div>
      </div>
      
      <div className='question-grid-container'>
  <Grid container direction='column' marginTop="100px">
    <Grid container direction="row" alignItems="flex-start" marginLeft="75%">
      {questions.map((_, index) => (
        <Grid key={index} item>
          <Box
            width="28px"
            height="28px"
            flexShrink={0}
            display="flex"
            alignItems="center"
            justifyContent="center"
            fontSize="16px"
            fontWeight="500"
            border={index === currentQuestion ? '1px solid white' : '1px solid transparent'}
            borderRadius="4px"
            className={`question-rectangle ${
              index === currentQuestion ? 'current-question' : answeredQuestions[index] ? 'answered-question' : 'unanswered-question'
            }`}
            onClick={() => handleQuestionClick(index)}
            style={{ 
              cursor: 'pointer',
              marginRight: index < questions.length - 1 ? '5px' : '0',
            }}
          >
            {index + 1}
          </Box>
        </Grid>
      ))}
    </Grid>
  </Grid>
</div>
</div>

  );
};

export default Question;