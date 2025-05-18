import React from 'react';
import CodeBlock from './CodeBlock';

const aboutCode = `// About Me
const developer = {
  name: "Mukul",
  title: "Full Stack Developer / DevOps Engineer",
  location: "City: Ayodhya, State: Uttar Pradesh, Country: India",
  education: "Master's in Computer Applications",
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

console.log("Let's build something amazing together!");
`;

const AboutSection: React.FC = () => {
  return (
    <section className="animate-fade-in">
      <header className="mb-6">
        <h2 className="text-2xl font-bold">About Me</h2>
        <p className="text-muted-foreground mt-2">
          Welcome to my portfolio! I'm a passionate developer who loves creating beautiful and functional web experiences.
        </p>
      </header>

      <CodeBlock fileName="about.js" code={aboutCode} />

      <div className="mt-8 space-y-6">
        <section>
          <h3 className="text-xl font-semibold mb-2">My Journey</h3>
          <p className="text-muted-foreground">
            Although I'm a fresher, I started my coding journey 8 years ago and have worked on several personal and academic projects — 
            from simple websites to advanced full-stack applications. I'm passionate about building intuitive user interfaces, efficient 
            backend systems, and exploring cloud computing and DevOps technologies.
          </p>
        </section>

        <section>
          <h3 className="text-xl font-semibold mb-2">Philosophy</h3>
          <p className="text-muted-foreground">
            I believe great software blends technical excellence with empathetic design. 
            My focus is always on building solutions that are both highly functional and enjoyable to use.
          </p>
        </section>
      </div>
    </section>
  );
};

export default AboutSection;
