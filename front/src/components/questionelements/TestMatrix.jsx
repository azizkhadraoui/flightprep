import React, { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import axios from "axios";

const TestMatrix = ({
  currentQuestion,
  setCurrentQuestion,
  subject,
  subtopic,
}) => {
  const [questions, setQuestions] = useState([]);
  const [pinnedQuestions, setPinnedQuestions] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_BACKEND_URL}/${subject}/${subtopic}`
        );
        const data = response.data.map((question) => ({
          ...question,
          isCorrect: false,
          isAnswered: false,
        }));
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching data from the API:", error);
      }
    };

    fetchData();
  }, []);

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

  const renderQuestions = () => {
    return questions.map((question, index) => {
      const questionNumber = index + 1;
      const isPinned = pinnedQuestions.includes(questionNumber);
      const isCurrentQuestion = index === currentQuestion;
      const buttonStyle = {
        backgroundColor: isCurrentQuestion
          ? "white"
          : question.isCorrect
          ? "green"
          : question.isAnswered
          ? "red"
          : "#FFA500",
        color: isCurrentQuestion ? "#000000" : "#FFFFFF",
      };

      return (
        <div key={index} style={{ display: "flex" }}>
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
        </div>
      );
    });
  };

  const renderPinnedQuestions = () => {
    return pinnedQuestions.map((pinnedNumber) => (
      <div
        key={pinnedNumber}
        style={{ border: "1px solid black", padding: "5px" }}
      >
        {`Pinned Question ${pinnedNumber}`}
      </div>
    ));
  };

  return (
    <div>
      <div>{renderPinnedQuestions()}</div>
      <div style={{ display: "flex", flexWrap: "wrap" }}>
        {renderQuestions()}
      </div>
    </div>
  );
};

export default TestMatrix;
