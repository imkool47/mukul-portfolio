import React, { useState, useEffect, useMemo } from 'react';

interface CodeBlockProps {
  language?: string;
  fileName?: string;
  code: string;
}

// Theme colors defined once
const themeColors = {
  dracula: {
    keyword: '#ff79c6',
    function: '#50fa7b',
    string: '#f1fa8c',
    variable: '#f8f8f2',
    comment: '#6272a4',
    default: '#f8f8f2',
  },
  monokai: {
    keyword: '#f92672',
    function: '#a6e22e',
    string: '#e6db74',
    variable: '#f8f8f2',
    comment: '#75715e',
    default: '#f8f8f2',
  },
  nord: {
    keyword: '#81a1c1',
    function: '#88c0d0',
    string: '#ebcb8b',
    variable: '#d8dee9',
    comment: '#4c566a',
    default: '#d8dee9',
  },
  catppuccin: {
    keyword: '#cba6f7',
    function: '#89b4fa',
    string: '#f9e2af',
    variable: '#cdd6f4',
    comment: '#6c7086',
    default: '#cdd6f4',
  },
  everfrost: {
    keyword: '#76e0f0',
    function: '#7ce3ac',
    string: '#ffda7c',
    variable: '#e3e8ea',
    comment: '#4c6678',
    default: '#e3e8ea',
  },
} as const;

const getThemeSyntaxColor = (theme: keyof typeof themeColors, tokenType: keyof typeof themeColors.dracula): string =>
  themeColors[theme]?.[tokenType] || themeColors[theme]?.default || '#ffffff';

const CodeBlock: React.FC<CodeBlockProps> = ({ language = 'javascript', fileName, code }) => {
  const [currentTheme, setCurrentTheme] = useState<keyof typeof themeColors>(
    (localStorage.getItem('vscode-theme') as keyof typeof themeColors) || 'dracula'
  );

  const lines = useMemo(() => code.trim().split('\n'), [code]);

  useEffect(() => {
    const handleStorageChange = () => {
      const newTheme = (localStorage.getItem('vscode-theme') as keyof typeof themeColors) || 'dracula';
      setCurrentTheme(newTheme);
    };

    window.addEventListener('storage', handleStorageChange);
    return () => window.removeEventListener('storage', handleStorageChange);
  }, []);

  const highlightCode = (line: string): string => {
    const stringColor = getThemeSyntaxColor(currentTheme, 'string');
    const keywordColor = getThemeSyntaxColor(currentTheme, 'keyword');
    const functionColor = getThemeSyntaxColor(currentTheme, 'function');
    const commentColor = getThemeSyntaxColor(currentTheme, 'comment');

    return line
      .replace(/(".*?"|'.*?'|`.*?`)/g, match => `<span style="color:${stringColor}">${match}</span>`)
      .replace(
        /\b(function|return|const|let|var|if|else|for|while|import|from|export)\b/g,
        match => `<span style="color:${keywordColor}">${match}</span>`
      )
      .replace(
        /\b([A-Za-z0-9_]+)(?=\s*\()/g,
        match => `<span style="color:${functionColor}">${match}</span>`
      )
      .replace(/(\/\/.*)/g, match => `<span style="color:${commentColor}">${match}</span>`);
  };

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
            <span dangerouslySetInnerHTML={{ __html: highlightCode(line) }} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default CodeBlock;
