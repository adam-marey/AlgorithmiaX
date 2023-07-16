import React, { useState, useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';
import 'codemirror/addon/hint/show-hint';
import 'codemirror/addon/hint/javascript-hint';
import 'codemirror/addon/hint/css-hint';
import 'codemirror/addon/hint/html-hint';
import 'codemirror/addon/hint/xml-hint';
import 'codemirror/addon/hint/sql-hint';
import 'codemirror/addon/hint/anyword-hint';
import 'codemirror/addon/hint/show-hint.css';
import { toast, Toaster } from 'react-hot-toast';
import './CodeEditor.css';

const CodeEditor = () => {
  const [code, setCode] = useState(localStorage.getItem('code') || '');
  const [output, setOutput] = useState('');
  const [theme, setTheme] = useState('material');
  const codeMirrorRef = useRef(null);
  const workerRef = useRef(null);

  useEffect(
    () => {
      const codeMirrorInstance = CodeMirror.fromTextArea(
        codeMirrorRef.current,
        {
          value: code,
          mode: 'javascript',
          theme: theme,
          lineNumbers: true,
          extraKeys: { 'Ctrl-Space': 'autocomplete' },
          hintOptions: { completeSingle: false }
        }
      );

      codeMirrorInstance.on('change', instance => {
        const newValue = instance.getValue();
        setCode(newValue);
        localStorage.setItem('code', newValue);
      });

      codeMirrorInstance.getWrapperElement().style.fontSize = '16px';
      codeMirrorInstance.getWrapperElement().style.lineHeight = '1.5';

      workerRef.current = new Worker(
        URL.createObjectURL(
          new Blob(
            [
              `
          self.onmessage = function(event) {
            let result;
            const console = {
              log(value) {
                self.postMessage({ result: value });
              },
              error(value) {
                self.postMessage({ error: value });
              },
            };
            try {
              eval(event.data);
            } catch (error) {
              self.postMessage({ error: error.message });
            }
          };
        `
            ],
            { type: 'text/javascript' }
          )
        )
      );

      workerRef.current.onmessage = function(event) {
        const { result, error } = event.data;
        if (error) {
          setOutput(prevOutput => prevOutput + '❌ Error: ' + error + '\n');
        } else {
          setOutput(prevOutput => prevOutput + '➡️ ' + result + '\n');
        }
      };

      workerRef.current.onerror = function(error) {
        setOutput(
          prevOutput => prevOutput + '❌ Error: ' + error.message + '\n'
        );
      };

      return () => {
        codeMirrorInstance.off('change');
        codeMirrorInstance.toTextArea();
        workerRef.current.terminate();
      };
    },
    [theme]
  );

  const handleRunCode = () => {
    setOutput(''); // Clear the output before running the code
    workerRef.current.postMessage(code);
  };

  const handleThemeChange = event => {
    const selectedTheme = event.target.value;
    setTheme(selectedTheme);
    codeMirrorRef.current.classList.remove(
      'cm-s-material',
      'cm-s-monokai',
      'cm-s-eclipse'
    );
    codeMirrorRef.current.classList.add(`cm-s-${selectedTheme}`);
  };

  return (
    <div className="code-editor-container">
      <Toaster />
      <div className="code-editor-controls">
        <label htmlFor="theme-select">Select Theme:</label>
        <select id="theme-select" value={theme} onChange={handleThemeChange}>
          <option value="material">Material</option>
          <option value="monokai">Monokai</option>
          <option value="eclipse">Eclipse</option>
        </select>
        <button className="run-button" onClick={handleRunCode}>
          Run Code
        </button>
      </div>
      <div className="code-editor-wrapper">
        <textarea ref={codeMirrorRef} value={code} onChange={() => {}} />
      </div>
      {output &&
        <div className="code-editor-output">
          <h2>Output</h2>
          <pre>
            {output}
          </pre>
        </div>}
    </div>
  );
};

export default CodeEditor;
