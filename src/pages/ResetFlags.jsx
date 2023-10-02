import React, { useState,useEffect } from 'react';
import { Typography, TableContainer, Table, TableHead, TableBody, TableRow, TableCell, Paper, IconButton, Collapse, Box, Button } from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import { getFirestore, collection, getDocs, doc, deleteDoc } from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { useAuth } from '../Auth';
import app from '../base';

const FlaggedQuestions = () => {
  const [flaggedData, setFlaggedData] = useState([]);
  const [open, setOpen] = useState({});
  const [deletedCategories, setDeletedCategories] = useState([]);
  const auth = useAuth(); // Use your authentication context hook to get the user's ID

  useEffect(() => {
    const fetchFlaggedData = async () => {
      try {
        const auth = getAuth(app);
        const db = getFirestore(app);
        const user = auth.currentUser;

        // Fetch flagged questions data for the current user
        const pinnedQuestions = [];
        const yellowFlaggedQuestions = [];
        const redFlaggedQuestions = [];
        const greenFlaggedQuestions = [];
        const dontShowQuestions = [];

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
      }, []);

        // Fetch data for each flagged category
        // Modify these queries to fetch data from your Firestore collections
        const pinnedQuerySnapshot = await getDocs(collection(db, `users/${currentUserId}/pinned`));
        pinnedQuerySnapshot.forEach((doc) => {
          pinnedQuestions.push(doc.data().questionId);
        });

        const yellowFlaggedQuerySnapshot = await getDocs(collection(db, `users/${currentUserId}/yellowFlagged`));
        yellowFlaggedQuerySnapshot.forEach((doc) => {
          yellowFlaggedQuestions.push(doc.data().questionId);
        });

        const redFlaggedQuerySnapshot = await getDocs(collection(db, `users/${currentUserId}/redFlagged`));
        redFlaggedQuerySnapshot.forEach((doc) => {
          redFlaggedQuestions.push(doc.data().questionId);
        });

        const greenFlaggedQuerySnapshot = await getDocs(collection(db, `users/${currentUserId}/greenFlagged`));
        greenFlaggedQuerySnapshot.forEach((doc) => {
          greenFlaggedQuestions.push(doc.data().questionId);
        });

        const dontShowQuerySnapshot = await getDocs(collection(db, `users/${currentUserId}/dont`));
        dontShowQuerySnapshot.forEach((doc) => {
          dontShowQuestions.push(doc.data().questionId);
        });

        // Create an object to store flagged data
        const flaggedDataObject = {
          Pinned: pinnedQuestions,
          YellowFlagged: yellowFlaggedQuestions,
          RedFlagged: redFlaggedQuestions,
          GreenFlagged: greenFlaggedQuestions,
          DontShow: dontShowQuestions,
        };

        // Set the flagged data in state
        setFlaggedData(flaggedDataObject);

        // Initialize the 'open' state object for expanding/collapsing
        const initialOpenState = {};
        for (const category in flaggedDataObject) {
          initialOpenState[category] = false;
        }
        setOpen(initialOpenState);
      } catch (error) {
        console.error('Error fetching flagged questions:', error);
      }
    };

    fetchFlaggedData();
  }, [auth.currentUser]); // Add any dependencies you need for this effect

  const handleExpandClick = (category) => {
    setOpen({
      ...open,
      [category]: !open[category],
    });
  };

  const handleUnflag = async (category) => {
    try {
      const db = getFirestore(); // Initialize Firestore
      const userId = auth.currentUser.uid; // Get the current user's ID from your authentication context

      // Determine the Firestore collection path based on the category
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

      // Delete all documents in the specified collection
      const querySnapshot = await getDocs(collection(db, collectionPath));
      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      // Mark the category as deleted
      setDeletedCategories([...deletedCategories, category]);

      // Update the flaggedData object to remove the deleted category
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
