import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import app from '../../base.js';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const db = getFirestore(app);
const auth = getAuth(app);

const ExamQuestion = ({ questions, currentQuestion, setCurrentQuestion }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
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

  const handleAnswerClick = async (answerKey) => {
    if (!currentUserId) {
      console.error('User not authenticated');
      return;
    }

    setSelectedAnswer(answerKey);
    const questionId = questions[currentQuestion].id;

    try {
      const userChoicesRef = doc(db, `users/${currentUserId}/user_choices`, questionId);
      await setDoc(userChoicesRef, {
        questionId: questionId,
        userChoice: answerKey,
      });
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  };

  useEffect(() => {
    setSelectedAnswer(null);
  }, [currentQuestion]);

  return (
    <div>
      {questions.length > 0 ? (
        <div>
          <Typography variant="h6">{questions[currentQuestion]?.question}</Typography>
          {['A', 'B', 'C', 'D'].map((key) => (
            <Card
              key={key}
              onClick={() => handleAnswerClick(key)}
              sx={{
                marginBottom: '10px',
                backgroundColor: selectedAnswer === key ? 'green' : 'white',
              }}
            >
              <CardContent>
                <Typography variant="body1">{key}: {questions[currentQuestion][key]}</Typography>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <Typography variant="h6">Loading...</Typography>
      )}
    </div>
  );
};

export default ExamQuestion;
