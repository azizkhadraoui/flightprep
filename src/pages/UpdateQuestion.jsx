import React, { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import "./updateQuestion.css";
import { getStorage, ref, uploadString, getDownloadURL } from "firebase/storage";
import app from '../base';


function UpdateQuestion() {
  const storage = getStorage(app);
  const { id } = useParams();
  console.log(id);
  const [formData, setFormData] = useState({
    question: "",
    A: "",
    B: "",
    C: "",
    D: "",
    correct: "",
    exp: "",
    status: "",
    seen_in: "",
    free_trial: "",
    compass: "",
    annexe: null,
    idd: 0,
    real_exam: 0,
    recently_changed: 0,
  });
  const [question, setQuestion] = useState(null);

  useEffect(() => {
    console.log('http://localhost:8800/api/getQuestion/${id}')
    if (id) {
      axios
        .get(`http://localhost:8800/api/getQuestion/${id}`)
        .then((response) => {
          setFormData(response.data);
          setQuestion(response.data); // Set the fetched question
        })
        .catch((error) => {
          console.error("Error fetching question:", error);
        });
    }
  }, [id]);

  const handleInputChange = (e, fieldName) => {
    setFormData({
      ...formData,
      [fieldName]: e.target.value,
    });
  };
  const handleFileChange = (e, fieldName) => {
    const file = e.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setFormData({
        ...formData,
        [fieldName]: {
          name: file.name,
          type: file.type,
          data: reader.result.split(",")[1], // Extracting base64 data
        },
      });
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Upload image to Firebase Storage
      const imageFieldName = "annexe"; // Change this to match your form field name for the image
      const imageField = formData[imageFieldName];
  
      if (imageField && imageField.data) {
        const storageRef = ref(storage, `images/${imageField.name}`);
        const snapshot = await uploadString(storageRef, imageField.data, "base64");
        const url = await getDownloadURL(snapshot.ref);
        console.log(url);
        formData.annexe.name=url;
      }
    
      // Make a PUT request to update the question with the updated form data
      await axios.put(`http://localhost:8800/api/update/${id}`, formData);
  
      // Optionally, you can reset the form or navigate to another page
      alert("Question updated successfully");
    } catch (error) {
      console.error("Error updating question:", error);
      alert("An error occurred while updating the question");
    }
  };
console.log(formData);





  return (
    <div className="container mt-5">
      <form encType="multipart/form-data" className="row g-3">
        <div className="col-12 mb-2">
          <label htmlFor="" className="form-label">
            Question
          </label>
          <input
            type="text"
            placeholder={question?.question}
            className="form-control"
            value={formData.question}
            onChange={(e) => handleInputChange(e, "question")}
          />
        </div>
        <div className="col-md-3 mb-2">
          <label htmlFor="" className="form-label">
            Option A
          </label>
          <input
            type="text"
            placeholder={question?.A}
            className="form-control"
            value={formData.A}
            onChange={(e) => handleInputChange(e, "A")}
          />
        </div>
        <div className="col-md-3 mb-2">
          <label htmlFor="" className="form-label">
            Option B
          </label>
          <input
            type="text"
            placeholder={question?.B}
            className="form-control"
            value={formData.B}
            onChange={(e) => handleInputChange(e, "B")}
          />
        </div>
        <div className="col-md-3 mb-2">
          <label htmlFor="" className="form-label">
            Option C
          </label>
          <input
            type="text"
            placeholder={question?.C}
            className="form-control"
            value={formData.C}
            onChange={(e) => handleInputChange(e, "C")}
          />
        </div>
        <div className="col-md-3 mb-2">
          <label htmlFor="" className="form-label">
            Option D
          </label>
          <input
            type="text"
            placeholder={question?.D}
            className="form-control"
            value={formData.D}
            onChange={(e) => handleInputChange(e, "D")}
          />
        </div>
        <div className="col-12 mb-2">
          <label htmlFor="">Correct</label>
          <input
            type="text"
            placeholder={question?.correct}
            className="form-control"
            value={formData.correct}
            onChange={(e) => handleInputChange(e, "correct")}
          />
        </div>

<div className="col-12 mb-2">
  <label htmlFor="" className="form-label">
    Explanation
  </label>
  <textarea
    rows="4"
    cols="50"
    placeholder={question?.exp}
    className="form-control"
    value={formData.exp}
    onChange={(e) => handleInputChange(e, "exp")}
  ></textarea>
</div>

{/* Add annex button */}
<div className="col-12 mb-2">
  <label htmlFor="annexInput" className="form-label">
    Add Annex
  </label>
  <input
    id="annexInput"
    type="file"
    className="form-control"
    onChange={(e) => handleFileChange(e, "annexe")}
  />
</div>
{formData.annexe && (
  <div className="col-12 mb-2">
    <img
  src={
    formData.annexe && formData.annexe.type
      ? `data:${formData.annexe.type};base64,${formData.annexe.data}`
      : formData.annexe
  }
  alt={formData.annexe ? formData.annexe.name : 'default-alt-text'}
  className="image-preview"
/>
  </div>
)}

        <div className="col-md-3 mb-2">
          <label htmlFor="" className="form-label">
            Status
          </label>
          <input
            type="text"
            placeholder={question?.status}
            className="form-control"
            value={formData.status}
            onChange={(e) => handleInputChange(e, "status")}
          />
        </div>
        <div className="col-md-3 mb-2">
          <label htmlFor="" className="form-label">
            Seen In
          </label>
          <input
            type="text"
            placeholder={question?.seen_in}
            className="form-control"
            value={formData.seen_in}
            onChange={(e) => handleInputChange(e, "seen_in")}
          />
        </div>
        <div className="col-md-3 mb-2">
          <label htmlFor="" className="form-label">
            Free Trial
          </label>
          <input
            type="text"
            placeholder={question?.free_trial}
            className="form-control"
            value={formData.free_trial}
            onChange={(e) => handleInputChange(e, "free_trial")}
          />
        </div>
        <div className="col-md-3 mb-2">
          <label htmlFor="" className="form-label">
            Compass
          </label>
          <input
            type="text"
            placeholder={question?.compass}
            className="form-control"
            value={formData.compass}
            onChange={(e) => handleInputChange(e, "compass")}
          />
        </div>
  
        <div className="col-md-4 mb-2">
          <label htmlFor="" className="form-label">
            Real Exam
          </label>
          <input
            type="number"
            placeholder={question?.real_exam}
            className="form-control"
            value={formData.real_exam}
            onChange={(e) => handleInputChange(e, "real_exam")}
          />
        </div>
        <div className="col-md-4 mb-2">
          <label htmlFor="" className="form-label">
            Recently changed
          </label>
          <input
            type="number"
            placeholder={question?.recently_changed}
            className="form-control"
            value={formData.recently_changed}
            onChange={(e) => handleInputChange(e, "recently_changed")}
          />
        </div>
        <div className="col-12 panel">
          <button className="btn btn-secondary mb-3" onClick={handleSubmit}>
            Update Question
          </button>
        </div>
      </form>
    </div>
  );
}

export default UpdateQuestion;
