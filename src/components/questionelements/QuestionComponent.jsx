import React, { useState, useEffect } from "react";
import { Typography, Card, CardContent } from "@mui/material";
import app from "../../base.js";
import { getFirestore, doc, setDoc, getDoc } from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useHistory } from "react-router-dom";
import { getStorage, ref, getDownloadURL } from "firebase/storage";



const db = getFirestore(app);
const auth = getAuth(app);

const QuestionComponent = ({ questions, currentQuestion, onAnswerSelect }) => {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showCorrectAnswer, setShowCorrectAnswer] = useState(false);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [annexeUrl, setAnnexeUrl] = useState(null);
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
  useEffect(() => {
    const fetchAnnexe = async () => {
      try {
        const annexePath = currentQuestion.annexe;
        console.log(annexePath);
        if (annexePath) {
          const storage = getStorage(app);
          const annexeRef = ref(storage, annexePath);
          const downloadURL = await getDownloadURL(annexeRef);
          setAnnexeUrl(downloadURL);
        } else {
          // If there is no annexe for the current question, reset annexeUrl
          setAnnexeUrl(null);
        }
      } catch (error) {
        console.error("Error fetching annexe:", error);
      }
    };
  
    fetchAnnexe();
  }, [questions, currentQuestion]);
  

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
          {annexeUrl && (
            <div onClick={() => history.push(`/canvas?img=${currentQuestion?.annexe}`)}>
              <img
                src={annexeUrl}
                alt="question related"
                style={{ width: "100%", height: "100%", marginBottom: "16px"  }}
              />
            </div>
          )}
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
