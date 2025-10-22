import { dirname } from "https://deno.land/std@0.224.0/path/mod.ts";

export async function readTextFile(filePath: string): Promise<string> {
  return Deno.readTextFile(filePath);
}

export async function writeTextFile(filePath: string, content: string): Promise<void> {
  const dir = dirname(filePath);
  await Deno.mkdir(dir, { recursive: true });
  await Deno.writeTextFile(filePath, content);
}

export async function pathExists(path: string): Promise<boolean> {
  try {
    await Deno.stat(path);
    return true;
  } catch (error) {
    if (error instanceof Deno.errors.NotFound) {
      return false;
    }
    throw error;
  }
}

export async function deletePath(path: string): Promise<void> {
  if (await pathExists(path)) {
    await Deno.remove(path, { recursive: true });
  }
}