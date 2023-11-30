import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent } from "@mui/material";
import app from "../../base.js";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router-dom";

const db = getFirestore(app);
const auth = getAuth(app);

const ExamQuestion = ({
  questions,
  currentQuestion,
  setCurrentQuestion,
  selectedAnswers,
  setSelectedAnswers,
}) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentUserId, setCurrentUserId] = useState(null);
  const history = useHistory();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        setCurrentUserId(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleAnswerClick = async (answerKey) => {
    if (!currentUserId) {
      console.error("User not authenticated");
      return;
    }

    const isCorrectAnswer =
      answerKey === questions[currentQuestion].correct.toUpperCase();
    const questionId = questions[currentQuestion].id;

    try {
      const userChoicesRef = doc(
        db,
        `users/${currentUserId}/user_choices/${questionId}`
      );
      const userChoicesDoc = await getDoc(userChoicesRef);

      if (!userChoicesDoc.exists()) {
        await setDoc(userChoicesRef, {
          questionId: questionId,
          userChoice: answerKey,
          isCorrect: isCorrectAnswer,
        });
      }
    } catch (error) {
      console.error("Error writing document: ", error);
    }

    // Update the selected answer for the current question
    setSelectedAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[currentQuestion] = answerKey;
      return newAnswers;
    });
  };

  useEffect(() => {
    setSelectedAnswer(null);
  }, [currentQuestion]);

  return (
    <div>
      {questions.length > 0 ? (
        <div>
          <Typography variant="h6" color="white">
            {questions[currentQuestion]?.question}
          </Typography>
          <div
            onClick={() =>
              history.push(`/canvas/${questions[currentQuestion]?.imageUrl}`)
            }
          >
            <img
              src={questions[currentQuestion]?.imageUrl}
              alt="question related"
              style={{ width: "100px", height: "100px" }}
            />
          </div>
          {["A", "B", "C", "D"].map((key) => (
            <div key={key}>
              <Card
                sx={{ marginBottom: "10px" }}
                style={
                  selectedAnswers[currentQuestion] === key
                    ? { backgroundColor: "#FFA500", color: "#FFFFFF" }
                    : { backgroundColor: "#FFFFFF", color: "#000000" }
                }
                onClick={() => handleAnswerClick(key)}
              >
                <CardContent>
                  <Typography variant="body1">
                    {key}: {questions[currentQuestion][key]}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      ) : (
        <Typography variant="h6" color="white">
          Loading...
        </Typography>
      )}
    </div>
  );
};

export default ExamQuestion;
