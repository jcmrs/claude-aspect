import { pathExists } from "./path_exists_utility.ts";

export async function deletePath(path: string): Promise<void> {
  if (await pathExists(path)) {
    await Deno.remove(path, { recursive: true });
  }
}