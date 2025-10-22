import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts";
import { getDefinedScopes } from "../../src/protocol/scopes_parser.ts"; // This module doesn't exist yet
import { setupTestFile, teardownTestFile } from "../test_utils.ts";

Deno.test("getDefinedScopes should correctly parse scopes from a SCOPES.md file", async () => {
  const testScopesPath = "./test_data/SCOPES.md";
  const scopesContent = `
# Project Scopes

*   **project:** Changes that affect the overall project.
*   **core:** Changes related to the central logic.
*   **auth:** Changes related to authentication.
  `;
  await setupTestFile(testScopesPath, scopesContent);

  try {
    const scopes = await getDefinedScopes(testScopesPath);
    assertEquals(scopes, ["project", "core", "auth"]);
  } finally {
    await teardownTestFile(testScopesPath);
  }
});