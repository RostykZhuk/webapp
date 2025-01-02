import React from 'react';
import '../styles/BackgroundSelector.scss';

const BackgroundSelector = ({ backgrounds, currentBackground, onSelectBackground }) => {
  return (
    <div className="background-selector">
      {backgrounds.map((bg, index) => (
        <button
          key={index}
          className={`background-option ${bg === currentBackground ? 'active' : ''}`}
          style={{ backgroundImage: `url(${bg})` }}
          onClick={() => onSelectBackground(bg)}
        />
      ))}
    </div>
  );
};

export default BackgroundSelector;