import React, { useState } from 'react';

const MultipleChoice = ({ question, onAnswer, answerStatus }) => {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [answered, setAnswered] = useState(false);

  const handleOptionChange = (value) => {
    if (!answered) {
      setSelectedOptions((prev) =>
        prev.includes(value)
          ? prev.filter((option) => option !== value)
          : [...prev, value]
      );
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAnswered(true);
    onAnswer(selectedOptions);
  };

  return (
    <form onSubmit={handleSubmit}>
      {question.options.map((option) => (
        <div key={option.value} className="option-container">
          <input
            type="checkbox"
            id={option.value}
            name="answer"
            value={option.value}
            checked={selectedOptions.includes(option.value)}
            onChange={() => handleOptionChange(option.value)}
            disabled={answered}
          />
          <label htmlFor={option.value}>
            <span className={answered ? answerStatus : ''}>
              {option.text}
            </span>
          </label>
        </div>
      ))}
      <button type="submit" disabled={selectedOptions.length === 0 || answered}>
        Submit
      </button>
    </form>
  );
};

export default MultipleChoice;