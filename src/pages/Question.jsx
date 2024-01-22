import React, { useState, useEffect } from "react";
import axios from "axios";
import Navbar2 from "../components/navbar/Navbar2";
import { Box, Typography, Grid, Button } from "@mui/material";
import "./questions.css";
import QuestionComponent from "../components/questionelements/QuestionComponent";
import ExplanationComponent from "../components/questionelements/ExplanationComponent";
import NotesComponent from "../components/questionelements/NoteComponent";
import Comments from "../components/questionelements/Comments";
import ExamMatrix from "../components/questionelements/ExamMatrix";
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
import subjectData from "./subjectData.json";

const db = getFirestore(app);
const auth = getAuth(app);

const Question = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedSubtopicId = queryParams.get("subtopic");
  const selectedTopicId = queryParams.get("subject");
  const allParams = Object.fromEntries(queryParams.entries());
  const filters = JSON.parse(allParams.filters || "{}");
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [currentUserId, setCurrentUserId] = useState(null);
  const numQuestions = parseInt(allParams.numQuestions || "0", 10);

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

  useEffect(() => {
    if (currentUserId) {
      console.log(
        `${process.env.REACT_APP_BACKEND_URL}/${selectedTopicId}/${selectedSubtopicId}`
      );
      console.log(currentUserId);
      const fetchData = async () => {
        try {
          let questionIds = [];
          let questionIds2 = [];
          if (Object.values(filters).some((filter) => filter)) {
            if (filters.greenFlagged) {
              const greenFlaggedCollectionRef = collection(
                db,
                `users/${currentUserId}/greenFlagged`
              );
              const greenFlaggedSnapshot = await getDocs(
                greenFlaggedCollectionRef
              );

              greenFlaggedSnapshot.forEach((doc) => {
                questionIds.push(doc.data().questionId);
              });
            }

            if (filters.redFlaggedQuestions) {
              const redFlaggedCollectionRef = collection(
                db,
                `users/${currentUserId}/redFlagged`
              );
              const redFlaggedSnapshot = await getDocs(redFlaggedCollectionRef);

              redFlaggedSnapshot.forEach((doc) => {
                questionIds.push(doc.data().questionId);
              });
            }

            if (filters.yellowFlaggedQuestions) {
              const yellowFlaggedCollectionRef = collection(
                db,
                `users/${currentUserId}/yellowFlagged`
              );
              const yellowFlaggedSnapshot = await getDocs(
                yellowFlaggedCollectionRef
              );

              yellowFlaggedSnapshot.forEach((doc) => {
                questionIds.push(doc.data().questionId);
              });
            }

            if (filters.markedDoNotShow) {
              const markedDoNotShowCollectionRef = collection(
                db,
                `users/${currentUserId}/dont`
              );
              const markedDoNotShowSnapshot = await getDocs(
                markedDoNotShowCollectionRef
              );

              markedDoNotShowSnapshot.forEach((doc) => {
                questionIds.push(doc.data().questionId);
              });
            }

            if (filters.pinned) {
              const pinnedCollectionRef = collection(
                db,
                `users/${currentUserId}/pinned`
              );
              const pinnedSnapshot = await getDocs(pinnedCollectionRef);

              pinnedSnapshot.forEach((doc) => {
                questionIds.push(doc.data().questionId);
              });
            }

            if (filters.reviewQuestions) {
              const reviewQuestionsCollectionRef = collection(
                db,
                `users/${currentUserId}/user_choices`
              );
              const reviewQuestionsSnapshot = await getDocs(
                reviewQuestionsCollectionRef
              );

              reviewQuestionsSnapshot.forEach((doc) => {
                questionIds.push(doc.data().questionId);
              });
            }

            if (filters.incorrectlyAnswered) {
              const reviewQuestionsCollectionRef = collection(
                db,
                `users/${currentUserId}/user_choices`
              );
              const reviewQuestionsSnapshot = await getDocs(
                reviewQuestionsCollectionRef
              );

              reviewQuestionsSnapshot.forEach((doc) => {
                // Check if the isCorrect field is false before pushing the questionId
                if (doc.data().isCorrect === false) {
                  questionIds.push(doc.data().questionId);
                }
              });
            }

            if (filters.studyTestWithCorrectAnswers) {
              const reviewQuestionsCollectionRef = collection(
                db,
                `users/${currentUserId}/user_choices`
              );
              const reviewQuestionsSnapshot = await getDocs(
                reviewQuestionsCollectionRef
              );

              reviewQuestionsSnapshot.forEach((doc) => {
                // Check if the isCorrect field is false before pushing the questionId
                if (doc.data().isCorrect === true) {
                  questionIds.push(doc.data().questionId);
                }
              });
            }

            if (filters.haveNotesFor) {
              const reviewQuestionsCollectionRef = collection(
                db,
                `users/${currentUserId}/notes`
              );
              const reviewQuestionsSnapshot = await getDocs(
                reviewQuestionsCollectionRef
              );

              reviewQuestionsSnapshot.forEach((doc) => {
                questionIds.push(doc.data().questionId);
              });
            }

            if (filters.previouslyUnseenQuestions) {
              const reviewQuestionsCollectionRef = collection(
                db,
                `users/${currentUserId}/user_choices`
              );
              const reviewQuestionsSnapshot = await getDocs(
                reviewQuestionsCollectionRef
              );

              reviewQuestionsSnapshot.forEach((doc) => {
                questionIds2.push(doc.data().questionId);
              });

              // Make an HTTP request to the endpoint with the obtained questionIds
              try {
                const response = await axios.get(
                  `${
                    process.env.REACT_APP_BACKEND_URL
                  }/${selectedTopicId}/${selectedSubtopicId}/exclude/${questionIds2.join(
                    ","
                  )}`
                );
                let data = response.data;
                const percentage = Math.ceil(
                  (data.length / 100) * numQuestions
                );
                console.log(percentage);
                data = data.slice(0, percentage);
                setQuestions(data);
                // Process the retrieved questions as needed
              } catch (error) {
                console.error("Error fetching questions:", error.message);
              }
            }

            if (
              filters.last200RealExamQuestions ||
              filters.onlyRealExamQuestions
            ) {
              try {
                const response = await axios.get(
                  `${process.env.REACT_APP_BACKEND_URL}/real-exam-true/${selectedTopicId}/${selectedSubtopicId}`
                );
                let data = response.data;
                const percentage = Math.ceil(
                  (data.length / 100) * numQuestions
                );
                console.log(percentage);
                data = data.slice(0, percentage);
                setQuestions(data);
                // Process the retrieved questions as needed
              } catch (error) {
                console.error("Error fetching questions:", error.message);
              }
            }

            if (filters.answerRecentlyChanged) {
              try {
                const response = await axios.get(
                  `${process.env.REACT_APP_BACKEND_URL}/recently-changed-true/${selectedTopicId}/${selectedSubtopicId}`
                );
                let data = response.data;
                const percentage = Math.ceil(
                  (data.length / 100) * numQuestions
                );
                console.log(percentage);
                data = data.slice(0, percentage);
                setQuestions(data);
                // Process the retrieved questions as needed
              } catch (error) {
                console.error("Error fetching questions:", error.message);
              }
            }

            if (filters.excludeRealExamQuestions) {
              try {
                const response = await axios.get(
                  `${process.env.REACT_APP_BACKEND_URL}/real-exam-false-or-null/${selectedTopicId}/${selectedSubtopicId}`
                );
                let data = response.data;
                const percentage = Math.ceil(
                  (data.length / 100) * numQuestions
                );
                console.log(percentage);
                data = data.slice(0, percentage);
                setQuestions(data);
                // Process the retrieved questions as needed
              } catch (error) {
                console.error("Error fetching questions:", error.message);
              }
            }
          } else {
            try {
              // Make an API request to fetch questions for the selected subtopic
              // You can pass selectedSubtopicId to the API to filter questions
              const response = await axios.get(
                `${process.env.REACT_APP_BACKEND_URL}/${selectedTopicId}/${selectedSubtopicId}`
              );
              let data = response.data;
              const percentage = Math.ceil((data.length / 100) * numQuestions);
              console.log(percentage);
              data = data.slice(0, percentage);
              setQuestions(data);
            } catch (error) {
              console.error("Error fetching data from the API:", error);
            }
          }

          // Perform API call with questionIds using Axios
          if (questionIds.length > 0) {
            const percentage = Math.ceil(
              (questionIds.length / 100) * numQuestions
            );
            questionIds = questionIds.slice(0, percentage);
            const apiUrl = `${process.env.REACT_APP_BACKEND_URL}/questions`;
            const apiResponse = await axios.post(apiUrl, { questionIds });
            const data = apiResponse.data;
            setQuestions(data);
          }
        } catch (error) {
          console.error("Error fetching data from the API:", error);
        }
      };

      fetchData();
    }
  }, [currentUserId]);

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
  const [answeredQuestions, setAnsweredQuestions] = useState(
    new Array(questions.length).fill(null)
  );
  const [contentType, setContentType] = useState("question");

  const [remainingTime, setRemainingTime] = useState(3600); // Start from 0 seconds
  const [showResults, setShowResults] = useState(false);
  const [correctlyAnsweredCount, setCorrectlyAnsweredCount] = useState(0);

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

  const handleButtonClick = (buttonType) => {
    setContentType(buttonType);
  };

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
    }
  };
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
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
      const testsCollection = collection(db, `users/${currentUserId}/tests`);

      const userChoicesSnapshot = await getDocs(userChoicesCollection);

      const correctCount = userChoicesSnapshot.docs.reduce((count, doc) => {
        const data = doc.data();
        return data.isCorrect ? count + 1 : count;
      }, 0);

      const totalQuestions = userChoicesSnapshot.size;
      const percentage = (correctCount / totalQuestions) * 100;
      const testResult2 = {
        subtopic: selectedSubtopicId,
        topic: selectedTopicId,
        date: Date().toString(),
        result: percentage,
      };
      const existingTestDoc = await getDoc(doc(testsCollection));

      if (!existingTestDoc.exists()) {
        await addDoc(testsCollection, { ...testResult2 });
      } else {
        console.log("Test result already exists:", existingTestDoc.data());
      }

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
    } catch (error) {
      console.error(
        "Error calculating correct answers or saving test results: ",
        error
      );
    }
  };
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions.length).fill(null)
  );

  const handleAnswerSelect = (questionIndex, selectedAnswer) => {
    setSelectedAnswers((prevAnswers) => {
      const newAnswers = [...prevAnswers];
      newAnswers[questionIndex] = selectedAnswer;
      return newAnswers;
    });
  };

  const [showFlightComp, setShowFlightComp] = useState(false);

  return (
    <div>
      <Navbar2 />
      <div className="exam-container">
        <div className="left-box">
          <Box className="navigation-timer-box">
            <Button
              onClick={handlePreviousQuestion}
              className="prev-question"
              disabled={currentQuestion === 0}
            >
              <img src="/arrow.svg" alt="Previous Arrow" />
            </Button>
            <Typography variant="h6" className="question-number">
              QN°{currentQuestion + 1}/{questions.length}
            </Typography>
            <div className="timer">
              <img src="/clock.svg" alt="Clock" />
              <Typography variant="body1">
                Time Left: {formatTime(remainingTime)}
              </Typography>
            </div>
            <Button
              onClick={handleNextQuestion}
              className="next-question"
              disabled={currentQuestion === questions.length - 1}
            >
              <img src="/arrow.svg" alt="Next Arrow" />
            </Button>
          </Box>
          <div className="flagging-buttons">
            <Button onClick={handlePinClick} className="pin-btn">
              <img src="/pin.svg" alt="Pin" />
            </Button>
            <Button onClick={handleGreenFlagClick} className="green-flag-btn">
              <img src="/greenflag.svg" alt="Green Flag" />
            </Button>
            <Button onClick={handleYellowFlagClick} className="yellow-flag-btn">
              <img src="/yellowflag.svg" alt="Yellow Flag" />
            </Button>
            <Button onClick={handleRedFlagClick} className="red-flag-btn">
              <img src="/redflag.svg" alt="Red Flag" />
            </Button>
            <Button onClick={handleNoClick} className="no-btn">
              <img src="/no.svg" alt="No" />
            </Button>
          </div>
          <div className="button-group">
            <Button
              variant="text"
              onClick={() => handleButtonClick("question")}
              className="question-btn"
            >
              <img src="/play.svg" alt="Question" />
              Question
            </Button>
            <Button
              variant="text"
              onClick={() => handleButtonClick("explanation")}
              className="explanation-btn"
            >
              <img src="/explanation.svg" alt="Explanation" />
              Explanation
            </Button>
            <Button
              variant="text"
              onClick={() => handleButtonClick("statistics")}
              className="statistics-btn"
            >
              <img src="/statistics.svg" alt="Statistics" />
              Statistics
            </Button>
            <Button
              variant="text"
              onClick={() => handleButtonClick("comments")}
              className="comments-btn"
            >
              <img src="/comments.svg" alt="Comments" />
              Comments
            </Button>
            <Button
              variant="text"
              onClick={() => handleButtonClick("notes")}
              className="notes-btn"
            >
              <img src="/notes.svg" alt="Notes" />
              Notes
            </Button>
            <Button
              variant="text"
              onClick={() => setShowFlightComp(true)}
              className="flt-comp-btn"
            >
              <img src="/compass.svg" alt="Flt Comp" />
              Flt Comp
            </Button>
          </div>

          <div className="content-area">
            {contentType === "question" && (
              <QuestionComponent
                currentQuestion={questions[currentQuestion]}
                questions={questions}
                selectedAnswer={selectedAnswers[currentQuestion]}
                onAnswerSelect={(selectedAnswer) =>
                  handleAnswerSelect(currentQuestion, selectedAnswer)
                }
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
        </div>
        <div className="right-box">
          <Button
            variant="contained"
            onClick={handleFinishTest}
            className="finish-test"
          >
            Finish Test
          </Button>
          <ExamMatrix
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            data={questions}
            selectedAnswers={selectedAnswers}
          />
        </div>
        {showFlightComp && (
          <FlightComp closeModal={() => setShowFlightComp(false)} />
        )}
        {showResults && (
          <div className="results-overlay">
            <Typography variant="h4">Test Finished!</Typography>
            <Typography variant="body1">
              You answered {correctlyAnsweredCount.toFixed(2)}% of the questions
              correctly.
            </Typography>
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;
