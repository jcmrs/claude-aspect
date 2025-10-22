import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts";
import { getDefinedCommitTypes, getDefinedCommitStatuses, getSubjectRules } from "../../src/protocol/commit_protocol_parser.ts";
import { setupTestFile, teardownTestFile } from "../test_utils.ts";

Deno.test("getDefinedCommitTypes should correctly parse commit types from COMMIT_PROTOCOL.md", async () => {
  const testProtocolPath = "./test_data/COMMIT_PROTOCOL.md";
  const protocolContent = `
# Git Commit Communication Protocol

## 2. Commit Message Structure

### 2.1. Type

The \`type\` is mandatory and **must** be one of the following exact values, all lowercase:

*   **feat:** A new feature is introduced.
*   **fix:** A bug fix is introduced.
*   **test:** Adding a new test.
*   **refactor:** A code change that improves internal structure.
*   **chore:** Changes to the build process.
*   **docs:** Documentation only changes.
*   **clarify:** A special type for AI clarification.
*   **signal:** A special type for External Agent signals.

### 2.2. Scope
  `;
  await setupTestFile(testProtocolPath, protocolContent);

  try {
    const types = await getDefinedCommitTypes(testProtocolPath);
    assertEquals(types, ["feat", "fix", "test", "refactor", "chore", "docs", "clarify", "signal"]);
  } finally {
    await teardownTestFile(testProtocolPath);
  }
});

Deno.test("getDefinedCommitStatuses should correctly parse commit statuses from COMMIT_PROTOCOL.md", async () => {
  const testProtocolPath = "./test_data/COMMIT_PROTOCOL.md";
  const protocolContent = `
### 2.5. Footer(s)

Footers are used for machine-readable signals and metadata.

*   **\`Status:\` (Mandatory for AI Commits):** This footer signals the current state of the task. The value **must** be one of the following exact strings:\n    *   \`Ready for Green Phase.\`\n    *   \`Ready for Refactor Phase.\`\n    *   \`Task Done.\`\n    *   \`Awaiting Clarification.\`\n    *   \`Awaiting Debug/Correction.\`\n\n*   **\`Directive:\` (Mandatory for External Agent Signals):** This footer provides a command to the AI.\n  `;
  await setupTestFile(testProtocolPath, protocolContent);

  try {
    const statuses = await getDefinedCommitStatuses(testProtocolPath);
    assertEquals(statuses, [
      "Ready for Green Phase.",
      "Ready for Refactor Phase.",
      "Task Done.",
      "Awaiting Clarification.",
      "Awaiting Debug/Correction.",
    ]);
  } finally {
    await teardownTestFile(testProtocolPath);
  }
});

Deno.test("getSubjectRules should correctly parse subject rules from COMMIT_PROTOCOL.md", async () => {
  const testProtocolPath = "./test_data/COMMIT_PROTOCOL.md";
  const protocolContent = `
# Git Commit Communication Protocol

### 2.3. Subject

The \`subject\` is mandatory. It is a short, imperative-tense description of the change.

*   It must not end with a period.
*   It should be capitalized.
*   It should ideally be no longer than 72 characters.
*   *Example:* \`Add failing test for email display\`

### 2.4. Body
  `;
  await setupTestFile(testProtocolPath, protocolContent);

  try {
    const rules = await getSubjectRules(testProtocolPath);
    assertEquals(rules.maxLength, 72);
    assertEquals(rules.noTrailingPeriod, true);
  } finally {
    await teardownTestFile(testProtocolPath);
  }
});
