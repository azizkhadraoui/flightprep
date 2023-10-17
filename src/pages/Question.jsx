import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar2 from "../components/navbar/Navbar2";
import { Box, Typography, Grid, Button } from "@mui/material";
import "./questions.css";
import QuestionComponent from "../components/questionelements/QuestionComponent";
import ExplanationComponent from "../components/questionelements/ExplanationComponent";
import NotesComponent from "../components/questionelements/NoteComponent";
import Comments from "../components/questionelements/Comments";
import TestMatrix from "../components/questionelements/TestMatrix";
import app from "../base.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useLocation } from "react-router-dom";
import FlightComp from "../components/questionelements/compass/FlightComp";
import Canvas from "../components/questionelements/compass/Canvas";
import subjectData from "./subjectData.json";

const db = getFirestore(app);
const auth = getAuth(app);

const Question = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedSubtopicId = queryParams.get("subtopic");
  const selectedTopicId = queryParams.get("subject");

  useEffect(() => {
    // Fetch questions based on the selected subtopic ID
    const fetchData = async () => {
      try {
        // Make an API request to fetch questions for the selected subtopic
        // You can pass selectedSubtopicId to the API to filter questions
        const response = await axios.get(
          `${process.env.BACKEND_URL}/${selectedTopicId}/${selectedSubtopicId}`
        );
        const data = response.data;
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching data from the API:", error);
      }
    };

    fetchData();
  }, [selectedSubtopicId]);

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(
    new Array(questions.length).fill(null)
  );
  const [contentType, setContentType] = useState("question");

  const [remainingTime, setRemainingTime] = useState(3600); // Start from 0 seconds
  const [showResults, setShowResults] = useState(false);
  const [correctlyAnsweredCount, setCorrectlyAnsweredCount] = useState(0);

  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const timer = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1);
      } else {
        clearInterval(timer); // Stop the timer when it reaches zero
        setShowResults(true); // Show results when the timer reaches zero

        // Calculate the percentage of correctly answered questions
        const correctCount = answeredQuestions.filter(
          (answer) => answer === true
        ).length;
        const percentage = (correctCount / questions.length) * 100;
        setCorrectlyAnsweredCount(percentage);
      }
    }, 1000); // Update every second

    // Cleanup the timer when the component unmounts
    return () => clearInterval(timer);
  }, [remainingTime, answeredQuestions, questions.length]);

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

  const handleButtonClick = (buttonType) => {
    setContentType(buttonType);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }
  };

  const handlePinClick = async (questionId) => {
    try {
      const pinFlaggedQuestionsRef = doc(
        db,
        `users/${currentUserId}/pinned`,
        questionId
      );
      const pinFlaggedQuestionsDoc = await getDoc(pinFlaggedQuestionsRef);

      if (!pinFlaggedQuestionsDoc.exists()) {
        await setDoc(pinFlaggedQuestionsRef, {
          questionId: questionId,
        });
        console.log("Question pinned successfully.");
      } else {
        console.log("Question is already pinned.");
      }
    } catch (error) {
      console.error("Error pinning the question:", error);
    }
  };

  const handleGreenFlagClick = async (questionId) => {
    try {
      const greenFlaggedQuestionsRef = doc(
        db,
        `users/${currentUserId}/greenFlagged`,
        questionId
      );
      const greenFlaggedQuestionsDoc = await getDoc(greenFlaggedQuestionsRef);

      if (!greenFlaggedQuestionsDoc.exists()) {
        await setDoc(greenFlaggedQuestionsRef, {
          questionId: questionId,
        });
        console.log("Question flagged with a green flag successfully.");
      } else {
        console.log("Question is already flagged with a green flag.");
      }
    } catch (error) {
      console.error("Error flagging the question with a green flag:", error);
    }
  };

  const handleRedFlagClick = async (questionId) => {
    try {
      const redFlaggedQuestionsRef = doc(
        db,
        `users/${currentUserId}/redFlagged`,
        questionId
      );
      const redFlaggedQuestionsDoc = await getDoc(redFlaggedQuestionsRef);

      if (!redFlaggedQuestionsDoc.exists()) {
        await setDoc(redFlaggedQuestionsRef, {
          questionId: questionId,
        });
        console.log("Question flagged with a red flag successfully.");
      } else {
        console.log("Question is already flagged with a red flag.");
      }
    } catch (error) {
      console.error("Error flagging the question with a red flag:", error);
    }
  };

  const handleYellowFlagClick = async (questionId) => {
    try {
      const yellowFlaggedQuestionsRef = doc(
        db,
        `users/${currentUserId}/yellowFlagged`,
        questionId
      );
      const yellowFlaggedQuestionsDoc = await getDoc(yellowFlaggedQuestionsRef);

      if (!yellowFlaggedQuestionsDoc.exists()) {
        await setDoc(yellowFlaggedQuestionsRef, {
          questionId: questionId,
        });
        console.log("Question flagged with a yellow flag successfully.");
      } else {
        console.log("Question is already flagged with a yellow flag.");
      }
    } catch (error) {
      console.error("Error flagging the question with a yellow flag:", error);
    }
  };

  const handleNoClick = async (questionId) => {
    try {
      const dontFlaggedQuestionsRef = doc(
        db,
        `users/${currentUserId}/dont`,
        questionId
      );
      const dontFlaggedQuestionsDoc = await getDoc(dontFlaggedQuestionsRef);

      if (!dontFlaggedQuestionsDoc.exists()) {
        await setDoc(dontFlaggedQuestionsRef, {
          questionId: questionId,
        });
        console.log('Question marked as "don\'t show" successfully.');
      } else {
        console.log('Question is already marked as "don\'t show".');
      }
    } catch (error) {
      console.error('Error marking the question as "don\'t show":', error);
    }
  };

  const getSubjectNameById = (subjectsData, subjectId) => {
    for (const subject of subjectsData) {
      const subtopic = subject.Subtopics.find((sub) => sub.ID === subjectId);
      if (subtopic) {
        return subtopic.Name;
      }
    }
    return "Subject Not Found"; // Return a default value if no matching subject is found
  };

  const handleFinishTest = async () => {
    try {
      if (!currentUserId) {
        console.error("User not authenticated");
        return;
      }

      const userChoicesCollection = collection(
        db,
        `users/${currentUserId}/user_choices`
      );
      const userChoicesSnapshot = await getDocs(userChoicesCollection);

      const correctCount = userChoicesSnapshot.docs.reduce((count, doc) => {
        const data = doc.data();
        return data.isCorrect ? count + 1 : count;
      }, 0);

      const totalQuestions = userChoicesSnapshot.size;
      const percentage = (correctCount / totalQuestions) * 100;

      setCorrectlyAnsweredCount(percentage); // Set the percentage of correct answers
      setShowResults(true); // Show results

      // Calculate the time taken to finish the test
      const timeTaken = 3600 - remainingTime; // Assuming a total of 3600 seconds

      // Prepare data for the result document
      const testResult = {
        subtopicName: getSubjectNameById(subjectData, selectedSubtopicId),
        date: serverTimestamp(),
        result: percentage,
      };

      // Check if a document for this test already exists, and if not, create it
      const testsCollection = collection(db, "tests");
      const testDoc = await getDoc(
        testsCollection.doc(testResult.subtopicName)
      );

      if (!testDoc.exists()) {
        await addDoc(testsCollection.doc(testResult.subtopicName), testResult);
      } else {
        console.log("Document already exists for this test.");
      }
    } catch (error) {
      console.error(
        "Error calculating correct answers or saving test results: ",
        error
      );
    }
  };

  const [showFlightComp, setShowFlightComp] = useState(false);

  const openFlightComp = () => {
    setShowFlightComp(true);
  };

  const closeFlightComp = () => {
    setShowFlightComp(false);
  };

  return (
    <div
      style={{
        backgroundImage: `url("/loginbackground.svg")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        height: "100vh",
      }}
    >
      <Navbar2 />
      <div
        style={{
          width: 500,
          height: 60,
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          padding="20px"
          width="80%"
        >
          <Grid container alignItems="center">
            <Typography
              variant="h6"
              sx={{
                width: "200px",
                height: "20px",
                flexShrink: 0,
                color: "#F1870C",
                textAlign: "center",
                fontFamily: "Mulish",
                fontSize: "32px",
                fontWeight: 800,
                paddingRight: "20px",
              }}
            >
              QN°{currentQuestion + 1}/{questions.length}
            </Typography>
            <Grid
              item
              sx={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                marginTop: "40px",
              }}
            >
              <Button
                style={{ width: "30px", height: "30px" }}
                onClick={handlePinClick}
              >
                <img
                  src="/pin.svg"
                  alt="Pin"
                  style={{ width: "100%", height: "100%" }}
                />
              </Button>

              <Button
                style={{ width: "30px", height: "30px" }}
                onClick={handleGreenFlagClick}
              >
                <img
                  src="/greenflag.svg"
                  alt="Green Flag"
                  style={{ width: "100%", height: "100%" }}
                />
              </Button>

              <Button
                style={{ width: "30px", height: "30px" }}
                onClick={handleYellowFlagClick}
              >
                <img
                  src="/yellowflag.svg"
                  alt="Red Flag"
                  style={{ width: "100%", height: "100%" }}
                />
              </Button>

              <Button
                style={{ width: "30px", height: "30px" }}
                onClick={handleRedFlagClick}
              >
                <img
                  src="/redflag.svg"
                  alt="Yellow Flag"
                  style={{ width: "100%", height: "100%" }}
                />
              </Button>

              <Button
                style={{ width: "30px", height: "30px" }}
                onClick={handleNoClick}
              >
                <img
                  src="/no.svg"
                  alt="No"
                  style={{ width: "100%", height: "100%" }}
                />
              </Button>
            </Grid>
          </Grid>
          <Grid container alignItems="left" marginLeft={"500px"}>
            <Grid item>
              <img
                src="/clock.svg"
                alt="Clock"
                style={{ marginRight: "8px" }}
              />
            </Grid>
          </Grid>
          <Grid container alignItems="left">
            <Grid item>
              <div>
                <Typography
                  variant="body1"
                  sx={{ fontSize: "18px", color: "#FFF", marginRight: "8px" }}
                >
                  Time Left: {formatTime(remainingTime)}
                </Typography>
              </div>
            </Grid>
          </Grid>
          <Grid container alignItems="left">
            <Grid item>
              <Button onClick={handleNextQuestion}>
                <img src="/arrow.svg" alt="Arrow" />
              </Button>
            </Grid>
          </Grid>
        </Box>
        <div
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginTop="10px"
          marginLeft="10px"
        >
          <Button
            variant="text"
            onClick={() => handleButtonClick("question")}
            sx={{
              color: "#FFF",
              fontFamily: "Mulish",
              fontSize: "16px",
              fontWeight: 800,
              marginLeft: "30px",
              "&:hover": {
                color: "#F1870C",
              },
            }}
          >
            <img src="/play.svg" alt="" />
            Question
          </Button>
          <Button
            variant="text"
            onClick={() => handleButtonClick("explanation")}
            sx={{
              color: "#FFF",
              fontFamily: "Mulish",
              fontSize: "16px",
              fontWeight: 800,
              marginLeft: "90px",
              "&:hover": {
                color: "#F1870C",
              },
            }}
          >
            <img src="/explanation.svg" alt="" />
            Explanation
          </Button>
          <Button
            variant="text"
            onClick={() => handleButtonClick("statistics")}
            sx={{
              color: "#FFF",
              fontFamily: "Mulish",
              fontSize: "16px",
              fontWeight: 800,
              marginLeft: "90px",
              "&:hover": {
                color: "#F1870C",
              },
            }}
          >
            <img src="/statistics.svg" alt="" />
            Statistics
          </Button>
          <Button
            variant="text"
            onClick={() => handleButtonClick("notes")}
            sx={{
              color: "#FFF",
              fontFamily: "Mulish",
              fontSize: "16px",
              fontWeight: 800,
              marginLeft: "90px",
              "&:hover": {
                color: "#F1870C",
              },
            }}
          >
            <img src="/notes.svg" alt="" />
            Notes
          </Button>
          <Button
            variant="text"
            onClick={openFlightComp}
            sx={{
              color: "#FFF",
              fontFamily: "Mulish",
              fontSize: "16px", // Reduced font size
              fontWeight: 800,
              marginLeft: "90px", // Space between buttons
              "&:hover": {
                color: "#F1870C",
              },
            }}
          >
            <img src="/compass.svg" alt="" />
            Flt Comp
          </Button>
        </div>
        <div
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          marginTop="20px"
          marginLeft="20px"
        >
          {contentType === "question" && (
            <QuestionComponent
              currentQuestion={questions[currentQuestion]}
              questions={questions}

              /*contentType={contentType}
              selectedAnswer={selectedAnswer}
              setSelectedAnswer={setSelectedAnswer}
              answeredQuestions={answeredQuestions}*/
            />
          )}
          {contentType === "explanation" && (
            <ExplanationComponent
              questions={questions}
              currentQuestion={currentQuestion}
            />
          )}
          {contentType === "notes" && (
            <NotesComponent
              questions={questions}
              currentQuestion={currentQuestion}
            />
          )}
          {contentType === "comments" && (
            <Comments
              questions={questions}
              currentQuestion={currentQuestion}
              setCurrentQuestion={setCurrentQuestion}
            />
          )}
        </div>
        <div style={{ display: "flex", justifyContent: "flex-end" }}></div>
        {showResults && (
          <div
            style={{
              position: "fixed",
              top: "50%",
              right: "50px", // Adjust the right position as needed
              transform: "translateY(-50%)",
              backgroundColor: "#F1870C",
              padding: "20px",
              borderRadius: "10px",
              boxShadow: "0 0 10px rgba(0, 0, 0, 0.5)",
              color: "#FFF",
            }}
          >
            <Typography variant="h4">Test Finished!</Typography>
            <Typography variant="body1">
              You answered {correctlyAnsweredCount.toFixed(2)}% of the questions
              correctly.
            </Typography>
          </div>
        )}
      </div>
      <div>
        {showFlightComp && (
          <div
            style={{
              position: "fixed",
              top: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "rgba(0, 0, 0, 0.5)", // Semi-transparent black background
              zIndex: 9999, // Ensure it's above other content
            }}
          >
            <Canvas />
          </div>
        )}
      </div>
      <div
        style={{
          marginRight: "5px",
          marginLeft: "1000px",
          marginTop: "50px",
          width: "300px", // Adjust the width as needed
          height: "400px", // Adjust the height as needed
          overflow: "auto",
        }}
      >
        <Button
          variant="contained"
          onClick={handleFinishTest}
          sx={{
            color: "#FFF",
            backgroundColor: "#F1870C",
            fontFamily: "Mulish",
            fontSize: "16px",
            fontWeight: 800,
            "&:hover": {
              backgroundColor: "#F1870C",
            },
          }}
        >
          Finish Test
        </Button>
        <TestMatrix
          currentQuestion={currentQuestion}
          setCurrentQuestion={setCurrentQuestion}
          subject={selectedTopicId}
          subtopic={selectedSubtopicId}
        />
      </div>
    </div>
  );
};

export default Question;
