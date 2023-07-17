import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Navbar from './components/Navabr';
import CodeEditor from './CodeEditor';
import PairSumPrompt from './components/prompts/PairSumPrompt';
import Footer from './components/Footer';
const App = () => {
  return (
    <div>
      <Navbar />
      <PairSumPrompt />
      <Routes>
        <Route path="/editor" element={<CodeEditor />} />
      </Routes>
      <Footer />
    </div>
  );
};

export default App;
