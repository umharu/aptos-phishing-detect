# Security Policy

## Reporting a Vulnerability

Please **do not** open a public GitHub issue for security vulnerabilities.

Report vulnerabilities privately through GitHub Security Advisories by clicking
**"Report a vulnerability"** on the [Security tab](../../security/advisories/new)
of this repository.

For guidance on the process, see the official GitHub documentation:
[Privately reporting a security vulnerability](https://docs.github.com/en/code-security/security-advisories/guidance-on-reporting-and-writing-information-about-vulnerabilities/privately-reporting-a-security-vulnerability)

## Disclosure Policy

This project follows a **coordinated disclosure** model with a **90-day disclosure
deadline**. After 90 days from initial acknowledgement, the reporter is free to
disclose the vulnerability publicly, whether or not a fix is available. Earlier
coordinated disclosure is encouraged when a fix is ready.

Exceptions may be granted on a case-by-case basis for issues requiring more
complex remediation.

## Scope

### In scope

- The detection library (`src/`)
- The blocklist and allowlist data (`data/`)
- The curation and validation process (`scripts/`)
- The CI/CD pipeline (`.github/workflows/`)

### Out of scope

- The phishing sites listed in the blocklist themselves
- Third-party infrastructure (hosting providers, CDNs, registrars)
- Wallets or dApps that consume this list (report those to their respective teams)
- Vulnerabilities in dependencies — report those upstream

## Response Time

The project is maintained on a best-effort basis by volunteers. The following
targets are aspirational, not contractual:

| Milestone                     | Target (best-effort)                                                |
| ----------------------------- | ------------------------------------------------------------------- |
| Acknowledgement of report     | within 72 hours                                                     |
| Initial triage and assessment | within 7 days                                                       |
| Remediation or mitigation     | coordinated with the reporter, depending on severity and complexity |

## Disclaimer

This project provides **best-effort threat intelligence** maintained by the
community. Inclusion of a domain in the blocklist is based on community-reported
evidence and does **not** constitute a legal determination of wrongdoing by the
domain owner or any affiliated party.

- Presence in the blocklist does not guarantee that a domain is malicious in
  perpetuity. Domains may change ownership or behavior.
- Absence from the blocklist does not guarantee that a domain is safe.
- Consumers of this list (wallets, extensions, dApps) are responsible for their
  own use of the data and should apply defense-in-depth.

If you are the owner of a domain listed here and believe its inclusion is in
error, please open an issue with evidence of legitimacy. False-positive reports
are reviewed with priority.

## Recognition

Reporters who responsibly disclose a valid vulnerability will be acknowledged
publicly in [`CHANGELOG.md`](CHANGELOG.md), unless they request to remain
anonymous. No hall-of-fame or bug bounty program exists at this time.
