import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import axios from 'axios';

const QuestionsMatrix = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Array(questions.length).fill(null));

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

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handleAnsweredQuestion = (questionNumber) => {
    if (answeredQuestions[questionNumber] === null) {
      answeredQuestions[questionNumber] = true;
    } else {
      answeredQuestions[questionNumber] = false;
    }
  };

  return (
    <Grid
      container
      spacing={5}
      justifyContent="center"
      alignItems="center"
      style={{ maxHeight: '100%', overflow: 'auto' }}
    >
      {questions.map((question, index) => (
        <Grid item xs={12} md={2} key={index} style={{ marginTop: '3px', marginBottom: '3px' }}>
          <Button
            onClick={() => {
              setCurrentQuestion(index);
              handleAnsweredQuestion(index);
            }}
            style={
              answeredQuestions[index] === true
                ? { backgroundColor: 'green' }
                : answeredQuestions[index] === null
                ? { backgroundColor: 'purple' }
                : { backgroundColor: 'white' }
            }
          >
            {index + 1}
          </Button>
        </Grid>
      ))}
      <Grid item xs={12} md={2}>
        <Button onClick={handleNextQuestion}>Next</Button>
        <Button onClick={() => setCurrentQuestion(0)}>Previous</Button>
      </Grid>
    </Grid>
  );
};

export default QuestionsMatrix;
