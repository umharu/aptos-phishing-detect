import type { DomainListFile, Verdict } from "./types.js";
import { getDomainCandidates, normalizeHostname } from "./normalize.js";

import blocklistData from "../data/blocklist.json" with { type: "json" };
import allowlistData from "../data/allowlist.json" with { type: "json" };

const BL = blocklistData as DomainListFile;
const AL = allowlistData as DomainListFile;

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
