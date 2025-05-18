import React, { ReactNode, useState, useEffect } from 'react';
import { FileText, FolderOpen, LayoutDashboard, Settings, Terminal as TerminalIcon, Code, X, RefreshCw, ChevronDown, ChevronUp, FileCode, Package, Palette, UserRound } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import { Separator } from '@/components/ui/separator';
import { Command, CommandInput, CommandList, CommandGroup, CommandItem } from '@/components/ui/command';
import { Dialog, DialogContent, DialogTrigger } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Tooltip, TooltipContent, TooltipTrigger } from '@/components/ui/tooltip';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarShortcut,
  MenubarTrigger,
} from "@/components/ui/menubar";

interface VSCodeLayoutProps {
  children: ReactNode;
  showSidebar?: boolean;
}

interface FileItem {
  name: string;
  icon: React.ReactNode;
  tab: string;
}

const VSCodeLayout: React.FC<VSCodeLayoutProps> = ({ children, showSidebar = true }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeSection, setActiveSection] = useState<'explorer' | 'projects' | 'settings' | 'profile'>('explorer');
  const [cmdOpen, setCmdOpen] = useState(false);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [explorerCollapsed, setExplorerCollapsed] = useState(false);
  const [projectsCollapsed, setProjectsCollapsed] = useState(false);
  const [notifications, setNotifications] = useState<string[]>([
    "2 pending tasks",
    "1 update available"
  ]);
  const [activeTab, setActiveTab] = useState("README.md");
  const [terminalOutput, setTerminalOutput] = useState<string[]>([]);

  // Profile data from localStorage
  const displayName = localStorage.getItem('profile-name') || 'Test';
  const email = localStorage.getItem('profile-email') || 'jane.doe@example.com';
  const bio = localStorage.getItem('profile-bio') || 'Full-stack developer with a passion for clean code and elegant solutions.';
  const profileImage = localStorage.getItem('profile-image') || '/placeholder.svg';

  // Use profile.md for the profile tab
  const files: FileItem[] = [
    { name: "README.md", icon: <FileText size={16} className="text-primary" />, tab: "about" },
    { name: "projects.json", icon: <FileCode size={16} className="text-green-400" />, tab: "projects" },
    { name: "skills.js", icon: <Code size={16} className="text-yellow-400" />, tab: "skills" },
    { name: "contact.tsx", icon: <FileText size={16} className="text-purple-400" />, tab: "contact" },
    { name: "profile.md", icon: <FileText size={16} className="text-blue-400" />, tab: "profile" },
  ];

  const tabs: FileItem[] = [
    { name: "README.md", icon: <FileText size={16} />, tab: "about" },
    { name: "projects.json", icon: <FileCode size={16} />, tab: "projects" },
    { name: "skills.js", icon: <Code size={16} />, tab: "skills" },
    { name: "contact.tsx", icon: <FileText size={16} />, tab: "contact" },
    { name: "profile.md", icon: <FileText size={16} />, tab: "profile" },
  ];

  // Update sidebarCollapsed when showSidebar changes
  useEffect(() => {
    setSidebarCollapsed(!showSidebar);
  }, [showSidebar]);

  // Handle file click 
  const handleFileClick = (fileName: string, tab: string) => {
    setActiveTab(fileName);
    navigate(`/?tab=${tab}`);
  };
  
  // Navigate to settings with specific section
  const navigateToSettings = (section: string = '') => {
    navigate(`/?tab=settings${section ? `&section=${section}` : ''}`);
  };

  // Navigate to profile section
  const navigateToProfile = () => {
    setActiveSection('profile');
    navigate('/?tab=profile');
  };

  // Navigate to terminal
  const navigateToTerminal = () => {
    navigate('/?tab=terminal');
  };
  
  // Clear terminal function
  const clearTerminal = () => {
    setTerminalOutput([]);
    console.log("Terminal cleared");
    // If the user is on the terminal page, this will clear the visible terminal
    if (location.search.includes('tab=terminal')) {
      // Force a re-render of the terminal component
      navigate('/?tab=about');
      setTimeout(() => {
        navigate('/?tab=terminal');
      }, 10);
    }
  };

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      // Command Palette: Ctrl+Shift+P or Cmd+Shift+P
      if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'p') {
        e.preventDefault();
        setCmdOpen(true);
      }
      
      // Toggle Sidebar: Ctrl+B or Cmd+B
      if ((e.ctrlKey || e.metaKey) && e.key === 'b') {
        e.preventDefault();
        setSidebarCollapsed(!sidebarCollapsed);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [sidebarCollapsed]);

  // Update active tab based on URL params
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    if (tab) {
      const file = files.find(f => f.tab === tab);
      if (file) {
        setActiveTab(file.name);
      }
      
      // Update active section based on tab
      if (tab === 'settings') {
        setActiveSection('settings');
      } else if (tab === 'profile') {
        setActiveSection('profile');
      } else if (tab === 'terminal') {
        // No specific section for terminal
      } else if (tab === 'projects') {
        setActiveSection('projects');
      } else {
        setActiveSection('explorer');
      }
    }
  }, [location.search]);

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Command Palette Dialog */}
      <Dialog open={cmdOpen} onOpenChange={setCmdOpen}>
        <DialogContent className="max-w-2xl p-0 overflow-hidden">
          <Command className="border-none">
            <CommandInput placeholder="Type a command..." />
            <CommandList>
              <CommandGroup heading="Commands">
                <CommandItem onSelect={() => {
                  setActiveSection('explorer');
                  setCmdOpen(false);
                }}>
                  <FolderOpen className="mr-2 h-4 w-4" />
                  <span>Show Explorer</span>
                </CommandItem>
                <CommandItem onSelect={() => {
                  document.body.className = 'dracula-theme';
                  setCmdOpen(false);
                }}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Theme: Dracula</span>
                </CommandItem>
                <CommandItem onSelect={() => {
                  document.body.className = 'monokai-theme';
                  setCmdOpen(false);
                }}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Theme: Monokai</span>
                </CommandItem>
                <CommandItem onSelect={() => {
                  document.body.className = 'nord-theme';
                  setCmdOpen(false);
                }}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Theme: Nord</span>
                </CommandItem>
                <CommandItem onSelect={() => {
                  document.body.className = 'catppuccin-theme';
                  setCmdOpen(false);
                }}>
                  <Settings className="mr-2 h-4 w-4" />
                  <span>Theme: Catppuccin</span>
                </CommandItem>
              </CommandGroup>

              <CommandGroup heading="Go to">
                <CommandItem onSelect={() => {
                  navigate('/?tab=about');
                  setCmdOpen(false);
                }}>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>About</span>
                </CommandItem>
                <CommandItem onSelect={() => {
                  navigate('/?tab=projects');
                  setCmdOpen(false);
                }}>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Projects</span>
                </CommandItem>
                <CommandItem onSelect={() => {
                  navigate('/?tab=skills');
                  setCmdOpen(false);
                }}>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Skills</span>
                </CommandItem>
                <CommandItem onSelect={() => {
                  navigate('/?tab=contact');
                  setCmdOpen(false);
                }}>
                  <FileText className="mr-2 h-4 w-4" />
                  <span>Contact</span>
                </CommandItem>
                <CommandItem onSelect={() => {
                  navigate('/?tab=terminal');
                  setCmdOpen(false);
                }}>
                  <TerminalIcon className="mr-2 h-4 w-4" />
                  <span>Terminal</span>
                </CommandItem>
                <CommandItem onSelect={() => {
                  navigate('/?tab=profile');
                  setCmdOpen(false);
                }}>
                  <UserRound className="mr-2 h-4 w-4" />
                  <span>Profile</span>
                </CommandItem>
              </CommandGroup>
            </CommandList>
          </Command>
        </DialogContent>
      </Dialog>

      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-secondary">
        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Code size={16} className="text-primary" />
            <span className="text-sm">Portfolio - VS Code</span>
          </div>
          
          {/* Menu Bar Items */}
          <div className="hidden md:flex space-x-1 text-sm">
            <Menubar className="border-none bg-transparent">
              <MenubarMenu>
                <MenubarTrigger className="cursor-pointer hover:text-primary">File</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onSelect={() => navigate('/?tab=about')}>
                    New File <MenubarShortcut>⌘N</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem onSelect={() => navigate('/?tab=projects')}>
                    Open Recent
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    Save <MenubarShortcut>⌘S</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>Exit</MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="cursor-pointer hover:text-primary">Edit</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem>
                    Undo <MenubarShortcut>⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem>
                    Cut <MenubarShortcut>⌘X</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    Copy <MenubarShortcut>⌘C</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    Paste <MenubarShortcut>⌘V</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="cursor-pointer hover:text-primary">View</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onSelect={() => setSidebarCollapsed(!sidebarCollapsed)}>
                    Toggle Sidebar <MenubarShortcut>⌘B</MenubarShortcut>
                  </MenubarItem>
                  <MenubarItem>
                    Appearance
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onSelect={() => navigateToSettings('appearance')}>
                    Color Theme
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="cursor-pointer hover:text-primary">Terminal</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onSelect={() => navigateToTerminal()}>
                    New Terminal <MenubarShortcut>⇧⌘`</MenubarShortcut>
                  </MenubarItem>
                  <MenubarSeparator />
                  <MenubarItem onSelect={() => clearTerminal()}>
                    Clear Terminal
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>

              <MenubarMenu>
                <MenubarTrigger className="cursor-pointer hover:text-primary">Help</MenubarTrigger>
                <MenubarContent>
                  <MenubarItem onSelect={() => navigateToProfile()}>
                    About
                  </MenubarItem>
                  <MenubarItem onSelect={() => setCmdOpen(true)}>
                    Command Palette... <MenubarShortcut>⇧⌘P</MenubarShortcut>
                  </MenubarItem>
                </MenubarContent>
              </MenubarMenu>
            </Menubar>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <Dialog open={cmdOpen} onOpenChange={setCmdOpen}>
            <DialogTrigger asChild>
              <Button variant="outline" size="sm" className="text-xs">
                <Code size={14} className="mr-1" />
                <span className="hidden sm:inline">Command Palette</span>
                <span className="hidden sm:inline ml-2 opacity-60">Ctrl+Shift+P</span>
              </Button>
            </DialogTrigger>
          </Dialog>
          <ThemeSelector />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar */}
        <div className="flex flex-col items-center py-2 bg-sidebar z-10">
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className={`activity-bar-icon ${activeSection === 'explorer' ? 'active' : ''}`}
                onClick={() => setActiveSection('explorer')}
              >
                <FolderOpen size={24} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Explorer</TooltipContent>
          </Tooltip>
          
          {/* Removed Search icon */}
          
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className={`activity-bar-icon ${activeSection === 'projects' ? 'active' : ''}`}
                onClick={() => setActiveSection('projects')}
              >
                <LayoutDashboard size={24} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Projects</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className={`activity-bar-icon ${activeSection === 'profile' ? 'active' : ''}`}
                onClick={navigateToProfile}
              >
                <UserRound size={24} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Profile</TooltipContent>
          </Tooltip>
          
          <Tooltip>
            <TooltipTrigger asChild>
              <button 
                className={`activity-bar-icon ${activeSection === 'settings' ? 'active' : ''}`}
                onClick={() => {
                  setActiveSection('settings');
                  navigateToSettings();
                }}
              >
                <Settings size={24} />
              </button>
            </TooltipTrigger>
            <TooltipContent side="right">Settings</TooltipContent>
          </Tooltip>
          
          <div className="mt-auto">
            <Tooltip>
              <TooltipTrigger asChild>
                <div className="activity-bar-icon" onClick={() => navigate('/?tab=terminal')}>
                  <TerminalIcon size={24} />
                </div>
              </TooltipTrigger>
              <TooltipContent side="right">Terminal</TooltipContent>
            </Tooltip>
          </div>
        </div>

        {/* Sidebar */}
        <div className={`transition-all duration-300 border-r border-border bg-sidebar overflow-y-auto ${sidebarCollapsed ? 'w-0' : 'w-64'}`}>
          {activeSection === 'explorer' && !sidebarCollapsed && (
            <div>
              <div className="px-4 py-2 uppercase text-xs font-semibold text-muted-foreground flex items-center justify-between">
                <span>Explorer</span>
                <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => setSidebarCollapsed(true)}>
                  <X size={12} />
                </Button>
              </div>
              
              <div className="px-2">
                <div 
                  className="flex items-center p-1 cursor-pointer hover:bg-secondary/50 rounded-sm"
                  onClick={() => setExplorerCollapsed(!explorerCollapsed)}
                >
                  {explorerCollapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  <span className="ml-1 font-medium">PORTFOLIO</span>
                </div>
                
                {!explorerCollapsed && (
                  <div className="pl-4 mt-1">
                    {files.map((file, idx) => (
                      <div 
                        key={idx} 
                        className={`explorer-item cursor-pointer ${activeTab === file.name ? 'bg-secondary/50' : ''}`}
                        onClick={() => handleFileClick(file.name, file.tab)}
                      >
                        {file.icon} {file.name}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          )}

          {activeSection === 'projects' && !sidebarCollapsed && (
            <div>
              <div className="px-4 py-2 uppercase text-xs font-semibold text-muted-foreground flex items-center justify-between">
                <span>Projects</span>
                <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => setSidebarCollapsed(true)}>
                  <X size={12} />
                </Button>
              </div>
              
              <div className="px-2">
                <div 
                  className="flex items-center p-1 cursor-pointer hover:bg-secondary/50 rounded-sm"
                  onClick={() => setProjectsCollapsed(!projectsCollapsed)}
                >
                  {projectsCollapsed ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  <span className="ml-1 font-medium">PROJECTS</span>
                </div>
                
                {!projectsCollapsed && (
                  <div className="pl-4 mt-1">
                    <div className="explorer-item cursor-pointer" onClick={() => navigate('/?tab=projects')}>
                      <FolderOpen size={16} className="text-blue-400" /> E-commerce Platform
                    </div>
                    <div className="explorer-item cursor-pointer" onClick={() => navigate('/?tab=projects')}>
                      <FolderOpen size={16} className="text-blue-400" /> Task Management App
                    </div>
                    <div className="explorer-item cursor-pointer" onClick={() => navigate('/?tab=projects')}>
                      <FolderOpen size={16} className="text-blue-400" /> Weather Dashboard
                    </div>
                  </div>
                )}
              </div>
            </div>
          )}

          {activeSection === 'profile' && !sidebarCollapsed && (
            <div>
              <div className="px-4 py-2 uppercase text-xs font-semibold text-muted-foreground flex items-center justify-between">
                <span>Profile</span>
                <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => setSidebarCollapsed(true)}>
                  <X size={12} />
                </Button>
              </div>
              <div className="p-4">
                {/* Removed the View Profile button */}
              </div>
            </div>
          )}

          {activeSection === 'settings' && !sidebarCollapsed && (
            <div>
              <div className="px-4 py-2 uppercase text-xs font-semibold text-muted-foreground flex items-center justify-between">
                <span>Settings</span>
                <Button variant="ghost" size="icon" className="h-5 w-5" onClick={() => setSidebarCollapsed(true)}>
                  <X size={12} />
                </Button>
              </div>
              <div className="px-2">
                <div className="explorer-item cursor-pointer" onClick={() => navigateToSettings()}>
                  <Settings size={16} /> User Settings
                </div>
                <div className="explorer-item cursor-pointer" onClick={() => navigateToSettings('appearance')}>
                  <Palette size={16} /> Color Theme
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-border bg-sidebar overflow-x-auto">
            {sidebarCollapsed && (
              <Button 
                variant="ghost" 
                size="icon" 
                className="h-8 w-8 mx-1" 
                onClick={() => setSidebarCollapsed(false)}
              >
                <FolderOpen size={16} />
              </Button>
            )}
            {tabs.map((tab, idx) => (
              <div 
                key={idx} 
                className={`vscode-tab ${activeTab === tab.name ? 'active' : ''}`}
                onClick={() => handleFileClick(tab.name, tab.tab)}
              >
                {tab.icon} {tab.name}
              </div>
            ))}
          </div>

          {/* Breadcrumbs */}
          <div className="flex items-center text-xs px-4 py-1 bg-sidebar/30 border-b border-border">
            <span className="hover:underline cursor-pointer">portfolio</span>
            <span className="mx-1">/</span>
            <span className="hover:underline cursor-pointer">src</span>
            <span className="mx-1">/</span>
            <span className="hover:underline cursor-pointer">components</span>
            <span className="mx-1">/</span>
            <span>{activeTab}</span>
          </div>

          {/* Content */}
          <div className="flex-1 overflow-y-auto p-4">
            {children}
          </div>

          {/* Status Bar */}
          <div className="flex items-center justify-between px-4 py-1 bg-secondary text-xs">
            <div className="flex items-center gap-2">
              <span>main</span>
              <Separator orientation="vertical" className="h-4" />
              <span>UTF-8</span>
              <Separator orientation="vertical" className="h-4" />
              <span>Spaces: 2</span>
            </div>
            <div className="flex items-center gap-3">
              {notifications.map((notification, index) => (
                <Badge key={index} variant="outline" className="py-0">
                  {notification}
                </Badge>
              ))}
              <span>JavaScript</span>
              <span>Ln 42, Col 18</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VSCodeLayout;
