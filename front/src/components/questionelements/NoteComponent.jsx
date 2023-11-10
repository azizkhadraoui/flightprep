import React, { useState, useEffect } from 'react';

const NotesComponent = ({ questions, currentQuestion }) => {
  const [notes, setNotes] = useState({});

  useEffect(() => {
    // Load notes from local storage if available
    const storedNotes = localStorage.getItem('notes');
    if (storedNotes) {
      setNotes(JSON.parse(storedNotes));
    } else {
      // Initialize notes based on the number of questions if they don't exist
      setNotes({});
    }
  }, [questions]);

  useEffect(() => {
    // Save notes to local storage whenever they change
    localStorage.setItem('notes', JSON.stringify(notes));
  }, [notes]);

  const handleNoteChange = (event) => {
    const { name, value } = event.target;
    setNotes((prevNotes) => ({
      ...prevNotes,
      [name]: value,
    }));
  };

  return (
    <div>
      {questions.map((question, index) => (
        <div key={index}>
          <p>{`Question ${index + 1}: ${question.question}`}</p>
          <input
            type="text"
            name={index}
            value={notes[index] || ''}
            onChange={handleNoteChange}
            placeholder="Add your note here"
          />
        </div>
      ))}
    </div>
  );
};

export default NotesComponent;
