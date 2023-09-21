import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import axios from 'axios';

const QuestionsMatrix = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);

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

  const numRows = 6; // Number of rows
  const numCols = Math.ceil(questions.length / numRows); // Calculate number of columns
  const totalQuestions = numRows * numCols;

  const goToQuestion = (questionNumber) => {
    if (questionNumber >= 1 && questionNumber <= totalQuestions) {
      setCurrentQuestion(questionNumber - 1); // Adjust for 0-based indexing
    }
  };

  return (
    <Grid container spacing={1}>
      {Array.from({ length: totalQuestions }).map((_, index) => {
        const row = Math.floor(index / numCols);
        const col = index % numCols;
        const questionIndex = row * numCols + col;
        const questionNumber = questionIndex + 1;

        return (
          <Grid item xs={2} key={index} style={{ marginTop: '3px', marginBottom: '3px' }}>
            <Button
              onClick={() => goToQuestion(questionNumber)}
              style={
                questionIndex === currentQuestion
                  ? { backgroundColor: 'orange' }
                  : { backgroundColor: 'white' }
              }
            >
              {questionNumber}
            </Button>
          </Grid>
        );
      })}
    </Grid>
  );
};

export default QuestionsMatrix;
