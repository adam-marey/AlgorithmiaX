import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navabr';
import CodeEditor from './CodeEditor';
import PairSumPrompt from './components/prompts/PairSumPrompt';
const App = () => {
  return (
    <div>
      <Navbar />
      <PairSumPrompt />
      <Routes>
        <Route path="/" element={<h1>Home</h1>} />
        <Route path="/editor" element={<CodeEditor />} />
      </Routes>
    </div>
  );
};

export default App;
