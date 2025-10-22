import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts";
import { readTextFile } from "../../src/core/read_file_utility.ts"; // This module doesn't exist yet
import { setupTestFile, teardownTestFile } from "../test_utils.ts";

Deno.test("readTextFile should correctly read the content of a file", async () => {
  // Create a dummy file for testing
  const testFilePath = "./test_data/test_file.txt";
  const expectedContent = "Hello, Deno Test!";
  await setupTestFile(testFilePath, expectedContent);

  try {
    const content = await readTextFile(testFilePath);
    assertEquals(content, expectedContent);
  } finally {
    // Clean up the dummy file and directory
    await teardownTestFile(testFilePath);
  }
});