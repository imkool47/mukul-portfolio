import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import VSCodeLayout from '../components/VSCodeLayout';
import CodeBlock from '../components/CodeBlock';

const notFoundCode = `// 404.tsx
import { useRouter } from 'next/router';

export default function NotFound() {
  const router = useRouter();
  const path = router.asPath;
  
  console.error(\`404: Page not found - \${path}\`);
  
  return (
    <div className="error-container">
      <h1>404 - Page Not Found</h1>
      <p>The requested path \`\${path}\` does not exist.</p>
      <button onClick={() => router.push('/')}>
        Return to Home
      </button>
    </div>
  );
}`;

const NotFound = () => {
  const path = window.location.pathname;

  return (
    <VSCodeLayout>
      <div className="flex flex-col items-center justify-center min-h-[70vh]">
        <h1 className="text-4xl font-bold mb-2">404</h1>
        <div className="text-xl text-destructive mb-6">Error: Page Not Found</div>
        <CodeBlock
          fileName="404.tsx"
          code={notFoundCode}
        />
        <p className="mt-6 text-muted-foreground mb-6">
          The requested path <code className="bg-secondary px-2 py-1 rounded">{path}</code> could not be found.
        </p>
        <Button asChild>
          <Link to="/">Return to Home</Link>
        </Button>
      </div>
    </VSCodeLayout>
  );
};

export default NotFound;