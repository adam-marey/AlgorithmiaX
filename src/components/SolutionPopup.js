import React from 'react';
import './SolutionPopup.css';
import CodeBlock from './CodeBlock';

const SolutionPopup = ({ isOpen, onClose, solution }) => {
  if (!isOpen) {
    return null;
  }

  return (
    <div className="solution-popup-overlay">
      <div className="solution-popup">
        <button className="close-button" onClick={onClose}>
          Close
        </button>
        <h2 className="solution-title">Solution and Explanation</h2>
        <div className="solution-content">
          <CodeBlock language="javascript" value={solution} />
        </div>
      </div>
    </div>
  );
};

export default SolutionPopup;
