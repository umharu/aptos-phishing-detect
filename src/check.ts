import type { DomainListFile, Verdict } from "./types.js";
import { getDomainCandidates, normalizeHostname } from "./normalize.js";

import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

// Resolve __dirname in ESM
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

function loadJson<T>(relativePath: string): T {
  const fullPath = path.join(__dirname, "..", relativePath);
  const raw = fs.readFileSync(fullPath, "utf8");
  return JSON.parse(raw) as T;
}

// Load lists
const BL = loadJson<DomainListFile>("data/blocklist.json");
const AL = loadJson<DomainListFile>("data/allowlist.json");

function findMatch(
  domains: Record<string, any>,
  hostname: string
): { match?: string; entry?: any } {
  for (const candidate of getDomainCandidates(hostname)) {
    const entry = domains[candidate];
    if (entry) {
      return { match: candidate, entry };
    }
  }
  return {};
}

export function check(input: string): Verdict {
  const hostname = normalizeHostname(input);

  if (!hostname) {
    return {
      input,
      hostname: null,
      allowed: false,
      blocked: false
    };
  }

  // Allowlist has priority
  const allow = findMatch(AL.domains, hostname);
  if (allow.match) {
    return {
      input,
      hostname,
      allowed: true,
      blocked: false,
      match: allow.match
    };
  }

  const block = findMatch(BL.domains, hostname);
  if (block.match) {
    return {
      input,
      hostname,
      allowed: false,
      blocked: true,
      match: block.match,
      reason: block.entry?.reason
    };
  }

  return {
    input,
    hostname,
    allowed: false,
    blocked: false
  };
}

export function isBlocked(input: string): boolean {
  return check(input).blocked;
}

export function isAllowed(input: string): boolean {
  return check(input).allowed;
}
