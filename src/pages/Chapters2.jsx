import React, { useState } from 'react';
import {
  Box,
  Button,
  Checkbox,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  Typography,
} from '@mui/material';
import { useHistory } from 'react-router-dom';
import subjectData from './subjectData.json';
import { styled } from '@mui/system';
import BlockIcon from "@mui/icons-material/Block";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import FlagIcon from "@mui/icons-material/Flag";
import ErrorIcon from "@mui/icons-material/Error";
import NotesIcon from "@mui/icons-material/Notes";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ChangeHistoryIcon from "@mui/icons-material/ChangeHistory";
import NewReleasesIcon from "@mui/icons-material/NewReleases";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import PushPinIcon from '@mui/icons-material/PushPin';
import Navbar2 from '../components/navbar/Navbar2';

const StyledFormControl = styled(FormControl)(({ theme }) => ({
  marginTop: theme.spacing(2),
  minWidth: 400,
  '& .MuiInputBase-root': {
    backgroundColor: 'white',
    borderRadius: theme.shape.borderRadius,
    '&:hover': {
      backgroundColor: '#FFA500',
    },
    '&.Mui-focused': {
      backgroundColor: '#FFA500',
    },
  },
}));

const StyledSlider = styled(Slider)(({ theme }) => ({
  color: '#FFA500',
  '& .MuiSlider-thumb': {
    borderColor: 'black',
  },
}));

const Chapters2 = () => {
  const [subject, setSubject] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [filters, setFilters] = useState({
    greenFlagged: false,
    pinned: false,
    seenBefore: false,
    last200RealExamQuestions: false,
    excludeRealExamQuestions: false,
    reviewQuestions: false,
    markedDoNotShow: false,
    previouslyUnseenQuestions: false,
    incorrectlyAnswered: false,
    yellowFlaggedQuestions: false,
    redFlaggedQuestions: false,
    haveNotesFor: false,
    studyTestWithCorrectAnswers: false,
    answerRecentlyChanged: false,
    onlyRealExamQuestions: false,
  });
  const [numQuestions, setNumQuestions] = useState(0);
  const history = useHistory();
  const [showAllFilters, setShowAllFilters] = useState(false);

  const handleSubjectChange = (event) => {
    setSubject(event.target.value);
  };

  const handleSubtopicChange = (event) => {
    setSubtopic(event.target.value);
  };

  const handleFilterChange = (event) => {
    setFilters({ ...filters, [event.target.name]: event.target.checked });
  };

  const handleSliderChange = (event, newValue) => {
    setNumQuestions(newValue);
  };

  const handleModeSelect = (mode) => {
    history.push(
      `/${mode}?subject=${subject}&subtopic=${subtopic}&numQuestions=${numQuestions}`
    );
  };

  return (
    <Box
      sx={{
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
          marginTop: 10,
          marginBottom: 10,
          backgroundColor: "white",
          borderRadius: 2,
          padding: 3,
          maxWidth: 1200,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Typography variant="h5" align="center">
          Start by picking your options
        </Typography>

        <StyledFormControl>
          <InputLabel>Subject</InputLabel>
          <Select value={subject} onChange={handleSubjectChange}>
            {subjectData.map((subject) => (
              <MenuItem value={subject.Code}>{subject.Name}</MenuItem>
            ))}
          </Select>
        </StyledFormControl>

        {subject && (
          <StyledFormControl>
            <InputLabel>Subtopic</InputLabel>
            <Select value={subtopic} onChange={handleSubtopicChange}>
              {subjectData
                .find((s) => s.Code === subject)
                .Subtopics.map((subtopic) => (
                  <MenuItem value={subtopic.ID}>{subtopic.Name}</MenuItem>
                ))}
            </Select>
          </StyledFormControl>
        )}

        {subtopic && (
          <Box
            sx={{
              marginTop: 2,
              maxWidth: 500,
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <Typography>Filters</Typography>
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
            >
              <Checkbox
                checked={filters.greenFlagged}
                onChange={handleFilterChange}
                name="greenFlagged"
              />
              <Typography>
                <FlagIcon
                  style={{ color: "green", position: "relative", top: "5px" }}
                />{" "}
                Green Flagged
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
            >
              <Checkbox
                checked={filters.last200RealExamQuestions}
                onChange={handleFilterChange}
                name="last200RealExamQuestions"
              />
              <Typography>
                <NewReleasesIcon style={{ position: "relative", top: "5px" }} />{" "}
                Last 200 Real Exam Questions
              </Typography>
            </Box>
            <Box
              sx={{ display: "flex", alignItems: "center", marginBottom: 1 }}
            >
              <Checkbox
                checked={filters.excludeRealExamQuestions}
                onChange={handleFilterChange}
                name="excludeRealExamQuestions"
              />
              <Typography>
                <ErrorIcon
                  style={{ color: "red", position: "relative", top: "5px" }}
                />{" "}
                Exclude Real Exam Questions
              </Typography>
            </Box>
            {showAllFilters && (
              <>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 1,
                  }}
                >
                  <Checkbox
                    checked={filters.reviewQuestions}
                    onChange={handleFilterChange}
                    name="reviewQuestions"
                  />
                  <Typography>
                    <VisibilityIcon
                      style={{
                        position: "relative",
                        top: "5px",
                      }}
                    />{" "}
                    Review Questions
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 1,
                  }}
                >
                  <Checkbox
                    checked={filters.markedDoNotShow}
                    onChange={handleFilterChange}
                    name="markedDoNotShow"
                  />
                  <Typography>
                    <BlockIcon
                      style={{
                        color: "red",
                        position: "relative",
                        top: "5px",
                      }}
                    />
                    Marked 'Do not Show' questions
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 1,
                  }}
                >
                  <Checkbox
                    checked={filters.pinned}
                    onChange={handleFilterChange}
                    name="pinned"
                  />
                  <Typography>
                    <PushPinIcon
                      style={{
                        position: "relative",
                        top: "5px",
                      }}
                    />{" "}
                    Pinned Questions
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 1,
                  }}
                >
                  <Checkbox
                    checked={filters.previouslyUnseenQuestions}
                    onChange={handleFilterChange}
                    name="previouslyUnseenQuestions"
                  />
                  <Typography>
                    <VisibilityOffIcon
                      style={{
                        position: "relative",
                        top: "5px",
                      }}
                    />{" "}
                    Previously Unseen Questions
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 1,
                  }}
                >
                  <Checkbox
                    checked={filters.incorrectlyAnswered}
                    onChange={handleFilterChange}
                    name="incorrectlyAnswered"
                  />
                  <Typography>
                    <ErrorIcon
                      style={{
                        position: "relative",
                        top: "5px",
                      }}
                    />{" "}
                    Incorrectly answered
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 1,
                  }}
                >
                  <Checkbox
                    checked={filters.yellowFlaggedQuestions}
                    onChange={handleFilterChange}
                    name="yellowFlaggedQuestions"
                  />
                  <Typography>
                    <FlagIcon
                      style={{
                        color: "yellow",
                        position: "relative",
                        top: "5px",
                      }}
                    />{" "}
                    Yellow Flagged Questions
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 1,
                  }}
                >
                  <Checkbox
                    checked={filters.redFlaggedQuestions}
                    onChange={handleFilterChange}
                    name="redFlaggedQuestions"
                  />
                  <Typography>
                    <FlagIcon
                      style={{
                        color: "red",
                        position: "relative",
                        top: "5px",
                      }}
                    />{" "}
                    Red Flagged Questions
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 1,
                  }}
                >
                  <Checkbox
                    checked={filters.haveNotesFor}
                    onChange={handleFilterChange}
                    name="haveNotesFor"
                  />
                  <Typography>
                    <NotesIcon
                      style={{
                        position: "relative",
                        top: "5px",
                      }}
                    />{" "}
                    I have Notes for
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 1,
                  }}
                >
                  <Checkbox
                    checked={filters.studyTestWithCorrectAnswers}
                    onChange={handleFilterChange}
                    name="studyTestWithCorrectAnswers"
                  />
                  <Typography>
                    <CheckCircleIcon
                      style={{
                        position: "relative",
                        top: "5px",
                      }}
                    />{" "}
                    Study Test with correct answers
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 1,
                  }}
                >
                  <Checkbox
                    checked={filters.answerRecentlyChanged}
                    onChange={handleFilterChange}
                    name="answerRecentlyChanged"
                  />
                  <Typography>
                    <ChangeHistoryIcon /> Answer recently changed
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    marginBottom: 1,
                  }}
                >
                  <Checkbox
                    checked={filters.onlyRealExamQuestions}
                    onChange={handleFilterChange}
                    name="onlyRealExamQuestions"
                  />
                  <Typography>
                    <NewReleasesIcon
                      style={{
                        position: "relative",
                        top: "5px",
                      }}
                    />{" "}
                    Only real exam questions
                  </Typography>
                </Box>
              </>
            )}
            ;
            <Button
              onClick={() => setShowAllFilters(!showAllFilters)}
              endIcon={
                showAllFilters ? (
                  <KeyboardArrowUpIcon />
                ) : (
                  <KeyboardArrowDownIcon />
                )
              }
            >
              {showAllFilters ? "Show Less Filters" : "Show More Filters"}
            </Button>
          </Box>
        )}

        {subtopic && (
          <Box sx={{ marginTop: 2, width: 400 }}>
            <StyledSlider value={numQuestions} onChange={handleSliderChange} />
            <Typography>{numQuestions} / ? questions</Typography>
          </Box>
        )}

        {subtopic && (
          <Box
            sx={{
              marginTop: 2,
              display: "flex",
              justifyContent: "space-between",
              width: 250,
            }}
          >
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleModeSelect("question")}
            >
              Test
            </Button>
            <Button
              variant="contained"
              color="secondary"
              onClick={() => handleModeSelect("exam")}
            >
              Exam
            </Button>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default Chapters2;