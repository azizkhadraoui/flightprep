import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import "./QuestionsFetch.css";
import { Select, MenuItem, FormControl, InputLabel } from "@mui/material";
import FilterListIcon from "@mui/icons-material/FilterList";
import subjectData from "./subjectData.json";

function QuestionsFetch() {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [subject, setSubject] = useState("");
  const [subtopic, setSubtopic] = useState("");
  const [showFilters, setShowFilters] = useState(false);
  const [searchInput, setSearchInput] = useState("");

  const recordsPerPage = 5;
  const lastIndex = currentPage * recordsPerPage;
  const firstIndex = lastIndex - recordsPerPage;
  const records = questions.slice(firstIndex, lastIndex);
  const npage = Math.ceil(questions.length / recordsPerPage);

  const generatePageNumbers = () => {
    const displayRange = 3;
    const start = Math.max(1, currentPage - displayRange);
    const end = Math.min(npage, currentPage + displayRange);

    return [...Array(end - start + 1)].map((_, index) => start + index);
  };

  useEffect(() => {
    let url = process.env.REACT_APP_BACKEND_URL;
    if (subject && subtopic) {
      url += `/${subject}/${subtopic}`;
    } else {
      url = `${process.env.REACT_APP_BACKEND_URL}/questions`;
    }
    console.log(url);

    axios
      .get(url)
      .then((res) => {
        console.log("Data fetched successfully:", res.data);
        setQuestions(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, [subject, subtopic]);

  const handleDeleteQuestion = async (questionId) => {
    try {
      const response = await axios.delete(
        `${process.env.REACT_APP_BACKEND_URL}/remove/${questionId}`
      );

      if (response.data.success) {
        setQuestions((prevQuestions) =>
          prevQuestions.filter((question) => question.id !== questionId)
        );
        console.log("Question deleted successfully");
      } else {
        console.log("Failed to delete the question:", response.data.message);
      }
    } catch (error) {
      console.error("Error deleting the question:", error);
    }
  };
  function prePage() {
    if (currentPage !== firstIndex) {
      setCurrentPage(currentPage - 1);
    }
  }

  function changeCPage(n) {
    setCurrentPage(n);
  }

  function nextPage() {
    if (currentPage !== lastIndex) {
      setCurrentPage(currentPage + 1);
    }
  }

  const handleSearch = () => {
    // Trigger search here
    const fetchData = async () => {
      try {
        if (searchInput) {
          const response = await axios.get(
            `${process.env.REACT_APP_BACKEND_URL}/search/s/${searchInput}`
          );
          setQuestions(response.data);
        } else {
          // If search input is empty, fetch all questions
          const url = subject && subtopic
            ? `${process.env.REACT_APP_BACKEND_URL}/${subject}/${subtopic}`
            : `${process.env.REACT_APP_BACKEND_URL}/questions`;

          const response = await axios.get(url);
          setQuestions(response.data);
        }
      } catch (error) {
        console.error("Error fetching questions:", error.message);
      }
    };

    fetchData();
  };


  return (
    <div className="container-fluid">
      <div className="row">
        <div className="col-md-12 admin">
          <div className="panel">
            <div className="top-bar">
              <Box
                component="span"
                sx={{ background: "rgba(159, 162, 216, 0.49)" }}
              >
                <img src="/airexam.svg" alt="Logo" />
              </Box>
            </div>
            <div className="panel-heading">
              <div className="row">
                <div className="col col-sm-3 col-xs-12">
                  <Link to="/create" className="btn btn-secondary mb-3">
                    Add Question +
                  </Link>
                  <button
                    onClick={() => setShowFilters(!showFilters)}
                    className="btn btn-secondary mb-3 ml-3"
                  >
                    Filters <FilterListIcon />
                  </button>
                  {showFilters && (
                    <>
                      <FormControl
                        variant="outlined"
                        className="filterFormControl"
                      >
                        <InputLabel id="subject-label">Subject</InputLabel>
                        <Select
                          labelId="subject-label"
                          value={subject}
                          onChange={(e) => setSubject(e.target.value)}
                          label="Subject"
                        >
                          {subjectData.map((subject) => (
                            <MenuItem value={subject.Code}>
                              {subject.Name}
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>

                      {subject && (
                        <FormControl
                          variant="outlined"
                          className="filterFormControl"
                        >
                          <InputLabel id="subtopic-label">Subtopic</InputLabel>
                          <Select
                            labelId="subtopic-label"
                            value={subtopic}
                            onChange={(e) => setSubtopic(e.target.value)}
                            label="Subtopic"
                          >
                            {subjectData
                              .find((s) => s.Code === subject)
                              .Subtopics.map((subtopic) => (
                                <MenuItem value={subtopic.ID}>
                                  {subtopic.Name}
                                </MenuItem>
                              ))}
                          </Select>
                        </FormControl>
                      )}
                    </>
                  )}
                </div>
                <div className="col-sm-9 col-xs-12 text-right">
                  <div className="btn_group">
                  <input
            type="text"
            onChange={(e) => setSearchInput(e.target.value)}
            className="form-control"
            placeholder="Search"
          />
          <button
            className="btn btn-secondary ml-2"
            onClick={handleSearch}
          >
            Search
          </button>
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-body table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th className="idColumn">ID</th>
                    <th className="questionColumn">Question</th>
                    <th>Status</th>
                    <th>Seen In</th>
                    <th>Free Trial</th>
                    <th>Real Exam</th>
                    <th>Recently Changed</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((question) => (
                    <tr key={question.id}>
                      <td className="idColumn">{question.id}</td>
                      <td className="questionColumn">{question.question}</td>
                      <td>{question.status}</td>
                      <td>{question.seen_in}</td>
                      <td>{question.free_trial}</td>
                      <td>{question.real_exam ? "Yes" : "No"}</td>
                      <td>{question.recently_changed ? "Yes" : "No"}</td>
                      <td className="d-flex justify-content-center align-items-center">
                        <button
                          className="btn btn-secondary btn-sm mr-2"
                          onClick={() => handleDeleteQuestion(question.id)}
                        >
                          <i className="material-icons">&#xE872;</i>
                        </button>
                        <Link
                          to={`/update/${question.id}`}
                          className="btn btn-secondary btn-sm"
                        >
                          <i className="material-icons">&#xE254;</i>
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <div className="panel-footer">
              <div className="row">
                <div className="col-sm-6 col-xs-6">
                  <ul className="pagination hidden-xs pull-right">
                    <li>
                      <a href="#" className="page-link" onClick={prePage}>
                        {" "}
                        &lt;{" "}
                      </a>
                    </li>
                    {generatePageNumbers().map((n, i) => (
                      <li
                        className={`page-item ${
                          currentPage === n ? "active" : ""
                        }`}
                        key={i}
                      >
                        <a
                          href="#"
                          className="page-link"
                          onClick={() => changeCPage(n)}
                        >
                          {n}
                        </a>
                      </li>
                    ))}
                    <li>
                      <a href="#" className="page-link" onClick={nextPage}>
                        &gt;
                      </a>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default QuestionsFetch;
