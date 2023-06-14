import React from 'react';
import { Controlled as CodeMirror } from 'react-codemirror2';
import 'codemirror/lib/codemirror.css';
import 'codemirror/theme/material.css';
import 'codemirror/mode/javascript/javascript';

const Editor = ({ value, onChange }) => {
  return (
    <CodeMirror
      value={value}
      options={{
        mode: 'javascript',
        theme: 'material',
        lineNumbers: true
      }}
      onBeforeChange={(editor, data, value) => {
        onChange(value);
      }}
    />
  );
};

export default Editor;
