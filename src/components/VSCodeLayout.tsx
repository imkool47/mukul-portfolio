import React, { ReactNode, useState } from 'react';
import { FileText, FolderOpen, LayoutDashboard, Settings } from 'lucide-react';
import ThemeSelector from './ThemeSelector';
import { Separator } from '@/components/ui/separator';

interface VSCodeLayoutProps {
  children: ReactNode;
}

const VSCodeLayout: React.FC<VSCodeLayoutProps> = ({ children }) => {
  const [activeSection, setActiveSection] = useState<'explorer' | 'projects' | 'settings'>('explorer');

  return (
    <div className="flex h-screen flex-col overflow-hidden">
      {/* Title Bar */}
      <div className="flex items-center justify-between px-4 py-2 bg-secondary">
        <div className="flex items-center gap-2">
          <span className="text-sm">Portfolio - Mukul</span>
        </div>
        <div className="flex items-center gap-2">
          <ThemeSelector />
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-1 overflow-hidden">
        {/* Activity Bar */}
        <div className="flex flex-col items-center py-2 bg-sidebar">
          <button 
            className={`activity-bar-icon ${activeSection === 'explorer' ? 'active' : ''}`}
            onClick={() => setActiveSection('explorer')}
          >
            <FolderOpen size={24} />
          </button>
          <button 
            className={`activity-bar-icon ${activeSection === 'projects' ? 'active' : ''}`}
            onClick={() => setActiveSection('projects')}
          >
            <LayoutDashboard size={24} />
          </button>
          <button 
            className={`activity-bar-icon ${activeSection === 'settings' ? 'active' : ''}`}
            onClick={() => setActiveSection('settings')}
          >
            <Settings size={24} />
          </button>
          <div className="mt-auto">
            <FileText size={24} className="activity-bar-icon" />
          </div>
        </div>

        {/* Sidebar */}
        <div className="w-64 border-r border-border bg-sidebar overflow-y-auto">
          {activeSection === 'explorer' && (
            <div>
              <div className="px-4 py-2 uppercase text-xs font-semibold text-muted-foreground">
                Explorer
              </div>
              <div className="px-2">
                <div className="explorer-item font-medium">
                  <FolderOpen size={16} className="text-blue-400" /> PORTFOLIO
                </div>
                <div className="pl-4 mt-1">
                  <div className="explorer-item">
                    <FileText size={16} className="text-primary" /> about.md
                  </div>
                  <div className="explorer-item">
                    <FileText size={16} className="text-green-400" /> projects.json
                  </div>
                  <div className="explorer-item">
                    <FileText size={16} className="text-yellow-400" /> skills.js
                  </div>
                  <div className="explorer-item">
                    <FileText size={16} className="text-purple-400" /> contact.tsx
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeSection === 'projects' && (
            <div>
              <div className="px-4 py-2 uppercase text-xs font-semibold text-muted-foreground">
                Projects
              </div>
              <div className="px-2">
                <div className="explorer-item">
                  <FolderOpen size={16} className="text-blue-400" /> Project 1
                </div>
                <div className="explorer-item">
                  <FolderOpen size={16} className="text-blue-400" /> Project 2
                </div>
                <div className="explorer-item">
                  <FolderOpen size={16} className="text-blue-400" /> Project 3
                </div>
              </div>
            </div>
          )}

          {activeSection === 'settings' && (
            <div>
              <div className="px-4 py-2 uppercase text-xs font-semibold text-muted-foreground">
                Settings
              </div>
              <div className="px-2">
                <div className="explorer-item">
                  <Settings size={16} /> Theme
                </div>
                <div className="explorer-item">
                  <Settings size={16} /> Font Size
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Editor Area */}
        <div className="flex-1 flex flex-col overflow-hidden">
          {/* Tabs */}
          <div className="flex border-b border-border bg-sidebar overflow-x-auto">
            <div className="vscode-tab active">
              <FileText size={16} /> README.md
            </div>
            <div className="vscode-tab">
              <FileText size={16} /> projects.json
            </div>
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
            </div>
            <div>
              <span>JavaScript</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VSCodeLayout;
