import React, { useState } from 'react';
import Navbar from '../components/navbar/Navbar';
import {
  TableContainer,
  Button,
  Input,
  Table,
  TableRow,
  Collapse,
  TableCell,
  IconButton,
  List,
  ListItem,
  ListItemText,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const Contact = () => {
  const [open, setOpen] = useState(-1); // Initialize the state variable for row expansion
  const [selectedFeedback, setSelectedFeedback] = useState(''); // Initialize the state variable for selected feedback
  const index = 0; // Set the index you want to associate with this row

  // Function to handle feedback option selection
  const handleFeedbackOptionClick = (option) => {
    setSelectedFeedback(option);
    setOpen(-1); // Close the list when an option is selected
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
      <div style={{ alignItems: 'center', justifyContent: 'center', flex: 1, display: 'flex', flexDirection: 'column' }}>
        <h1>Contact Us</h1>
        <div style={{ display: 'flex', justifyContent: 'space-between', width: '80%' }}>
          {/* Left Div with Two Inputs */}
          <div style={{ flex: 1, marginRight: '20px' }}>
            <Input
              placeholder='Enter Name and Surname'
              style={{
                width: '538px',
                height: '57px',
                flexShrink: 0,
                strokeWidth: '3px',
                stroke: '#F1870C',
                margin: '10px 0',
              }}
            />
            <Input
              placeholder='Enter Phone Number'
              style={{
                width: '538px',
                height: '57px',
                flexShrink: 0,
                strokeWidth: '3px',
                stroke: '#F1870C',
                margin: '10px 0',
              }}
            />
          </div>
          {/* Right Div with Three Inputs and Submit Button */}
          <div style={{ flex: 1 }}>
            <Input placeholder='Enter Email' style={{ width: '100%', margin: '10px 0' }} />
            <TableContainer>
              <Table>
                <TableRow>
                  <TableCell>
                    {selectedFeedback ? selectedFeedback : 'Post Exam Feedbacks'} {/* Display selected feedback or default text */}
                  </TableCell>
                  <TableCell>
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
                {open === index && (
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Collapse in={open === index}>
                        {/* List of choices for post-exam feedback */}
                        <List>
                          {['Epic', 'Good', 'Medium', 'Bad', 'Very Bad'].map((option) => (
                            <ListItem
                              button
                              key={option}
                              onClick={() => handleFeedbackOptionClick(option)}
                            >
                              <ListItemText primary={option} />
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </Table>
            </TableContainer>
            <Input placeholder='Some other input' style={{ width: '100%', margin: '10px 0' }} />
            <Button style={{ backgroundColor: 'green', color: 'white', width: '100%' }}>Submit</Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
