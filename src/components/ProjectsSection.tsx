import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ExternalLink, Github, FolderOpen } from 'lucide-react';
import CodeBlock from './CodeBlock';

interface Project {
  id: number;
  title: string;
  description: string;
  technologies: string[];
  github?: string;
  demo?: string;
  image?: string;
  code?: string;
}

const projects: Project[] = [
  {
    id: 1,
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with product catalog, shopping cart, and payment processing",
    technologies: ["React", "Node.js", "MongoDB", "Stripe"],
    github: "https://github.com/yourusername/ecommerce",
    demo: "https://ecommerce-demo.com",
    code: `// Product component example
const Product = ({ product, addToCart }) => {
  const { name, price, image } = product;
  
  return (
    <div className="product-card">
      <img src={image} alt={name} />
      <h3>{name}</h3>
      <p>\${price.toFixed(2)}</p>
      <button onClick={() => addToCart(product)}>
        Add to Cart
      </button>
    </div>
  );
};`
  },
  {
    id: 2,
    title: "Task Management App",
    description: "A productivity application for managing tasks, projects and team collaboration",
    technologies: ["Vue.js", "Firebase", "Tailwind CSS"],
    github: "https://github.com/yourusername/taskmanager",
    demo: "https://task-app-demo.com",
    code: `// Task component example
const Task = ({ task, updateStatus }) => {
  const { id, title, status, dueDate } = task;
  
  return (
    <div className="task-item">
      <h4>{title}</h4>
      <div className="task-meta">
        <span className={\`status-\${status}\`}>{status}</span>
        <span>Due: {formatDate(dueDate)}</span>
      </div>
      <select 
        value={status} 
        onChange={(e) => updateStatus(id, e.target.value)}
      >
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
    </div>
  );
};`
  },
  {
    id: 3,
    title: "Weather Dashboard",
    description: "A weather application showing forecasts and historical data with interactive visualizations",
    technologies: ["React", "D3.js", "Weather API", "Styled Components"],
    github: "https://github.com/yourusername/weather-dashboard",
    code: `// Weather forecast component
const Forecast = ({ data }) => {
  const { current, daily } = data;
  
  return (
    <div className="forecast-container">
      <div className="current-weather">
        <h3>{current.temp}°C</h3>
        <p>{current.conditions}</p>
        <p>Feels like: {current.feelsLike}°C</p>
      </div>
      
      <div className="daily-forecast">
        {daily.map(day => (
          <div key={day.date} className="day-forecast">
            <p>{formatDay(day.date)}</p>
            <span>{day.temp.max}° / {day.temp.min}°</span>
          </div>
        ))}
      </div>
    </div>
  );
};`
  }
];

const ProjectsSection: React.FC = () => {
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  
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
                onClick={() => setSelectedProject(project)}
              >
                View Details
              </Button>
              <div className="flex gap-2">
                {project.github && (
                  <Button size="icon" variant="ghost" asChild>
                    <a href={project.github} target="_blank" rel="noopener noreferrer">
                      <Github size={16} />
                    </a>
                  </Button>
                )}
                {project.demo && (
                  <Button size="icon" variant="ghost" asChild>
                    <a href={project.demo} target="_blank" rel="noopener noreferrer">
                      <ExternalLink size={16} />
                    </a>
                  </Button>
                )}
              </div>
            </CardFooter>
          </Card>
        ))}
      </div>
      
      {selectedProject && (
        <div className="mt-8">
          <h3 className="text-xl font-semibold mb-2">{selectedProject.title} - Code Snippet</h3>
          <CodeBlock 
            fileName={`${selectedProject.title.toLowerCase().replace(/\s+/g, '-')}.jsx`} 
            code={selectedProject.code || ''} 
          />
        </div>
      )}
    </div>
  );
};

export default ProjectsSection;
