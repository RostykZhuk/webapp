import React, { useState } from 'react';

const InputQuestion = ({ question, onAnswer, answerStatus }) => {
  const [answer, setAnswer] = useState('');
  const [answered, setAnswered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnswered(true);
    onAnswer(answer);
  };

  return (
    <form onSubmit={handleSubmit}>
      <div className="input-container">
        <input
          type="text"
          value={answer}
          onChange={(e) => setAnswer(e.target.value)}
          placeholder="Enter your answer"
          disabled={answered}
          className={answered ? answerStatus : ''}
        />
      </div>
      <button type="submit" disabled={!answer || answered}>
        Submit
      </button>
    </form>
  );
};

export default InputQuestion;