import React, { useState, useEffect } from 'react';
import Navbar2 from "../components/navbar/Navbar2";
import {
  Typography,
  TableContainer,
  Table,
  TableHead,
  TableBody,
  TableRow,
  TableCell,
  Paper,
  IconButton,
  Collapse,
  Box,
  Button,
} from '@mui/material';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  deleteDoc,
  where,
  query,
} from 'firebase/firestore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import app from '../base';

const FlaggedQuestions = () => {
  const [flaggedData, setFlaggedData] = useState({});
  const [open, setOpen] = useState({});
  const [deletedCategories, setDeletedCategories] = useState([]);
  const auth = getAuth(app);
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
    const fetchFlaggedData = async () => {
      try {
        if (!currentUserId) return;

        const db = getFirestore(app);

        // Define your collection paths for each category under the current user's ID
        const collectionPaths = [
          `users/${currentUserId}/yellowFlagged`,
          `users/${currentUserId}/redFlagged`,
          `users/${currentUserId}/greenFlagged`,
          `users/${currentUserId}/dont`,
        ];

        const flaggedDataObject = {};

        // Fetch flagged questions for each category
        for (const categoryPath of collectionPaths) {
          const q = query(collection(db, categoryPath));
          const querySnapshot = await getDocs(q);

          const questions = [];
          querySnapshot.forEach((doc) => {
            questions.push(doc.id);
          });

          const category = categoryPath.split('/').pop();
          flaggedDataObject[category] = questions;
        }

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
      fetchFlaggedData();
    }
  }, [currentUserId]);

  const handleExpandClick = (category) => {
    setOpen((prevOpen) => ({
      ...prevOpen,
      [category]: !prevOpen[category],
    }));
  };

  const handleUnflag = async (category) => {
    try {
      if (!currentUserId) return;

      const db = getFirestore(app);

      // Define your collection path for the selected category under the current user's ID
      const collectionPath = `users/${currentUserId}/${category}`;

      const q = query(collection(db, collectionPath));
      const querySnapshot = await getDocs(q);

      querySnapshot.forEach(async (doc) => {
        await deleteDoc(doc.ref);
      });

      setDeletedCategories((prevDeletedCategories) => [...prevDeletedCategories, category]);

      const updatedFlaggedData = { ...flaggedData };
      delete updatedFlaggedData[category];
      setFlaggedData(updatedFlaggedData);
    } catch (error) {
      console.error('Error unflagging questions:', error);
    }
  };

  return (
    <div style={{ textAlign: 'center' }}>
      <Navbar2 />
      <Typography variant="h4" style={{ color: '#FFF', marginBottom: '20px' }}>
        Your Flagged Questions
      </Typography>
      {Object.keys(flaggedData).map((category) => (
        <div key={category} style={{ display: 'inline-block', margin: '20px' }}>
          <TableContainer component={Paper}>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>
                    <IconButton onClick={() => handleExpandClick(category)} size="small">
                      {open[category] ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />}
                    </IconButton>
                    {category}
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="contained"
                      size="small"
                      color="secondary"
                      onClick={() => handleUnflag(category)}
                      style={{ marginLeft: '10px' }} // Adjust the margin as needed
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