import React from 'react';

const QuizButton = ({ onClick }) => {
  return (
    <button className="btn" id="open-quiz" onClick={onClick}>
      QUIZ
    </button>
  );
};

export default QuizButton;
