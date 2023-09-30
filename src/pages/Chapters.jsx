import React, { useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import {
  Box,
  Collapse,
  Card,
  CardContent,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableRow,
  Typography,
  Button,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Slider from '@mui/material/Slider';
import { useHistory } from 'react-router-dom';
import subjectData from './subjectData.json';

const Chapters = () => {
  const [open, setOpen] = useState(-1); // Initialize with -1 to have all sections closed
  const [lessonsToShow, setLessonsToShow] = useState(5);
  const [selectedMode, setSelectedMode] = useState(''); // 'Study' or 'Exam' mode
  const [selectedSubject, setSelectedSubject] = useState('');
  const history = useHistory();

  const handleSliderChange = (event, newValue) => {
    setLessonsToShow(newValue);
  };

  const handleModeSelect = (mode) => {
    setSelectedMode(mode);
  };

  const handleSubtopicClick = (subjectId, subtopicId) => {
    setSelectedSubject(subjectId);
    // If 'Study' mode is selected, navigate to the Questions component
    if (selectedMode === 'Study') {
      history.push(`/questions?subject=${subjectId}&subtopic=${subtopicId}`);
    }
    // If 'Exam' mode is selected, navigate to the Exam component
    else if (selectedMode === 'Exam') {
      history.push(`/exam?subject=${subjectId}&subtopic=${subtopicId}&numQuestions=${lessonsToShow}`);
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
      <Navbar />
      <div
        style={{
          width: 785,
          flexShrink: 0,
          backgroundColor: '#EBEAEA',
          color: '#000',
        }}
      >
        <Typography variant="h5" style={{ color: 'white', textAlign: 'center', marginTop: '10px' }}>
          Pick Your Options
        </Typography>
        <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '10px' }}>
          <Button
            variant={selectedMode === 'Study' ? 'contained' : 'outlined'}
            color="secondary"
            onClick={() => handleModeSelect('Study')}
          >
            Study
          </Button>
          <Button
            variant={selectedMode === 'Exam' ? 'contained' : 'outlined'}
            color="secondary"
            onClick={() => handleModeSelect('Exam')}
            style={{ marginLeft: '10px' }}
          >
            Exam
          </Button>
        </div>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
            <TableBody>
              {subjectData.map((subject, index) => (
                <React.Fragment key={subject.Code}>
                  <TableRow>
                    <TableCell component="th" scope="row">
                      {"Subject " + subject.Code + ": " + subject.Name}
                    </TableCell>
                    <TableCell align="right">
                      <IconButton
                        aria-label="expand row"
                        size="small"
                        onClick={() => setOpen(open === index ? -1 : index)}
                      >
                        {open === index ? (
                          <KeyboardArrowUpIcon />
                        ) : (
                          <KeyboardArrowDownIcon />
                        )}
                      </IconButton>
                    </TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell style={{ paddingBottom: 0, paddingTop: 0 }} colSpan={6}>
                      <Collapse in={open === index} timeout="auto" unmountOnExit>
                        <Box margin={1}>
                          {subject.Subtopics.map((subtopic, subtopicIndex) => (
                            <Card
                              key={subtopicIndex}
                              onClick={() => handleSubtopicClick(subject.Code, subtopic.ID)}
                              style={{
                                cursor: 'pointer',
                                marginBottom: '8px',
                                transition: 'background-color 0.3s ease', // Add transition effect
                                backgroundColor: selectedSubject === subject.Code ? '#FFA500' : '', // Highlight selected subject
                              }}
                            >
                              <CardContent>
                                <Typography variant="body1">
                                  {subtopic.Name}
                                </Typography>
                              </CardContent>
                            </Card>
                          ))}
                        </Box>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      {selectedMode === 'Exam' && (
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            marginTop: '20px',
          }}
        >
          <Typography gutterBottom>
            Choose the number of questions: {lessonsToShow}
          </Typography>
          <Slider
            value={lessonsToShow}
            onChange={handleSliderChange}
            step={1}
            min={1}
            max={subjectData[0].Subtopics.length}
            valueLabelDisplay="auto"
          />
        </div>
      )}
    </div>
  );
};

export default Chapters;
