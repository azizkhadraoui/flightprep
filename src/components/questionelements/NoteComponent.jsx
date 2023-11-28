import React, { useState, useEffect } from 'react';
import { TextField, Button, Box, Card, CardContent } from '@mui/material';
import { getFirestore, doc, collection, getDocs, addDoc } from 'firebase/firestore';
import app from '../../base';

const db = getFirestore(app);

const NotesComponent = ({ questions, currentQuestion }) => {
  const [notes, setNotes] = useState({});
  const [newNote, setNewNote] = useState(''); // State for storing the new note

  const fetchNotes = async () => {
    try {
      const notesCollection = collection(db, 'notes');
      const notesSnapshot = await getDocs(notesCollection);
      const notesData = notesSnapshot.docs.reduce((notes, doc) => {
        notes[doc.id] = doc.data().text;
        return notes;
      }, {});
      setNotes(notesData);
    } catch (error) {
      console.error('Error fetching notes:', error);
    }
  };

  useEffect(() => {
    // Load notes from Firebase Firestore if available
    fetchNotes();
  }, [questions]);

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const handleAddNote = async (questionId) => {
    // Save the note to Firebase Firestore
    const noteRef = doc(db, 'notes', questionId);
    await addDoc(noteRef, { text: newNote });

    // Fetch the updated notes
    fetchNotes();

    // Clear the new note
    setNewNote('');
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
          <Button onClick={() => handleAddNote(currentQuestion)}>Add Note</Button>
          {notes[currentQuestion] && (
            <Card>
              <CardContent>
                {notes[currentQuestion]}
              </CardContent>
            </Card>
          )}
        </Box>
    </Box>
  );
};

export default NotesComponent;