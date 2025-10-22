import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts";
import { writeTextFile } from "../../src/core/write_file_utility.ts"; // This module doesn't exist yet
import { setupTestFile, teardownTestFile } from "../test_utils.ts";

Deno.test("writeTextFile should correctly write content to a file", async () => {
  const testFilePath = "./test_data/output_file.txt";
  const contentToWrite = "This is some content to write.";

  try {
    await setupTestFile(testFilePath, ""); // Create empty file first
    await writeTextFile(testFilePath, contentToWrite); // Then write content
    const writtenContent = await Deno.readTextFile(testFilePath);
    assertEquals(writtenContent, contentToWrite);
  } finally {
    await teardownTestFile(testFilePath);
  }
});