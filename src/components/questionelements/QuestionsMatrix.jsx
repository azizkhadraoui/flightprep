import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";

const QuestionsMatrix = ({
  currentQuestion,
  setCurrentQuestion,
  data,
}) => {
  const [questions, setQuestions] = useState([]);
  const [pinnedQuestions, setPinnedQuestions] = useState([]);

  useEffect(() => {
    setQuestions(data);
  }, [data]);

  const goToQuestion = (questionNumber) => {
    if (questionNumber >= 1 && questionNumber <= questions.length) {
      setCurrentQuestion(questionNumber - 1);
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

  const buttonStyle = {
    margin: "2px", // Reduce the margin
    padding: "6px 12px", // Adjust padding
  };

  const gridItemStyle = {
    padding: "4px", // Reduce the padding of each grid item
  };

  const renderQuestions = () => {
    return questions.map((question, index) => {
      const questionNumber = index + 1;
      const isPinned = pinnedQuestions.includes(questionNumber);

      return (
        <Grid item xs={2} key={index} style={gridItemStyle}>
          <Button
            onClick={() => goToQuestion(questionNumber)}
            style={{
              ...buttonStyle,
              backgroundColor: index === currentQuestion ? "#FFA500" : "#FFFFFF",
              color: index === currentQuestion ? "#FFFFFF" : "#000000",
            }}
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
          <Button style={buttonStyle} onClick={() => togglePin(questionNumber)}>
            Pin
          </Button>
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

export default QuestionsMatrix;
