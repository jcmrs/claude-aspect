import { dirname } from "https://deno.land/std@0.224.0/path/mod.ts";

export async function setupTestFile(filePath: string, content: string): Promise<void> {
  const dir = dirname(filePath);
  await Deno.mkdir(dir, { recursive: true });
  await Deno.writeTextFile(filePath, content);
}

export async function teardownTestFile(filePath: string): Promise<void> {
  const dir = dirname(filePath);
  await Deno.remove(filePath);
  // Attempt to remove the directory only if it's empty
  try {
    await Deno.remove(dir, { recursive: false });
  } catch (error) {
    if (error instanceof Deno.errors.BadResource) {
      // Directory not empty, ignore
    } else {
      throw error;
    }
  }
}