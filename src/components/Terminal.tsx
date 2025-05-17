
import React, { useState, useEffect, useRef } from 'react';
import { Button } from '@/components/ui/button';
import { X, Maximize2, Minimize2, Terminal as TerminalIcon } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface TerminalProps {
  initialCommands?: string[];
}

type CommandOutput = {
  text: string;
  type: 'command' | 'output' | 'error' | 'success' | 'ascii-art';
};

const Terminal: React.FC<TerminalProps> = ({ initialCommands = [] }) => {
  const [history, setHistory] = useState<CommandOutput[]>([]);
  const [command, setCommand] = useState('');
  const terminalRef = useRef<HTMLDivElement>(null);
  const [isExpanded, setIsExpanded] = useState(false);
  const [showHelp, setShowHelp] = useState(false);
  
  const handleExpandToggle = () => {
    setIsExpanded(!isExpanded);
  };
  
  useEffect(() => {
    if (initialCommands.length > 0) {
      const timer = setTimeout(() => {
        const initialHistory = initialCommands.map(cmd => ({ 
          text: cmd, 
          type: cmd.startsWith('Error') ? 'error' : 'output' 
        } as CommandOutput)); // Add explicit type assertion here
        setHistory(initialHistory);
      }, 500);
      
      return () => clearTimeout(timer);
    }
  }, [initialCommands]);
  
  useEffect(() => {
    if (terminalRef.current) {
      terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
    }
  }, [history]);

  const formatDate = (date: Date): string => {
    return date.toLocaleString();
  };

  // ASCII art for figlet command
  const getFigletText = (text: string): string => {
    // Simple ASCII art generator (not a full figlet implementation)
    const figletMap: Record<string, string[]> = {
      A: [
        "  ###  ",
        " #   # ",
        "#     #",
        "#######",
        "#     #",
        "#     #",
        "#     #"
      ],
      B: [
        "###### ",
        "#     #",
        "#     #",
        "###### ",
        "#     #",
        "#     #",
        "###### "
      ],
      C: [
        " ##### ",
        "#     #",
        "#      ",
        "#      ",
        "#      ",
        "#     #",
        " ##### "
      ],
      D: [
        "###### ",
        "#     #",
        "#     #",
        "#     #",
        "#     #",
        "#     #",
        "###### "
      ],
      E: [
        "#######",
        "#      ",
        "#      ",
        "#####  ",
        "#      ",
        "#      ",
        "#######"
      ],
      F: [
        "#######",
        "#      ",
        "#      ",
        "#####  ",
        "#      ",
        "#      ",
        "#      "
      ],
      G: [
        " ##### ",
        "#     #",
        "#      ",
        "#  ####",
        "#     #",
        "#     #",
        " ##### "
      ],
      H: [
        "#     #",
        "#     #",
        "#     #",
        "#######",
        "#     #",
        "#     #",
        "#     #"
      ],
      I: [
        "###",
        " # ",
        " # ",
        " # ",
        " # ",
        " # ",
        "###"
      ],
      J: [
        "    ###",
        "     # ",
        "     # ",
        "     # ",
        "#    # ",
        "#    # ",
        " #### "
      ],
      K: [
        "#    #",
        "#   # ",
        "#  #  ",
        "###   ",
        "#  #  ",
        "#   # ",
        "#    #"
      ],
      L: [
        "#     ",
        "#     ",
        "#     ",
        "#     ",
        "#     ",
        "#     ",
        "######"
      ],
      M: [
        "#     #",
        "##   ##",
        "# # # #",
        "#  #  #",
        "#     #",
        "#     #",
        "#     #"
      ],
      N: [
        "#     #",
        "##    #",
        "# #   #",
        "#  #  #",
        "#   # #",
        "#    ##",
        "#     #"
      ],
      O: [
        " ##### ",
        "#     #",
        "#     #",
        "#     #",
        "#     #",
        "#     #",
        " ##### "
      ],
      P: [
        "###### ",
        "#     #",
        "#     #",
        "###### ",
        "#      ",
        "#      ",
        "#      "
      ],
      Q: [
        " ##### ",
        "#     #",
        "#     #",
        "#     #",
        "#   # #",
        "#    # ",
        " #### #"
      ],
      R: [
        "###### ",
        "#     #",
        "#     #",
        "###### ",
        "#   #  ",
        "#    # ",
        "#     #"
      ],
      S: [
        " ##### ",
        "#     #",
        "#      ",
        " ##### ",
        "      #",
        "#     #",
        " ##### "
      ],
      T: [
        "#######",
        "   #   ",
        "   #   ",
        "   #   ",
        "   #   ",
        "   #   ",
        "   #   "
      ],
      U: [
        "#     #",
        "#     #",
        "#     #",
        "#     #",
        "#     #",
        "#     #",
        " ##### "
      ],
      V: [
        "#     #",
        "#     #",
        "#     #",
        "#     #",
        " #   # ",
        "  # #  ",
        "   #   "
      ],
      W: [
        "#     #",
        "#     #",
        "#     #",
        "#  #  #",
        "# # # #",
        "##   ##",
        "#     #"
      ],
      X: [
        "#     #",
        " #   # ",
        "  # #  ",
        "   #   ",
        "  # #  ",
        " #   # ",
        "#     #"
      ],
      Y: [
        "#     #",
        " #   # ",
        "  # #  ",
        "   #   ",
        "   #   ",
        "   #   ",
        "   #   "
      ],
      Z: [
        "#######",
        "     # ",
        "    #  ",
        "   #   ",
        "  #    ",
        " #     ",
        "#######"
      ],
      " ": [
        "      ",
        "      ",
        "      ",
        "      ",
        "      ",
        "      ",
        "      "
      ],
      "!": [
        "  #   ",
        "  #   ",
        "  #   ",
        "  #   ",
        "  #   ",
        "      ",
        "  #   "
      ],
      ".": [
        "     ",
        "     ",
        "     ",
        "     ",
        "     ",
        "     ",
        "  #  "
      ],
      ",": [
        "     ",
        "     ",
        "     ",
        "     ",
        "     ",
        "  #  ",
        " #   "
      ]
    };

    // Default to uppercase for the simple figlet implementation
    text = text.toUpperCase();
    
    let result = [];
    // For each line in the ASCII art (height of characters)
    for (let line = 0; line < 7; line++) {
      let currentLine = '';
      // For each character in the input text
      for (let i = 0; i < text.length; i++) {
        const char = text[i];
        if (figletMap[char]) {
          currentLine += figletMap[char][line] + ' ';
        } else {
          // If character not supported, use a default
          currentLine += figletMap[" "][line] + ' ';
        }
      }
      result.push(currentLine);
    }
    
    return result.join('\n');
  };
  
  const handleCommandSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (command.trim()) {
      // Add the command to history
      setHistory([...history, { text: command, type: 'command' }]);
      
      let response: CommandOutput | CommandOutput[];
      const commandLower = command.toLowerCase();
      
      switch (true) {
        case commandLower === 'help':
          setShowHelp(true);
          response = { 
            text: 'Available commands: about, skills, projects, contact, clear, ls, echo, date, github, theme, hello, whoami, figlet', 
            type: 'output' 
          };
          break;
        case commandLower === 'about':
          response = { 
            text: 'Hi there! I am a passionate developer with a focus on frontend technologies.', 
            type: 'output' 
          };
          break;
        case commandLower === 'skills':
          response = { 
            text: 'JavaScript, TypeScript, React, Node.js, CSS, HTML', 
            type: 'output' 
          };
          break;
        case commandLower === 'projects':
          response = { 
            text: 'Run `project list` to view my projects.', 
            type: 'output' 
          };
          break;
        case commandLower === 'project list':
          response = [
            { text: 'Available Projects:', type: 'output' },
            { text: '1. E-commerce Platform', type: 'output' },
            { text: '2. Task Management App', type: 'output' },
            { text: '3. Weather Dashboard', type: 'output' },
            { text: 'Use `project info <number>` to get more details.', type: 'output' },
          ];
          break;
        case commandLower === 'project info 1':
          response = [
            { text: '=== E-commerce Platform ===', type: 'output' },
            { text: 'Description: A full-featured e-commerce platform with product catalog, shopping cart, and payment processing', type: 'output' },
            { text: 'Technologies: React, Node.js, MongoDB, Stripe', type: 'output' },
            { text: 'GitHub: https://github.com/yourusername/ecommerce', type: 'output' },
            { text: 'Demo: https://ecommerce-demo.com', type: 'output' },
          ];
          break;
        case commandLower === 'project info 2':
          response = [
            { text: '=== Task Management App ===', type: 'output' },
            { text: 'Description: A productivity application for managing tasks, projects and team collaboration', type: 'output' },
            { text: 'Technologies: Vue.js, Firebase, Tailwind CSS', type: 'output' },
            { text: 'GitHub: https://github.com/yourusername/taskmanager', type: 'output' },
            { text: 'Demo: https://task-app-demo.com', type: 'output' },
          ];
          break;
        case commandLower === 'project info 3':
          response = [
            { text: '=== Weather Dashboard ===', type: 'output' },
            { text: 'Description: A weather application showing forecasts and historical data with interactive visualizations', type: 'output' },
            { text: 'Technologies: React, D3.js, Weather API, Styled Components', type: 'output' },
            { text: 'GitHub: https://github.com/yourusername/weather-dashboard', type: 'output' },
          ];
          break;
        case commandLower === 'contact':
          response = { 
            text: 'Email: example@email.com\nLinkedIn: linkedin.com/in/yourname', 
            type: 'output' 
          };
          break;
        case commandLower === 'date':
          response = { 
            text: `Current date: ${formatDate(new Date())}`, 
            type: 'output' 
          };
          break;
        case commandLower === 'ls':
          response = { 
            text: 'about.md\nprojects.json\nskills.js\ncontact.tsx\nresume.pdf', 
            type: 'output' 
          };
          break;
        case commandLower === 'echo':
          response = { 
            text: 'Usage: echo <message>', 
            type: 'output' 
          };
          break;
        case commandLower === 'whoami':
          response = { 
            text: 'Developer [Portfolio Owner]', 
            type: 'output' 
          };
          break;
        case commandLower === 'github':
          response = { 
            text: 'Opening GitHub profile...', 
            type: 'output' 
          };
          window.open('https://github.com/yourusername', '_blank');
          break;
        case commandLower === 'theme':
          response = { 
            text: 'Available themes: dracula, monokai, nord, catppuccin, everfrost\nUsage: theme <theme-name>', 
            type: 'output' 
          };
          break;
        case commandLower === 'hello':
          response = { 
            text: 'Hello! How can I help you today?', 
            type: 'success' 
          };
          break;
        case commandLower.startsWith('figlet '):
          const figletText = command.substring(7);
          if (figletText.trim()) {
            response = { 
              text: getFigletText(figletText), 
              type: 'ascii-art' 
            };
          } else {
            response = { 
              text: 'Usage: figlet <text>', 
              type: 'error' 
            };
          }
          break;
        case commandLower === 'clear':
          setHistory([]);
          setCommand('');
          return;
        default:
          if (commandLower.startsWith('echo ')) {
            const message = command.substring(5);
            response = { 
              text: message, 
              type: 'output' 
            };
          } else if (commandLower.startsWith('theme ')) {
            const themeName = command.substring(6).toLowerCase();
            if (['dracula', 'monokai', 'nord', 'catppuccin', 'everfrost'].includes(themeName)) {
              document.body.className = `${themeName === 'dracula' ? '' : themeName + '-theme'}`;
              response = { 
                text: `Theme changed to ${themeName}`, 
                type: 'success' 
              };
            } else {
              response = { 
                text: `Unknown theme: ${themeName}. Available themes: dracula, monokai, nord, catppuccin, everfrost`, 
                type: 'error' 
              };
            }
          } else {
            response = { 
              text: `Command not found: ${command}. Type 'help' for available commands.`, 
              type: 'error' 
            };
          }
      }
      
      // Add response to history
      if (Array.isArray(response)) {
        setHistory(prev => [...prev, ...response]);
      } else {
        setHistory(prev => [...prev, response]);
      }
      
      setCommand('');
    }
  };
  
  return (
    <>
      <div className={`rounded-md border border-border overflow-hidden mb-4 transition-all duration-300 ${isExpanded ? 'fixed inset-4 z-50 bg-background' : ''}`}>
        <div className="bg-secondary p-2 text-sm border-b border-border flex items-center justify-between">
          <div className="flex items-center gap-2">
            <TerminalIcon size={16} />
            <span>Terminal</span>
            <Badge variant="outline" className="ml-2 text-xs">bash</Badge>
          </div>
          <div className="flex items-center gap-1">
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={handleExpandToggle}>
              {isExpanded ? <Minimize2 size={14} /> : <Maximize2 size={14} />}
            </Button>
            <Button variant="ghost" size="icon" className="h-6 w-6" onClick={() => setHistory([])}>
              <X size={14} />
            </Button>
          </div>
        </div>
        <div 
          ref={terminalRef} 
          className={`p-4 bg-secondary/30 font-mono text-sm overflow-y-auto ${isExpanded ? 'h-[calc(100%-40px)]' : 'h-64'}`}
        >
          {showHelp && (
            <div className="bg-secondary/50 p-4 rounded mb-4">
              <h3 className="font-bold text-primary mb-2">Available Commands:</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                <div>
                  <div><span className="text-primary">help</span> - Display this help message</div>
                  <div><span className="text-primary">about</span> - About me</div>
                  <div><span className="text-primary">skills</span> - My skills</div>
                  <div><span className="text-primary">projects</span> - My projects</div>
                  <div><span className="text-primary">project list</span> - List all projects</div>
                  <div><span className="text-primary">project info &lt;number&gt;</span> - Project details</div>
                </div>
                <div>
                  <div><span className="text-primary">contact</span> - Contact information</div>
                  <div><span className="text-primary">ls</span> - List files</div>
                  <div><span className="text-primary">date</span> - Current date and time</div>
                  <div><span className="text-primary">echo &lt;message&gt;</span> - Print message</div>
                  <div><span className="text-primary">theme &lt;theme-name&gt;</span> - Change theme</div>
                  <div><span className="text-primary">figlet &lt;text&gt;</span> - ASCII art text</div>
                  <div><span className="text-primary">clear</span> - Clear terminal</div>
                </div>
              </div>
              <Button size="sm" variant="outline" className="mt-2" onClick={() => setShowHelp(false)}>
                Close Help
              </Button>
            </div>
          )}
          {history.map((item, i) => (
            <div 
              key={i} 
              className={`${
                item.type === 'command' ? 'terminal-prompt font-bold' : 
                item.type === 'error' ? 'text-red-500' : 
                item.type === 'success' ? 'text-green-500' :
                item.type === 'ascii-art' ? 'text-primary font-mono' :
                'text-foreground opacity-90'
              } whitespace-pre-wrap`}
            >
              {item.type === 'command' ? `$ ${item.text}` : item.text}
            </div>
          ))}
          <form onSubmit={handleCommandSubmit} className="flex items-center mt-2">
            <span className="terminal-prompt font-bold">$</span>
            <input
              type="text"
              value={command}
              onChange={(e) => setCommand(e.target.value)}
              className="flex-1 bg-transparent outline-none border-none ml-2"
              autoFocus
              placeholder="Type a command..."
            />
          </form>
        </div>
      </div>

      {!showHelp && (
        <div className="text-sm text-muted-foreground mb-4">
          <span>Type </span>
          <code className="px-1 py-0.5 bg-secondary/50 rounded text-primary">help</code>
          <span> for available commands</span>
        </div>
      )}
    </>
  );
};

export default Terminal;
