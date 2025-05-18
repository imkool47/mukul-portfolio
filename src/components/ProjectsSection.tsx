import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, FolderOpen, Monitor, X, Check } from 'lucide-react';
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ScrollArea } from '@/components/ui/scroll-area';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
  code?: string;
  features?: string[];
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with product catalog, shopping cart, and payment processing",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com/yourusername/ecommerce",
    demo: "https://ecommerce-demo.com",
    features: ["Product catalog", "Shopping cart", "Payment processing", "User authentication", "Order history"],
    image: "https://images.unsplash.com/photo-1649972904349-6e44c42644a7?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A productivity application for managing tasks, projects and team collaboration",
    technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
    github: "https://github.com/yourusername/taskmanager",
    demo: "https://task-app-demo.com",
    features: ["Task tracking", "Project organization", "Team collaboration", "Due date reminders", "Priority levels"],
    image: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1170&q=80"
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A weather application showing forecasts and historical data with interactive visualizations",
    technologies: ["React", "D3.js", "Weather API", "Styled Components"],
    github: "https://github.com/yourusername/weather-dashboard",
    features: ["Current weather", "5-day forecast", "Historical data", "Interactive charts", "Location search"],
    image: "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1169&q=80"
  }
];

const ProjectsSection: React.FC = () => {
  const [projectDialog, setProjectDialog] = useState<Project | null>(null);
  
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">Projects</h2>
      <p className="mb-6 text-muted-foreground">
        Here are some of the projects I've worked on. Click on any project to view more details.
      </p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {projects.map(project => (
          <Card key={project.id} className="overflow-hidden hover:shadow-md transition-shadow">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FolderOpen size={18} className="text-primary" />
                {project.title}
              </CardTitle>
              <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2 mt-2">
                {project.technologies.map(tech => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </CardContent>
            <CardFooter className="flex justify-between gap-2">
              <Button 
                variant="outline" 
                size="sm" 
                onClick={() => setProjectDialog(project)}
              >
                View Details
              </Button>
              <div className="flex gap-2">
                {project.github && (
                  <Button size="icon" variant="ghost" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer" title="GitHub Repository">
                      <Github size={16} />
                    </a>
                  </Button>
                )}
                {project.demo && (
                  <Button size="icon" variant="ghost" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer" title="Live Demo">
                      <ExternalLink size={16} />
                    </a>
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      <Dialog open={!!projectDialog} onOpenChange={(open) => !open && setProjectDialog(null)}>
        <DialogContent className="max-w-2xl max-h-[85vh] overflow-hidden">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <FolderOpen className="text-primary" />
              {projectDialog?.title}
            </DialogTitle>
            <DialogDescription>{projectDialog?.description}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <h4 className="text-sm font-semibold mb-2">Technologies</h4>
              <div className="flex flex-wrap gap-2">
                {projectDialog?.technologies.map(tech => (
                  <Badge key={tech} variant="secondary">{tech}</Badge>
                ))}
              </div>
            </div>
            
            {projectDialog?.features && (
              <div>
                <h4 className="text-sm font-semibold mb-2">Key Features</h4>
                <ul className="list-disc pl-5 text-sm">
                  {projectDialog.features.map((feature, index) => (
                    <li key={index}>{feature}</li>
                  ))}
                </ul>
              </div>
            )}
            
            {projectDialog?.image && (
              <div>
                <h4 className="text-sm font-semibold mb-2">Project Preview</h4>
                <div className="max-h-[300px] overflow-hidden rounded-md border">
                  <img 
                    src={projectDialog.image} 
                    alt={`${projectDialog.title} preview`} 
                    className="w-full h-auto object-cover"
                  />
                </div>
              </div>
            )}
            
            <div className="flex justify-end gap-2 pt-4">
              {projectDialog?.github && (
                <Button size="sm" variant="outline" asChild>
                  <a href={projectDialog.github} target="_blank" rel="noopener noreferrer">
                    <Github className="mr-2 h-4 w-4" />
                    GitHub
                  </a>
                </Button>
              )}
              {projectDialog?.demo && (
                <Button size="sm" asChild>
                  <a href={projectDialog.demo} target="_blank" rel="noopener noreferrer">
                    <Monitor className="mr-2 h-4 w-4" />
                    Live Demo
                  </a>
                </Button>
              )}
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* <div className="mt-8 text-xs flex items-center justify-end text-muted-foreground">
        <span className="flex items-center gap-1">
          <Check size={14} className="text-green-500" />
          Prettier
        </span>
      </div> */}
    </div>
  );
};

export default ProjectsSection;
