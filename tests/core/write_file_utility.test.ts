import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts";
import { writeTextFile } from "../../src/core/write_file_utility.ts"; // This module doesn't exist yet

Deno.test("writeTextFile should correctly write content to a file", async () => {
  const testFilePath = "./test_data/output_file.txt";
  const contentToWrite = "This is some content to write.";

  try {
    await writeTextFile(testFilePath, contentToWrite);
    const writtenContent = await Deno.readTextFile(testFilePath);
    assertEquals(writtenContent, contentToWrite);
  } finally {
    // Clean up the dummy file and directory
    await Deno.remove(testFilePath);
    await Deno.remove("./test_data", { recursive: true });
  }
});