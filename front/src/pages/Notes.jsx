import React, { useState, useEffect } from 'react';
import Navbar2 from '../components/navbar/Navbar2';
import { Box, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../base';

const db = getFirestore(app);

const Notes = () => {
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    // Fetch notes from Firebase here
    const fetchNotes = async () => {
      try {
        const notesCollection = collection(db, 'notes'); // Adjust the collection name
        const notesSnapshot = await getDocs(notesCollection);
        const notesData = notesSnapshot.docs.map((doc) => doc.data());
        setNotes(notesData);
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    fetchNotes();
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
            Notes
          </Typography>
          <List>
            {notes.map((note, index) => (
              <ListItem key={index}>
                <ListItemText primary={note.text} secondary={`User: ${note.user}, Question ID: ${note.questionId}`} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </div>
  );
};

export default Notes;
