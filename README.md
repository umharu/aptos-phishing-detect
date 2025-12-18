# aptos-phishing-detect 🛡️

Community-maintained phishing detection lists and utilities for the **Aptos ecosystem**.

This project is inspired by MetaMask’s `eth-phishing-detect` and aims to provide a **shared, auditable, and reusable source of truth** for detecting phishing and scam domains targeting **Aptos users and wallets (e.g. Petra)**.

---

## 🚨 What is this?

`aptos-phishing-detect` provides:

- ✅ A **curated blocklist** of known phishing / scam domains
- ✅ An optional **allowlist** of known-good official domains
- ✅ A small **TypeScript detection library** to:
  - normalize URLs / hostnames
  - match exact and subdomain phishing attempts
- ✅ Tooling and validation to keep the data clean and safe

This repository **does not run a server** and **does not block anything by itself**.  
It is designed to be **consumed by wallets, browser extensions, and dApps**.

---

## 🎯 Goals

- Protect **Aptos wallet users** from phishing attacks
- Avoid every wallet or dApp reinventing phishing detection
- Provide a transparent, auditable, community-driven dataset
- Enable future integration into wallets like Petra

---

## 🧱 Repository structure
```
aptos-phishing-detect/
├─ data/
│ ├─ blocklist.json # Known malicious domains
│ ├─ allowlist.json # Known-good official domains
│
├─ src/
│ ├─ normalize.ts # Hostname normalization
│ ├─ check.ts # Detection logic
│ ├─ types.ts # Shared types
│ └─ index.ts # Public API
│
├─ scripts/
│ └─ validate.ts # List validation (CI)
│
└─ .github/workflows/
└─ ci.yml
```

---

## 📦 Data format

### `blocklist.json`
```json
{
  "version": 1,
  "updatedAt": "2025-12-18",
  "domains": {
    "example-phish.com": {
      "reason": "Fake Petra wallet asking for seed phrase",
      "source": "community-report",
      "addedAt": "2025-12-18"
    }
  }
}
```
allowlist.json
Allowlist overrides the blocklist if both match.

---

🧠 Detection logic (high level)
Input can be:

full URL (https://bad.site/path)

hostname (bad.site)

Domains are normalized:

lowercase

no scheme

no path / query / fragment

Matching rules:

exact match (bad.site)

parent match (sub.bad.site → bad.site)

Priority:

Allowlist

Blocklist

---

🧪 Usage (Node / tooling)
```
ts

import { check, isBlocked } from "aptos-phishing-detect";

check("https://sub.example.com");
/*
{
  hostname: "sub.example.com",
  blocked: true,
  match: "example.com",
  reason: "test"
}
*/
```
This library is intended for:

build-time checks

backend tooling

security extensions

wallet / dApp integrations

---

🧩 Intended consumers
🦊 Wallets (Petra, others)

🧩 Browser security extensions

🌐 Aptos dApps (pre-connect warnings)

🛡️ Security tooling & research

🤝 Contributing
Contributions are welcome, but quality matters more than quantity.

Adding a domain to the blocklist requires:
Clear evidence (screenshots, archive links, transaction proof)

Description of the attack (seed phrase prompt, fake airdrop, etc.)

Date observed

No speculation or low-confidence entries

Please read CONTRIBUTING.md before submitting a PR.

---

🔒 Security
If you discover a sensitive issue or coordinated phishing campaign,
please report it privately.
See SECURITY.md for contact details.

---

⚠️ Disclaimer
This project provides best-effort threat intelligence.

Presence in the blocklist does not guarantee malicious intent forever

Absence from the blocklist does not guarantee safety

Always apply defense-in-depth.

🧭 Roadmap
 Issue templates for phishing reports

 Chrome extension (MV3) consuming this list

 Signed list snapshots

 Optional npm publishing

 Wallet integration proposals

---

Built with ❤️ by maximilian0.eth