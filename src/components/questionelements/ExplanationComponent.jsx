import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ExplanationComponent = ({ questions, currentQuestion }) => {
  const [explanationContent, setExplanationContent] = useState('');
  const currentQuestionData = questions[currentQuestion];

  useEffect(() => {
    if (currentQuestionData && currentQuestionData.explanation) {
      // Fetch the explanation from your API or another source
      const fetchExplanation = async () => {
        try {
          const response = await axios.get(`http://localhost:8800/explanations/${currentQuestionData.id}`);
          const explanation = response.data.explanation;
          setExplanationContent(explanation);
        } catch (error) {
          console.error('Error fetching explanation:', error);
          setExplanationContent('Explanation not found');
        }
      };

      fetchExplanation();
    } else {
      setExplanationContent('Explanation not available for this question.');
    }
  }, [currentQuestion, questions]);

  return (
    <div>
      <p>{explanationContent || 'Loading explanation...'}</p>
    </div>
  );
};

export default ExplanationComponent;
