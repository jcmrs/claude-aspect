import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts";
import { deletePath } from "../../src/core/delete_path_utility.ts"; // This module doesn't exist yet
import { pathExists } from "../../src/core/path_exists_utility.ts";
import { setupTestFile } from "../test_utils.ts";

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