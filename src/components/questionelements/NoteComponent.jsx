import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Card, CardContent } from '@mui/material';
import { getFirestore, doc, setDoc, getDoc, collection, addDoc, query, where, onSnapshot } from 'firebase/firestore';
import app from '../../base';
import { getAuth, onAuthStateChanged } from 'firebase/auth';

const db = getFirestore(app);
const auth = getAuth(app);

const NotesComponent = ({ currentQuestion }) => {
  const [currentUserId, setCurrentUserId] = useState(null);
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');

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
    const fetchNotes = async () => {
      try {
        if (currentUserId) {
          // Create a query to get notes for the current user and question
          const q = query(collection(db, `users/${currentUserId}/notes`), where('questionId', '==', currentQuestion));
          const unsubscribe = onSnapshot(q, (querySnapshot) => {
            const newNotes = querySnapshot.docs.map((doc) => ({
              id: doc.id,
              ...doc.data(),
            }));
            setNotes(newNotes);
          });

          // Cleanup function to unsubscribe from the snapshot listener
          return () => unsubscribe();
        }
      } catch (error) {
        console.error('Error fetching notes:', error);
      }
    };

    // Fetch notes when the current user or question changes
    fetchNotes();
  }, [currentUserId, currentQuestion]);

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleAddNote = async () => {
    try {
      if (currentUserId && newNote.trim() !== '') {
        // Save the new note to Firestore under the user's current user id
        await addDoc(collection(db, `users/${currentUserId}/notes`), {
          questionId: currentQuestion,
          text: newNote,
        });

        // Clear the new note
        setNewNote('');
      }
    } catch (error) {
      console.error('Error adding note:', error);
    }
  };

  return (
    <Box sx={{ '& > :not(style)': { m: 1 } }}>
      <Box key={currentQuestion}>
        <TextField
          label="Add a new note"
          value={newNote}
          onChange={handleNoteChange}
          variant="outlined"
          fullWidth
        />
        <Button onClick={handleAddNote}>Add Note</Button>
        {notes.map((note) => (
          <Card key={note.id} style={{ marginTop: '10px' }}>
            <CardContent>
              {note.text}
            </CardContent>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default NotesComponent;
