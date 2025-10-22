import { readTextFile } from "../core/fs_utils.ts";

export async function getDefinedCommitTypes(filePath: string): Promise<string[]> {
  const content = await readTextFile(filePath);
  const types: string[] = [];

  const typeSectionMatch = content.match(/### 2.1. Type[\s\S]*?\n([\s\S]*?)(?=\n\n### 2.2. Scope)/); // More robust match for the section
  if (typeSectionMatch && typeSectionMatch[1]) {
    const typeLines = typeSectionMatch[1].split('\n');
    for (const line of typeLines) {
      const match = line.match(/^\*\s+\*\*(\w+):/); // Simplified regex for type extraction
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
