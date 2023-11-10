import React, { useState, useEffect } from 'react';
import { Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Collapse, Box, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '../Auth';
import app from '../base';

const FlaggedQuestions = () => {
  const [flaggedData, setFlaggedData] = useState({});
  const [open, setOpen] = useState({});
  const [deletedCategories, setDeletedCategories] = useState([]);
  const auth = useAuth(); // Use your authentication context hook to get the user's ID
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setCurrentUserId(user.uid);
      } else {
        setCurrentUserId(null);
      }
    });
    return () => unsubscribe();
  }, [auth]);

  useEffect(() => {
    const FetchFlaggedData = async () => {
      try {
        const db = getFirestore(app);
        const pinnedQuestions = [];
        const yellowFlaggedQuestions = [];
        const redFlaggedQuestions = [];
        const greenFlaggedQuestions = [];
        const dontShowQuestions = [];
        
        // Rest of your data fetching code...

        const flaggedDataObject = {
          Pinned: pinnedQuestions,
          YellowFlagged: yellowFlaggedQuestions,
          RedFlagged: redFlaggedQuestions,
          GreenFlagged: greenFlaggedQuestions,
          DontShow: dontShowQuestions,
        };

        setFlaggedData(flaggedDataObject);

        const initialOpenState = {};
        for (const category in flaggedDataObject) {
          initialOpenState[category] = false;
        }
        setOpen(initialOpenState);
      } catch (error) {
        console.error('Error fetching flagged questions:', error);
      }
    };

    if (currentUserId) {
      FetchFlaggedData();
    }
  }, [auth, currentUserId]);

  const handleExpandClick = (category) => {
    setOpen({
      ...open,
      [category]: !open[category],
    });
  };

  const handleUnflag = async (category) => {
    try {
      const db = getFirestore();
      const userId = auth.currentUser.uid;
      let collectionPath = '';

      switch (category) {
        case 'Pinned':
          collectionPath = `users/${userId}/pinned`;
          break;
        case 'YellowFlagged':
          collectionPath = `users/${userId}/yellowFlagged`;
          break;
        case 'RedFlagged':
          collectionPath = `users/${userId}/redFlagged`;
          break;
        case 'GreenFlagged':
          collectionPath = `users/${userId}/greenFlagged`;
          break;
        case 'DontShow':
          collectionPath = `users/${userId}/dont`;
          break;
        default:
          break;
      }

      const querySnapshot = await getDocs(collection(db, collectionPath));
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      setDeletedCategories([...deletedCategories, category]);

      const updatedFlaggedData = { ...flaggedData };
      delete updatedFlaggedData[category];
      setFlaggedData(updatedFlaggedData);
    } catch (error) {
      console.error('Error unflagging questions:', error);
    }
  };

  return (
    <div>
      <Typography variant="h4" style={{ color: '#FFF' }}>
        Your Flagged Questions
      </Typography>
      {Object.keys(flaggedData).map((category) => (
        <div key={category}>
          <TableContainer component={Paper} style={{ marginTop: '20px' }}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <IconButton
                      onClick={() => handleExpandClick(category)}
                      size="small"
                    >
                      {open[category] ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )}
                    </IconButton>
                    {category}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      onClick={() => handleUnflag(category)}
                    >
                      UnFlag
                    </Button>
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                <TableRow>
                  <TableCell>
                    <Collapse in={open[category]}>
                      <Box p={2}>
                        <ul>
                          {flaggedData[category].map((questionId) => (
                            <li key={questionId}>{questionId}</li>
                          ))}
                        </ul>
                      </Box>
                    </Collapse>
                  </TableCell>
                </TableRow>
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ))}
    </div>
  );
};

export default FlaggedQuestions;
