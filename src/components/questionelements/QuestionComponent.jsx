import React, { useState } from 'react';
import { Typography, Card, CardContent, Button } from '@mui/material';

const QuestionComponent = ({ questions, currentQuestion, setCurrentQuestion }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);

  const handleAnswerClick = (answerKey) => {
    setSelectedAnswer(answerKey);
  };

  const isCorrectAnswer = (answerKey) => {
    return questions[currentQuestion]?.correct === answerKey;
  };

  return (
    <div>
      {questions.length > 0 ? (
        <div>
          <Typography variant="h6">{questions[currentQuestion]?.question}</Typography>
          {['A', 'B', 'C', 'D'].map((key) => (
            <Card
              key={key}
              onClick={() => {
                // Only allow answer selection if the correct answer hasn't been revealed
                if (!showCorrectAnswer) {
                  handleAnswerClick(key);
                  setShowCorrectAnswer(true); // Show correct answer after selection
                }
              }}
              sx={{
                marginBottom: '10px',
                backgroundColor: selectedAnswer === key
                  ? (isCorrectAnswer(key) ? 'green' : 'red')
                  : (showCorrectAnswer && isCorrectAnswer(key) ? 'green' : 'white'),
              }}
            >
              <CardContent>
                <Typography variant="body1">{key}: {questions[currentQuestion][key]}</Typography>
                {showCorrectAnswer && isCorrectAnswer(key) && (
                  <Typography variant="body1" style={{ color: 'green' }}>
                    Correct Answer
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
          <Button
            variant="outlined"
            onClick={() => {
              // Implement navigation logic to the next question
              if (currentQuestion < questions.length - 1) {
                setCurrentQuestion(currentQuestion + 1);
                setSelectedAnswer(null);
                setShowCorrectAnswer(false); // Reset to not show the correct answer
              }
            }}
          >
            Next Question
          </Button>
        </div>
      ) : (
        <Typography variant="h6">Loading...</Typography>
      )}
    </div>
  );
};



export default QuestionComponent;
