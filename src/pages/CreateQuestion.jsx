import React, { useState } from 'react';
import axios from 'axios';

function CreateQuestion() {
    // State to store form data
    const [formData, setFormData] = useState({
        question: '',
        optionA: '',
        optionB: '',
        optionC: '',
        optionD: '',
        correct: '',
        status: '',
        seen_in: '',
        free_trial: '',
        compass: '',
        annexe: '',
        idd: 0,
        real_exam: 0,
        recently_changed: 0,
    });

    // Function to handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            // Make a POST request to the backend to create a new question
            const response = await axios.post('http://localhost:8800/api/create', formData);

            // Check if the question was created successfully
            if (response.data.success) {
                alert('Question created successfully');
                // Optionally, you can reset the form or navigate to another page
            } else {
                alert('Error creating question');
            }
        } catch (error) {
            console.error('Error creating question:', error);
            alert('An error occurred while creating the question');
        }
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
                    data: reader.result.split(',')[1], // Extracting base64 data
                },
            });
        };

        if (file) {
            reader.readAsDataURL(file);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({ ...prevData, [name]: value }));
    };
  return (
      <div className="container mt-5">
          <form encType="multipart/form-data" className="row g-3">
              <div className="col-12 mb-2">
                  <label htmlFor="" className="form-label">Question</label>
                  <input type="text" placeholder="" className="form-control" value={formData.question} onChange={(e) => handleInputChange(e, 'question')} />
              </div>
              <div className="col-md-3 mb-2">
                  <label htmlFor="" className="form-label">Option A</label>
                  <input type="text" placeholder="" className="form-control" value={formData.A} onChange={(e) => handleInputChange(e, 'A')} />
              </div>
              <div className="col-md-3 mb-2">
                  <label htmlFor="" className="form-label">Option B</label>
                  <input type="text" placeholder="" className="form-control" value={formData.B} onChange={(e) => handleInputChange(e, 'B')} />
              </div>
              <div className="col-md-3 mb-2">
                  <label htmlFor="" className="form-label">Option C</label>
                  <input type="text" placeholder="" className="form-control" value={formData.C} onChange={(e) => handleInputChange(e, 'C')} />
              </div>
              <div className="col-md-3 mb-2">
                  <label htmlFor="" className="form-label">Option D</label>
                  <input type="text" placeholder="" className="form-control" value={formData.D} onChange={(e) => handleInputChange(e, 'D')} />
              </div>
              <div className="col-12 mb-2">
                  <label htmlFor="">Correct</label>
                  <input type="text" placeholder="" className="form-control" value={formData.correct} onChange={(e) => handleInputChange(e, 'correct')} />
              </div>
              <div className="col-12 mb-2">
                  <label htmlFor="" className="form-label">Explanation</label>
                  <textarea rows="4" cols="50" placeholder="Enter your explanation here..." className="form-control" value={formData.exp} onChange={(e) => handleInputChange(e, 'exp')}></textarea>
              </div>
              <div className="col-12 mb-2">
                  <label htmlFor="annexe">Annexe</label>
                  <input type="file" id="annexe" className="form-control" onChange={(e) => handleFileChange(e, 'annexe')} />
              </div>
              <div className="col-md-3 mb-2">
                  <label htmlFor="" className="form-label">Status</label>
                  <input type="text" placeholder="" className="form-control" value={formData.status} onChange={(e) => handleInputChange(e, 'status')} />
              </div>
              <div className="col-md-3 mb-2">
                  <label htmlFor="" className="form-label">Seen In</label>
                  <input type="text" placeholder="" className="form-control" value={formData.seen_in} onChange={(e) => handleInputChange(e, 'seen_in')} />
              </div>
              <div className="col-md-3 mb-2">
                  <label htmlFor="" className="form-label">Free Trial</label>
                  <input type="text" placeholder="" className="form-control" value={formData.free_trial} onChange={(e) => handleInputChange(e, 'free_trial')} />
              </div>
              <div className="col-md-3 mb-2">
                  <label htmlFor="" className="form-label">Compass</label>
                  <input type="text" placeholder="" className="form-control" value={formData.compass} onChange={(e) => handleInputChange(e, 'compass')} />
              </div>
              <div className="col-md-4 mb-2">
                  <label htmlFor="iddInput">IDD</label>
                  <input id="iddInput" type="number" placeholder="" className="form-control" value={formData.idd} onChange={(e) => handleInputChange(e, 'idd')} />
              </div>
              <div className="col-md-4 mb-2">
                  <label htmlFor="" className="form-label">Real Exam</label>
                  <input type="number" placeholder="" className="form-control" value={formData.real_exam} onChange={(e) => handleInputChange(e, 'real_exam')} />
              </div>
              <div className="col-md-4 mb-2">
                  <label htmlFor="" className="form-label">Recently changed</label>
                  <input type="number" placeholder="" className="form-control" value={formData.recently_changed} onChange={(e) => handleInputChange(e, 'recently_changed')} />
              </div>
              <div className="col-12 panel">
                  <button className="btn btn-secondary mb-3" onClick={handleSubmit}>Add Question</button>
              </div>
          </form>
      </div>
  )
}

export default CreateQuestion