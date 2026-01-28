import React from 'react';

interface FAQItem {
  question: string;
  answer: string;
}

interface JsonLdProps {
  faqItems?: FAQItem[];
}

export default function JsonLd({ faqItems }: JsonLdProps) {
  // Use custom domain if set, otherwise use Vercel's auto-generated URL
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL ||
    (process.env.NEXT_PUBLIC_VERCEL_URL
      ? `https://${process.env.NEXT_PUBLIC_VERCEL_URL}`
      : '');

  // Organization Schema
  const organizationSchema = {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    'name': 'Agent-Sudo',
    ...(siteUrl && { url: siteUrl }),
    ...(siteUrl && { logo: `${siteUrl}/og.png` }),
    'description':
      'Agent-Sudo is a safety protocol for autonomous AI agents that provides adaptive high-friction guardrails to prevent accidental production disasters.',
    'sameAs': ['https://github.com/Agent-Sudo-Org/agent-sudo'],
  };

  // SoftwareApplication Schema
  const softwareSchema = {
    '@context': 'https://schema.org',
    '@type': 'SoftwareApplication',
    'name': 'Agent-Sudo',
    'applicationCategory': 'DeveloperApplication',
    'operatingSystem': 'Any',
    'description':
      'Adaptive High-Friction Guardrails for Autonomous Agents - A safety protocol that requires Proof of Intent, not just Authorization.',
    'offers': {
      '@type': 'Offer',
      'price': '0',
      'priceCurrency': 'USD',
    },
    'license': 'https://opensource.org/licenses/MIT',
  };

  // FAQ Schema
  const faqSchema = faqItems
    ? {
        '@context': 'https://schema.org',
        '@type': 'FAQPage',
        'mainEntity': faqItems.map((item) => ({
          '@type': 'Question',
          'name': item.question,
          'acceptedAnswer': {
            '@type': 'Answer',
            'text': item.answer,
          },
        })),
      }
    : null;

  // WebSite Schema with SearchAction
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    'name': 'Agent-Sudo',
    ...(siteUrl && { url: siteUrl }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(organizationSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(softwareSchema),
        }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(websiteSchema),
        }}
      />
      {faqSchema && (
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(faqSchema),
          }}
        />
      )}
    </>
  );
}

// FAQ items for structured data (text-only versions)
export const faqItemsForSchema: FAQItem[] = [
  {
    question: 'What problem does Agent-Sudo solve?',
    answer:
      'Alert Fatigue. Traditional Human-in-the-Loop (HITL) prompts degenerate into "Click Yes Without Looking". Agent-Sudo solves this by requiring Proof of Intent, not just Authorization.',
  },
  {
    question: "What is 'Proof of Intent' vs 'Authorization'?",
    answer:
      'Authorization is passive approval like clicking OK. Proof of Intent is active challenge-response where users must perform a distinct, conscious action that proves they understand the consequence.',
  },
  {
    question: 'How is this different from sandboxing?',
    answer:
      "Sandboxes block malicious code. Agent-Sudo prevents 'authorized stupidity' — when an agent has legitimate access but makes a catastrophic mistake like deleting a production database.",
  },
  {
    question: 'What are the three types of friction?',
    answer:
      'L2 Temporal Friction: 5-second mandatory cooldown. L3 Cognitive Friction: Semantic Echo where users must type to confirm. L4 Strong Authentication: Passkey, TOTP, YubiKey, or biometric verification.',
  },
  {
    question: 'How do I add SUDO.md to my project?',
    answer:
      'Create a SUDO.md file at the root of your repository with YAML format defining security_rules including pattern, risk_level, and challenge type.',
  },
  {
    question: 'Who should adopt SUDO.md?',
    answer:
      'Two groups: Agent developers who implement SUDO.md parsing and friction UI, and Project/system owners who add SUDO.md files to define rules for their specific projects.',
  },
  {
    question: 'Is Agent-Sudo open source?',
    answer:
      'Yes! Agent-Sudo is an open protocol. The specification and reference implementations are freely available on GitHub under MIT license.',
  },
];
