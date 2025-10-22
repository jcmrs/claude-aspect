import { assertEquals } from "https://deno.land/std@0.224.0/assert/assert_equals.ts";
import { getDefinedCommitTypes } from "../../src/protocol/commit_protocol_parser.ts";
import { join } from "https://deno.land/std@0.224.0/path/mod.ts";

Deno.test("getDefinedCommitTypes should correctly parse commit types from the real COMMIT_PROTOCOL.md", async () => {
  const projectRoot = Deno.cwd();
  const commitProtocolPath = join(projectRoot, "docs", "COMMIT_PROTOCOL.md");

  const types = await getDefinedCommitTypes(commitProtocolPath);
  assertEquals(types, [
    "feat",
    "fix",
    "test",
    "refactor",
    "chore",
    "docs",
    "clarify",
    "signal",
  ]);
});