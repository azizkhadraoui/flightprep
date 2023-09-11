import React, { useState, useEffect } from 'react';
import { TextField, Button, Typography, List, ListItem, ListItemText, Divider } from '@mui/material';
import { database } from '../../base'; // Import the Firebase database instance

const Comments = ({ questionId }) => {
  const [commentText, setCommentText] = useState('');
  const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments from Firebase when the component mounts
    const commentsRef = database.ref(`comments/${questionId}`);
    commentsRef.on('value', (snapshot) => {
      if (snapshot.exists()) {
        const commentsData = snapshot.val();
        const commentsArray = Object.values(commentsData);
        setComments(commentsArray);
      } else {
        setComments([]);
      }
    });

    // Clean up the Firebase listener when the component unmounts
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

      // Add the new comment to Firebase
      const commentsRef = database.ref(`comments/${questionId}`);
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
