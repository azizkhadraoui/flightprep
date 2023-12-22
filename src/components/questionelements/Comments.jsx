import { useState, useEffect } from 'react';
import { TextField, Button, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import app from '../../base';
import { getFirestore, doc, setDoc, getDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';


const db = getFirestore(app);
const auth = getAuth(app);

const Comments = ({ questions, currentQuestion, setCurrentQuestion }) => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);
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



  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
  };

  const handlePostComment = () => {
    if (commentText.trim() !== '') {
      const newComment = {
        text: commentText,
        timestamp: new Date().toLocaleString(),
      };

      const questionId=questions[currentQuestion].id;
      console.log(questionId)
      const commentsRef = doc(db, `users/${currentUserId}/comments`, questionId);
      const commentsDoc =  getDoc(commentsRef);
        // Document doesn't exist, so create it
          setDoc(commentsRef, {
          comment: commentText, // Store whether the answer is correct or not
        });

      setCommentText('');
    }
  };

  return (
    <div>
      <Typography variant="h6">Comments</Typography>
      <TextField
        label="Type your comment"
        variant="outlined"
        fullWidth
        value={commentText}
        onChange={handleCommentTextChange}
      />
      <Button variant="contained" color="primary" onClick={handlePostComment}>
        Post Comment
      </Button>

      <List>
        {comments.map((comment, index) => (
          <div key={index}>
            <ListItem>
              <ListItemText primary={comment.text} secondary={comment.timestamp} />
            </ListItem>
            {index < comments.length - 1 && <Divider />}
          </div>
        ))}
      </List>
    </div>
  );
};

export default Comments;
