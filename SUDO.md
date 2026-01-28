version: "1.0"
security_rules:
  # L3: Database deletion protection
  - pattern: "(DROP|DELETE) .* (users|orders)"
    risk_level: "L3"
    challenge: "semantic_echo"
    message: "⚠️ You are about to delete user data."

  # L2: System restart protection
  - command: "systemctl restart .*"
    risk_level: "L2"
    delay_seconds: 5

  # L4: Large transaction protection
  - tool: "transfer_funds"
    condition: "amount > 50"
    risk_level: "L4"
    auth: "biometric"
