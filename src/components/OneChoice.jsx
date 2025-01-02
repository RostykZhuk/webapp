import React, { useState } from 'react';

const OneChoice = ({ question, onAnswer, answerStatus }) => {
  const [selectedOption, setSelectedOption] = useState('');
  const [answered, setAnswered] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnswered(true);
    onAnswer(selectedOption);
  };

  return (
    <form onSubmit={handleSubmit}>
      {question.options.map((option) => (
        <div key={option.value} className="option-container">
          <input
            type="radio"
            id={option.value}
            name="answer"
            value={option.value}
            checked={selectedOption === option.value}
            onChange={(e) => setSelectedOption(e.target.value)}
            disabled={answered}
          />
          <label htmlFor={option.value}>
            <span className={answered ? answerStatus : ''}>
              {option.text}
            </span>
          </label>
        </div>
      ))}
      <button type="submit" disabled={!selectedOption || answered}>
        Submit
      </button>
    </form>
  );
};

export default OneChoice;