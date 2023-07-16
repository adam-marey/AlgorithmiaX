// src/CodeBlock.js
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';
import './CodeBlock.css';

const CodeBlock = ({ language, value }) => {
  return (
    <SyntaxHighlighter
      language={language}
      style={solarizedlight}
      className="codeblock"
    >
      {value}
    </SyntaxHighlighter>
  );
};

export default CodeBlock;
