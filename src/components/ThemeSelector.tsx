
import React, { useState, useEffect } from 'react';
import { Palette } from 'lucide-react';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from '@/components/ui/dropdown-menu';
import { useToast } from '@/components/ui/use-toast';

type Theme = 'dracula' | 'nord' | 'monokai' | 'catppuccin' | 'everfrost';

interface ThemeOption {
  name: string;
  value: Theme;
  color: string;
}

const themeOptions: ThemeOption[] = [
  { name: 'Dracula', value: 'dracula', color: '#bd93f9' },
  { name: 'Nord', value: 'nord', color: '#81a1c1' },
  { name: 'Monokai', value: 'monokai', color: '#f92672' },
  { name: 'Catppuccin', value: 'catppuccin', color: '#cba6f7' },
  { name: 'Everfrost', value: 'everfrost', color: '#76e0f0' }
];

const ThemeSelector: React.FC = () => {
  const [currentTheme, setCurrentTheme] = useState<Theme>('dracula');
  const { toast } = useToast();

  useEffect(() => {
    const savedTheme = localStorage.getItem('vscode-theme') as Theme | null;
    if (savedTheme) {
      applyTheme(savedTheme);
    }
  }, []);

  const applyTheme = (theme: Theme) => {
    // First remove all theme classes
    document.body.classList.remove('nord-theme', 'monokai-theme', 'catppuccin-theme', 'everfrost-theme');
    
    // Only add a theme class if it's not the default (dracula)
    if (theme !== 'dracula') {
      document.body.classList.add(`${theme}-theme`);
    }

    setCurrentTheme(theme);
    localStorage.setItem('vscode-theme', theme);

    toast({
      title: 'Theme Changed',
      description: `Theme set to ${theme.charAt(0).toUpperCase() + theme.slice(1)}`,
      duration: 2000,
    });
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger className="focus:outline-none">
        <div className="flex items-center gap-2 px-2 py-1 rounded hover:bg-secondary">
          <Palette size={16} />
          <span className="text-sm">Theme</span>
        </div>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {themeOptions.map((theme) => (
          <DropdownMenuItem
            key={theme.value}
            className="flex items-center gap-2 cursor-pointer"
            onSelect={() => applyTheme(theme.value)}
          >
            <span
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: theme.color }}
            />
            <span>{theme.name}</span>
            {currentTheme === theme.value && (
              <span className="ml-auto">✓</span>
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};

export default ThemeSelector;