import React, { useState, useEffect } from 'react';
import Navbar2 from '../components/navbar/Navbar2';
import { Box, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../base';

const db = getFirestore(app);

const Comments = () => {
    const [comments, setComments] = useState([]);

  useEffect(() => {
    // Fetch comments from Firebase here
    const fetchComments = async () => {
      try {
        const commentsCollection = collection(db, 'comments'); // Adjust the collection name
        const commentsSnapshot = await getDocs(commentsCollection);
        const commentsData = commentsSnapshot.docs.map((doc) => doc.data());
        setComments(commentsData);
      } catch (error) {
        console.error('Error fetching comments:', error);
      }
    };

    fetchComments();
  }, []);
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
    <Box>
        <Paper elevation={3} style={{ padding: '20px', width: '80%' }}>
          <Typography variant="h5" style={{ color: 'white', textAlign: 'center', marginBottom: '20px' }}>
            Comments
          </Typography>
          <List>
            {comments.map((comment, index) => (
              <ListItem key={index}>
                <ListItemText primary={comment.text} secondary={`User: ${comment.user}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </div>
  )
}

export default Comments