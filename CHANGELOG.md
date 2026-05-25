# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- `LICENSE` (MIT).
- `SECURITY.md` with vulnerability disclosure policy and scope.
- `CONTRIBUTING.md` with blocklist contribution guidelines and evidence requirements.
- `CODE_OF_CONDUCT.md` (Contributor Covenant v2.1).
- Hardened `.gitignore` covering build artifacts, editor files, env files, and OS files.
- `tsup` for dual ESM/CJS build with type declarations.
- `tsup.config.ts` build configuration.
- Strict `tsconfig.json` (ES2022, NodeNext, `strict`, `noUncheckedIndexedAccess`, etc.).
- Publishable `package.json` with `@umharu/aptos-phishing-detect` scope, `exports` map, and `files` whitelist.
- `engines.node >=20.0.0`.

### Changed

- Untracked `node_modules/` from version control.
- All relative imports in `src/` use explicit `.js` extensions (already in place; confirmed compatible with NodeNext).
- Data files (`blocklist.json`, `allowlist.json`) now imported as JSON modules instead of runtime `fs.readFileSync` calls.
