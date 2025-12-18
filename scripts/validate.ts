import fs from "node:fs";

type DomainListFile = {
  version: number;
  updatedAt: string;
  domains: Record<string, any>;
};

function load(path: string): DomainListFile {
  return JSON.parse(fs.readFileSync(path, "utf8"));
}

function isValidDomainKey(d: string): boolean {
  if (!d) return false;
  if (/\s/.test(d)) return false;
  if (d.includes("://")) return false;
  if (d.includes("/")) return false;
  if (d.includes("@")) return false;
  if (d.startsWith(".")) return false;
  if (d.endsWith(".")) return false;
  if (!d.includes(".")) return false;
  return true;
}

function validateList(name: string, obj: DomainListFile) {
  if (typeof obj.version !== "number") throw new Error(`${name}: version must be number`);
  if (typeof obj.updatedAt !== "string") throw new Error(`${name}: updatedAt must be string`);
  if (typeof obj.domains !== "object" || obj.domains === null) throw new Error(`${name}: domains must be object`);

  for (const k of Object.keys(obj.domains)) {
    if (!isValidDomainKey(k)) throw new Error(`${name}: invalid domain: "${k}"`);
    if (k !== k.toLowerCase()) throw new Error(`${name}: domain must be lowercase: "${k}"`);
  }
}

const block = load("data/blocklist.json");
const allow = load("data/allowlist.json");

validateList("blocklist", block);
validateList("allowlist", allow);

for (const d of Object.keys(block.domains)) {
  if (allow.domains[d]) throw new Error(`overlap: "${d}" exists in both blocklist and allowlist`);
}

console.log("✅ Validation passed");
