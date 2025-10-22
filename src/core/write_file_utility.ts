import { dirname } from "https://deno.land/std@0.224.0/path/mod.ts";

export async function writeTextFile(filePath: string, content: string): Promise<void> {
  const dir = dirname(filePath);
  await Deno.mkdir(dir, { recursive: true });
  await Deno.writeTextFile(filePath, content);
}