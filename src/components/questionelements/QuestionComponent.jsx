import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import app from '../../base.js';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useHistory } from 'react-router-dom';



const db = getFirestore(app);
const auth = getAuth(app);

const QuestionComponent = ({ questions, currentQuestion, onAnswerSelect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
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
      console.error('User not authenticated');
      return;
    }

    setSelectedAnswer(answerKey);
    const questionId = currentQuestion.id;
    const isCorrect = isCorrectAnswer(answerKey);

    try {
      const userChoicesRef = doc(db, `users/${currentUserId}/user_choices`, questionId);
      await setDoc(userChoicesRef, {
        questionId: questionId,
        userChoice: answerKey,
        isCorrect: isCorrect,
      });
    } catch (error) {
      console.error('Error writing document: ', error);
    }
    onAnswerSelect(answerKey);
  };

  const isCorrectAnswer = (answerKey) => {
    return currentQuestion?.correct === answerKey;
  };

  useEffect(() => {
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
  }, [currentQuestion]);

  //const annexFilename = questionAnnexes[questions[currentQuestion]?.id];

  return (
    <div>
      
      {questions.length > 0 ? (
        <div>
          <Typography variant="h6" color="white">{currentQuestion?.question}</Typography>
          <Typography variant="h6" color="white">{questions[currentQuestion]?.question}</Typography>
          <div onClick={() => history.push(`/canvas/${questions[currentQuestion]?.imageUrl}`)}>
            <img src={questions[currentQuestion]?.imageUrl} alt="question related" style={{width: '100px', height: '100px'}}/>
          </div>
          {['A', 'B', 'C', 'D'].map((key) => (
            <Card
              key={key}
              onClick={() => {
                if (!showCorrectAnswer) {
                  handleAnswerClick(key);
                  setShowCorrectAnswer(true);
                }
              }}
              sx={{
                marginBottom: '10px',
                backgroundColor: selectedAnswer === key
                  ? (isCorrectAnswer(key) ? 'green' : 'red')
                  : (showCorrectAnswer && isCorrectAnswer(key) ? 'green' : 'white'),
              }}
            >
              <CardContent>
                <Typography variant="body1">{key}: {currentQuestion[key]}</Typography>
                {showCorrectAnswer && isCorrectAnswer(key) && (
                  <Typography variant="body1" style={{ color: 'green' }}>
                    Correct Answer
                  </Typography>
                )}
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Typography variant="h6" color="white">Loading...</Typography>
      )}
    </div>
  );
};

export default QuestionComponent;
