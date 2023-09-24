import React, { useState, useEffect } from 'react';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import axios from 'axios';

const QuestionsMatrix = () => {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [pinnedQuestions, setPinnedQuestions] = useState([]); // Track pinned questions

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

  // Calculate the number of columns and rows based on the available questions
  const numRows = 5; // Maximum of 5 rows
  const numCols = Math.ceil(questions.length / numRows); // Calculate number of columns

  const goToQuestion = (questionNumber) => {
    if (questionNumber >= 1 && questionNumber <= questions.length) {
      setCurrentQuestion(questionNumber - 1); // Adjust for 0-based indexing
    }
  };

  const togglePin = (questionNumber) => {
    if (pinnedQuestions.includes(questionNumber)) {
      // If the question is already pinned, remove it
      setPinnedQuestions((prevPinned) => prevPinned.filter((num) => num !== questionNumber));
    } else {
      // If the question is not pinned, add it to the pinned list
      setPinnedQuestions((prevPinned) => [...prevPinned, questionNumber]);
    }
  };

  return (
    <div>
      <div>
        {/* Render pinned questions */}
        {pinnedQuestions.map((pinnedNumber) => (
          <div key={pinnedNumber} style={{ border: '1px solid black', padding: '5px' }}>
            {`Pinned Question ${pinnedNumber}`}
          </div>
        ))}
      </div>
      <Grid container spacing={1}>
        {Array.from({ length: numRows }).map((_, row) => (
          Array.from({ length: numCols }).map((_, col) => {
            const questionIndex = row + col * numRows;
            const questionNumber = questionIndex + 1;

            if (questionIndex < questions.length) {
              const isPinned = pinnedQuestions.includes(questionNumber);

              return (
                <Grid item xs={2} key={questionIndex}>
                  <Button
                    onClick={() => goToQuestion(questionNumber)}
                    style={
                      questionIndex === currentQuestion
                        ? { backgroundColor: '#FFA500', color: '#FFFFFF' } // Orange
                        : { backgroundColor: '#FFFFFF', color: '#000000' } // White
                    }
                  >
                    {isPinned && (
                      <span role="img" aria-label="Pinned" style={{ marginRight: '5px' }}>
                        📌
                      </span>
                    )}
                    {questionNumber}
                  </Button>
                  <Button onClick={() => togglePin(questionNumber)}>Pin</Button>
                </Grid>
              );
            }

            return null; // Return null for empty grid cells beyond the available questions
          })
        ))}
      </Grid>
    </div>
  );
};

export default QuestionsMatrix;
