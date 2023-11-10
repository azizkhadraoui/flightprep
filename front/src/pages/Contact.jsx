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
import './contact.css'

const Contact = () => {
  const [open, setOpen] = useState(-1);
  const [selectedFeedback, setSelectedFeedback] = useState('');
  const index = 0;

  const handleFeedbackOptionClick = (option) => {
    setSelectedFeedback(option);
    setOpen(-1);
  };

  return (
    <div
      style={{
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
          <div style={{ flex: 1, marginRight: '20px' }}>
            <Input
              placeholder='Enter Name and Surname'
              style={{
                width: '538px',
                height: '57px',
                flexShrink: 0,
                border: '3px solid #F1870C',
                borderRadius: '10px',
                margin: '10px 0',
                color: 'white',
              }}
            />
            <Input
              placeholder='Enter Phone Number'
              style={{
                width: '538px',
                height: '57px',
                flexShrink: 0,
                border: '3px solid #F1870C',
                borderRadius: '10px',
                margin: '10px 0',
                color: 'white',
              }}
            />
          </div>
          <div style={{ flex: 1 }}>
            <Input
              placeholder='Enter Email'
              style={{
                width: '100%',
                margin: '10px 0',
                border: '3px solid #F1870C',
                borderRadius: '10px',
                color: 'white',
              }}
            />
            <TableContainer>
              <Table>
                <TableRow 
                  style={{
                    border: '3px solid #F1870C',
                    borderRadius: '10px',
                    color: 'white',
                  }}
                >
                  <TableCell>
                    {selectedFeedback ? selectedFeedback : 'Post Exam Feedbacks'}
                  </TableCell>
                  <TableCell>
                    <IconButton
                      aria-label="expand row"
                      size="small"
                      onClick={() => setOpen(open === index ? -1 : index)}
                      style={{ color: 'white' }}
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
                        <List>
                          {['Epic', 'Good', 'Medium', 'Bad', 'Very Bad'].map((option) => (
                            <ListItem
                              button
                              key={option}
                              onClick={() => handleFeedbackOptionClick(option)}
                            >
                              <ListItemText primary={option} style={{ color: 'white' }} />
                            </ListItem>
                          ))}
                        </List>
                      </Collapse>
                    </TableCell>
                  </TableRow>
                )}
              </Table>
            </TableContainer>
            <Input
              placeholder='Message'
              style={{
                width: '538px',
                height: '363px',
                flexShrink: 0,
                border: '3px solid #F1870C',
                borderRadius: '10px',
                margin: '10px 0',
                color: 'white',
              }}
            />
            <Button
              style={{
                backgroundColor: '#F1870C', // Set the color to #F1870C
                color: 'white',
                width: '120px',         // Adjusted width
                height: '31px',         // Adjusted height
                flexShrink: 0,
                borderRadius: '12px',
                marginTop: '10px',
              }}
            >
              Submit
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
