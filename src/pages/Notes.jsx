import React, { useState, useEffect } from 'react';
import Navbar2 from '../components/navbar/Navbar2';
import { Box, Paper, Typography, List, ListItem, ListItemText, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import app from '../base';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const db = getFirestore(app);

const Notes = () => {
  const [comments, setComments] = useState([]);
  const [currentUser, setCurrentUser] = useState(null); // Initialize to null
  const auth = getAuth(app);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUser(user.uid);
      } else {
        setCurrentUser(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const fetchComments = async () => {
      try {
        if (currentUser) {
          const commentsCollection = collection(db, `users/${currentUser}/notes`);
          const commentsSnapshot = await getDocs(commentsCollection);

          const commentsData = commentsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));
          setComments(commentsData);
        }
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, [currentUser]);

  const handleDeleteComment = async (commentId) => {
    try {
      const commentRef = doc(db, `users/${currentUser}/comments`, commentId);
      await deleteDoc(commentRef);
      setComments((prevComments) => prevComments.filter((comment) => comment.questionId !== commentId));
      console.log('Comment deleted successfully!');
    } catch (error) {
      console.error('Error deleting comment:', error);
    }
  };

  return (
    <div
      style={{
        backgroundImage: `url("/loginbackground.svg")`,
        backgroundSize: 'cover',
        backgroundPosition: 'center center',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'flex-start',
        height: '100vh',
      }}
    >
      <Navbar2 />
      <Box style={{ margin: '20px', minWidth: '1000px' }}>
        <Paper elevation={3} style={{ padding: '20px', width: '80%' }}>
          <Typography variant="h5" style={{ color: 'black', marginTop: '5px' }}>
            Notes
          </Typography>
          <List>
            {comments.map((comment) => (
              <ListItem key={comment.id}>
                <ListItemText primary={comment.text} secondary={` ${comment.questionId} : ${comment.text}`} />
                <IconButton
                  edge="end"
                  aria-label="delete"
                  onClick={() => handleDeleteComment(comment.questionId)}
                >
                  <DeleteIcon />
                </IconButton>
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </div>
  );
};

export default Notes;
