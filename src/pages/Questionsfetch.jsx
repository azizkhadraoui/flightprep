import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import "./QuestionsFetch.css";

function QuestionsFetch() {
  const [questions, setQuestions] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showFullExplanation, setShowFullExplanation] = useState(null);
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
    axios
      .get("http://localhost:8800/api/questions")
      .then((res) => {
        console.log("Data fetched successfully:", res.data);
        setQuestions(res.data);
      })
      .catch((error) => {
        console.error("Error fetching data:", error);
      });
  }, []);

  const handleDeleteQuestion = async (questionId) => {
    try {
      const response = await axios.delete(
        `http://localhost:8800/api/remove/${questionId}`
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
                </div>
                <div className="col-sm-9 col-xs-12 text-right">
                  <div className="btn_group">
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Search"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="panel-body table-responsive">
              <table className="table table-bordered">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Question</th>
                    <th>Option A</th>
                    <th>Option B</th>
                    <th>Option C</th>
                    <th>Option D</th>
                    <th>Correct Answer</th>
                    <th>Explanation</th>
                    <th>Status</th>
                    <th>Seen In</th>
                    <th>Free Trial</th>
                    <th>Compass</th>
                    <th>Annexe</th>
                    <th>IDD</th>
                    <th>Real Exam</th>
                    <th>Recently Changed</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {records.map((question) => (
                    <tr key={question.id}>
                      <td>{question.id}</td>
                      <td>{question.question}</td>
                      <td>{question.A}</td>
                      <td>{question.B}</td>
                      <td>{question.C}</td>
                      <td>{question.D}</td>
                      <td>{question.correct}</td>
                      <td className="explanation-cell">
                        {question.exp.length > 100 &&
                        showFullExplanation !== question.id
                          ? `${question.exp.substring(0, 100)}...`
                          : question.exp}
                        {question.exp.length > 100 && (
                          <button
                            onClick={() =>
                              setShowFullExplanation(
                                showFullExplanation === question.id
                                  ? null
                                  : question.id
                              )
                            }
                          >
                            {showFullExplanation === question.id
                              ? "See Less"
                              : "See More"}
                          </button>
                        )}
                      </td>
                      <td>{question.status}</td>
                      <td>{question.seen_in}</td>
                      <td>{question.free_trial}</td>
                      <td>{question.compass}</td>
                      <td>{question.annexe}</td>
                      <td>{question.idd}</td>
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
