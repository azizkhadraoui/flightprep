import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Navbar2 from '../components/navbar/Navbar2';
import { Box, Typography, Grid, Button } from '@mui/material';
import './questions.css';
import QuestionComponent from '../components/questionelements/QuestionComponent';
import ExplanationComponent from '../components/questionelements/ExplanationComponent';
import NotesComponent from '../components/questionelements/NoteComponent';
import Comments from '../components/questionelements/Comments';
import QuestionsMatrix from '../components/questionelements/QuestionsMatrix';
import app from '../base.js';
import { getFirestore, collection, getDocs, doc, setDoc, addDoc, serverTimestamp, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useLocation } from 'react-router-dom';

const db = getFirestore(app);
const auth = getAuth(app);

const Question = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedSubtopicId = queryParams.get('subtopic');
  const selectedTopicId = queryParams.get('subject');

  const formatTime = (seconds) => {
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const [questions, setQuestions] = useState([]);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answeredQuestions, setAnsweredQuestions] = useState(new Array(questions.length).fill(null));
  const [contentType, setContentType] = useState('question');

  const [remainingTime, setRemainingTime] = useState(0); // Start from 0 seconds
  const [showResults, setShowResults] = useState(false);
  const [correctlyAnsweredCount, setCorrectlyAnsweredCount] = useState(0);

  const [currentUserId, setCurrentUserId] = useState(null);

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
      const pinFlaggedQuestionsRef = doc(db, `users/${currentUserId}/pinned`, questionId);
      const pinFlaggedQuestionsDoc = await getDoc(pinFlaggedQuestionsRef);

      if (!pinFlaggedQuestionsDoc.exists()) {
        await setDoc(pinFlaggedQuestionsRef, {
          questionId: questionId,
        });
        console.log('Question pinned successfully.');
      } else {
        console.log('Question is already pinned.');
      }
    } catch (error) {
      console.error('Error pinning the question:', error);
    }
  };

  const handleGreenFlagClick = async (questionId) => {
    try {
      const greenFlaggedQuestionsRef = doc(db, `users/${currentUserId}/greenFlagged`, questionId);
      const greenFlaggedQuestionsDoc = await getDoc(greenFlaggedQuestionsRef);

      if (!greenFlaggedQuestionsDoc.exists()) {
        await setDoc(greenFlaggedQuestionsRef, {
          questionId: questionId,
        });
        console.log('Question flagged with a green flag successfully.');
      } else {
        console.log('Question is already flagged with a green flag.');
      }
    } catch (error) {
      console.error('Error flagging the question with a green flag:', error);
    }
  };

  const handleRedFlagClick = async (questionId) => {
    try {
      const redFlaggedQuestionsRef = doc(db, `users/${currentUserId}/redFlagged`, questionId);
      const redFlaggedQuestionsDoc = await getDoc(redFlaggedQuestionsRef);

      if (!redFlaggedQuestionsDoc.exists()) {
        await setDoc(redFlaggedQuestionsRef, {
          questionId: questionId,
        });
        console.log('Question flagged with a red flag successfully.');
      } else {
        console.log('Question is already flagged with a red flag.');
      }
    } catch (error) {
      console.error('Error flagging the question with a red flag:', error);
    }
  };

  const handleYellowFlagClick = async (questionId) => {
    try {
      const yellowFlaggedQuestionsRef = doc(db, `users/${currentUserId}/yellowFlagged`, questionId);
      const yellowFlaggedQuestionsDoc = await getDoc(yellowFlaggedQuestionsRef);

      if (!yellowFlaggedQuestionsDoc.exists()) {
        await setDoc(yellowFlaggedQuestionsRef, {
          questionId: questionId,
        });
        console.log('Question flagged with a yellow flag successfully.');
      } else {
        console.log('Question is already flagged with a yellow flag.');
      }
    } catch (error) {
      console.error('Error flagging the question with a yellow flag:', error);
    }
  };

  const handleNoClick = async (questionId) => {
    try {      
    const dontFlaggedQuestionsRef = doc(db, `users/${currentUserId}/dont`, questionId);
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

const handleFinishTest = async () => {
  try {
    if (!currentUserId) {
      console.error('User not authenticated');
      return;
    }

    const userChoicesCollection = collection(db, `users/${currentUserId}/user_choices`);
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
      subtopicName: 'YourSubtopicName', // Replace with the actual subtopic name
      date: serverTimestamp(),
      result: percentage,
      timeTaken: timeTaken,
    };

    // Check if a document for this test already exists, and if not, create it
    const testsCollection = collection(db, 'tests');
    const testDoc = await getDoc(testsCollection.doc(testResult.subtopicName));

    if (!testDoc.exists()) {
      await addDoc(testsCollection.doc(testResult.subtopicName), testResult);
    } else {
      console.log('Document already exists for this test.');
    }
  } catch (error) {
    console.error('Error calculating correct answers or saving test results: ', error);
  }
};

return (
  <div
    style={{
      backgroundImage: `url("/loginbackground.svg")`,
      backgroundSize: 'cover',
      backgroundPosition: 'center center',
      height: '100vh',
    }}
  >
    <Navbar2 />
    <div
      style={{
        width: 500,
        height: 60,
      }}
    >
      <Box display="flex" justifyContent="space-between" padding="20px" width="80%">
        <Grid container alignItems="center">
          <Typography
            variant="h6"
            sx={{
              width: '200px',
              height: '20px',
              flexShrink: 0,
              color: '#F1870C',
              textAlign: 'center',
              fontFamily: 'Mulish',
              fontSize: '32px',
              fontWeight: 800,
              paddingRight: '20px',
            }}
          >
            QN°{currentQuestion + 1}/{questions.length}
          </Typography>
          <Grid item sx={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '40px' }}>
            <Button style={{ width: '30px', height: '30px' }} onClick={handlePinClick}>
              <img src='/pin.svg' alt="Pin" style={{ width: '100%', height: '100%' }} />
            </Button>

            <Button style={{ width: '30px', height: '30px' }} onClick={handleGreenFlagClick}>
              <img src='/greenflag.svg' alt="Green Flag" style={{ width: '100%', height: '100%' }} />
            </Button>

            <Button style={{ width: '30px', height: '30px' }} onClick={handleYellowFlagClick}>
              <img src='/yellowflag.svg' alt="Red Flag" style={{ width: '100%', height: '100%' }} />
            </Button>

            <Button style={{ width: '30px', height: '30px' }} onClick={handleRedFlagClick}>
              <img src='/redflag.svg' alt="Yellow Flag" style={{ width: '100%', height: '100%' }} />
            </Button>

            <Button style={{ width: '30px', height: '30px' }} onClick={handleNoClick}>
              <img src='/no.svg' alt="No" style={{ width: '100%', height: '100%' }} />
            </Button>
          </Grid>
        </Grid>
        <Grid container alignItems="left" marginLeft={'500px'}>
          <Grid item>
            <img src='/clock.svg' alt="Clock" style={{ marginRight: '8px' }} />
          </Grid>
        </Grid>
        <Grid container alignItems="left">
          <Grid item>
            <div>
              <Typography variant="body1" sx={{ fontSize: '18px', color: '#FFF', marginRight: '8px' }}>
                Time Left: {formatTime(remainingTime)}
              </Typography>
            </div>
          </Grid>
        </Grid>
        <Grid container alignItems="left">
          <Grid item>
            <Button onClick={handleNextQuestion}><img src='/arrow.svg' alt="Arrow" /></Button>
          </Grid>
        </Grid>
      </Box>
      <div
        display="flex" justifyContent="space-between" alignItems="center" marginTop="20px" marginLeft="20px">
        <Button
          variant="text"
          onClick={() => handleButtonClick('question')}
          sx={{
            color: '#FFF',
            fontFamily: 'Mulish',
            fontSize: '16px',
            fontWeight: 800,
            marginLeft: '30px',
            '&:hover': {
              color: '#F1870C',
            },
          }}
        >
          <img src="/play.svg" alt="" />
          Question
        </Button>
        <Button
          variant="text"
          onClick={() => handleButtonClick('explanation')}
          sx={{
            color: '#FFF',
            fontFamily: 'Mulish',
            fontSize: '16px',
            fontWeight: 800,
            marginLeft: '90px',
            '&:hover': {
              color: '#F1870C',
            },
          }}
        >
          <img src="/explanation.svg" alt="" />
          Explanation
        </Button>
        <Button
          variant="text"
          onClick={() => handleButtonClick('statistics')}
          sx={{
            color: '#FFF',
            fontFamily: 'Mulish',
            fontSize: '16px',
            fontWeight: 800,
            marginLeft: '90px',
            '&:hover': {
              color: '#F1870C',
            },
          }}
        >
          <img src="/statistics.svg" alt="" />
          Statistics
        </Button>
        <Button
            variant="text"
            onClick={() => handleButtonClick('notes')}
            sx={{
              color: '#FFF',
              fontFamily: 'Mulish',
              fontSize: '16px',
              fontWeight: 800,
              marginLeft: '90px',
              '&:hover': {
                color: '#F1870C',
              },
            }}
          >
            <img src="/notes.svg" alt="" />
            Notes
          </Button>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginLeft: '20px',
            marginTop: '10px',
          }}
        >
          <QuestionComponent
            question={questions[currentQuestion]}
            contentType={contentType}
            selectedAnswer={selectedAnswer}
            setSelectedAnswer={setSelectedAnswer}
            answeredQuestions={answeredQuestions}
          />
          <ExplanationComponent question={questions[currentQuestion]} contentType={contentType} />
          <QuestionsMatrix question={questions[currentQuestion]} contentType={contentType} />
          <NotesComponent question={questions[currentQuestion]} contentType={contentType} />
          <Comments question={questions[currentQuestion]} contentType={contentType} />
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center',
            marginTop: '20px',
          }}
        >
          <Button
            variant="contained"
            onClick={handleFinishTest}
            sx={{
              backgroundColor: '#F1870C',
              color: '#FFF',
              fontFamily: 'Mulish',
              fontSize: '18px',
              fontWeight: 800,
              width: '300px',
              height: '50px',
              '&:hover': {
                backgroundColor: '#FF9D3D',
              },
            }}
          >
            Finish Test
          </Button>
        </div>
      </div>
      {showResults && (
        <div>
          <Typography
            variant="h4"
            sx={{
              textAlign: 'center',
              color: '#F1870C',
              fontFamily: 'Mulish',
              fontWeight: 800,
              marginTop: '20px',
            }}
          >
            Test Results
          </Typography>
          <Typography
            variant="h5"
            sx={{
              textAlign: 'center',
              color: '#FFF',
              fontFamily: 'Mulish',
              marginTop: '10px',
            }}
          >
            You correctly answered {correctlyAnsweredCount}% of the questions.
          </Typography>
        </div>
      )}
    </div>
  );
};

export default Question;