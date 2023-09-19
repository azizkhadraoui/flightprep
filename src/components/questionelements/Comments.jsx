import { useState, useEffect } from 'react';
import { TextField, Button, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import app from '../../base'; // Import the Firebase app

const Comments = ({ questionId }) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    const commentsRef = app.database().ref(`comments/${questionId}`);
    commentsRef.on('value', (snapshot) => {
      if (snapshot.exists()) {
        const commentsData = snapshot.val();
        const commentsArray = Object.values(commentsData);
        setComments(commentsArray);
      } else {
        setComments([]);
      }
    });

    return () => {
      commentsRef.off();
    };
  }, [questionId]);

  const handleCommentTextChange = (event) => {
    setCommentText(event.target.value);
  };

  const handlePostComment = () => {
    if (commentText.trim() !== '') {
      const newComment = {
        text: commentText,
        timestamp: new Date().toLocaleString(),
      };

      const commentsRef = app.database().ref(`comments/${questionId}`);
      commentsRef.push(newComment);

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
