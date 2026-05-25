# Contributing to aptos-phishing-detect

Thank you for helping protect the Aptos ecosystem. This document explains how
to contribute to the blocklist, the allowlist, and the codebase.

---

## Table of Contents

- [Proposing a domain addition to the blocklist](#proposing-a-domain-addition-to-the-blocklist)
- [Reporting active phishing campaigns privately](#reporting-active-phishing-campaigns-privately)
- [Proposing a domain removal (false positives)](#proposing-a-domain-removal-false-positives)
- [Running the project locally](#running-the-project-locally)
- [Commit style](#commit-style)
- [Branch naming](#branch-naming)
- [Review process](#review-process)

---

## Proposing a domain addition to the blocklist

Open a pull request that edits `data/blocklist.json`. Your PR description
**must** include all of the following:

### Required evidence

1. **Screenshot** with the full URL clearly visible in the browser address bar.
2. **Archived snapshot** — a link from [archive.org](https://web.archive.org)
   or [archive.today](https://archive.today) of the phishing page.
3. **Transaction hash** (if applicable) — on-chain evidence of a drain,
   fake airdrop, or malicious contract interaction.

### Blocklist entry format

Each domain in `data/blocklist.json` must follow this shape exactly:

```json
"example-phish.com": {
  "reason": "Fake Petra wallet asking for seed phrase",
  "source": "community-report",
  "addedAt": "2026-01-15",
  "category": "fake-seed-prompt"
}
```

Field requirements:

- **Key**: the domain itself, in lowercase, without scheme, path, or trailing dot.
- **`reason`**: a short, factual description of the observed behavior. Avoid speculation.
- **`source`**: one of `community-report`, `security-researcher`, `wallet-team-report`, or `partner-feed`.
- **`addedAt`**: ISO date (`YYYY-MM-DD`) when the entry was added.
- **`category`**: one of the categories listed in the table below.

### Attack description

Classify the attack using one of the following categories, and describe what
you observed:

| Category           | Description                                        |
| ------------------ | -------------------------------------------------- |
| `fake-seed-prompt` | Page asks the user to enter their seed phrase      |
| `fake-airdrop`     | Fraudulent airdrop claiming to distribute tokens   |
| `fake-wallet-ui`   | Impersonates a legitimate wallet interface         |
| `drain-contract`   | Smart contract designed to drain user funds        |
| `other`            | Anything that does not fit the above — describe it |

### Additional fields

- **Date observed** — when you first encountered the phishing site (YYYY-MM-DD).
- **Justification** — a brief explanation of why you consider this domain to be
  phishing, beyond the category label.

PRs without the required evidence will be closed without review.

---

## Reporting active phishing campaigns privately

For **ongoing, large-scale, or sensitive phishing campaigns**, do **not** open
a public PR or issue. Publishing the domain publicly may alert the attacker
and cause them to rotate infrastructure before the list can be updated.

Instead, report the campaign privately through GitHub Security Advisories
(see [SECURITY.md](SECURITY.md)). A maintainer will coordinate with you on:

- Verification of the report.
- The timing of the public addition to the blocklist.
- Whether related infrastructure (parent domains, sibling subdomains, related
  wallet addresses) should be added at the same time.

Use this channel for: active drain campaigns, coordinated multi-domain
operations, or any case where premature disclosure would reduce the
effectiveness of the listing.

---

## Proposing a domain removal (false positives)

If you are the owner of a domain listed in `data/blocklist.json` and believe
its inclusion is an error, open an issue with:

1. Proof of domain ownership (WHOIS record, DNS control, or equivalent).
2. An explanation of the legitimate purpose of the domain.
3. Any context that clarifies why it may have been mistakenly reported.

False-positive reports are reviewed with priority. A maintainer will respond
within 7 days.

---

## Running the project locally

```bash
npm install
npm run build
npm test          # available after Phase 2
npm run validate  # available after Phase 3
```

> `npm test` and `npm run validate` are not yet implemented. They will be added
> in Phase 2 (test suite) and Phase 3 (CI validation tooling) respectively.

---

## Commit style

This project uses [Conventional Commits](https://www.conventionalcommits.org/).

| Prefix   | When to use                                          |
| -------- | ---------------------------------------------------- |
| `feat:`  | New feature or detection capability                  |
| `fix:`   | Bug fix in library or validation logic               |
| `chore:` | Tooling, dependencies, configuration                 |
| `docs:`  | Documentation changes                                |
| `data:`  | Changes to `data/blocklist.json` or `allowlist.json` |

Examples:

```
data: add phishing domain fake-petra-wallet.com
fix: handle trailing dot in hostname normalization
docs: update CONTRIBUTING.md with new evidence requirements
```

---

## Branch naming

Use the following prefixes:

| Prefix   | Purpose                        |
| -------- | ------------------------------ |
| `feat/`  | New features                   |
| `fix/`   | Bug fixes                      |
| `chore/` | Maintenance and tooling        |
| `docs/`  | Documentation                  |
| `data/`  | Blocklist or allowlist changes |

---

## Review process

- All PRs require **at least 1 reviewer** before merging.
- PRs that touch `data/` (blocklist or allowlist changes) **must include
  verifiable evidence** attached to the PR description. PRs without evidence
  will be closed without review.
- Maintainers may request additional evidence or clarification before approving.
- Do not merge your own PRs.
