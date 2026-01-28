import React from 'react';

// Risk level colors for visual display
const LEVEL_COLORS: Record<string, string> = {
  L0: '#22c55e', // green
  L1: '#84cc16', // lime
  L2: '#eab308', // yellow
  L3: '#f97316', // orange
  L4: '#ef4444', // red
};

interface UseCaseCardProps {
  title: string;
  description: string;
  level: string;
  example: string;
}

const USE_CASES: UseCaseCardProps[] = [
  {
    title: 'Read Operations',
    description: 'Reading files, listing directories, fetching data from APIs.',
    level: 'L0',
    example: 'cat config.yaml',
  },
  {
    title: 'Local File Writes',
    description:
      'Creating or modifying files in the local development environment.',
    level: 'L1',
    example: "echo 'data' > output.txt",
  },
  {
    title: 'Cloud API Calls',
    description: 'Interacting with cloud services like AWS, GCP, or Azure.',
    level: 'L2',
    example: 'aws s3 cp file.txt s3://bucket/',
  },
  {
    title: 'Database Mutations',
    description: 'UPDATE, DELETE, or DROP operations on production databases.',
    level: 'L3',
    example: 'DELETE FROM users WHERE id = 1',
  },
];

interface ExampleListSectionProps {
  standalone?: boolean;
}

const InnerGrid = () => (
  <>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
      {USE_CASES.map((useCase) => (
        <UseCaseCard key={useCase.title} {...useCase} />
      ))}
    </div>
    <div className="flex justify-center mt-6">
      <a
        href="https://github.com/Agent-Sudo-Org/agent-sudo"
        className="text-base font-medium underline hover:no-underline"
      >
        View full specification on GitHub
      </a>
    </div>
  </>
);

const ExampleListSection = ({
  standalone = false,
}: ExampleListSectionProps) => {
  if (standalone) {
    return (
      <div className="max-w-6xl mx-auto">
        <InnerGrid />
      </div>
    );
  }

  return (
    <section className="px-6 pb-12 -mt-36">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Risk Level Examples</h2>
        <InnerGrid />
      </div>
    </section>
  );
};

function UseCaseCard({ title, description, level, example }: UseCaseCardProps) {
  const levelColor = LEVEL_COLORS[level] ?? '#6b7280';

  return (
    <div className="lg:aspect-video bg-white dark:bg-black border border-gray-200 dark:border-gray-700 rounded-lg shadow-sm flex flex-col justify-between p-4">
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-semibold text-lg leading-snug">{title}</h3>
          <span
            className="text-xs font-bold px-2 py-0.5 rounded"
            style={{ backgroundColor: levelColor, color: '#fff' }}
          >
            {level}
          </span>
        </div>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          {description}
        </p>
      </div>

      <div className="mt-4">
        <code className="text-xs bg-gray-100 dark:bg-gray-800 px-2 py-1 rounded block truncate">
          {example}
        </code>
      </div>
    </div>
  );
}

export default ExampleListSection;
