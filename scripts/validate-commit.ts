import { parse } from "https://deno.land/std@0.224.0/flags/mod.ts";
import { join } from "https://deno.land/std@0.224.0/path/mod.ts";
import { getDefinedCommitTypes, getDefinedCommitStatuses, getSubjectRules } from "../src/protocol/commit_protocol_parser.ts";
import { getDefinedScopes } from "../src/protocol/scopes_parser.ts";
import { parseCommitMessage } from "../src/protocol/commit_message_parser.ts";

// --- Configuration & Protocol Paths ---
let PROJECT_ROOT = ""; // Will be set from command line argument
const COMMIT_PROTOCOL_RELATIVE_PATH = "docs/COMMIT_PROTOCOL.md";
const SCOPES_RELATIVE_PATH = "docs/SCOPES.md";

// --- Helper Functions ---
function exitWithError(message: string) {
  console.error(`\n❌ Commit Validation Error: ${message}\n`);
  Deno.exit(1);
}

async function validateCommitMessage(commitMessage: string) {
  const allowedTypes = await getDefinedCommitTypes(COMMIT_PROTOCOL_PATH);
  const definedScopes = await getDefinedScopes(SCOPES_PATH);
  const allowedStatuses = await getDefinedCommitStatuses(COMMIT_PROTOCOL_PATH);
  const subjectRules = await getSubjectRules(COMMIT_PROTOCOL_PATH);

  const { type, scope, subject, body, footers } = parseCommitMessage(commitMessage);

  // Ensure all necessary protocol data was loaded
  if (!allowedTypes || allowedTypes.length === 0) exitWithError("Could not load allowed commit types from protocol.");
  if (!definedScopes || definedScopes.length === 0) exitWithError("Could not load defined scopes from protocol.");
  if (!allowedStatuses || allowedStatuses.length === 0) exitWithError("Could not load allowed commit statuses from protocol.");
  if (!subjectRules) exitWithError("Could not load subject rules from protocol.");


  // --- Implement Validation Rules Here ---
  // 1. Validate Type
  if (!allowedTypes || !allowedTypes.includes(type)) {
    exitWithError(`Invalid commit type: "${type}". Allowed types are: ${allowedTypes?.join(', ')}.`);
  }

  // 2. Validate Scope
  if (scope && (!definedScopes || !definedScopes.includes(scope))) {
    exitWithError(`Invalid commit scope: "${scope}". Defined scopes are: ${definedScopes?.join(', ')}.`);
  }

  // 3. Validate Subject
  if (subjectRules.maxLength > 0 && subject.length > subjectRules.maxLength) {
    exitWithError(`Subject line too long (${subject.length} chars). Max ${subjectRules.maxLength} characters.`);
  }
  if (subjectRules.noTrailingPeriod && subject.endsWith('.')) {
    exitWithError("Subject line must not end with a period.");
  }

  // 4. Validate Footers
  if (footers.Status) {
    if (!allowedStatuses || !allowedStatuses.includes(footers.Status)) {
      exitWithError(`Invalid Status footer: "${footers.Status}". Allowed statuses are: ${allowedStatuses.join(', ') || 'None defined'}.`);
    }
  }

  if (footers.Directive) {
    // More complex validation for Directive format would go here
    // For now, just check for presence if expected
  }

  console.log("✅ Commit message is valid.");
  Deno.exit(0);
}

// --- Main Execution ---
const args = parse(Deno.args);
const commitMessageFile = args._[0] as string;
PROJECT_ROOT = args._[1] as string; // Get project root from argument

const COMMIT_PROTOCOL_PATH = join(PROJECT_ROOT, COMMIT_PROTOCOL_RELATIVE_PATH);
const SCOPES_PATH = join(PROJECT_ROOT, SCOPES_RELATIVE_PATH);

if (!commitMessageFile) { // Ensure commit message file is provided
  exitWithError("No commit message file provided. Usage: deno run validate-commit.ts <COMMIT_MESSAGE_FILE>");
}
if (!PROJECT_ROOT) { // Ensure project root is provided
  exitWithError("No project root provided. Usage: deno run validate-commit.ts <COMMIT_MESSAGE_FILE> <PROJECT_ROOT>");
}

const commitMessage = Deno.readTextFileSync(commitMessageFile); // Read the commit message
await validateCommitMessage(commitMessage); // Run validation


