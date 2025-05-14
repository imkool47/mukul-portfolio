import React from 'react';
import CodeBlock from './CodeBlock';

const aboutCode = `// About Me
const developer = {
  name: "Mukul",
  title: "Full Stack Developer / DevOps Engineer",
  location: "City: Ayodhya, State: Uttar Pradesh, Country: India",
  education: "Bachelor's in Computer Science",
  interests: [
    "Web Development",
    "Cloud Computing",
    "Cybersecurity",
    "Machine Learning",
    "Blockchain Technology",
    "Artificial Intelligence",
    "Internet of Things (IoT)",
    "UI/UX Design",
    "Open Source"
  ],
  skills: {
    languages: ["JavaScript", "TypeScript", "Python", "Java"],
    frontend: ["React", "Vue", "Angular", "HTML/CSS"],
    backend: ["Node.js", "Django", "Flask", "Express"],
    databases: ["MongoDB", "PostgreSQL", "MySQL"],
    tools: ["Git", "Docker", "AWS", "Firebase"]
  }
};

// Feel free to reach out!
console.log("Let's build something amazing together!");`;

const AboutSection: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">About Me</h2>
      <p className="mb-6 text-muted-foreground">
        Welcome to my portfolio! I'm a passionate developer who loves creating beautiful and functional web experiences.
      </p>
      
      <CodeBlock
        fileName="about.js"
        code={aboutCode}
      />
      
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-2">My Journey</h3>
        <p className="mb-4 text-muted-foreground">
          Although I'm a fresher, I started my coding journey 8 years ago and have worked on several personal and academic projects — from simple websites to more advanced full-stack applications. I'm passionate about building intuitive user interfaces, efficient backend systems, and exploring cloud computing and DevOps technologies.
        </p>
        
        <h3 className="text-xl font-semibold mb-2">Philosophy</h3>
        <p className="mb-4 text-muted-foreground">
          I believe that great software comes from a blend of technical excellence and empathetic design.
          My approach focuses on creating solutions that not only work well but are also accessible and enjoyable to use.
        </p>
      </div>
    </div>
  );
};

export default AboutSection;
