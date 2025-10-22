import { readTextFile } from "../core/fs_utils.ts";

export async function getDefinedScopes(filePath: string): Promise<string[]> {
  const content = await readTextFile(filePath);
  const lines = content.split('\n');
  const scopes: string[] = [];

  for (const line of lines) {
    const match = line.match(/^\*\s+\*\*(\w+):\*\*/);
    if (match && match[1]) {
      scopes.push(match[1]);
    }
  }

  return scopes;
}