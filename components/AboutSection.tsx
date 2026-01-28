import Section from '@/components/Section';

const AboutSection = () => (
  <Section
    title="About Agent-Sudo"
    className="pb-0"
    center
    maxWidthClass="max-w-3xl"
  >
    <p className="max-w-3xl">
      Agent-Sudo is an open protocol designed to add a safety layer between
      autonomous AI agents and critical infrastructure. Inspired by the Unix{' '}
      <code>sudo</code> command, it introduces &ldquo;Adaptive High-Friction
      Guardrails&rdquo; to prevent accidental production disasters.
    </p>

    <p className="max-w-3xl mt-4">
      The <code>SUDO.md</code> standard allows teams to define risk levels
      (L0-L4) for sensitive operations. When an AI agent attempts a high-risk
      action, Agent-Sudo intervenes with the appropriate friction — from simple
      confirmations to biometric authentication.
    </p>

    <p className="max-w-3xl mt-4">
      This project is open source and community-driven. We welcome contributions
      from developers, security researchers, and organizations building with
      autonomous AI agents.{' '}
      <a
        href="https://github.com/Agent-Sudo-Org/agent-sudo"
        className="underline hover:no-underline"
        target="_blank"
        rel="noopener noreferrer"
      >
        Contribute on GitHub &rarr;
      </a>
    </p>
  </Section>
);

export default AboutSection;
