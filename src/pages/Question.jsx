import React,{useState, useEffect} from 'react';
import Navbar from '../components/navbar/Navbar';
import { Box, Typography, Divider, Grid, Button,Card,CardContent } from '@mui/material';
import questionsData from './questions.json';

const Question = () => {

  // Function to format time as HH:MM:SS
  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const [selectedAnswer, setSelectedAnswer] = useState(null);


  const handleAnswerClick = (index) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
    }
  };
  const isCorrectAnswer = (index) => {
    return selectedAnswer === index && selectedAnswer === correctAnswer;
  };

  const isWrongAnswer = (index) => {
    return selectedAnswer === index && selectedAnswer !== correctAnswer;
  };

  const totalQuestions = questionsData.length;
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const questionData = questionsData[currentQuestion];
  const handleNextQuestion = () => {
    if (currentQuestion < totalQuestions - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null); // Reset selected answer when moving to the next question
    }
  };
  const question = questionData.question;
const answers = questionData.answers;
const correctAnswer = questionData.correctAnswer;






  const [activeButton, setActiveButton] = useState('question');
  const handleButtonClick = (button) => {
    setActiveButton(button);
  };


  const buttonContent = {
    question: ()=>{},
    explanation: 'This is the explanation content.',
    statistics: 'This is the statistics content.',
    comments: 'This is the comments content.',
    notes: 'This is the notes content.',
    fltComp: 'This is the Flt Comp content.',
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
        <Box display="flex" justifyContent="space-between" alignItems="center" padding="20px">
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
                QN°{currentQuestion}/{totalQuestions}
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
              <Typography variant="body1" sx={{ fontSize: '18px', color: '#000', marginRight: '8px' }}>
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

        <Box style={{marginLeft:'30px'}}>
        <Typography variant="h6">{question}</Typography>
      </Box>
      <Box style={{marginLeft:'30px', width: '800px', height: '105px'}}>
        {answers.map((answer, index) => (
          <Card
            key={index}
            onClick={() => handleAnswerClick(index)}
            sx={{
              marginBottom: '10px',
              backgroundColor: isCorrectAnswer(index) ? 'green' : isWrongAnswer(index) ? 'red' : 'white',
            }}
          >
            <CardContent>
              <Typography variant="body1">{answer}</Typography>
            </CardContent>
          </Card>
        ))}
      </Box>
        </div>
        
      </div>
      <div>
          <Grid container direction="column" alignItems="flex-end" marginRight="20px">
            {[...Array(totalQuestions)].map((_, index) => (
              <Grid key={index} item>
                <Box
                  width="10px"
                  height="10px"
                  marginY="2px"
                  bgcolor={index === currentQuestion ? 'blue' : 'gray'}
                />
              </Grid>
            ))}
          </Grid>
        </div>
    </div>
  );
};

export default Question;
