import React, { useState, useEffect } from 'react';
import Question from './Question';
import quizData from '../data/quizData.json';
import '../styles/QuizEngine.scss';
import QuizEndScreen from './QuizEndScreen';
import BackgroundSelector from './BackgroundSelector';

const backgrounds = [
  '/assets/back.webp',
  '/assets/back2.jpg',
  '/assets/back3.jpg'
];

const QuizEngine = () => {
  const [currentQuestion, setCurrentQuestion] = useState(null);
  const [quizEnded, setQuizEnded] = useState(false);
  const [progress, setProgress] = useState(0);
  const [direction, setDirection] = useState('next');
  const [answerStatus, setAnswerStatus] = useState(null);
  const [progressColor, setProgressColor] = useState('rgba(76, 175, 80, 0.3)');
  const [correctAnswers, setCorrectAnswers] = useState(0);
  const [topicStats, setTopicStats] = useState({});
  const [currentBackground, setCurrentBackground] = useState(backgrounds[0]);
  const [answeredQuestions, setAnsweredQuestions] = useState(0);

  const handleTopicChange = (newQuestion) => {
    setCurrentQuestion(newQuestion);
  };

  useEffect(() => {
    setCurrentQuestion(quizData.questions[0]);
    updateBackground(backgrounds[0]);
    updateProgress(0);
  }, []);

  const updateBackground = (backgroundUrl) => {
    document.querySelector('.App').style.backgroundImage = `url(${backgroundUrl})`;
    setCurrentBackground(backgroundUrl);
  };

  const updateProgress = (index) => {
    const progressPercentage = ((index + 1) / quizData.questions.length) * 100;
    setProgress(progressPercentage);
    
    const opacity = 0.3 + (0.7 * progressPercentage / 100);
    setProgressColor(`rgba(76, 175, 80, ${opacity})`);
  };

  const handleAnswer = (answer) => {
    const currentIndex = quizData.questions.findIndex(q => q.id === currentQuestion.id);
    let isCorrect;
  
    if (Array.isArray(currentQuestion.correctAnswer)) {
      isCorrect = currentQuestion.correctAnswer.length === answer.length &&
        currentQuestion.correctAnswer.every(value => answer.includes(value));
    } else {
      isCorrect = currentQuestion.correctAnswer === answer;
    }
  
    if (isCorrect) {
      setCorrectAnswers(prev => prev + 1);
      setTopicStats(prev => ({
        ...prev,
        [currentQuestion.topic]: (prev[currentQuestion.topic] || 0) + 1
      }));
    }

    setAnsweredQuestions(prev => prev + 1);

    setAnswerStatus(isCorrect ? 'correct' : 'incorrect');

    setTimeout(() => {
      setAnswerStatus(null);
      const nextQuestionId = typeof currentQuestion.nextQuestion === 'object'
        ? currentQuestion.nextQuestion[answer] || currentQuestion.nextQuestion.default
        : currentQuestion.nextQuestion;

      if (nextQuestionId === 'end') {
        setQuizEnded(true);
      } else {
        const nextQuestion = quizData.questions.find(q => q.id === nextQuestionId);
        const nextIndex = quizData.questions.findIndex(q => q.id === nextQuestionId);
        setDirection(nextIndex > currentIndex ? 'next' : 'prev');
        setCurrentQuestion(nextQuestion);
        updateProgress(nextIndex);
        
        // Update background based on question number
        const nextBackgroundIndex = nextIndex % backgrounds.length;
        updateBackground(backgrounds[nextBackgroundIndex]);
      }
    }, 1000);
  };

  if (quizEnded) {
    return (
      <QuizEndScreen 
        correctAnswers={correctAnswers} 
        totalQuestions={answeredQuestions}
        topicStats={topicStats}
      />
    );
  }

  return (
    <div className="quiz-engine">
      <BackgroundSelector 
        backgrounds={backgrounds}
        currentBackground={currentBackground}
        onSelectBackground={updateBackground}
      />
      <div className="progress-bar">
        <div 
          className="progress" 
          style={{ 
            width: `${progress}%`,
            backgroundColor: progressColor
          }}
        ></div>
      </div>
      {currentQuestion && (
        <Question
          key={currentQuestion.id}
          question={currentQuestion}
          onAnswer={handleAnswer}
          direction={direction}
          answerStatus={answerStatus}
          onTopicChange={handleTopicChange}
        />
      )}
    </div>
  );
};

export default QuizEngine;