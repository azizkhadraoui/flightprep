import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import Navbar2 from "../components/navbar/Navbar2";
import { Box, Typography, Grid, Button } from "@mui/material";
import "./questions.css";
import ExplanationComponent from "../components/questionelements/ExplanationComponent";
import NotesComponent from "../components/questionelements/NoteComponent";
import Comments from "../components/questionelements/Comments";
import QuestionsMatrix from "../components/questionelements/QuestionsMatrix";
import ExamQuestion from "../components/questionelements/ExamQuestion";
import app from "../base";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
  getDoc,
  or,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useLocation } from "react-router-dom";
import FlightComp from "../components/questionelements/compass/FlightComp";
import subjectData from "./subjectData.json";

const db = getFirestore(app);
const auth = getAuth(app);

const Exam = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  // Get values for specific parameters
  const selectedSubtopicId = queryParams.get("subtopic");
  const selectedTopicId = queryParams.get("subject");

  // Get the entire query string as an object
  const queryString = queryParams.toString();
  const allParams = Object.fromEntries(queryParams.entries());

  // Example usage of specific parameters
  const filters = JSON.parse(allParams.filters || "{}");
  const numQuestions = parseInt(allParams.numQuestions || "0", 10);
  const [currentUserId, setCurrentUserId] = useState(0);

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

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const [questions, setQuestions] = useState([]);
  const [selectedAnswers, setSelectedAnswers] = useState(
    Array(questions.length).fill(null)
  );
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(
    new Array(questions.length).fill(null)
  );

  const [contentType, setContentType] = useState("question");

  const handleButtonClick = (buttonType) => {
    setContentType(buttonType);
  };

  const [remainingTime, setRemainingTime] = useState(3600);

  const [showResults, setShowResults] = useState(false);
  const [correctlyAnsweredCount, setCorrectlyAnsweredCount] = useState(0);

  const handleNextQuestion = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers];
        newAnswers[currentQuestion + 1] = null;
        return newAnswers;
      });
    }
  };
  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
      setSelectedAnswers((prevAnswers) => {
        const newAnswers = [...prevAnswers];
        newAnswers[currentQuestion - 1] = null;
        return newAnswers;
      });
    }
  };
  useEffect(() => {
    if (currentUserId) {
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

  useEffect(() => {
    const timer = setInterval(() => {
      if (remainingTime > 0) {
        setRemainingTime(remainingTime - 1);
      } else {
        clearInterval(timer);
        setShowResults(true);

        const correctCount = answeredQuestions.filter(
          (answer) => answer === true
        ).length;
        const percentage = (correctCount / questions.length) * 100;
        setCorrectlyAnsweredCount(percentage);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [remainingTime, answeredQuestions, questions.length]);

  const getSubjectNameById = (subjectsData, subjectId) => {
    for (const subject of subjectsData) {
      const subtopic = subject.Subtopics.find((sub) => sub.ID === subjectId);
      if (subtopic) {
        return subtopic.Name;
      }
    }
    return "Subject Not Found";
  };

  const handleFinishTest = async () => {
    try {
      if (!currentUserId) {
        console.error("User not authenticated");
        return;
      }

      const userChoicesCollection = collection(
        db,
        `users/${currentUserId}/tests`
      );
      const userChoicesSnapshot = await getDocs(userChoicesCollection);

      const correctCount = userChoicesSnapshot.docs.reduce((count, doc) => {
        const data = doc.data();
        return data.isCorrect ? count + 1 : count;
      }, 0);

      const totalQuestions = userChoicesSnapshot.size;
      const percentage = (correctCount / totalQuestions) * 100;

      setCorrectlyAnsweredCount(percentage);
      setShowResults(true);

      const subtopicName = getSubjectNameById(subjectData, selectedSubtopicId);
      const date = serverTimestamp();

      const examResult = {
        subtopicName,
        date,
        result: percentage,
      };

      const resultsCollection = collection(db, "results");
      const subtopicDoc = await getDoc(
        resultsCollection.doc(examResult.subtopicName)
      );

      if (!subtopicDoc.exists()) {
        await addDoc(
          resultsCollection.doc(examResult.subtopicName),
          examResult
        );
        console.log(
          "Result document created for subtopic:",
          examResult.subtopicName
        );
      } else {
        console.log(
          "Result document already exists for subtopic:",
          examResult.subtopicName
        );
      }
    } catch (error) {
      console.error(
        "Error calculating correct answers or saving results: ",
        error
      );
    }
  };

  const handleFlagClick = async (flagType) => {
    try {
      const questionId = questions[currentQuestion].id;
      const flaggedQuestionsRef = doc(
        db,
        `users/${currentUserId}/${flagType}`,
        questionId
      );
      const flaggedQuestionsDoc = await getDoc(flaggedQuestionsRef);

      if (!flaggedQuestionsDoc.exists()) {
        await setDoc(flaggedQuestionsRef, {
          questionId: questionId,
        });
        console.log(`Question flagged with ${flagType} successfully.`);
      } else {
        console.log(`Question is already flagged with ${flagType}.`);
      }
    } catch (error) {
      console.error(`Error flagging the question with ${flagType}:`, error);
    }
  };

  const handleNoClick = async () => {
    handleFlagClick("dont");
  };

  const handlePinClick = async () => {
    handleFlagClick("pinned");
  };

  const handleGreenFlagClick = async () => {
    handleFlagClick("greenFlagged");
  };

  const handleYellowFlagClick = async () => {
    handleFlagClick("yellowFlagged");
  };

  const handleRedFlagClick = async () => {
    handleFlagClick("redFlagged");
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
              <ExamQuestion
                questions={questions}
                currentQuestion={currentQuestion}
                setCurrentQuestion={setCurrentQuestion}
                selectedAnswers={selectedAnswers}
                setSelectedAnswers={setSelectedAnswers}
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
          <QuestionsMatrix
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            data={questions}
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

export default Exam;
