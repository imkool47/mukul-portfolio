import React, { useState, useEffect } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import VSCodeLayout from '../components/VSCodeLayout';
import AboutSection from '../components/AboutSection';
import ProjectsSection from '../components/ProjectsSection';
import SkillsSection from '../components/SkillsSection';
import ContactSection from '../components/ContactSection';
import Terminal from '../components/Terminal';
import TypedText from '../components/TypedText';

const Index = () => {
  const [showTerminal, setShowTerminal] = useState(true);

  useEffect(() => {
    // Hide terminal after intro animation
    const timer = setTimeout(() => {
      setShowTerminal(false);
    }, 5000);
    
    return () => clearTimeout(timer);
  }, []);

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
            <TypedText 
              text="Navigate through the tabs below to explore my portfolio..." 
              className="text-lg text-primary mt-4"
            />
          </div>
        </div>
      ) : (
        <Tabs defaultValue="about" className="w-full">
          <TabsList className="mb-6">
            <TabsTrigger value="about">README.md</TabsTrigger>
            <TabsTrigger value="projects">Projects</TabsTrigger>
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="contact">Contact</TabsTrigger>
            <TabsTrigger value="terminal">Terminal</TabsTrigger>
          </TabsList>
          
          <TabsContent value="about">
            <AboutSection />
          </TabsContent>
          
          <TabsContent value="projects">
            <ProjectsSection />
          </TabsContent>
          
          <TabsContent value="skills">
            <SkillsSection />
          </TabsContent>
          
          <TabsContent value="contact">
            <ContactSection />
          </TabsContent>
          
          <TabsContent value="terminal">
            <div className="max-w-2xl">
              <Terminal />
              <p className="text-sm text-muted-foreground mt-4">
                Try commands like "help", "about", "skills", "projects", or "contact" to explore.
              </p>
            </div>
          </TabsContent>
        </Tabs>
      )}
    </VSCodeLayout>
  );
};

export default Index;