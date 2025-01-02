import React, { useState } from 'react';

const QuizEndScreen = ({ correctAnswers, totalQuestions, topicStats }) => {
  const [feedback, setFeedback] = useState(null);

  const handleFeedback = (liked) => {
    setFeedback(liked ? "We are happy!" : "Sorry to hear it.");
  };

  return (
    <div className="quiz-end-screen">
      <h2>Quiz Completed!</h2>
      <p>You got {correctAnswers} out of {totalQuestions} questions correct.</p>
      <p>Percentage: {((correctAnswers / totalQuestions) * 100).toFixed(2)}%</p>
      
      <h3>Topic Statistics:</h3>
      {Object.entries(topicStats).map(([topic, correct]) => (
        <p key={topic}>{topic}: {correct} correct</p>
      ))}
      
      <div className="feedback-buttons">
        <button onClick={() => handleFeedback(true)}>👍</button>
        <button onClick={() => handleFeedback(false)}>👎</button>
      </div>
      
      {feedback && (
        <div className="feedback-modal">
          <p>{feedback}</p>
        </div>
      )}
    </div>
  );
};

export default QuizEndScreen;