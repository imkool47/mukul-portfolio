import React, { useState, useEffect, useRef } from 'react';

interface TerminalProps {
  initialCommands?: string[];
}

const Terminal: React.FC<TerminalProps> = ({ initialCommands = [] }) => {
  const [history, setHistory] = useState<string[]>([]);
  const [command, setCommand] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (initialCommands.length > 0) {
      const timer = setTimeout(() => {
        setHistory(initialCommands);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [initialCommands]);
  
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);
  
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      let response = '';
      
      switch (command.toLowerCase()) {
        case 'help':
          response = 'Available commands: about, skills, projects, contact, clear';
          break;
        case 'about':
          response = 'Hi there! I am a passionate developer with a focus on frontend technologies.';
          break;
        case 'skills':
          response = 'JavaScript, TypeScript, React, Node.js, AWS, DevOps';
          break;
        case 'projects':
          response = 'Run `project list` to view my projects.';
          break;
        case 'project list':
          response = '1. Portfolio Website\n2. E-commerce Site\n3. Weather Application';
          break;
        case 'contact':
          response = 'Email: mukul.kumar630@gmail.com\nLinkedIn: linkedin.com/in/mukul47';
          break;
        case 'clear':
          setHistory([]);
          setCommand('');
          return;
        default:
          response = `Command not found: ${command}. Type 'help' for available commands.`;
      }
      
      setHistory([...history, `$ ${command}`, response]);
      setCommand('');
    }
  };
  
  return (
    <div className="rounded-md border border-border overflow-hidden mb-4">
      <div className="bg-secondary p-2 text-sm border-b border-border flex items-center justify-between">
        <span>Terminal</span>
        <span className="text-xs text-muted-foreground">bash</span>
      </div>
      <div 
        ref={terminalRef} 
        className="p-4 bg-secondary/30 font-mono text-sm h-64 overflow-y-auto"
      >
        {history.map((line, i) => (
          <div key={i} className={line.startsWith('$') ? 'terminal-prompt' : 'mt-1 mb-2'}>
            {line.startsWith('$') ? line.substring(2) : line}
          </div>
        ))}
        <form onSubmit={handleCommandSubmit} className="flex items-center mt-2">
          <span className="terminal-prompt"></span>
          <input
            type="text"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
            className="flex-1 bg-transparent outline-none border-none"
            autoFocus
          />
        </form>
      </div>
    </div>
  );
};

export default Terminal;