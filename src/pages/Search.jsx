import React, { useState, useEffect } from "react";
import axios from "axios";
import { Box, TextField, Card, CardContent, IconButton } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import Navbar2 from "../components/navbar/Navbar2";
import { useHistory } from "react-router-dom";

const Search = () => {
  const [searchInput, setSearchInput] = useState("");
  const [questions, setQuestions] = useState([]);
  const history = useHistory();

  const handleCardClick = (questionId) => {
    // Define the logic for handling card click here
    // For example, you can navigate to a specific route
   // history.push(`/questions/${questionId}`);
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (searchInput) {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/search/s/${searchInput}`
          );
          setQuestions(response.data);
        } else {
          setQuestions([]);
        }
      } catch (error) {
        console.error("Error fetching questions:", error.message);
      }
    };

    fetchData();
  }, [searchInput]);
  console.log();

  return (
    <div
      style={{
        backgroundImage: `url("/loginbackground.svg")`,
        backgroundSize: "cover",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        fontFamily: "Mulish, sans-serif",
      }}
    >
      <Navbar2 />
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          backgroundColor: "white",
          borderRadius: "10px",
          maxWidth: "1000px",
          padding: "20px",
          marginTop: "50px",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            width: "750px",
            borderRadius: "10px",
            border: "1px solid gray",
          }}
        >
          <TextField
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            placeholder="Search questions..."
            variant="outlined"
            fullWidth
            InputProps={{ style: { borderRadius: "10px", height: "50px" } }}
          />
          <IconButton>
            <SearchIcon />
          </IconButton>
        </Box>
        {questions.map((question) => (
          <Card
            key={question.id}
            sx={{ width: "750px", marginTop: "20px", cursor: "pointer" }}
            onClick={() => handleCardClick(question.id)}
          >
            <CardContent>{question.question}</CardContent>
          </Card>
        ))}
      </Box>
    </div>
  );
};

export default Search;
