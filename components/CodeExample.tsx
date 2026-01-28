import React from 'react';
import ClipboardIcon from './icons/ClipboardIcon';
import CopyIcon from './icons/CopyIcon';

interface CodeExampleProps {
  /** Markdown content to display; falls back to default example if not provided */
  code?: string;
  /** Optional URL for "View on GitHub" link */
  href?: string;
  /** If true, render only the code block without the section wrapper */
  compact?: boolean;
  /** Override Tailwind height classes for the <pre> block */
  heightClass?: string;

  /**
   * When true, vertically center the content and copy button – useful for
   * single-line shell commands shown inside a short container (e.g. FAQ).
   */
  centerVertically?: boolean;
}

export const HERO_AGENTS_MD = `# SUDO.md
version: "1.0"
safety_rules:
  - pattern: "DROP TABLE .*"
    risk_level: "L3"
    message: "⚠️ DATABASE DELETION DETECTED"

  - pattern: "transfer_.*"
    risk_level: "L4"
    auth_required: "biometric"`;

const EXAMPLE_AGENTS_MD = `# Sample SUDO.md file
version: "1.0"

safety_rules:
  # Level 2: High Impact - Requires 5s delay
  - path: "/etc/nginx/*"
    operation: "write"
    risk_level: "L2"
    delay_seconds: 5

  # Level 3: Destructive - Requires semantic confirm
  - command: "kubectl delete pod .*"
    risk_level: "L3"
    challenge: "semantic_echo"

  # Level 4: Critical - Requires Biometric
  - tool: "stripe_refund"
    risk_level: "L4"
    auth: "biometric"`;

/**
 * Very lightly highlight the Markdown without fully parsing it.
 */
function parseMarkdown(md: string): React.ReactNode[] {
  const lines = md.split('\n');
  const elements: React.ReactNode[] = [];

  for (let i = 0; i < lines.length; i++) {
    const line = lines[i];

    // Handle headers or comments
    if (line.startsWith('# ') || line.startsWith('## ')) {
      elements.push(
        <div key={i} className="font-bold">
          {line}
        </div>,
      );
    } else if (line.trim().startsWith('#')) {
      // YAML comments
      elements.push(
        <div key={i} className="text-gray-500 italic">
          {line}
        </div>,
      );
    } else if (line.trim().startsWith('- ')) {
      // List items
      elements.push(<div key={i}>{renderLineWithInlineCode(line)}</div>);
    } else if (line.includes(':')) {
      // Key-value pairs
      const [key, ...rest] = line.split(':');
      const value = rest.join(':');
      elements.push(
        <div key={i}>
          <span className="text-blue-600 dark:text-blue-400">{key}:</span>
          {renderLineWithInlineCode(value)}
        </div>,
      );
    } else if (line.trim() === '') {
      elements.push(<div key={i}>&nbsp;</div>);
    } else {
      elements.push(<div key={i}>{renderLineWithInlineCode(line)}</div>);
    }
  }

  return elements;
}

/**
 * Render a line with inline code highlighting
 */
function renderLineWithInlineCode(line: string): React.ReactNode {
  const parts = line.split(/(`[^`]+`)/g);

  return parts.map((part, index) => {
    if (part.startsWith('`') && part.endsWith('`')) {
      // This is inline code
      return (
        <span key={index} className="bg-gray-200 dark:bg-gray-800 px-1 rounded">
          {part}
        </span>
      );
    }
    // Regular text
    return part;
  });
}

/**
 * Code block for SUDO.md examples.
 */
export default function CodeExample({
  code,
  href,
  compact = false,
  heightClass,
  centerVertically = false,
}: CodeExampleProps) {
  const md = code ?? EXAMPLE_AGENTS_MD;
  const [copied, setCopied] = React.useState(false);

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(md);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy to clipboard:', err);
    }
  };

  const content = (
    <>
      <div className="relative">
        <button
          onClick={copyToClipboard}
          className={`absolute right-3 p-2 rounded-md bg-transparent text-gray-800 dark:text-gray-200 hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors z-10 cursor-pointer ${
            centerVertically ? 'top-1/2 -translate-y-1/2' : 'top-3'
          }`}
          aria-label="Copy to clipboard"
        >
          {copied ? (
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M5 13l4 4L19 7"
              />
            </svg>
          ) : (
            <CopyIcon className="w-4 h-4" />
          )}
        </button>
        <pre
          className={`relative rounded-lg bg-white dark:bg-black text-gray-800 dark:text-gray-100 text-xs leading-6 overflow-x-auto p-4 ${
            centerVertically ? 'flex items-center' : ''
          } ${
            heightClass
              ? heightClass
              : compact
              ? ''
              : 'min-h-[250px] max-h-[500px]'
          } border border-gray-200 dark:border-gray-700 shadow-sm`}
        >
          <code>{parseMarkdown(md)}</code>
        </pre>
      </div>
    </>
  );

  if (compact) {
    return <div className="w-full">{content}</div>;
  }

  return (
    <section className="px-6 pt-10 pb-24 bg-gray-50 dark:bg-gray-900/40">
      <div className="max-w-5xl mx-auto flex flex-col gap-6">
        <h2 className="text-3xl font-semibold tracking-tight">
          Agent-Sudo in action
        </h2>
        {content}
      </div>
    </section>
  );
}
