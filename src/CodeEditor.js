import React, { useState, useEffect, useRef } from 'react';
import CodeMirror from 'codemirror';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/theme/dracula.css';
import 'codemirror/theme/ambiance.css';
import 'codemirror/theme/icecoder.css';
import 'codemirror/theme/material-darker.css';
import 'codemirror/theme/material-ocean.css';

import 'codemirror/mode/javascript/javascript';
import { toast, Toaster } from 'react-hot-toast';

const CodeEditor = () => {
  const [code, setCode] = useState(localStorage.getItem('code') || '');
  const [output, setOutput] = useState('');
  const [theme, setTheme] = useState('material');
  const codeMirrorRef = useRef(null);
  const workerRef = useRef(null);
  const timeoutRef = useRef(null);

  useEffect(
    () => {
      const codeMirrorInstance = CodeMirror.fromTextArea(
        codeMirrorRef.current,
        {
          value: code,
          mode: 'javascript',
          theme: theme,
          lineNumbers: true
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
            }
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
        clearTimeout(timeoutRef.current);
        if (event.data.error) {
          setOutput(
            prevOutput => prevOutput + '❌ Error: ' + event.data.error + '\n'
          );
        } else {
          setOutput(
            prevOutput => prevOutput + '➡️ ' + event.data.result + '\n'
          );
        }
      };

      workerRef.current.onerror = function(error) {
        clearTimeout(timeoutRef.current);
        setOutput(
          prevOutput => prevOutput + '❌ Error: ' + error.message + '\n'
        );
      };

      return () => {
        clearTimeout(timeoutRef.current);
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
    timeoutRef.current = setTimeout(() => {
      workerRef.current.terminate();
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
            }
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
      toast.error('Your code caused an infinite loop, Please reload! ');
    }, 3000);
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
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100vh',
        backgroundColor: '#f8f8f8',
        padding: '20px'
      }}
    >
      <Toaster />
      <h1 style={{ marginBottom: '20px' }}>Practice Window</h1>
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          width: '900px',
          backgroundColor: '#fff',
          borderRadius: '5px',
          padding: '20px',
          boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)'
        }}
      >
        <div style={{ marginBottom: '10px' }}>
          <label htmlFor="theme-select" style={{ marginRight: '10px' }}>
            Select Theme:
          </label>
          <select
            id="theme-select"
            value={theme}
            onChange={handleThemeChange}
            style={{
              padding: '5px',
              borderRadius: '5px',
              border: '1px solid #ccc'
            }}
          >
            <option value="material">Material</option>
            <option value="monokai">Monokai</option>
            <option value="eclipse">Eclipse</option>
            <option value="dracula">Dracula</option>
            <option value="material-darker">Material Darker</option>
            <option value="material-palenight">Material Palenight</option>
            <option value="material-ocean">Material Ocean</option>
            <option value="icecoder">Icecoder</option>
            <option value="ambiance">Ambiance</option>
          </select>
        </div>
        <h2 style={{ marginBottom: '10px' }}>Code Input</h2>
        <textarea
          ref={codeMirrorRef}
          style={{ display: 'none' }}
          value={code}
          onChange={() => {}}
        />
        <button
          onClick={handleRunCode}
          style={{
            width: '100%',
            marginTop: '10px',
            padding: '10px',
            backgroundColor: '#4caf50',
            color: '#fff',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '5px',
            cursor: 'pointer'
          }}
        >
          Run Code
        </button>
      </div>
      {output &&
        <div
          style={{
            width: '600px',
            marginTop: '20px',
            backgroundColor: '#fff',
            borderRadius: '5px',
            padding: '20px',
            boxShadow: '0 2px 6px rgba(0, 0, 0, 0.3)'
          }}
        >
          <h2 style={{ marginBottom: '10px' }}>Output</h2>
          <pre style={{ whiteSpace: 'pre-wrap' }}>
            {output}
          </pre>
        </div>}
    </div>
  );
};

export default CodeEditor;
