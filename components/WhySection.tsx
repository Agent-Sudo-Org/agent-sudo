import Section from '@/components/Section';
import React from 'react';

export default function WhySection() {
  return (
    <Section
      id="why"
      title="Why SUDO.md?"
      className="pt-24 pb-12"
      center
      maxWidthClass="max-w-4xl"
    >
      <div className="space-y-6">
        {/* The Core Distinction */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
          <div className="bg-gray-100 dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-gray-500 dark:text-gray-400 mb-2">
              ❌ Traditional HITL
            </h3>
            <p className="text-2xl font-bold text-gray-700 dark:text-gray-300 mb-3">
              &quot;Do you agree?&quot;
            </p>
            <p className="text-sm text-gray-500 dark:text-gray-400">
              Passive approval. User clicks Yes 1000 times → muscle memory →
              clicks Yes on the 1001st destructive action without reading.
            </p>
            <p className="text-xs text-gray-400 mt-2 italic">
              Human is in the loop, but the brain is not.
            </p>
          </div>

          <div className="bg-green-50 dark:bg-green-900/20 border border-green-300 dark:border-green-700 rounded-lg p-5">
            <h3 className="text-lg font-semibold text-green-600 dark:text-green-400 mb-2">
              ✅ SUDO.md Protocol
            </h3>
            <p className="text-2xl font-bold text-green-700 dark:text-green-300 mb-3">
              &quot;Prove you mean it.&quot;
            </p>
            <p className="text-sm text-green-600 dark:text-green-400">
              Active challenge-response. User must wait 5s / type confirmation /
              use biometric — cannot bypass with a mindless click.
            </p>
            <p className="text-xs text-green-500 mt-2 italic">
              Cognitive Forcing Functions that wake users up.
            </p>
          </div>
        </div>

        {/* The Problem */}
        <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
          <h3 className="font-semibold text-red-800 dark:text-red-300 mb-2">
            ⚠️ The Problem: Sandboxing Is Not Enough
          </h3>
          <p className="text-sm text-red-700 dark:text-red-400">
            Sandboxes prevent <strong>malicious code escape</strong>. But AI
            agents are <strong>authorized users</strong>. When Codex
            misunderstands your intent and decides to{' '}
            <code>DROP TABLE users</code>, the sandbox won&apos;t stop it —
            because Codex has permission.
          </p>
        </div>

        {/* The Solution */}
        <div>
          <h3 className="text-xl font-semibold mb-4 text-center">
            The Solution: Adaptive High-Friction Guardrails
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4 text-center">
              <span className="text-3xl">⏳</span>
              <h4 className="font-semibold mt-2">L2: Temporal</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                5-second mandatory cooldown. Forces slow thinking.
              </p>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4 text-center">
              <span className="text-3xl">🧠</span>
              <h4 className="font-semibold mt-2">L3: Cognitive</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Type to confirm. Forces reading and understanding.
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 text-center">
              <span className="text-3xl">🔐</span>
              <h4 className="font-semibold mt-2">L4: Strong Auth</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Passkey, TOTP, YubiKey. Out-of-band verification.
              </p>
            </div>
          </div>
        </div>

        {/* The Standard */}
        <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
          <h3 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
            📄 SUDO.md: A Standard for AI Safety Rules
          </h3>
          <p className="text-sm text-blue-700 dark:text-blue-400">
            Like <code>robots.txt</code> tells crawlers &quot;don&apos;t scrape
            here&quot;,
            <code>SUDO.md</code> tells AI agents &quot;be careful here&quot;.
            Project-level, version-controlled, cross-agent compatible.
          </p>
        </div>
      </div>
    </Section>
  );
}
