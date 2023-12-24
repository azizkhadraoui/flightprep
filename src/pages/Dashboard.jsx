import React from "react";
import Navbar2 from "../components/navbar/Navbar2";
import {} from "@mui/material";
import Typography from "@mui/material/Typography";
import Chart from "react-apexcharts";
import { useHistory } from "react-router-dom";
import RemoveRedEyeIcon from "@mui/icons-material/RemoveRedEye";
import InfoIcon from "@mui/icons-material/Info";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import FlagIcon from "@mui/icons-material/Flag";
import FeedbackIcon from "@mui/icons-material/Feedback";
import BookIcon from "@mui/icons-material/Book";
import AnnouncementIcon from "@mui/icons-material/Announcement";
import ContactMailIcon from "@mui/icons-material/ContactMail";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import SaveAltIcon from "@mui/icons-material/SaveAlt";
import SearchIcon from "@mui/icons-material/Search";
import AssessmentIcon from "@mui/icons-material/Assessment";
import  { useEffect, useState } from "react";
import app from "../base.js";
import {
  getFirestore,
  collection,
  getDocs,
  doc,
  setDoc,
  addDoc,
  serverTimestamp,
  getDoc,
} from "firebase/firestore";
import { getAuth, onAuthStateChanged } from "firebase/auth";

const Dashboard = () => {
  const db = getFirestore(app);
  const auth = getAuth(app);
  const history = useHistory();
  const [tests, setTests] = useState([]);

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
  const [currentUserId, setCurrentUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth(app);
    const db = getFirestore(app);
    let currentUser = null;
  
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        currentUser = user.uid;
      }
    });
  
    const fetchData = async () => {
      const testsCollection = collection(db, `users/${currentUser}/tests`);
      const testsSnapshot = await getDocs(testsCollection);
      const testsData = testsSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
  
      // Sort tests by date in descending order
      testsData.sort((a, b) => b.date - a.date);
  
      setTests(testsData);
    };
  
    fetchData();
  
    return () => unsubscribe();
  }, []);

  const [chartData, setChartData] = useState({
    options: {
      chart: {
        id: "basic-line-chart",
      },
      xaxis: {
        categories: [],
      },
    },
    series: [
      {
        name: "Scores",
        data: [],
      },
    ],
  });

  useEffect(() => {
    const fetchData = async () => {
      const dates = [];
      const scores = [];
      try {
        const testsCollection = collection(db, `users/${currentUserId}/tests`);
        const querySnapshot = await getDocs(testsCollection);
        querySnapshot.forEach((doc) => {
          const data = doc.data();
          const originalDate = new Date(data.date);
          dates.push(originalDate.toDateString());
          scores.push(parseFloat(data.result.toFixed(1)));
        });
        setChartData({
          options: {
            chart: {
              id: "basic-line-chart",
            },
            xaxis: {
              categories: dates,
            },
          },
          series: [
            {
              name: "Scores",
              data: scores,
            },
          ],
        });
      } catch (error) {
        console.error("Error getting documents: ", error);
      }
    };

    fetchData();
  }, [currentUserId]);

  return (
    <div
      style={{
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
      <div style={{ display: "flex", flexDirection: "row", marginTop: "30px" }}>
        <div
          style={{
            width: "309px",
            height: "284px",
            flexShrink: 0,
            border: "1px solid rgba(255, 255, 255, 0.00)",
            background: "#001F70",
            cursor: "pointer",
          }}
        >
          <Typography
            style={{
              color: "#FFF",
              fontFamily: "Mulish",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              textTransform: "uppercase",
            }}
          >
            Average Score
          </Typography>
          <Typography
            style={{
              color: "#F1870C",
              fontFamily: "Mulish",
              fontSize: "32px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              textTransform: "uppercase",
            }}
          >
            40%
          </Typography>
          <Typography
            style={{
              color: "#FFF",
              marginTop: "20px",
              fontFamily: "Mulish",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              textTransform: "uppercase",
            }}
          >
            Questions Seen
          </Typography>
          <Typography
            style={{
              color: "#F1870C",
              fontFamily: "Mulish",
              fontSize: "32px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              textTransform: "uppercase",
            }}
          >
            22%
          </Typography>
          <Typography
            style={{
              color: "#FFF",
              fontFamily: "Mulish",
              fontSize: "15px",
              fontStyle: "normal",
              fontWeight: 300,
              lineHeight: "normal",
              textTransform: "uppercase",
              marginTop: "80px",
            }}
          >
            Last 25 scores achieved on completed tests
          </Typography>
        </div>
        <div
          style={{
            width: "1034px",
            height: "284px",
            flexShrink: 0,
            border: "1px solid rgba(255, 255, 255, 0.00)",
            background: "#6F77A7",
          }}
        >
          <Chart
          options={chartData.options}
          series={chartData.series}
          type="line"
          width="100%"
          height="100%"
          />
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row", marginTop: "25px" }}>
        <div
          style={{
            width: "309px",
            height: "109px",
            flexShrink: 0,
            background: "#001F70",
            borderLeft: "3px solid #F1870C",
            marginRight: "30px",
            cursor: "pointer",
          }}
          onClick={() => history.push("/chapters")} // Updated here
        >
          <AddCircleOutlineIcon
            style={{ color: "#FFF", marginRight: "10px" }}
          />{" "}
          <Typography
            style={{
              color: "#FFF",
              textAlign: "left",
              fontFamily: "Mulish",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 800,
              lineHeight: "normal",
              textTransform: "uppercase",
            }}
          >
            New Test
          </Typography>
          <Typography
            style={{
              color: "#FFF",
              fontFamily: "Mulish",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              textTransform: "capitalize",
              marginTop: "40px",
            }}
          >
            Create a study or exam test
          </Typography>
        </div>
        <div
          style={{
            width: "309px",
            height: "109px",
            flexShrink: 0,
            background: "#001F70",
            borderLeft: "3px solid #F1870C",
            marginRight: "30px",
            cursor: "pointer",
          }}
          onClick={() => history.push("/alltests")} // Updated here
        >
          <SaveAltIcon style={{ color: "#FFF", marginRight: "10px" }} />{" "}
          <Typography
            style={{
              color: "#FFF",
              textAlign: "left",
              fontFamily: "Mulish",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 800,
              lineHeight: "normal",
              textTransform: "uppercase",
            }}
          >
            Saved Tests
          </Typography>
          <Typography
            style={{
              color: "#FFF",
              fontFamily: "Mulish",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              textTransform: "capitalize",
              marginTop: "40px",
            }}
          >
            See your Previous Exams
          </Typography>
        </div>
        <div
          style={{
            width: "309px",
            height: "109px",
            flexShrink: 0,
            background: "#001F70",
            borderLeft: "3px solid #F1870C",
            marginRight: "30px",
            cursor: "pointer",
          }}
        >
          <SearchIcon style={{ color: "#FFF", marginRight: "10px" }} />{" "}
          <Typography
            style={{
              color: "#FFF",
              textAlign: "left",
              fontFamily: "Mulish",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 800,
              lineHeight: "normal",
              textTransform: "uppercase",
            }}
            onClick={() => history.push("/search")}
          >
            Search
          </Typography>
          <Typography
            style={{
              color: "#FFF",
              fontFamily: "Mulish",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              textTransform: "capitalize",
              marginTop: "40px",
            }}
          >
            Look for Questions
          </Typography>
        </div>
        <div
          style={{
            width: "309px",
            height: "109px",
            flexShrink: 0,
            background: "#001F70",
            borderLeft: "3px solid #F1870C",
            marginRight: "30px",
            cursor: "pointer",
          }}
        >
          <AssessmentIcon style={{ color: "#FFF", marginRight: "10px" }} />{" "}
          {/* Add the icon */}
          <Typography
            style={{
              color: "#FFF",
              textAlign: "left",
              fontFamily: "Mulish",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 800,
              lineHeight: "normal",
              textTransform: "uppercase",
            }}
            onClick={() => history.push("/alltests")}
          >
            Reports
          </Typography>
          <Typography
            style={{
              color: "#FFF",
              fontFamily: "Mulish",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 700,
              lineHeight: "normal",
              textTransform: "capitalize",
              marginTop: "40px",
            }}
          >
            Your Reports
          </Typography>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row", marginTop: "25px" }}>
        <div
          style={{
            width: "654px",
            height: "95px",
            flexShrink: 0,
            borderRadius: "12px",
            background: "#F1870C",
            cursor: "pointer",
            display: "flex", // Add this
            alignItems: "center",
            justifyContent: "center",
          }}
          onClick={() => history.push("/alltests")}
        >
          <RemoveRedEyeIcon style={{ color: "#FFF", marginRight: "10px" }} />{" "}
          <Typography
            style={{
              color: "#FFF",
              fontFamily: "Mulish",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 800,
              textTransform: "uppercase",
            }}
          >
            Overview
          </Typography>
        </div>
        <div
          style={{
            width: "654px",
            height: "95px",
            flexShrink: 0,
            borderRadius: "12px",
            background: "#F1870C",
            marginLeft: "30px",
            cursor: "pointer",
            display: "flex", // Add this
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <InfoIcon style={{ color: "#FFF", marginRight: "10px" }} />{" "}
          {/* Add the icon */}
          <Typography
            style={{
              color: "#FFF",
              textAlign: "center",
              fontFamily: "Mulish",
              fontSize: "20px",
              fontStyle: "normal",
              fontWeight: 800,
              lineHeight: "normal",
              textTransform: "uppercase",
            }}
          >
            Most Viewed
          </Typography>
        </div>
      </div>
      <div style={{ display: "flex", flexDirection: "row" }}>
        <div
          style={{
            display: "flex",
            marginLeft: "20px",
            flexWrap: "wrap",
            width: "654px",
            gap: "30px",
            marginTop: "20px",
          }}
        >
          {" "}
          {/* Add gap property to adjust the gap between divs */}
          {[
            {
              text: "My Profile",
              route: "/profile",
              icon: (
                <AccountCircleIcon
                  style={{ color: "#FFF", marginRight: "10px" }}
                />
              ),
            }, // Add icon property
            {
              text: "Reset Flags",
              route: "/reset-flags",
              icon: <FlagIcon style={{ color: "#FFF", marginRight: "10px" }} />,
            }, // Add icon property
            {
              text: "Give Feedback",
              route: "/contact",
              icon: (
                <FeedbackIcon style={{ color: "#FFF", marginRight: "10px" }} />
              ),
            }, // Add icon property
            {
              text: "Annexes",
              route: "/annexes",
              icon: <BookIcon style={{ color: "#FFF", marginRight: "10px" }} />,
            }, // Add icon property
            {
              text: "News",
              route: "/home",
              icon: (
                <AnnouncementIcon
                  style={{ color: "#FFF", marginRight: "10px" }}
                />
              ),
            }, // Add icon property
            {
              text: "Contact",
              route: "/contact",
              icon: (
                <ContactMailIcon
                  style={{ color: "#FFF", marginRight: "10px" }}
                />
              ),
            }, // Add icon property
          ].map((item, index) => (
            <div
              key={index}
              style={{
                width: "calc(33.33% - 20px)", // 3 columns with 20px margin between them
                height: "121px",
                flexShrink: 0,
                background: "#001F70",
                margin: "0 20px 20px 0", // 20px margin between columns, 20px margin below rows
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                fontFamily: "Mulish",
                fontSize: "16px",
                color: "#FFF",
                cursor: "pointer",
                borderRadius: "10px", // Add border radius
              }}
              onClick={() => history.push(item.route)} // Use navigate to go to the specified route
            >
              {item.icon} {/* Display the icon */}
              {item.text}
            </div>
          ))}
        </div>

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            cursor: "pointer",
            marginTop: "20px",
          }}
        >
          {[
            {
              topText: "Settings",
              bottomText: "update ur settings on this page",
              route: "/profile",
            },
            {
              topText: "My Comments",
              bottomText: "your saved comments",
              route: "/comments",
            },
            {
              topText: "My Notes",
              bottomText: "ur saved notes",
              route: "/notes",
            },
          ].map((textObj, index) => (
            <div
              key={index}
              style={{
                width: "290px",
                height: "121px",
                flexShrink: 0,
                background: "#9B9EB5",
                marginBottom: "25px",
                display: "flex",
                flexDirection: "column",
                justifyContent: "center",
                alignItems: "center",
                textAlign: "center",
              }}
              onClick={() => history.push(textObj.route)}
            >
              <div
                style={{
                  color: "#312783",
                  fontFamily: "Mulish",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 800,
                  textTransform: "uppercase",
                }}
              >
                {textObj.topText}
              </div>
              <div
                style={{
                  color: "#FFF",
                  fontFamily: "Mulish",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 700,
                  textTransform: "capitalize",
                }}
              >
                {textObj.bottomText}
              </div>
            </div>
          ))}
        </div>

        <div
          style={{
            width: "290px",
            height: "415px",
            flexShrink: 0,
            background: "#9B9EB5",
            marginLeft: "30px",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            marginTop: "20px",
          }}
        >
          <div
            style={{
              color: "#312783",
              fontFamily: "Mulish",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 800,
              textTransform: "uppercase",
            }}
          >
            The Last Saved Tests
          </div>
          <div>
          <ul style={{ listStyleType: 'none', padding: 0 }}>
  {tests.slice(0, 5).map((test) => (
    <li key={test.id}>
      <span
        style={{
          color: '#FFF',
          fontFamily: 'Mulish',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 700,
          textTransform: 'uppercase',
        }}
      >
        {test.score}
      </span>
      <span
        style={{
          color: '#FFF',
          fontFamily: 'Mulish',
          fontSize: '14px',
          fontStyle: 'normal',
          fontWeight: 700,
          textTransform: 'uppercase',
        }}
      >
        - {new Date(test.date.seconds * 1000).toLocaleDateString()}
      </span>
    </li>
  ))}
</ul>
          </div>
          <button
            style={{
              width: "259px",
              height: "41px",
              flexShrink: 0,
              borderRadius: "12px",
              background: "#F1870C",
              color: "#FFF",
              fontFamily: "Mulish",
              fontSize: "16px",
              fontStyle: "normal",
              fontWeight: 700,
              textTransform: "uppercase",
              border: "none",
              cursor: "pointer",
              marginTop: "20px",
            }}
            onClick={() => history.push("/alltests")}
          >
            All Saved Tests
          </button>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
