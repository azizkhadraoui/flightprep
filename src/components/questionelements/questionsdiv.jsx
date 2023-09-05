import React, { useState, useEffect } from 'react';
import { Box, Typography, Card, CardContent } from '@mui/material';
import axios from 'axios'; // Import Axios

const QuizQuestion = ({ questionId }) => {
  const [questionData, setQuestionData] = useState(null);
  const [selectedAnswer, setSelectedAnswer] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Adjust the API endpoint to fetch a specific question by ID
        const response = await axios.get(`/api/questions/${questionId}`);
        const data = response.data;
        setQuestionData(data);
      } catch (error) {
        console.error('Error fetching data from the API:', error);
      }
    };

    fetchData();
  }, [questionId]);

  const handleAnswerClick = (index) => {
    if (selectedAnswer === null) {
      setSelectedAnswer(index);
    }
  };

  const isCorrectAnswer = (index) => {
    return selectedAnswer === index && selectedAnswer === questionData.correctAnswer;
  };

  const isWrongAnswer = (index) => {
    return selectedAnswer === index && selectedAnswer !== questionData.correctAnswer;
  };

  if (!questionData) {
    return <div>Loading...</div>;
  }

  const { question, answers } = questionData;

  return (
    <div>
      <Box style={{ marginLeft: '30px' }}>
        <Typography variant="h6" sx={{ color: '#FFF' }}>
          {question}
        </Typography>
      </Box>
      <Box style={{ marginLeft: '30px', width: '800px', height: '105px' }}>
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
  );
};

export default QuizQuestion;
