import React from 'react';
import Section from '@/components/Section';

type AgentEntry = {
  name: string;
  description: string;
  scenario: string;
};

const agents: AgentEntry[] = [
  {
    name: 'Coding Agents',
    description: 'Codex, Cursor, Windsurf, Devin...',
    scenario:
      'Backend project has SUDO.md → Agent reads rules before executing git push, database migrations, or rm -rf',
  },
  {
    name: 'Personal AI Assistants',
    description: 'Moltbot, Rabbit R1, Humane AI Pin...',
    scenario:
      'User asks to "sell all my TSLA stock" → Agent reads SUDO.md, requires L4 TOTP verification before executing trade',
  },
  {
    name: 'Computer Use Agents',
    description: 'Manus, Claude Computer Use, OpenAI Operator...',
    scenario:
      'Email client has L3 rule for "delete all" → Agent requires typing confirmation before mass deletion',
  },
  {
    name: 'Workflow Agents',
    description: 'n8n, Zapier AI, Make...',
    scenario:
      'Financial workflow defines L4 for transfers > $1000 → Agent requires TOTP verification',
  },
];

function AgentCard({ name, description, scenario }: AgentEntry) {
  return (
    <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-4">
      <h3 className="font-semibold text-gray-900 dark:text-white">{name}</h3>
      <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
        {description}
      </p>
      <div className="mt-3 p-3 bg-gray-50 dark:bg-gray-900 rounded text-sm text-gray-600 dark:text-gray-300">
        <span className="text-xs font-medium text-gray-400 uppercase">
          Example:
        </span>
        <br />
        {scenario}
      </div>
    </div>
  );
}

export default function CompatibilitySection() {
  return (
    <Section
      id="compatibility"
      title="Who Should Adopt SUDO.md?"
      className="py-12"
      center
      maxWidthClass="max-w-4xl"
    >
      <div className="mx-auto max-w-3xl text-center mb-8">
        <p className="text-lg text-gray-600 dark:text-gray-400">
          <strong>Agent developers</strong> implement SUDO.md protocol in their
          agents.
          <br />
          <strong>Project/system owners</strong> add <code>SUDO.md</code> files
          to define specific rules.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {agents.map((agent) => (
          <AgentCard key={agent.name} {...agent} />
        ))}
      </div>

      <div className="mt-8 p-4 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
        <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
          How It Works
        </h3>
        <div className="text-sm text-blue-700 dark:text-blue-400 space-y-2">
          <p>
            <strong>1. Agent Developers:</strong> Implement SUDO.md parser +
            friction UI in your agent. When your agent encounters a risky
            action, check the project&apos;s SUDO.md and trigger appropriate
            friction.
          </p>
          <p>
            <strong>2. Project Owners:</strong> Add a <code>SUDO.md</code> file
            to your repository or system. Define which operations are risky and
            what verification level they require.
          </p>
        </div>
      </div>
    </Section>
  );
}
