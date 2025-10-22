import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts";
import { pathExists } from "../../src/core/path_exists_utility.ts"; // This module doesn't exist yet
import { setupTestFile, teardownTestFile } from "../test_utils.ts";

Deno.test("pathExists should return true for an existing file", async () => {
  const testFilePath = "./test_data/existing_file.txt";
  await setupTestFile(testFilePath, "content");

  try {
    const exists = await pathExists(testFilePath);
    assertEquals(exists, true);
  } finally {
    await teardownTestFile(testFilePath);
  }
});

Deno.test("pathExists should return true for an existing directory", async () => {
  const testDirPath = "./test_data/existing_dir";
  await Deno.mkdir(testDirPath, { recursive: true });

  try {
    const exists = await pathExists(testDirPath);
    assertEquals(exists, true);
  } finally {
    await Deno.remove(testDirPath, { recursive: true });
  }
});

Deno.test("pathExists should return false for a non-existing path", async () => {
  const nonExistingPath = "./test_data/non_existing_path.txt";
  const exists = await pathExists(nonExistingPath);
  assertEquals(exists, false);
});