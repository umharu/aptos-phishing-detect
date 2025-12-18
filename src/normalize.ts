function head(parts: string[]): string {
  // With noUncheckedIndexedAccess, parts[0] is string | undefined
  return parts[0] ?? "";
}

function cutBefore(input: string, sep: string): string {
  const idx = input.indexOf(sep);
  return idx === -1 ? input : input.slice(0, idx);
}

export function normalizeHostname(input: string): string | null {
  const raw = input.trim();
  if (!raw) return null;

  // Remove scheme if present (http://, https://, etc.)
  let s = raw.replace(/^[a-zA-Z][a-zA-Z0-9+.-]*:\/\//, "");

  // Remove credentials if present: user:pass@
  const at = s.lastIndexOf("@");
  if (at !== -1) s = s.slice(at + 1);

  // Cut off path, query, fragment safely
  s = head(s.split("/"));
  s = cutBefore(s, "?");
  s = cutBefore(s, "#");

  // Handle IPv6 like [::1]:8080
  if (s.startsWith("[") && s.includes("]")) {
    s = s.slice(1, s.indexOf("]"));
  } else {
    // Remove port if present: example.com:443
    const colonIndex = s.indexOf(":");
    if (colonIndex !== -1) s = s.slice(0, colonIndex);
  }

  const host = s.toLowerCase().replace(/\.$/, "").trim();
  if (!host) return null;

  // Basic sanity
  if (/\s/.test(host)) return null;

  // Optional: require a dot (remove if you want to allow localhost)
  if (!host.includes(".")) return null;

  return host;
}

export function getDomainCandidates(hostname: string): string[] {
  const parts = hostname.split(".").filter(Boolean);
  if (parts.length < 2) return [hostname];

  const candidates: string[] = [];
  for (let i = 0; i <= parts.length - 2; i++) {
    candidates.push(parts.slice(i).join("."));
  }
  return candidates;
}
