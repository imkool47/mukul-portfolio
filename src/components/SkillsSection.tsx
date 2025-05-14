import React from 'react';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import CodeBlock from './CodeBlock';

const skillsCode = `// My Skills Assessment
const frontend = {
  "HTML/CSS": 95,
  "JavaScript": 90,
  "TypeScript": 85,
  "React": 90,
  "Vue": 75,
  "Angular": 65,
};

const backend = {
  "Node.js": 85,
  "Express": 80,
  "Django": 70,
  "Flask": 65,
  "GraphQL": 75,
};

const databases = {
  "MongoDB": 85,
  "PostgreSQL": 80,
  "MySQL": 75,
  "Firebase": 85,
};

const tools = {
  "Git": 90,
  "Docker": 75,
  "AWS": 90,
  "Figma": 80,
  "Jest": 85,
};`;

interface SkillType {
  [key: string]: number;
}

const SkillsSection: React.FC = () => {
  const frontend: SkillType = {
    "HTML/CSS": 95,
    "JavaScript": 90,
    "TypeScript": 85,
    "React": 90,
    "Vue": 75,
    "Angular": 65,
  };

  const backend: SkillType = {
    "Node.js": 85,
    "Express": 80,
    "Django": 70,
    "Flask": 65,
    "GraphQL": 75,
  };

  const databases: SkillType = {
    "MongoDB": 85,
    "PostgreSQL": 80,
    "MySQL": 75,
    "Firebase": 85,
  };

  const tools: SkillType = {
    "Git": 90,
    "Docker": 75,
    "AWS": 90,
    "Figma": 80,
    "Jest": 85,
  };

  const renderSkills = (skills: SkillType) => {
    return (
      <div className="space-y-4">
        {Object.entries(skills).map(([skill, level]) => (
          <div key={skill}>
            <div className="flex justify-between mb-1">
              <span className="text-sm font-medium">{skill}</span>
              <span className="text-sm text-muted-foreground">{level}%</span>
            </div>
            <Progress value={level} className="h-2" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="animate-fade-in">
      <h2 className="text-2xl font-bold mb-4">Skills</h2>
      <p className="mb-6 text-muted-foreground">
        Here's an overview of my technical skills and proficiency levels.
      </p>

      <CodeBlock
        fileName="skills.js"
        code={skillsCode}
      />

      <Tabs defaultValue="frontend" className="mt-6">
        <TabsList className="mb-4">
          <TabsTrigger value="frontend">Frontend</TabsTrigger>
          <TabsTrigger value="backend">Backend</TabsTrigger>
          <TabsTrigger value="databases">Databases</TabsTrigger>
          <TabsTrigger value="tools">Tools</TabsTrigger>
        </TabsList>
        <TabsContent value="frontend" className="space-y-4">
          {renderSkills(frontend)}
        </TabsContent>
        <TabsContent value="backend" className="space-y-4">
          {renderSkills(backend)}
        </TabsContent>
        <TabsContent value="databases" className="space-y-4">
          {renderSkills(databases)}
        </TabsContent>
        <TabsContent value="tools" className="space-y-4">
          {renderSkills(tools)}
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default SkillsSection;
