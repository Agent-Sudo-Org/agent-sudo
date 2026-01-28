import React from 'react';

export default function Footer() {
  return (
    <footer className="px-6 py-12 text-center text-sm text-gray-600 dark:text-gray-400 mt-24 bg-gray-50 dark:bg-gray-900/40 border-t border-gray-100 dark:border-gray-800">
      <p>
        Copyright © {new Date().getFullYear()} Agent-Sudo Project
        <br />
        An open protocol for AI Agent Safety.{' '}
        <a
          href="https://github.com/Agent-Sudo-Org/agent-sudo"
          target="_blank"
          className="underline hover:no-underline"
        >
          View on GitHub
        </a>
        .
      </p>
    </footer>
  );
}
