import { parse } from "https://deno.land/std@0.224.0/flags/mod.ts"; // Pin to a known stable version
import { join, resolve } from "https://deno.land/std@0.224.0/path/mod.ts";
import { getDefinedCommitTypes, getDefinedCommitStatuses } from "../src/protocol/commit_protocol_parser.ts";
import { getDefinedScopes } from "../src/protocol/scopes_parser.ts";

// --- Configuration & Protocol Paths ---
let PROJECT_ROOT = ""; // Will be set from command line argument
let COMMIT_PROTOCOL_PATH: string;
let SCOPES_PATH: string;

// --- Helper Functions ---
function exitWithError(message: string) {
  console.error(`\n❌ Commit Validation Error: ${message}\n`);
  Deno.exit(1);
}

function parseCommitMessage(message: string): { type: string; scope: string; subject: string; body: string; footers: Record<string, string>; } {
  const lines = message.split('\n').map(line => line.trim());
  const header = lines[0];

  const headerMatch = header.match(/^(\w+)(?:\((\w+)\))?:\s(.+)$/);
  if (!headerMatch) {
    exitWithError("Commit message header format invalid. Expected: <type>(<scope>): <subject>");
  }

  const type = headerMatch[1];
  const scope = headerMatch[2] || '';
  const subject = headerMatch[3];

  let body = '';
  const footers: Record<string, string> = {};
  let inBody = false;
  let inFooters = false;

  for (let i = 1; i < lines.length; i++) {
    const line = lines[i];
    if (line === '') {
      if (inBody) inFooters = true; // Transition from body to footers
      else inBody = true; // Start of body
      continue;
    }

    if (inFooters) {
      const footerMatch = line.match(/^(\w+):\s(.+)$/);
      if (footerMatch) {
        footers[footerMatch[1]] = footerMatch[2];
      } else {
        exitWithError(`Invalid footer format: "${line}". Expected: <Token>: <Value>`);
      }
    } else if (inBody) {
      body += line + '\n';
    }
  }

  return { type, scope, subject, body: body.trim(), footers };
}

async function validateCommitMessage(commitMessage: string) {
  const allowedTypes = await getDefinedCommitTypes(COMMIT_PROTOCOL_PATH);
  const definedScopes = await getDefinedScopes(SCOPES_PATH);
  const allowedStatuses = await getDefinedCommitStatuses(COMMIT_PROTOCOL_PATH);

  const { type, scope, subject, body, footers } = parseCommitMessage(commitMessage);

  // Ensure all necessary protocol data was loaded
  if (!allowedTypes || allowedTypes.length === 0) exitWithError("Could not load allowed commit types from protocol.");
  if (!definedScopes || definedScopes.length === 0) exitWithError("Could not load defined scopes from protocol.");
  if (!allowedStatuses || allowedStatuses.length === 0) exitWithError("Could not load allowed commit statuses from protocol.");


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
  if (subject.length > 72) {
    exitWithError(`Subject line too long (${subject.length} chars). Max 72 characters.`);
  }
  if (subject.endsWith('.')) {
    exitWithError("Subject line must not end with a period.");
  }
  // Add capitalization check if needed

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



