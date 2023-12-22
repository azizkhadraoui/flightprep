import React, { useState, useEffect } from 'react';

const ExplanationComponent = ({ questions, currentQuestion }) => {
  const [explanationContent, setExplanationContent] = useState('');
  const currentQuestionData = questions[currentQuestion];

  useEffect(() => {
    if (currentQuestionData && currentQuestionData.exp) {
      const explanation = currentQuestionData.exp;
      console.log(explanation);
      setExplanationContent(explanation);
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
