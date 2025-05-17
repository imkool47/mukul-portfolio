
import React, { useState, useEffect } from 'react';
import VSCodeLayout from '../components/VSCodeLayout';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import ContactSection from '../components/ContactSection';
import SettingsSection from '../components/SettingsSection';
import ProfileSection from '../components/ProfileSection';
import Terminal from '../components/Terminal';
import { useLocation, useNavigate } from 'react-router-dom';

const Index = () => {
  const [showTerminal, setShowTerminal] = useState(true);
  const location = useLocation();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('about');

  useEffect(() => {
    // Parse the URL query parameters
    const params = new URLSearchParams(location.search);
    const tab = params.get('tab');
    
    // If there's a valid tab in the URL, set it as active
    if (tab && ['about', 'projects', 'skills', 'contact', 'terminal', 'settings', 'profile'].includes(tab)) {
      setActiveTab(tab);
    }
  }, [location.search]);

  useEffect(() => {
    // Hide terminal after intro animation
    const timer = setTimeout(() => {
      setShowTerminal(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleTabChange = (value: string) => {
    setActiveTab(value);
    navigate(`/?tab=${value}`);
  };

  return (
    <VSCodeLayout>
      {showTerminal ? (
        <div className="h-full flex flex-col justify-center items-center">
          <div className="max-w-xl w-full">
            <Terminal 
              initialCommands={[
                'initialize portfolio.exe',
                'Loading assets...',
                'Configuring themes...',
                'Welcome to my VS Code-inspired portfolio!',
                'Type "help" for available commands.'
              ]} 
            />
          </div>
        </div>
      ) : (
        <div>
          {activeTab === 'about' && <AboutSection />}
          {activeTab === 'projects' && <ProjectsSection />}
          {activeTab === 'skills' && <SkillsSection />}
          {activeTab === 'contact' && <ContactSection />}
          {activeTab === 'profile' && <ProfileSection />}
          {activeTab === 'terminal' && (
            <div className="max-w-2xl">
              <Terminal />
              <p className="text-sm text-muted-foreground mt-4">
                Try commands like "help", "about", "skills", "projects", "contact", "figlet" to explore.
              </p>
            </div>
          )}
          {activeTab === 'settings' && <SettingsSection />}
        </div>
      )}
    </VSCodeLayout>
  );
};

export default Index;