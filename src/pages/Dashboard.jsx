import React, { useEffect, useState } from 'react';
import Navbar2 from '../components/navbar/Navbar2';
import { useHistory } from 'react-router-dom';
import {
  getFirestore, collection, getDocs, 
} from 'firebase/firestore';
import {
  Box, Grid, Paper, Typography, Button
} from '@mui/material';
import Chart from 'react-apexcharts';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import app from '../base.js';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import SaveAltIcon from '@mui/icons-material/SaveAlt';
import SearchIcon from '@mui/icons-material/Search';
import AssessmentIcon from '@mui/icons-material/Assessment';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import InfoIcon from '@mui/icons-material/Info';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import FlagIcon from '@mui/icons-material/Flag';
import FeedbackIcon from '@mui/icons-material/Feedback';
import BookIcon from '@mui/icons-material/Book';
import AnnouncementIcon from '@mui/icons-material/Announcement';
import ContactMailIcon from '@mui/icons-material/ContactMail';

const Dashboard = () => {
  const history = useHistory();
  const db = getFirestore(app);
  const auth = getAuth(app);
  const [currentUserId, setCurrentUserId] = useState(null);
  const [tests, setTests] = useState([]);
  const [chartData, setChartData] = useState({
    options: {
      chart: { id: 'basic-line-chart' },
      xaxis: { categories: [] },
    },
    series: [{ name: 'Scores', data: [] }],
  });

  // Authentication state listener
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setCurrentUserId(user ? user.uid : null);
    });
    return () => unsubscribe();
  }, [auth]);

  // Fetching test data
  useEffect(() => {
    const fetchData = async () => {
      if (currentUserId) {
        try {
          const testsCollection = collection(db, `users/${currentUserId}/tests`);
          const testsSnapshot = await getDocs(testsCollection);
          const testsData = testsSnapshot.docs.map((doc) => ({
            id: doc.id,
            ...doc.data(),
          }));

          testsData.sort((a, b) => b.date - a.date);
          setTests(testsData);
        } catch (error) {
          console.error('Error getting documents: ', error);
        }
      }
    };

    fetchData();
  }, [currentUserId, db]);

  // Chart data handling
  useEffect(() => {
    const dates = [];
    const scores = [];
    tests.forEach((test) => {
      const originalDate = new Date(test.date);
      dates.push(originalDate.toDateString());
      scores.push(parseFloat(test.result.toFixed(1)));
    });

    setChartData({
      options: {
        chart: { id: 'basic-line-chart' },
        xaxis: { categories: dates },
      },
      series: [{ name: 'Scores', data: scores }],
    });
  }, [tests]);

  const actionButtons = [
    { text: "New Test", route: "/chapters", icon: <AddCircleOutlineIcon /> },
    { text: "Saved Tests", route: "/alltests", icon: <SaveAltIcon /> },
    { text: "Search", route: "/search", icon: <SearchIcon /> },
    { text: "Reports", route: "/alltests", icon: <AssessmentIcon /> },
  ];

  const renderActionButtons = () => {
    return actionButtons.map((item, index) => (
      <Grid item key={index} xs={12} sm={6} md={3}>
        <Paper
          sx={{
            padding: 2,
            backgroundColor: "#001F70",
            borderLeft: "3px solid #F1870C",
            cursor: "pointer",
            color: "white", // Set text color to white
          }}
          onClick={() => history.push(item.route)}
        >
          <Box sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}>
            {item.icon}
            <Typography
              variant="subtitle1"
              color="white"
              sx={{ fontWeight: 800, marginLeft: 1 }}
            >
              {item.text}
            </Typography>
          </Box>
          <Typography variant="subtitle2" color="wheat">
            {item.text === "New Test"
              ? "Create a study or exam test"
              : item.text === "Saved Tests"
              ? "See your Previous Exams"
              : item.text === "Search"
              ? "Look for Questions"
              : "Your Reports"}
          </Typography>
        </Paper>
      </Grid>
    ));
  };

  // ... (previous code)

const renderSections = () => {
  const sectionItems = [
    { text: "Overview", icon: <RemoveRedEyeIcon /> },
    { text: "Most Viewed", icon: <InfoIcon /> },
  ];

  return sectionItems.map((item, index) => (
    <Grid item key={index} xs={12} sm={6}>
      <Paper
        sx={{
          padding: 2,
          backgroundColor: "#F1870C",
          cursor: "pointer",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "white", // Set text color to white
        }}
        onClick={() => history.push("/alltests")}
      >
        <Box sx={{ display: "flex", alignItems: "center" }}>
          {item.icon}
          <Typography
            variant="h5"
            color="white"
            sx={{ fontWeight: 800, marginLeft: 1 }}
          >
            {item.text}
          </Typography>
        </Box>
      </Paper>
    </Grid>
  ));
};

// ... (remaining code)



  // Additional Actions Section
  const additionalActions = [
    { text: "My Profile", route: "/profile", icon: <AccountCircleIcon /> },
    { text: "Reset Flags", route: "/reset-flags", icon: <FlagIcon /> },
    { text: "Give Feedback", route: "/contact", icon: <FeedbackIcon /> },
    { text: "Annexes", route: "/annexes", icon: <BookIcon /> },
    { text: "News", route: "/home", icon: <AnnouncementIcon /> },
    { text: "Contact", route: "/contact", icon: <ContactMailIcon /> },
  ];

  // ... (previous code)

// ... (previous code)

const renderAdditionalActions = () => {
  return (
    <Grid item xs={12} sm={6} md={6} lg={6}>
      <Grid container spacing={4}> {/* Adjust the spacing value */}
        {additionalActions.map((item, index) => (
          <Grid item key={index} xs={12} sm={6}>
            <Paper
              sx={{
                padding: 2,
                backgroundColor: "#001F70",
                cursor: "pointer",
                borderRadius: "10px",
                color: "white",
                height: "120%",
                width: "100%",
              }}
              onClick={() => history.push(item.route)}
            >
              <Box sx={{ display: "flex", alignItems: "center" }}>
                {item.icon}
                <Typography
                  variant="subtitle1"
                  color="white"
                  sx={{ fontWeight: 800, marginLeft: 1 }}
                >
                  {item.text}
                </Typography>
              </Box>
            </Paper>
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
};


// ... (remaining code)


// ... (remaining code)


  // Additional Sections
  const additionalSections = [
    {
      topText: "Settings",
      bottomText: "Update your settings on this page",
      route: "/profile",
    },
    {
      topText: "My Comments",
      bottomText: "Your saved comments",
      route: "/comments",
    },
    { topText: "My Notes", bottomText: "Your saved notes", route: "/notes" },
  ];

  const renderAdditionalSections = () => {
    return (
      <Grid item xs={12} md={2}>
        {additionalSections.map((textObj, index) => (
          <Paper
            key={index}
            sx={{
              padding: 2,
              backgroundColor: "#9B9EB5",
              marginBottom: 2,
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
              color: "white",
              height: "40%",
            }}
            onClick={() => history.push(textObj.route)}
          >
            <Typography
              variant="subtitle1"
              color="white"
              sx={{ fontWeight: 800 }}
            >
              {textObj.topText}
            </Typography>
            <Typography
              variant="body1"
              color="textSecondary"
              sx={{ textTransform: "capitalize" }}
            >
              {textObj.bottomText}
            </Typography>
          </Paper>
        ))}
      </Grid>
    );
  };

  // All Saved Tests Section
  const renderAllSavedTests = () => {
    return (
      <Grid item xs={12} sm={12} md={4}>
        <Paper
          sx={{
            padding: 2,
            backgroundColor: "#9B9EB5",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            width: "100%",
            height: "100%", // Adjusted to take the entire height
          }}
        >
          <Typography variant="subtitle1" color="primary" sx={{ fontWeight: 800 }}>
            The Last Saved Tests
          </Typography>
          <ul style={{ listStyleType: "none", padding: 0 }}>
            {tests.slice(0, 5).map((test) => (
              <li key={test.id}>
                <Typography variant="subtitle2" color="textPrimary">
                  {test.result.toFixed(2)}%  - {new Date(test.date).toLocaleDateString()}
                </Typography>
              </li>
            ))}
          </ul>
          <Button
            variant="contained"
            color="primary"
            sx={{ marginTop: 2 }}
            onClick={() => history.push("/alltests")}
          >
            All Saved Tests
          </Button>
        </Paper>
      </Grid>
    );
  };

  // ... (unchanged code for other sections and layout)

  return (
    <Box
      sx={{
        backgroundImage: `url("/loginbackground.svg")`,
        backgroundSize: "cover",
        backgroundPosition: "center center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "flex-start",
        height: "100vh",
      }}
    >
      <Navbar2 />
      <div style={{margin:'20px'}}>
      <Grid container spacing={2} sx={{ marginTop: 3 }}>
        {/* Average Score Section */}
        <Grid item xs={12} sm={6} md={3}>
          <Paper
            sx={{
              padding: 2,
              backgroundColor: "#001F70",
              cursor: "pointer",
              color: "white", // Set text color to white
            }}
          >
            <Typography variant="subtitle1" color="white">
              Average Score
            </Typography>
            <Typography variant="h4" color="primary">
              40%
            </Typography>
            <Typography variant="subtitle1" color="white" sx={{ marginTop: 2 }}>
              Questions Seen
            </Typography>
            <Typography variant="h4" color="primary">
              22%
            </Typography>
            <Typography variant="subtitle2" color="wheat" sx={{ marginTop: 4 }}>
              Last 25 scores achieved on completed tests
            </Typography>
          </Paper>
        </Grid>

        {/* Chart Section */}
        <Grid item xs={12} sm={6} md={9}>
          <Paper sx={{ padding: 2, backgroundColor: "#6F77A7" }}>
            <Chart
              options={chartData.options}
              series={chartData.series}
              type="line"
              width="100%"
              height="140%"
            />
          </Paper>
        </Grid>
      </Grid>

      <Grid container spacing={2} sx={{ marginTop: 3 }}>
        {/* Action Buttons Section */}
        {renderActionButtons()}
      </Grid>

      <Grid container spacing={2} sx={{ marginTop: 3 }}>
        {/* Overview and Most Viewed Sections */}
        {renderSections()}
      </Grid>

      <Grid container spacing={2} sx={{ marginTop: 3 }}>
        {/* Additional Actions, Additional Sections, and All Saved Tests Sections */}
        {renderAdditionalActions()}
        {renderAdditionalSections()}
        {renderAllSavedTests()}
        </Grid>
        </div>
    </Box>
    
  );
};

export default Dashboard;
