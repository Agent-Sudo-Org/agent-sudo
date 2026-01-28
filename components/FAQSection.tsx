import React from 'react';
import Section from '@/components/Section';
import CodeExample from '@/components/CodeExample';

interface FAQItem {
  question: string;
  answer: React.ReactNode;
}

export default function FAQ() {
  const faqItems: FAQItem[] = [
    {
      question: 'What problem does Agent-Sudo solve?',
      answer: (
        <>
          <p className="mb-2">
            <strong>Alert Fatigue.</strong> Traditional Human-in-the-Loop (HITL)
            prompts degenerate into &quot;Click Yes Without Looking&quot;. When
            users are prompted for every action, they develop muscle memory and
            approve without reading. The human is in the loop, but the{' '}
            <em>brain</em> is not.
          </p>
          <p>
            Agent-Sudo solves this by requiring <strong>Proof of Intent</strong>
            , not just Authorization.
          </p>
        </>
      ),
    },
    {
      question: "What is 'Proof of Intent' vs 'Authorization'?",
      answer: (
        <>
          <ul className="list-disc list-inside space-y-1">
            <li>
              <strong>Authorization</strong>: Passive approval. &quot;Click OK
              to continue.&quot; (Easily bypassed by habit)
            </li>
            <li>
              <strong>Proof of Intent</strong>: Active challenge-response. The
              user must perform a distinct, conscious action that proves they
              understand the consequence.
            </li>
          </ul>
        </>
      ),
    },
    {
      question: "What are 'Cognitive Forcing Functions'?",
      answer:
        'Cognitive Forcing Functions are UX mechanisms designed to break users out of autopilot mode. Examples include mandatory time delays (to force reading), semantic echo (typing to confirm), and strong authentication (passkey, TOTP, etc.).',
    },
    {
      question: 'How is this different from sandboxing?',
      answer:
        "Sandboxes block malicious code. Agent-Sudo prevents 'authorized stupidity' — when an agent has legitimate access but makes a catastrophic mistake like deleting a production database due to hallucination.",
    },
    {
      question: 'What are the three types of friction?',
      answer: (
        <>
          <ul className="list-disc list-inside space-y-2">
            <li>
              <strong>⏳ Temporal Friction (L2)</strong>: 5-second mandatory
              cooldown. Button disabled until timer ends. Prevents accidental
              clicks.
            </li>
            <li>
              <strong>🧠 Cognitive Friction (L3)</strong>: Semantic Echo. User
              must type the action to confirm (e.g., &quot;delete-prod&quot;).
              Forces reading and understanding.
            </li>
            <li>
              <strong>🔐 Strong Authentication (L4)</strong>: Passkey, TOTP,
              YubiKey, Push Notification, or SMS/Email. Frameworks choose which
              methods to support for critical operations.
            </li>
          </ul>
        </>
      ),
    },
    {
      question: 'How do I add SUDO.md to my project?',
      answer: (
        <>
          <p className="mb-2">
            Create a <code>SUDO.md</code> file at the root of your repository:
          </p>
          <div className="w-full flex justify-center">
            <CodeExample
              code={`version: "1.0"
security_rules:
  - pattern: "DROP TABLE"
    risk_level: "L3"
    challenge: "semantic_echo"
  - command: "rm -rf /"
    risk_level: "L4"
    auth: "biometric"`}
              compact
              heightClass="min-h-[140px]"
              centerVertically
            />
          </div>
        </>
      ),
    },
    {
      question: 'Who should adopt SUDO.md?',
      answer:
        'Two groups: (1) Agent developers — implement SUDO.md parsing and friction UI in your agent. (2) Project/system owners — add SUDO.md files to define rules for your specific project. Agents that support the protocol will enforce your rules.',
    },
    {
      question: 'How does SUDO.md relate to AGENTS.md?',
      answer:
        'They are complementary. AGENTS.md provides context and instructions for how agents should work on your project. SUDO.md defines safety boundaries and friction rules. Think of AGENTS.md as "what to do" and SUDO.md as "what to be careful about".',
    },
    {
      question: "What if an agent doesn't support SUDO.md?",
      answer:
        "That's the agent developer's choice. Projects can only enforce rules with agents that implement the protocol. We encourage agent developers to adopt SUDO.md to build user trust.",
    },
    {
      question: 'Can I have different rules for dev vs production?',
      answer: (
        <>
          Yes. Use the <code>environment</code> field in your rules:
          <pre className="mt-2 text-xs bg-gray-100 dark:bg-gray-800 p-2 rounded">
            {`- pattern: "DROP TABLE"
  risk_level: "L4"
  environment: "production"  # Only L4 in prod

- pattern: "DROP TABLE"
  risk_level: "L1"
  environment: "development"  # L1 in dev`}
          </pre>
        </>
      ),
    },
    {
      question: 'How do nested SUDO.md files work?',
      answer:
        'The nearest SUDO.md takes precedence. Rules from parent directories are inherited, but child directories can override them. This allows monorepos to have project-level rules while subdirectories can have stricter (or looser) rules.',
    },
    {
      question: 'Is there an emergency bypass?',
      answer:
        'The protocol does not define a global bypass. However, project owners can define an "emergency_override" rule that requires L4 authentication. This is a "break glass" scenario for critical situations.',
    },
    {
      question: 'Is Agent-Sudo open source?',
      answer:
        'Yes! Agent-Sudo is an open protocol. The specification and reference implementations are freely available on GitHub under MIT license.',
    },
  ];

  return (
    <Section
      id="faq"
      title="FAQ"
      className="py-20"
      center
      maxWidthClass="max-w-3xl"
    >
      <div className="space-y-8 max-w-4xl mx-auto">
        {faqItems.map((item, index) => (
          <div key={index}>
            <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
              {item.question}
            </h3>
            <div className="text-gray-600 dark:text-gray-400 leading-relaxed">
              {item.answer}
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
}
