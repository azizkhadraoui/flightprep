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
  const filters = JSON.parse(allParams.filters || '{}');
  const numQuestions = parseInt(allParams.numQuestions || '0', 10);
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
  const [selectedAnswers, setSelectedAnswers] = useState(Array(questions.length).fill(null));
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
      setSelectedAnswers(prevAnswers => {
        const newAnswers = [...prevAnswers];
        newAnswers[currentQuestion + 1] = null;
        return newAnswers;
      });
    }
  };  
  useEffect(() => {
    if (currentUserId && selectedSubtopicId) {
      console.log(currentUserId)
      const fetchData = async () => {
        try {
          let questionIds = [];
          let questionIds2 = [];
          if (Object.values(filters).some(filter => filter)) {  
          if (filters.greenFlagged) {
            const greenFlaggedCollectionRef = collection(db, `users/${currentUserId}/greenFlagged`);
            const greenFlaggedSnapshot = await getDocs(greenFlaggedCollectionRef);
  
            greenFlaggedSnapshot.forEach((doc) => {
              questionIds.push(doc.data().questionId);
            });
          }

          if (filters.redFlaggedQuestions) {
            const redFlaggedCollectionRef = collection(db, `users/${currentUserId}/redFlagged`);
            const redFlaggedSnapshot = await getDocs(redFlaggedCollectionRef);
  
            redFlaggedSnapshot.forEach((doc) => {
              questionIds.push(doc.data().questionId);
            });
          }

          if (filters.yellowFlaggedQuestions) {
            const yellowFlaggedCollectionRef = collection(db, `users/${currentUserId}/yellowFlagged`);
            const yellowFlaggedSnapshot = await getDocs(yellowFlaggedCollectionRef);
  
            yellowFlaggedSnapshot.forEach((doc) => {
              questionIds.push(doc.data().questionId);
            });
          }

          if (filters.markedDoNotShow) {
            const markedDoNotShowCollectionRef = collection(db, `users/${currentUserId}/dont`);
            const markedDoNotShowSnapshot = await getDocs(markedDoNotShowCollectionRef);
  
            markedDoNotShowSnapshot.forEach((doc) => {
              questionIds.push(doc.data().questionId);
            });
          }

          if (filters.pinned) {
            const pinnedCollectionRef = collection(db, `users/${currentUserId}/pinned`);
            const pinnedSnapshot = await getDocs(pinnedCollectionRef);
  
            pinnedSnapshot.forEach((doc) => {
              questionIds.push(doc.data().questionId);
            });
          }


          if (filters.reviewQuestions) {
            const reviewQuestionsCollectionRef = collection(db, `users/${currentUserId}/user_choices`);
            const reviewQuestionsSnapshot = await getDocs(reviewQuestionsCollectionRef);
  
            reviewQuestionsSnapshot.forEach((doc) => {
              questionIds.push(doc.data().questionId);
            });
          }


          if (filters.incorrectlyAnswered) {
            const reviewQuestionsCollectionRef = collection(db, `users/${currentUserId}/user_choices`);
            const reviewQuestionsSnapshot = await getDocs(reviewQuestionsCollectionRef);
        
            reviewQuestionsSnapshot.forEach((doc) => {
                // Check if the isCorrect field is false before pushing the questionId
                if (doc.data().isCorrect === false) {
                    questionIds.push(doc.data().questionId);
                }
            });
        }


        if (filters.studyTestWithCorrectAnswers) {
          const reviewQuestionsCollectionRef = collection(db, `users/${currentUserId}/user_choices`);
          const reviewQuestionsSnapshot = await getDocs(reviewQuestionsCollectionRef);
      
          reviewQuestionsSnapshot.forEach((doc) => {
              // Check if the isCorrect field is false before pushing the questionId
              if (doc.data().isCorrect === true) {
                  questionIds.push(doc.data().questionId);
              }
          });
      }


      if (filters.haveNotesFor) {
        const reviewQuestionsCollectionRef = collection(db, `users/${currentUserId}/notes`);
        const reviewQuestionsSnapshot = await getDocs(reviewQuestionsCollectionRef);
    
        reviewQuestionsSnapshot.forEach((doc) => {
          questionIds.push(doc.data().questionId);
        });
    }

    if (filters.previouslyUnseenQuestions) {
      const reviewQuestionsCollectionRef = collection(db, `users/${currentUserId}/user_choices`);
      const reviewQuestionsSnapshot = await getDocs(reviewQuestionsCollectionRef);
    
      reviewQuestionsSnapshot.forEach((doc) => {
        questionIds2.push(doc.data().questionId);
      });
    
      // Make an HTTP request to the endpoint with the obtained questionIds
      try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/${selectedTopicId}/${selectedSubtopicId}/exclude/${questionIds2.join(',')}`);
        let data = response.data;
            const percentage = Math.ceil((data.length / 100) * numQuestions);
            console.log(percentage);
            data = data.slice(0, percentage);
        setQuestions(data); 
        // Process the retrieved questions as needed
      } catch (error) {
        console.error('Error fetching questions:', error.message);
      }
    }


    if (filters.last200RealExamQuestions || filters.onlyRealExamQuestions) {
          try {
        const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/real-exam-true/${selectedTopicId}/${selectedSubtopicId}`);
        let data = response.data;
            const percentage = Math.ceil((data.length / 100) * numQuestions);
            console.log(percentage);
            data = data.slice(0, percentage);
        setQuestions(data); 
        // Process the retrieved questions as needed
      } catch (error) {
        console.error('Error fetching questions:', error.message);
      }
    }

    if (filters.answerRecentlyChanged) {
      try {
    const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/recently-changed-true/${selectedTopicId}/${selectedSubtopicId}`);
    let data = response.data;
            const percentage = Math.ceil((data.length / 100) * numQuestions);
            console.log(percentage);
            data = data.slice(0, percentage);
    setQuestions(data); 
    // Process the retrieved questions as needed
  } catch (error) {
    console.error('Error fetching questions:', error.message);
  }
}

if (filters.excludeRealExamQuestions) {
  try {
const response = await axios.get(`${process.env.REACT_APP_BACKEND_URL}/real-exam-false-or-null/${selectedTopicId}/${selectedSubtopicId}`);
let data = response.data;
            const percentage = Math.ceil((data.length / 100) * numQuestions);
            console.log(percentage);
            data = data.slice(0, percentage);
setQuestions(data); 
// Process the retrieved questions as needed
} catch (error) {
console.error('Error fetching questions:', error.message);
}
}


      

        }
        else{
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
            const percentage = Math.ceil((questionIds.length / 100) * numQuestions);
            questionIds = questionIds.slice(0, percentage);
            const apiUrl = (`${process.env.REACT_APP_BACKEND_URL}/questions`);            
            const apiResponse = await axios.post(apiUrl, { questionIds });
            const data = apiResponse.data;
            setQuestions(data);          }
  
          
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

        const correctCount = answeredQuestions.filter(answer => answer === true).length;
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

      const userChoicesCollection = collection(db, `users/${currentUserId}/tests`);
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
      const subtopicDoc = await getDoc(resultsCollection.doc(examResult.subtopicName));

      if (!subtopicDoc.exists()) {
        await addDoc(resultsCollection.doc(examResult.subtopicName), examResult);
        console.log("Result document created for subtopic:", examResult.subtopicName);
      } else {
        console.log("Result document already exists for subtopic:", examResult.subtopicName);
      }
    } catch (error) {
      console.error("Error calculating correct answers or saving results: ", error);
    }
  };

  const handleFlagClick = async (flagType) => {
    try {
      const questionId = questions[currentQuestion].id;
      const flaggedQuestionsRef = doc(db, `users/${currentUserId}/${flagType}`, questionId);
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
                paddingRight: "20px", // Add padding to the right
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
          style={{
            width: 500,
            height: 60,
          }}
        >
          <Box
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginTop="20px"
            marginLeft="20px"
          >
            <Button
              variant="text"
              onClick={() => handleButtonClick("question")}
              sx={{
                color: "#FFF",
                fontFamily: "Mulish",
                fontSize: "16px", // Reduced font size
                fontWeight: 800,
                marginLeft: "30px", // Space between buttons
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
                fontSize: "16px", // Reduced font size
                fontWeight: 800,
                marginLeft: "90px", // Space between buttons

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
                fontSize: "16px", // Reduced font size
                fontWeight: 800,
                marginLeft: "90px", // Space between buttons
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
              onClick={() => handleButtonClick("comments")}
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
              <img src="/comments.svg" alt="" />
              Comments
            </Button>
            <Button
              variant="text"
              onClick={() => handleButtonClick("notes")}
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
              <img src="/notes.svg" alt="" />
              Notes
            </Button>
            <Button
              variant="text"
              onClick={() => setShowFlightComp(true)}
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
          </Box>
          <div
            display="flex"
            justifyContent="space-between"
            alignItems="center"
            marginTop="20px"
            PaddingLeft="40px"
          >
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
      </div>
      <div style={{ display: "flex", justifyContent: "flex-end" }}>
        <div
          style={{
            marginRight: "5px",
            marginLeft: "5px",
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
          <QuestionsMatrix
            currentQuestion={currentQuestion}
            setCurrentQuestion={setCurrentQuestion}
            data={questions}
          />
        </div>
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
      {showFlightComp && <FlightComp closeModal={() => setShowFlightComp(false)} />}
      </div>
    </div>
  );
};

export default Exam;
