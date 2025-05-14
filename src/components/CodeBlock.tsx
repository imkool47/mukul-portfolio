import React, { useState, useEffect } from 'react';

interface CodeBlockProps {
  language?: string;
  fileName?: string;
  code: string;
}

const CodeBlock: React.FC<CodeBlockProps> = ({ 
  language = 'javascript', 
  fileName, 
  code 
}) => {
  const [lines, setLines] = useState<string[]>([]);
  
  useEffect(() => {
    setLines(code.trim().split('\n'));
  }, [code]);
  
  return (
    <div className="rounded-md border border-border overflow-hidden mb-4">
      {fileName && (
        <div className="bg-secondary p-2 text-sm border-b border-border">
          {fileName}
        </div>
      )}
      <div className="p-4 bg-secondary/30 overflow-x-auto font-mono text-sm">
        {lines.map((line, i) => (
          <div key={i} className="code-line">
            <span className="code-line-number">{i + 1}</span>
            <span>{line}</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeBlock;