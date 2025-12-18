export type ListEntry = {
  reason?: string;
  source?: string;
  addedAt?: string; // YYYY-MM-DD
};

export type DomainListFile = {
  version: number;
  updatedAt: string; // YYYY-MM-DD
  domains: Record<string, ListEntry>;
};

export type Verdict = {
  input: string;
  hostname: string | null;
  allowed: boolean;
  blocked: boolean;
  match?: string;
  reason?: string;
};
