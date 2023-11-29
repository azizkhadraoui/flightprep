import React, { useState, useEffect } from 'react';
import Navbar2 from '../components/navbar/Navbar2';
import { Box, Paper, Typography, List, ListItem, ListItemText } from '@mui/material';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import app from '../base';

const db = getFirestore(app);

const AllTests = () => {
  const [tests, setTests] = useState([]);

  useEffect(() => {
    // Fetch test results from Firebase here
    const fetchTests = async () => {
      try {
        const testsCollection = collection(db, 'results'); // Adjust the collection name
        const testsSnapshot = await getDocs(testsCollection);
        const testsData = testsSnapshot.docs.map((doc) => doc.data());
        setTests(testsData);
      } catch (error) {
        console.error('Error fetching tests:', error);
      }
    };

    fetchTests();
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
      <Box style={{margin:'20px', minWidth:'1000px'}}>
        <Paper elevation={3} style={{ padding: '20px', width: '80%' }}>
          <Typography variant="h5" style={{ color: 'black', marginTop: '5px' }}>
            All Tests
          </Typography>
          <List>
            {tests.map((test, index) => (
              <ListItem key={index}>
                <ListItemText
                  primary={`Test Name: ${test.subtopicName}`}
                  secondary={`Score: ${test.result.toFixed(2)}%, Date: ${new Date(test.date.toDate()).toLocaleDateString()}`}
                />
              </ListItem>
            ))}
          </List>
        </Paper>
      </Box>
    </div>
  );
};

export default AllTests;


