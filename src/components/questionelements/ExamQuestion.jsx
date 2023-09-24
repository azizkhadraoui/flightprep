import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import app from '../../base.js';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
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
  
    // Check if the selected answer is correct
    const isCorrectAnswer = answerKey === questions[currentQuestion].correctAnswer;
  
    // Store the user's answer in Firebase
    const questionId = questions[currentQuestion].id;
  
    try {
      const userChoicesRef = doc(db, `users/${currentUserId}/user_choices`, questionId);
      const userChoicesDoc = await getDoc(userChoicesRef);
  
      if (!userChoicesDoc.exists()) {
        // Document doesn't exist, so create it
        await setDoc(userChoicesRef, {
          questionId: questionId,
          userChoice: answerKey,
          isCorrect: isCorrectAnswer, // Store whether the answer is correct or not
        });
      } else {
        console.log('Document already exists.');
      }
    } catch (error) {
      console.error('Error writing document: ', error);
    }
  
    setSelectedAnswer(answerKey);
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
            <div
              key={key}
              onClick={() => handleAnswerClick(key)}
              style={{
                backgroundColor: selectedAnswer === key ? 'orange' : 'white',
                cursor: 'pointer',
              }}
            >
              <Card sx={{ marginBottom: '10px', backgroundColor: 'white' }}>
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
        <Typography variant="h6">Loading...</Typography>
      )}
    </div>
  );
};

export default ExamQuestion;
