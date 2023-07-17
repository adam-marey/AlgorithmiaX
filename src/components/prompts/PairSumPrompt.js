import React, { useState } from 'react';
import CodeBlock from '../CodeBlock';
import Section from '../Section';
import CodeEditor from '../../CodeEditor';
import '../Prompt.css';
import SolutionPopup from '../SolutionPopup';

const PairSumPrompt = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  const openPopup = () => {
    setPopupOpen(true);
  };

  const closePopup = () => {
    setPopupOpen(false);
  };

  const solution = `function pairSum(arr, sum) {
    const hash = {};
    
    for (let num of arr) {
      // if we've seen the complement of the number before, we know that a pair exists
      if (hash[sum - num]) {
        return true;
      // otherwise, add the number to the hash;
      } else {
        hash[num] = true;
      }
    }
    
    return false;
  }`;

  return (
    <div className="prompt">
      <div className="prompt-content">
        <h1 className="prompt-title">Pair Sum</h1>
        <Section title="Interviewer Prompt">
          Given an array of numbers and a target number (a "sum"), determine if
          any 2 numbers in the array add up to the sum. Return true if any 2
          numbers within the array add up to the sum. Return false if no 2
          numbers in the array add up to the sum.
        </Section>
        <Section title="Example Output">
          <CodeBlock
            language="javascript"
            value={`
              pairSum([5, 2, 6, 9, 3], 15);    //true
              pairSum([5, 2, 6, 9, 3], 13);    //false
              pairSum([5], 10);    //false
            `}
          />
        </Section>
        <Section title="Interviewer Guide">
          Candidates may approach this problem in a few ways. If they can reach
          a brute force solution quickly, let them! You can always work on the
          optimization afterward.
        </Section>
        <div className="solution-button-container">
          <button className="solution-button" onClick={openPopup}>
            View Solution
          </button>
        </div>
      </div>
      <div className="code-editor-wrapper">
        <h2 className="code-editor-title">Code Editor</h2>
        <CodeEditor />
      </div>
      <SolutionPopup
        isOpen={isPopupOpen}
        onClose={closePopup}
        solution={solution}
      />
    </div>
  );
};

export default PairSumPrompt;
