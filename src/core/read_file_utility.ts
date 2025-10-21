export async function readTextFile(filePath: string): Promise<string> {
  return Deno.readTextFile(filePath);
}