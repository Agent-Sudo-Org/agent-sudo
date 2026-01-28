import React, { useState } from 'react';
import Section from '@/components/Section';

type Tab =
  | 'spec'
  | 'parser'
  | 'interceptor'
  | 'friction'
  | 'behaviors'
  | 'advanced';

const SPEC_SECTIONS: Record<Tab, { title: string; content: React.ReactNode }> =
  {
    spec: {
      title: 'SUDO.md Format',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            The <code>SUDO.md</code> file uses YAML format and should be placed
            at the repository root. Frameworks implementing this protocol MUST
            parse this file and enforce the defined rules.
          </p>
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400">SUDO.md Schema</span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm text-gray-100 leading-relaxed">
              <code>{`version: "1.0"                    # Required: Protocol version
inherit: true                     # Optional: Inherit from parent SUDO.md (default: true)
default_level: "L1"               # Optional: Default risk level if no rule matches

security_rules:                   # Required: Array of rules
  - pattern: "regex"              # Match by regex pattern
    command: "glob"               # OR match by command glob
    tool: "tool_name"             # OR match by tool name
    path: "/path/*"               # OR match by file path

    risk_level: "L0|L1|L2|L3|L4"  # Required: Risk classification
    environment: "production"     # Optional: Only apply in this environment

    # Optional: Friction configuration
    challenge: "none|confirm|timeout|semantic_echo|strong_auth"
    delay_seconds: 5              # For L2: timeout duration
    semantic_key: "delete-prod"   # For L3: text user must type
    auth_methods: ["passkey", "totp"]  # For L4: allowed methods
    message: "Warning message"    # Display to user

    # Optional: Conditions & Fallback
    condition: "amount > 100"     # Dynamic evaluation
    fallback_level: "L3"          # If L4 fails, fall back to this level`}</code>
            </pre>
          </div>
        </div>
      ),
    },
    parser: {
      title: '1. Parser',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Frameworks implementing SUDO.md protocol MUST include a parser that:
          </p>
          <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
            <li>
              Searches for <code>SUDO.md</code> in the repository root (or
              nearest parent directory)
            </li>
            <li>Parses YAML frontmatter respecting the schema above</li>
            <li>
              Validates <code>version</code> field for forward compatibility
            </li>
            <li>
              Loads rules into an in-memory structure for efficient matching
            </li>
          </ul>
          <div className="bg-gray-900 rounded-lg overflow-hidden mt-4">
            <div className="px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400">
                Pseudocode: Parser Interface
              </span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm text-gray-100 leading-relaxed">
              <code>{`interface SudoConfig {
  version: string;
  security_rules: SecurityRule[];
}

interface SecurityRule {
  pattern?: RegExp;
  command?: string;
  tool?: string;
  path?: string;
  risk_level: "L0" | "L1" | "L2" | "L3" | "L4";
  challenge?: ChallengeType;
  delay_seconds?: number;
  semantic_key?: string;
  message?: string;
  condition?: string;
}

// Frameworks MUST implement:
function loadSudoConfig(repoRoot: string): SudoConfig | null;
function findMatchingRule(action: ToolCall, config: SudoConfig): SecurityRule | null;`}</code>
            </pre>
          </div>
        </div>
      ),
    },
    interceptor: {
      title: '2. Interceptor',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Frameworks MUST intercept tool/command execution and evaluate
            against loaded rules BEFORE execution occurs.
          </p>
          <div className="bg-gray-900 rounded-lg overflow-hidden mt-4">
            <div className="px-4 py-2 bg-gray-800 border-b border-gray-700">
              <span className="text-sm text-gray-400">
                Pseudocode: Interceptor Flow
              </span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm text-gray-100 leading-relaxed">
              <code>{`function onToolExecute(toolCall: ToolCall): ExecutionResult {
  const config = loadSudoConfig(getCurrentRepoRoot());

  if (!config) {
    return executeNormally(toolCall);  // No SUDO.md, pass through
  }

  const rule = findMatchingRule(toolCall, config);

  if (!rule || rule.risk_level === "L0") {
    return executeNormally(toolCall);  // Low risk, pass through
  }

  // Trigger friction based on risk level
  const verified = presentFrictionChallenge(rule, toolCall);

  if (verified) {
    return executeNormally(toolCall);
  } else {
    return { blocked: true, reason: "User declined or failed verification" };
  }
}`}</code>
            </pre>
          </div>
        </div>
      ),
    },
    friction: {
      title: '3. Friction Levels',
      content: (
        <div className="space-y-4">
          <p className="text-gray-600 dark:text-gray-400">
            Frameworks MUST implement friction mechanisms for each risk level:
          </p>

          <div className="space-y-4 mt-4">
            <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
              <h4 className="font-semibold text-green-800 dark:text-green-300">
                L0: Pass-through
              </h4>
              <p className="text-sm text-green-700 dark:text-green-400">
                No friction. Execute immediately without user interaction.
              </p>
            </div>

            <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <h4 className="font-semibold text-blue-800 dark:text-blue-300">
                L1: Simple Confirmation
              </h4>
              <p className="text-sm text-blue-700 dark:text-blue-400">
                Standard Yes/No dialog. User can approve with a single
                click/keystroke.
              </p>
            </div>

            <div className="bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg p-4">
              <h4 className="font-semibold text-yellow-800 dark:text-yellow-300">
                L2: Temporal Friction ⏳
              </h4>
              <p className="text-sm text-yellow-700 dark:text-yellow-400">
                Confirm button MUST be disabled for <code>delay_seconds</code>{' '}
                (default: 5s). Countdown MUST be visible.
              </p>
            </div>

            <div className="bg-orange-50 dark:bg-orange-900/20 border border-orange-200 dark:border-orange-800 rounded-lg p-4">
              <h4 className="font-semibold text-orange-800 dark:text-orange-300">
                L3: Cognitive Friction 🧠
              </h4>
              <p className="text-sm text-orange-700 dark:text-orange-400">
                User MUST type the exact <code>semantic_key</code> to confirm.
              </p>
            </div>

            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4">
              <h4 className="font-semibold text-red-800 dark:text-red-300">
                L4: Strong Authentication 🔐
              </h4>
              <p className="text-sm text-red-700 dark:text-red-400 mb-2">
                MUST require out-of-band or multi-factor authentication.
                Supported methods:
              </p>
              <ul className="text-sm text-red-700 dark:text-red-400 list-disc list-inside ml-2">
                <li>
                  <strong>Passkey / WebAuthn</strong>: TouchID, FaceID, Security
                  Key
                </li>
                <li>
                  <strong>TOTP</strong>: Google Authenticator, Authy, 1Password
                </li>
                <li>
                  <strong>Hardware Token</strong>: YubiKey OTP
                </li>
                <li>
                  <strong>Push Notification</strong>: Duo, Microsoft
                  Authenticator
                </li>
                <li>
                  <strong>SMS / Email OTP</strong>: (Lower security, but an
                  option)
                </li>
              </ul>
            </div>
          </div>
        </div>
      ),
    },
    behaviors: {
      title: '4. Implementation',
      content: (
        <div className="space-y-6">
          <p className="text-gray-600 dark:text-gray-400">
            Detailed behavioral requirements for each friction level:
          </p>

          {/* L1 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-blue-800 border-b border-gray-700">
              <span className="text-sm text-white font-semibold">
                L1: Simple Confirmation
              </span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm text-gray-100 leading-relaxed">
              <code>{`function handleL1(rule: SecurityRule, action: ToolCall): boolean {
  // Display warning message
  showDialog({
    title: "⚠️ Confirm Action",
    message: rule.message || \`Execute: \${action.name}?\`,
    buttons: ["Cancel", "Confirm"]
  });

  // Return true if user clicks "Confirm"
  return waitForUserChoice() === "Confirm";
}

// CLI Example:
// ⚠️ Confirm Action
// Execute: UPDATE users SET status='inactive'
// [Cancel] [Confirm]`}</code>
            </pre>
          </div>

          {/* L2 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-yellow-700 border-b border-gray-700">
              <span className="text-sm text-white font-semibold">
                L2: Temporal Friction (5-Second Delay)
              </span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm text-gray-100 leading-relaxed">
              <code>{`function handleL2(rule: SecurityRule, action: ToolCall): boolean {
  const delay = rule.delay_seconds || 5;

  showDialog({
    title: "⏳ High-Risk Action Detected",
    message: rule.message || action.name,
    confirmButton: {
      text: "Confirm",
      disabled: true  // MUST start disabled
    }
  });

  // Countdown MUST be visible to user
  for (let i = delay; i > 0; i--) {
    updateCountdown(i);  // Show: "Wait 5s... 4s... 3s..."
    sleep(1000);
  }

  enableConfirmButton();  // Only enable AFTER countdown

  return waitForUserChoice() === "Confirm";
}

// CLI Example:
// ⏳ High-Risk Action Detected
// Action: systemctl restart nginx
//
// ⏳ Please wait: 5... 4... 3... 2... 1...
//
// [Cancel] [Confirm]  <- Button now clickable`}</code>
            </pre>
          </div>

          {/* L3 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-orange-700 border-b border-gray-700">
              <span className="text-sm text-white font-semibold">
                L3: Semantic Echo (Type to Confirm)
              </span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm text-gray-100 leading-relaxed">
              <code>{`function handleL3(rule: SecurityRule, action: ToolCall): boolean {
  // Generate or use predefined semantic key
  const key = rule.semantic_key || generateSemanticKey(action);
  // e.g., "delete-users-prod" or "drop-table-orders"

  showDialog({
    title: "🧠 Destructive Action - Proof of Intent Required",
    message: rule.message || action.name,
    input: {
      label: \`Type "\${key}" to confirm:\`,
      placeholder: key
    },
    confirmButton: { disabled: true }
  });

  // Confirm button ONLY enables when input EXACTLY matches key
  onInputChange((value) => {
    if (value === key) {
      enableConfirmButton();
    } else {
      disableConfirmButton();
    }
  });

  return waitForUserChoice() === "Confirm" && getInputValue() === key;
}

// CLI Example:
// 🧠 Destructive Action - Proof of Intent Required
// Action: DROP TABLE users
//
// Type "drop-users-prod" to confirm:
// > drop-users-prod_  <- Must match exactly
//
// [Cancel] [Confirm]`}</code>
            </pre>
          </div>

          {/* L4 */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-red-700 border-b border-gray-700">
              <span className="text-sm text-white font-semibold">
                L4: Strong Authentication (Multiple Methods)
              </span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm text-gray-100 leading-relaxed">
              <code>{`function handleL4(rule: SecurityRule, action: ToolCall): boolean {
  // L4 allows multiple authentication methods - framework chooses implementation
  const allowedMethods = rule.auth_methods || ["passkey", "totp"];

  showDialog({
    title: "🔐 Critical Action - Strong Authentication Required",
    message: rule.message || action.name,
    authMethods: allowedMethods
  });

  // Framework MUST implement at least ONE of these methods:

  // Option 1: Passkey / WebAuthn (Recommended)
  if (allowedMethods.includes("passkey")) {
    const credential = await navigator.credentials.get({
      publicKey: { challenge, userVerification: "required" }
    });
    if (verifyPasskey(credential)) return true;
  }

  // Option 2: TOTP (Google Authenticator, Authy, etc.)
  if (allowedMethods.includes("totp")) {
    const code = await promptTOTPCode();  // 6-digit code
    if (verifyTOTP(userSecret, code)) return true;
  }

  // Option 3: Hardware Token (YubiKey OTP)
  if (allowedMethods.includes("yubikey")) {
    const otp = await promptYubiKeyOTP();
    if (verifyYubiKeyOTP(otp)) return true;
  }

  // Option 4: Push Notification (Duo, MS Authenticator)
  if (allowedMethods.includes("push")) {
    const approved = await sendPushAndWait(userId);
    if (approved) return true;
  }

  // Option 5: SMS/Email OTP (Lower security fallback)
  if (allowedMethods.includes("sms") || allowedMethods.includes("email")) {
    const otp = await sendOTPAndPrompt("sms");  // 6-digit code
    if (verifyOTP(otp)) return true;
  }

  // All methods failed or declined
  return false;
}

// SUDO.md Example:
// - tool: "transfer_funds"
//   risk_level: "L4"
//   auth_methods: ["passkey", "totp"]  # Only allow these
//   message: "Large fund transfer requires authentication"

// CLI/Web Example:
// 🔐 Critical Action - Strong Authentication Required
// Action: transfer_funds($10,000 -> external_account)
//
// Choose authentication method:
//   [1] Passkey (TouchID / FaceID / Security Key)
//   [2] TOTP (Enter 6-digit code from authenticator app)
//
// > 2
// Enter TOTP code: 123456
// ✅ Authentication successful. Proceeding...`}</code>
            </pre>
          </div>

          {/* Audit Trail */}
          <div className="bg-purple-50 dark:bg-purple-900/20 border border-purple-200 dark:border-purple-800 rounded-lg p-4 mt-6">
            <h4 className="font-semibold text-purple-800 dark:text-purple-300 mb-2">
              📋 Audit Trail (Recommended)
            </h4>
            <p className="text-sm text-purple-700 dark:text-purple-400 mb-2">
              Applications SHOULD log all L2+ verifications for security audit:
            </p>
            <pre className="text-xs bg-gray-900 text-gray-100 p-2 rounded overflow-x-auto">
              {`{
  "timestamp": "2024-01-29T04:15:00Z",
  "action": "DROP TABLE users",
  "risk_level": "L3",
  "verification_method": "semantic_echo",
  "user_input": "drop-users-prod",
  "result": "approved",
  "user_id": "operator@company.com"
}`}
            </pre>
          </div>
        </div>
      ),
    },
    advanced: {
      title: '5. Advanced',
      content: (
        <div className="space-y-6">
          <p className="text-gray-600 dark:text-gray-400">
            Advanced protocol features for complex deployment scenarios:
          </p>

          {/* Environment Awareness */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-indigo-800 border-b border-gray-700">
              <span className="text-sm text-white font-semibold">
                Environment-Specific Rules
              </span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm text-gray-100 leading-relaxed">
              <code>{`# Different friction for dev vs production
security_rules:
  - pattern: "DROP TABLE"
    risk_level: "L4"
    environment: "production"      # L4 only in prod

  - pattern: "DROP TABLE"
    risk_level: "L1"
    environment: "development"     # L1 in dev

# Agent detects environment via:
# - ENV variables (NODE_ENV, RAILS_ENV)
# - Git branch (main/master = production)
# - Hostname patterns
# - Explicit config`}</code>
            </pre>
          </div>

          {/* Inheritance */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-teal-700 border-b border-gray-700">
              <span className="text-sm text-white font-semibold">
                Nested SUDO.md Inheritance
              </span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm text-gray-100 leading-relaxed">
              <code>{`# /project/SUDO.md (root)
version: "1.0"
security_rules:
  - command: "rm -rf"
    risk_level: "L3"

# /project/infra/SUDO.md (subdirectory)
version: "1.0"
inherit: true                    # Default: inherit parent rules
security_rules:
  - command: "kubectl delete"
    risk_level: "L4"             # Additional rule
  - command: "rm -rf"
    risk_level: "L4"             # Override parent: L3 -> L4

# Resolution order:
# 1. Find nearest SUDO.md
# 2. If inherit=true, merge with parent
# 3. Child rules override parent rules for same pattern`}</code>
            </pre>
          </div>

          {/* Fallback */}
          <div className="bg-gray-900 rounded-lg overflow-hidden">
            <div className="px-4 py-2 bg-amber-700 border-b border-gray-700">
              <span className="text-sm text-white font-semibold">
                Fallback Behavior
              </span>
            </div>
            <pre className="p-4 overflow-x-auto text-sm text-gray-100 leading-relaxed">
              <code>{`# Rule with fallback
- tool: "transfer_funds"
  risk_level: "L4"
  auth_methods: ["passkey"]
  fallback_level: "L3"           # If passkey fails/unavailable

# Agent behavior:
function handleWithFallback(rule, action) {
  try {
    if (handleL4(rule, action)) return true;
  } catch (error) {
    if (rule.fallback_level) {
      return handleLevel(rule.fallback_level, action);
    }
  }
  return false;  // No fallback, deny
}

# Fallback chain: L4 -> L3 -> deny (never skip to L1)`}</code>
            </pre>
          </div>

          {/* AGENTS.md Relationship */}
          <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4 mt-4">
            <h4 className="font-semibold text-blue-800 dark:text-blue-300 mb-2">
              📄 Relationship with AGENTS.md
            </h4>
            <div className="text-sm text-blue-700 dark:text-blue-400 space-y-2">
              <p>
                <strong>AGENTS.md</strong>: Provides context, instructions, and
                guidelines for agents.
                <em>&quot;What to do&quot;</em> and{' '}
                <em>&quot;How to work on this project&quot;</em>.
              </p>
              <p>
                <strong>SUDO.md</strong>: Defines safety boundaries and friction
                rules.
                <em>&quot;What to be careful about&quot;</em> and{' '}
                <em>&quot;What requires verification&quot;</em>.
              </p>
              <p className="italic">
                They are complementary. A project can have both files.
              </p>
            </div>
          </div>
        </div>
      ),
    },
  };

export default function IntegrationSection() {
  const [activeTab, setActiveTab] = useState<Tab>('spec');
  const section = SPEC_SECTIONS[activeTab];

  return (
    <Section
      id="protocol"
      title="Protocol Specification"
      className="py-20"
      center
      maxWidthClass="max-w-4xl"
    >
      <p className="text-gray-600 dark:text-gray-400 mb-8">
        Agent-Sudo is an <strong>open protocol</strong> for AI-powered
        applications. If your app uses autonomous agents, implement the{' '}
        <code>SUDO.md</code> standard to protect your infrastructure from
        accidental disasters.
      </p>

      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-6 justify-center">
        {(Object.keys(SPEC_SECTIONS) as Tab[]).map((key) => (
          <button
            key={key}
            onClick={() => setActiveTab(key)}
            className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
              activeTab === key
                ? 'bg-black text-white dark:bg-white dark:text-black'
                : 'bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700'
            }`}
          >
            {SPEC_SECTIONS[key].title}
          </button>
        ))}
      </div>

      {/* Content */}
      <div className="text-left">{section.content}</div>

      <div className="mt-10 p-6 bg-gray-100 dark:bg-gray-800 rounded-lg text-center">
        <h3 className="text-lg font-semibold mb-2">
          Adding SUDO.md to Your Application?
        </h3>
        <p className="text-gray-600 dark:text-gray-400 mb-4">
          Follow this specification to implement the interceptor pattern in your
          app. Questions? Open an issue on GitHub.
        </p>
        <a
          href="https://github.com/Agent-Sudo-Org/agent-sudo"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-5 py-3 rounded-full bg-black text-white dark:bg-white dark:text-black text-sm font-medium hover:opacity-80"
        >
          View Full Spec on GitHub
        </a>
      </div>
    </Section>
  );
}
