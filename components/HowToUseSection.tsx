import Section from '@/components/Section';
import React from 'react';

export default function HowToUseSection() {
  const steps = [
    {
      title: 'Add SUDO.md to your repository',
      body: (
        <>
          Create a <code>SUDO.md</code> file at the root of your repository.
          This file defines the safety boundaries for any AI agent operating on
          your codebase.
        </>
      ),
    },
    {
      title: 'Define your risk levels',
      body: (
        <>
          <p className="mb-2">Specify which operations require guardrails:</p>
          <ul className="list-disc list-inside ml-4 space-y-1">
            <li>
              <strong>L0</strong>: Pass-through (read operations)
            </li>
            <li>
              <strong>L1</strong>: Simple confirmation (local writes)
            </li>
            <li>
              <strong>L2</strong>: Time-lock (5s delay for cloud ops)
            </li>
            <li>
              <strong>L3</strong>: Semantic echo (type to confirm)
            </li>
            <li>
              <strong>L4</strong>: Biometric lock (production access)
            </li>
          </ul>
        </>
      ),
    },
    {
      title: 'Add security rules',
      body: 'Define regex patterns for high-risk commands like `DROP TABLE`, `rm -rf`, or API calls to production endpoints. Agent-Sudo will intercept and require confirmation before execution.',
    },
    {
      title: 'Large project? Use nested SUDO.md files',
      body: (
        <>
          Place additional <code>SUDO.md</code> files inside subdirectories. The
          nearest file takes precedence, allowing each microservice or package
          to have its own safety rules.
        </>
      ),
    },
  ];

  return (
    <Section
      title="How to use SUDO.md?"
      className="py-12"
      center
      maxWidthClass="max-w-3xl"
    >
      <div className="space-y-6 text-left">
        {steps.map((s, idx) => (
          <div key={idx}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {idx + 1}. {s.title}
            </h3>
            <div className="text-gray-700 dark:text-gray-300">{s.body}</div>
          </div>
        ))}
      </div>
    </Section>
  );
}
