import React, { useState, useEffect } from 'react';
import OneChoice from './OneChoice';
import MultipleChoice from './MultipleChoice';
import InputQuestion from './InputQuestion';
import '../styles/Question.scss';
import quizData from '../data/quizData.json';
import '../styles/Question.scss';

const Question = ({ question, onAnswer, direction, answerStatus, onTopicChange }) => {
  const [showHint, setShowHint] = useState(false);
  const [timeLeft, setTimeLeft] = useState(30);
  const [showAutoHint, setShowAutoHint] = useState(false);
  const [autoHintShown, setAutoHintShown] = useState(false);
  const [availableTopics, setAvailableTopics] = useState([]);
  
  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          onAnswer(null); 
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);

    const autoHintTimer = setTimeout(() => {
      setShowAutoHint(true);
      setAutoHintShown(true);
    }, 10000);

    const hideAutoHintTimer = setTimeout(() => {
      setShowAutoHint(false);
    }, 12000);

    // Find available topics for the current difficulty
    const topicsForDifficulty = quizData.questions.filter(
      q => q.difficulty === question.difficulty && q.topic !== question.topic
    ).map(q => q.topic);
    setAvailableTopics([question.topic, ...topicsForDifficulty]);

    return () => {
      clearInterval(timer);
      clearTimeout(autoHintTimer);
      clearTimeout(hideAutoHintTimer);
    };
  }, [question, onAnswer]);

  const renderQuestionContent = () => {
    switch (question.type) {
      case 'one-choice':
        return <OneChoice question={question} onAnswer={onAnswer} answerStatus={answerStatus} />;
      case 'multiple-choice':
        return <MultipleChoice question={question} onAnswer={onAnswer} answerStatus={answerStatus} />;
      case 'input':
        return <InputQuestion question={question} onAnswer={onAnswer} answerStatus={answerStatus} />;
      default:
        return null;
    }
  };

  const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
      case 'easy':
        return '#4caf50';
      case 'medium':
        return '#ffc107';
      case 'hard':
        return '#f44336';
      default:
        return '#000000';
    }
  };

  const difficultyColor = getDifficultyColor(question.difficulty);

  useEffect(() => {
    // Apply background color to dropdown options
    const style = document.createElement('style');
    style.innerHTML = `
      .topic-dropdown option {
        background-color: ${difficultyColor};
      }
    `;
    document.head.appendChild(style);

    return () => {
      document.head.removeChild(style);
    };
  }, [difficultyColor]);

  const getTimerStyle = () => {
    if (timeLeft <= 10) {
      return {
        fontWeight: 800,
        color: 'red'
      };
    }
    return {};
  };

  const handleTopicChange = (e) => {
    const newTopic = e.target.value;
    const newQuestion = quizData.questions.find(q => q.difficulty === question.difficulty && q.topic === newTopic);
    if (newQuestion) {
      onTopicChange(newQuestion);
    }
  };

  return (
    <div className={`question ${direction}`}>
      <div 
        className="topic-indicator" 
        style={{ backgroundColor: difficultyColor }}
      >
        <select 
          value={question.topic} 
          onChange={handleTopicChange}
          className="topic-dropdown"
          style={{ backgroundColor: difficultyColor }}
        >
          {availableTopics.map(topic => (
            <option key={topic} value={topic}>{topic}</option>
          ))}
        </select>
      </div>
      {question.image && (
        <img src={question.image} alt="Question" className="question-image" />
      )}
      <div className="timer" style={getTimerStyle()}>Time left: {timeLeft} seconds</div>
      <h1 className="difficulty-title">
        How difficult is this question: 
        <span style={{ color: getDifficultyColor(question.difficulty) }}>
          {' ' + question.difficulty.charAt(0).toUpperCase() + question.difficulty.slice(1)}
        </span>
      </h1>
      <div className="difficulty-indicator">
        <div className="difficulty-section easy"></div>
        <div className="difficulty-section medium"></div>
        <div className="difficulty-section hard"></div>
        <div className={`difficulty-marker ${question.difficulty}`}></div>
      </div>
      <h2 className="question-title">{question.title}</h2>
      <p className="question-description">{question.description}</p>
      <h3 className="question-text">{question.question}</h3>
      {renderQuestionContent()}
      <div className="hint-container">
        <button 
          className="hint-button" 
          onMouseEnter={() => !showAutoHint && setShowHint(true)}
          onMouseLeave={() => !showAutoHint && setShowHint(false)}
        >
          Hint
        </button>
        {(showHint || showAutoHint) && (
          <div className="hint-text">
            {showAutoHint ? "Maybe help?" : question.hint}
          </div>
        )}
      </div>
    </div>
  );
};

export default Question;