
import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Save, RefreshCw, Settings, Palette } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useLocation } from 'react-router-dom';

const SettingsSection: React.FC = () => {
  const { toast } = useToast();
  const location = useLocation();
  const [activeTab, setActiveTab] = useState('appearance');
  
  const [theme, setTheme] = useState('dracula');
  const [fontSize, setFontSize] = useState(14);
  const [fontFamily, setFontFamily] = useState('monospace');
  const [syntaxHighlighting, setSyntaxHighlighting] = useState(true);
  
  // Parse URL for section parameter
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get('section');
    
    if (section) {
      if (section === 'appearance') {
        setActiveTab('appearance');
      }
    }
  }, [location.search]);

  useEffect(() => {
    // Load the current theme from body class or localStorage
    const savedTheme = localStorage.getItem('vscode-theme') || 'dracula';
    setTheme(savedTheme);
    
    // Load font settings
    const savedFont = localStorage.getItem('editor-font') || 'monospace';
    setFontFamily(savedFont);
    document.documentElement.style.setProperty('--editor-font', savedFont);
  }, []);

  // Apply font changes when font family changes
  useEffect(() => {
    document.documentElement.style.setProperty('--editor-font', fontFamily);
    document.body.style.fontFamily = `var(--editor-font), system-ui, sans-serif`;
    localStorage.setItem('editor-font', fontFamily);
  }, [fontFamily]);
  
  const handleSaveSettings = () => {
    // Apply the selected theme to body
    document.body.classList.remove('nord-theme', 'monokai-theme', 'catppuccin-theme', 'everfrost-theme');
    if (theme !== 'dracula') {
      document.body.classList.add(`${theme}-theme`);
    }
    
    localStorage.setItem('vscode-theme', theme);
    localStorage.setItem('editor-font', fontFamily);
    
    // Apply font to entire application
    document.body.style.fontFamily = `${fontFamily}, system-ui, sans-serif`;
    
    toast({
      title: "Settings saved",
      description: "Your preferences have been updated.",
    });
  };
  
  const handleResetSettings = () => {
    setTheme('dracula');
    setFontSize(14);
    setFontFamily('monospace');
    setSyntaxHighlighting(true);
    
    document.body.classList.remove('nord-theme', 'monokai-theme', 'catppuccin-theme', 'everfrost-theme');
    document.body.style.fontFamily = 'monospace, system-ui, sans-serif';
    document.documentElement.style.setProperty('--editor-font', 'monospace');
    
    localStorage.setItem('vscode-theme', 'dracula');
    localStorage.setItem('editor-font', 'monospace');
    
    toast({
      title: "Settings reset",
      description: "All settings have been reset to their default values.",
    });
  };

  // Get theme colors for the color preview
  const getThemeColors = (selectedTheme: string) => {
    switch(selectedTheme) {
      case 'dracula':
        return [
          { name: 'Background', color: '#282a36' },
          { name: 'Foreground', color: '#f8f8f2' },
          { name: 'Selection', color: '#44475a' },
          { name: 'Comment', color: '#6272a4' },
          { name: 'Purple', color: '#bd93f9' },
          { name: 'Pink', color: '#ff79c6' },
          { name: 'Green', color: '#50fa7b' },
          { name: 'Cyan', color: '#8be9fd' }
        ];
      case 'monokai':
        return [
          { name: 'Background', color: '#272822' },
          { name: 'Foreground', color: '#f8f8f2' },
          { name: 'Selection', color: '#49483e' },
          { name: 'Comment', color: '#75715e' },
          { name: 'Red', color: '#f92672' },
          { name: 'Orange', color: '#fd971f' },
          { name: 'Yellow', color: '#e6db74' },
          { name: 'Blue', color: '#66d9ef' }
        ];
      case 'nord':
        return [
          { name: 'Background', color: '#2e3440' },
          { name: 'Foreground', color: '#d8dee9' },
          { name: 'Selection', color: '#434c5e' },
          { name: 'Comment', color: '#4c566a' },
          { name: 'Cyan', color: '#88c0d0' },
          { name: 'Blue', color: '#81a1c1' },
          { name: 'Purple', color: '#b48ead' },
          { name: 'Green', color: '#a3be8c' }
        ];
      case 'catppuccin':
        return [
          { name: 'Background', color: '#1e1e2e' },
          { name: 'Foreground', color: '#cdd6f4' },
          { name: 'Selection', color: '#313244' },
          { name: 'Comment', color: '#6c7086' },
          { name: 'Red', color: '#f38ba8' },
          { name: 'Green', color: '#a6e3a1' },
          { name: 'Yellow', color: '#f9e2af' },
          { name: 'Purple', color: '#cba6f7' }
        ];
      case 'everfrost':
        return [
          { name: 'Background', color: '#0f1c23' },
          { name: 'Foreground', color: '#e3e8ea' },
          { name: 'Selection', color: '#1a2e3a' },
          { name: 'Comment', color: '#4c6678' },
          { name: 'Cyan', color: '#76e0f0' },
          { name: 'Green', color: '#7ce3ac' },
          { name: 'Yellow', color: '#ffda7c' },
          { name: 'Purple', color: '#c2a2fe' }
        ];
      default:
        return [];
    }
  };

  // Function to get theme-specific syntax highlighting colors
  const getThemeSyntaxColor = (themeType: string, tokenType: string): string => {
    const themeColors = {
      dracula: {
        keyword: '#ff79c6',
        function: '#50fa7b',
        string: '#f1fa8c',
        variable: '#f8f8f2',
        comment: '#6272a4'
      },
      monokai: {
        keyword: '#f92672',
        function: '#a6e22e',
        string: '#e6db74',
        variable: '#f8f8f2',
        comment: '#75715e'
      },
      nord: {
        keyword: '#81a1c1',
        function: '#88c0d0',
        string: '#ebcb8b',
        variable: '#d8dee9',
        comment: '#4c566a'
      },
      catppuccin: {
        keyword: '#cba6f7',
        function: '#89b4fa',
        string: '#f9e2af',
        variable: '#cdd6f4',
        comment: '#6c7086'
      },
      everfrost: {
        keyword: '#76e0f0',
        function: '#7ce3ac',
        string: '#ffda7c',
        variable: '#e3e8ea',
        comment: '#4c6678'
      }
    };
    
    return themeColors[themeType as keyof typeof themeColors]?.[tokenType as keyof typeof themeColors.dracula] || '#ffffff';
  };
  
  return (
    <div className="animate-fade-in">
      <div className="flex items-center mb-4">
        <Settings className="mr-2 h-5 w-5 text-primary" />
        <h2 className="text-2xl font-bold">Settings</h2>
      </div>
      
      <p className="mb-6 text-muted-foreground">
        Customize your IDE experience by adjusting these settings.
      </p>
      
      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger value="appearance" className="flex items-center gap-1">
            <Palette className="h-4 w-4" />
            <span>Appearance</span>
          </TabsTrigger>
        </TabsList>
        
        <TabsContent value="appearance">
          <div className="grid gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Appearance</CardTitle>
                <CardDescription>
                  Customize the look and feel of your IDE
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="theme" className="text-base font-medium">Color Theme</Label>
                  <Select value={theme} onValueChange={setTheme}>
                    <SelectTrigger id="theme">
                      <SelectValue placeholder="Select theme" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="dracula">Dracula</SelectItem>
                      <SelectItem value="monokai">Monokai</SelectItem>
                      <SelectItem value="nord">Nord</SelectItem>
                      <SelectItem value="catppuccin">Catppuccin</SelectItem>
                      <SelectItem value="everfrost">Everfrost</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {/* Theme color preview */}
                  <div className="mt-3 p-3 border rounded-md">
                    <Label className="mb-2 block text-base font-medium">Theme Colors:</Label>
                    <div className="grid grid-cols-4 gap-2">
                      {getThemeColors(theme).map((color) => (
                        <div key={color.name} className="flex flex-col items-center">
                          <div 
                            className="w-8 h-8 rounded-full mb-1"
                            style={{backgroundColor: color.color}}
                          ></div>
                          <span className="text-xs text-center">{color.name}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
                
                <div className="space-y-1.5">
                  <Label htmlFor="font-size" className="text-base font-medium">Font Size: {fontSize}px</Label>
                  <Slider
                    id="font-size"
                    min={10}
                    max={24}
                    step={1}
                    value={[fontSize]}
                    onValueChange={(value) => setFontSize(value[0])}
                  />
                </div>
                
                <div className="flex flex-col space-y-1.5">
                  <Label htmlFor="editor-font" className="text-base font-medium">Editor Font</Label>
                  <Select value={fontFamily} onValueChange={setFontFamily}>
                    <SelectTrigger id="editor-font">
                      <SelectValue placeholder="Select font" />
                    </SelectTrigger>
                    <SelectContent position="popper">
                      <SelectItem value="monospace">Monospace</SelectItem>
                      <SelectItem value="'Consolas', monospace">Consolas</SelectItem>
                      <SelectItem value="'Fira Code', monospace">Fira Code</SelectItem>
                      <SelectItem value="'JetBrains Mono', monospace">JetBrains Mono</SelectItem>
                      <SelectItem value="'Source Code Pro', monospace">Source Code Pro</SelectItem>
                      <SelectItem value="'Roboto Mono', monospace">Roboto Mono</SelectItem>
                      <SelectItem value="'Ubuntu Mono', monospace">Ubuntu Mono</SelectItem>
                    </SelectContent>
                  </Select>
                  
                  {/* Font preview */}
                  <div className="mt-2 p-3 border rounded-md">
                    <p style={{ fontFamily: fontFamily }}>
                      Preview: The quick brown fox jumps over the lazy dog.
                    </p>
                  </div>
                </div>
                
                <div id="syntax-highlighting" className="flex flex-col space-y-1.5 pt-6 border-t">
                  <Label className="text-base font-medium">Syntax Highlighting Preview</Label>
                  <div className="p-4 bg-secondary/30 rounded-md border overflow-x-auto">
                    <pre className="text-sm" style={{ fontFamily: fontFamily }}>
                      <code>
                        <span style={{ color: getThemeSyntaxColor(theme, 'keyword') }}>
                          function
                        </span> <span style={{ color: getThemeSyntaxColor(theme, 'function') }}>
                          hello
                        </span>(<span style={{ color: getThemeSyntaxColor(theme, 'variable') }}>name</span>) {'{'}
                          <br />
                          &nbsp;&nbsp;<span style={{ color: getThemeSyntaxColor(theme, 'string') }}>
                            "use strict"
                          </span>;
                          <br />
                          &nbsp;&nbsp;<span style={{ color: getThemeSyntaxColor(theme, 'keyword') }}>
                            return
                          </span> <span style={{ color: getThemeSyntaxColor(theme, 'string') }}>
                            `Hello, ${'{'}</span><span style={{ color: getThemeSyntaxColor(theme, 'variable') }}>name</span><span style={{ color: getThemeSyntaxColor(theme, 'string') }}>{'}'}`
                          </span>;
                          <br />
                          {'}'}
                      </code>
                    </pre>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
      
      <div className="flex justify-end gap-4 mt-8">
        <Button variant="outline" onClick={handleResetSettings}>
          <RefreshCw className="mr-2 h-4 w-4" />
          Reset to Defaults
        </Button>
        <Button onClick={handleSaveSettings}>
          <Save className="mr-2 h-4 w-4" />
          Save Settings
        </Button>
      </div>
    </div>
  );
};

export default SettingsSection;
