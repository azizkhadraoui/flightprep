import React, { useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import { Box, Collapse, IconButton, Paper, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import Slider from '@mui/material/Slider';
import { useHistory } from 'react-router-dom';

const rows = [
  { chapter: 1, lessons: ["Lesson 1", "Lesson 2", "Lesson 3", "Lesson 4", "Lesson 5"] },
  { chapter: 2, lessons: ["Lesson 1", "Lesson 2", "Lesson 3", "Lesson 4", "Lesson 5"] },
  { chapter: 3, lessons: ["Lesson 1", "Lesson 2", "Lesson 3", "Lesson 4", "Lesson 5"] },
  { chapter: 4, lessons: ["Lesson 1", "Lesson 2", "Lesson 3", "Lesson 4", "Lesson 5"] },
  { chapter: 5, lessons: ["Lesson 1", "Lesson 2", "Lesson 3", "Lesson 4", "Lesson 5"] },
  // add other chapters here...
];


const Chapters = () => {
  const [open, setOpen] = useState(false);
  const [lessonsToShow, setLessonsToShow] = useState(5);
  const handleSliderChange = (event, newValue) => {
    setLessonsToShow(newValue);
  };

  const history = useHistory();

  const handleSubtopicClick = (subtopicId) => {
    // Navigate to the Exam component with the selected subtopic ID as a parameter
    history.push(`/exam?subtopic=${subtopicId}`);
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
      <div style={{
          width: 785,
          maxHeight: 597,
          flexShrink: 0,
          backgroundColor: '#EBEAEA',
          color: '#000'
      }}>
        <TableContainer component={Paper}>
          <Table aria-label="simple table">
          <TableBody>
              {rows.map((row, index) => (
                <React.Fragment>
                  <TableRow key={row.chapter}>
                    <TableCell component="th" scope="row">
                      {"Chapter " + row.chapter}
                    </TableCell>
                    <TableCell align='right'>
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
                          <Typography variant="h6" gutterBottom component="div">
                            Lessons
                          </Typography>
                          {row.lessons.map(lesson => (
                            <Typography onClick={handleSubtopicClick}>{lesson}</Typography>
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
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          marginTop: '20px',
        }}
      >
        <Typography gutterBottom>
          You chose {lessonsToShow} lessons out of {rows[0].lessons.length}
        </Typography>
        <Slider
          value={lessonsToShow}
          onChange={handleSliderChange}
          step={1}
          min={1}
          max={rows[0].lessons.length}
          valueLabelDisplay="auto"
        />
      </div>
    </div>
  );
}

export default Chapters;
