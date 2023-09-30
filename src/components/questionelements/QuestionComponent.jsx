import React, { useState, useEffect } from 'react';
import { Typography, Card, CardContent } from '@mui/material';
import app from '../../base.js';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import questionAnnexes from '../../components/questionelements/annexes/annexes.js';
import QuestionsMatrix from './QuestionsMatrix';


const db = getFirestore(app);
const auth = getAuth(app);

const QuestionComponent = ({ questions, currentQuestion, setCurrentQuestion }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
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
  };

  const isCorrectAnswer = (answerKey) => {
    return questions[currentQuestion]?.correct === answerKey;
  };

  useEffect(() => {
    setSelectedAnswer(null);
    setShowCorrectAnswer(false);
  }, [currentQuestion]);

  const annexFilename = questionAnnexes[questions[currentQuestion]?.id];

  return (
    <div>
      <QuestionsMatrix 
        currentQuestion={currentQuestion} 
        setCurrentQuestion={setCurrentQuestion} />
      {questions.length > 0 ? (
        <div>
          <Typography variant="h6">{questions[currentQuestion]?.question}</Typography>
          
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
                <Typography variant="body1">{key}: {questions[currentQuestion][key]}</Typography>
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
        <Typography variant="h6">Loading...</Typography>
      )}
   
    </div>
  );
};

export default QuestionComponent;
