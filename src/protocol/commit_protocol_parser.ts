import { readTextFile } from "../core/fs_utils.ts";

export async function getDefinedCommitTypes(filePath: string): Promise<string[]> {
  const content = await readTextFile(filePath);
  const types: string[] = [];
  const lines = content.split('\n');

  let inTypeSection = false;
  for (const line of lines) {
    if (line.includes('### 2.1. Type')) {
      inTypeSection = true;
      continue;
    }
    if (inTypeSection) {
      if (line.includes('### 2.2. Scope')) { // End of type section
        break;
      }
      const match = line.match(/^\*\s+\*\*(\w+):/); // Match lines like "*   **feat:**"
      if (match && match[1]) {
        types.push(match[1]);
      }
    }
  }
  return types;
}

export async function getDefinedCommitStatuses(filePath: string): Promise<string[]> {
  const content = await readTextFile(filePath);
  const statuses: string[] = [];
  const lines = content.split('\n');

  let inStatusSection = false;
  for (const line of lines) {
    if (line.includes('`Status:` (Mandatory for AI Commits):')) {
      inStatusSection = true;
      continue;
    }
    if (inStatusSection) {
      if (line.includes('`Directive:`')) { // End of status section
        break;
      }
      const match = line.match(/^\s*\*\s*`(.+?)`\s*$/); // Match lines like "*   `Status Value.`"
      if (match && match[1]) {
        statuses.push(match[1]);
      }
    }
  }
  return statuses;
}

export async function getSubjectRules(filePath: string): Promise<{ maxLength: number; noTrailingPeriod: boolean }> {
  const content = await readTextFile(filePath);
  let maxLength = 0;
  let noTrailingPeriod = false;

  const subjectSectionMatch = content.match(/### 2.3. Subject([\s\S]*?)(?=\n\n### 2.4. Body)/);
  if (subjectSectionMatch && subjectSectionMatch[1]) {
    const subjectSection = subjectSectionMatch[1];

    const maxLengthMatch = subjectSection.match(/no longer than (\d+) characters/);
    if (maxLengthMatch && maxLengthMatch[1]) {
      maxLength = parseInt(maxLengthMatch[1], 10);
    }

    if (subjectSection.includes("It must not end with a period.")) {
      noTrailingPeriod = true;
    }
  }
  return { maxLength, noTrailingPeriod };
}
