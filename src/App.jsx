import React from 'react';
import QuizEngine from './components/QuizEngine';
import '../src/App.scss';

function App() {
  return (
    <div className="App">
      <div className="quiz-container">
        <QuizEngine />
      </div>
    </div>
  );
}

export default App;