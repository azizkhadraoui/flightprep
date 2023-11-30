import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const ExamMatrix = ({
  currentQuestion,
  setCurrentQuestion,
  data,
  selectedAnswers,
}) => {
  const [questions, setQuestions] = useState([]);
  const [pinnedQuestions, setPinnedQuestions] = useState([]);

  useEffect(() => {
    setQuestions(data);
  }, [data]);

  const goToQuestion = (questionNumber) => {
    if (questionNumber >= 1 && questionNumber <= questions.length) {
      setCurrentQuestion(questionNumber - 1);
      selectedAnswers[questionNumber - 1] = null;
    }
  };

  const togglePin = (questionNumber) => {
    setPinnedQuestions((prevPinned) => {
      if (prevPinned.includes(questionNumber)) {
        return prevPinned.filter((num) => num !== questionNumber);
      } else {
        return [...prevPinned, questionNumber];
      }
    });
  };

  const renderQuestions = () => {
    return questions.map((question, index) => {
      const questionNumber = index + 1;
      const isPinned = pinnedQuestions.includes(questionNumber);
      const isCurrentQuestion = index === currentQuestion;
      const selectedAnswer = selectedAnswers[index];
      const isAnsweredCorrectly = selectedAnswer === question.correct;
      const isAnswered = selectedAnswer !== null;

      const buttonStyle = {
        backgroundColor: isCurrentQuestion
          ? "white"
          : isAnswered
          ? isAnsweredCorrectly
            ? "green"
            : "red"
          : "#FFA500",
        color: isCurrentQuestion ? "#000000" : "#FFFFFF",
      };

      return (
        <Grid item xs={2} key={index}>
          <Button
            onClick={() => goToQuestion(questionNumber)}
            style={buttonStyle}
          >
            {isPinned && (
              <span
                role="img"
                aria-label="Pinned"
                style={{ marginRight: "5px" }}
              >
                📌
              </span>
            )}
            {questionNumber}
          </Button>
          <Button onClick={() => togglePin(questionNumber)}>Pin</Button>
        </Grid>
      );
    });
  };

  return (
    <div>
      <Grid container spacing={1}>
        {renderQuestions()}
      </Grid>
    </div>
  );
};

export default ExamMatrix;