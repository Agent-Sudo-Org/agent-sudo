import React from 'react';
import CodeExample, { HERO_AGENTS_MD } from '@/components/CodeExample';
import GitHubIcon from '@/components/icons/GitHubIcon';

export default function Hero() {
  return (
    <header className="px-6 py-20 bg-gray-50 dark:bg-gray-900/40 border-b border-gray-100 dark:border-gray-800">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-10 items-start">
        {/*
          On large screens we want the primary CTA buttons to align with the
          bottom edge of the code block rendered in the right column. Making
          the left column a full-height flex container and pushing the CTA row
          to the bottom (via `lg:justify-between`) achieves this without
          disturbing the natural flow on small screens where the layout stacks
          vertically.
        */}
        <div className="flex flex-col items-start text-left sm:items-start max-w-prose">
          <h1 className="text-5xl md:text-6xl font-bold tracking-tight">
            Agent-Sudo
          </h1>

          <p className="mt-2 text-lg leading-relaxed text-gray-700 dark:text-gray-300">
            The <strong>Safety Interceptor</strong> for Autonomous Agents.
            <br className="hidden sm:block" />
            Adaptive High-Friction Guardrails to prevent accidental production
            disasters.
          </p>

          <p className="mt-3 text-lg leading-relaxed text-gray-700 dark:text-gray-300 pr-4">
            Prevent your agent from accidentally dropping the production
            database or transferring funds without authorization. Think of it as{' '}
            <strong>sudo for AI</strong>.
          </p>

          <div className="mt-6 flex gap-4 flex-col sm:flex-row w-full sm:w-auto justify-center sm:justify-start">
            {/* Primary CTA — scroll to the Protocol Specification section */}
            <a
              href="#protocol"
              className="inline-block px-5 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-medium text-center hover:opacity-80"
            >
              Read the Spec
            </a>
            {/* Secondary CTA — view on GitHub */}
            <a
              href="https://github.com/Agent-Sudo-Org/agent-sudo"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-full border border-gray-300 dark:border-gray-600 text-sm font-medium text-gray-900 dark:text-gray-100 hover:bg-gray-100 dark:hover:bg-gray-800"
            >
              <GitHubIcon className="w-4 h-4 text-current" />
              View on GitHub
            </a>
          </div>
        </div>
        <div className="w-full md:max-w-none">
          <CodeExample
            compact
            heightClass="min-h-[160px] max-h-[300px]"
            code={HERO_AGENTS_MD}
            href="https://github.com/Agent-Sudo-Org/agent-sudo"
          />
        </div>
      </div>
    </header>
  );
}
