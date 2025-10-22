import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts";
import {
  readTextFile,
  writeTextFile,
  pathExists,
  deletePath,
} from "../../src/core/fs_utils.ts";
import { setupTestFile, teardownTestFile } from "../test_utils.ts";

Deno.test("readTextFile should correctly read the content of a file", async () => {
  const testFilePath = "./test_data/test_file.txt";
  const expectedContent = "Hello, Deno Test!";
  await setupTestFile(testFilePath, expectedContent);

  try {
    const content = await readTextFile(testFilePath);
    assertEquals(content, expectedContent);
  } finally {
    await teardownTestFile(testFilePath);
  }
});

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

Deno.test("deletePath should delete an existing file", async () => {
  const testFilePath = "./test_data/file_to_delete.txt";
  await setupTestFile(testFilePath, "content");
  assertEquals(await pathExists(testFilePath), true);

  await deletePath(testFilePath);
  assertEquals(await pathExists(testFilePath), false);
});

Deno.test("deletePath should delete an existing empty directory", async () => {
  const testDirPath = "./test_data/empty_dir_to_delete";
  await Deno.mkdir(testDirPath, { recursive: true });
  assertEquals(await pathExists(testDirPath), true);

  await deletePath(testDirPath);
  assertEquals(await pathExists(testDirPath), false);
});

Deno.test("deletePath should delete an existing non-empty directory recursively", async () => {
  const testDirPath = "./test_data/non_empty_dir_to_delete";
  const nestedFilePath = `${testDirPath}/nested_file.txt`;
  await setupTestFile(nestedFilePath, "nested content");
  assertEquals(await pathExists(testDirPath), true);

  await deletePath(testDirPath);
  assertEquals(await pathExists(testDirPath), false);
});

Deno.test("deletePath should not throw error for non-existing path", async () => {
  const nonExistingPath = "./test_data/non_existing_path_to_delete.txt";
  assertEquals(await pathExists(nonExistingPath), false);

  await deletePath(nonExistingPath); // Should not throw
  assertEquals(await pathExists(nonExistingPath), false);
});