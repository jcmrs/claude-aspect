import { assertEquals, assertThrows } from "https://deno.land/std@0.224.0/assert/mod.ts";
import { parseCommitMessage } from "../../src/protocol/commit_message_parser.ts";

Deno.test("parseCommitMessage should correctly parse a full commit message", () => {
  const message = `feat(scope): subject line

body content

Status: Task Done.
Directive: Do something.`;
  const parsed = parseCommitMessage(message);

  assertEquals(parsed.type, "feat");
  assertEquals(parsed.scope, "scope");
  assertEquals(parsed.subject, "subject line");
  assertEquals(parsed.body, "body content");
  assertEquals(parsed.footers.Status, "Task Done.");
  assertEquals(parsed.footers.Directive, "Do something.");
});

Deno.test("parseCommitMessage should handle missing scope", () => {
  const message = `feat: subject line`;
  const parsed = parseCommitMessage(message);

  assertEquals(parsed.type, "feat");
  assertEquals(parsed.scope, "");
  assertEquals(parsed.subject, "subject line");
  assertEquals(parsed.body, "");
  assertEquals(Object.keys(parsed.footers).length, 0);
});

Deno.test("parseCommitMessage should handle missing body and footers", () => {
  const message = `feat(scope): subject line`;
  const parsed = parseCommitMessage(message);

  assertEquals(parsed.type, "feat");
  assertEquals(parsed.scope, "scope");
  assertEquals(parsed.subject, "subject line");
  assertEquals(parsed.body, "");
  assertEquals(Object.keys(parsed.footers).length, 0);
});

Deno.test("parseCommitMessage should throw error for invalid header format", () => {
  const message = `invalid header`;
  assertThrows(
    () => parseCommitMessage(message),
    Error,
    "Commit message header format invalid. Expected: <type>(<scope>): <subject>",
  );
});

Deno.test("parseCommitMessage should throw error for invalid footer format", () => {
  const message = `feat(scope): subject line

body content

invalid footer`;
  assertThrows(
    () => parseCommitMessage(message),
    Error,
    "Invalid footer format: \"invalid footer\". Expected: <Token>: <Value>",
  );
});
