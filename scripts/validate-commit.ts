import { parse } from "https://deno.land/std@0.224.0/flags/mod.ts"; // Pin to a known stable version

// --- Configuration ---
const COMMIT_PROTOCOL_PATH = "./docs/COMMIT_PROTOCOL.md";
const SCOPES_PATH = "./docs/SCOPES.md";

// --- Helper Functions ---
function exitWithError(message: string) {
  console.error(`
❌ Commit Validation Error: ${message}
`);
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

function loadProtocol(path: string): string {
  try {
    return Deno.readTextFileSync(path);
  } catch (error) {
    exitWithError(`Failed to load protocol document: ${path}. Error: ${error.message}`);
  }
}

function validateCommitMessage(commitMessage: string) {
  const protocolContent = loadProtocol(COMMIT_PROTOCOL_PATH);
  const scopesContent = loadProtocol(SCOPES_PATH);

  const { type, scope, subject, body, footers } = parseCommitMessage(commitMessage);

  // --- Implement Validation Rules Here ---
  // 1. Validate Type
  const allowedTypes = protocolContent.match(/\*\*feat:\*\*|\*\*fix:\*\*|\*\*test:\*\*|\*\*refactor:\*\*|\*\*chore:\*\*|\*\*docs:\*\*|\*\*clarify:\*\*|\*\*signal:\*\*/g)?.map(s => s.replace(/\*\*/g, '').replace(':', ''));
  if (!allowedTypes || !allowedTypes.includes(type)) {
    exitWithError(`Invalid commit type: "${type}". Allowed types are: ${allowedTypes?.join(', ')}.`);
  }

  // 2. Validate Scope
  const definedScopes = scopesContent.match(/\*\*(.+?):\*\*/g)?.map(s => s.replace(/\*\*/g, '').replace(':', ''));
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
    const allowedStatuses = [
      "Ready for Green Phase.",
      "Ready for Refactor Phase.",
      "Task Done.",
      "Awaiting Clarification.",
      "Awaiting Debug/Correction.",
    ];

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

if (!commitMessageFile) {
  exitWithError("No commit message file provided. Usage: deno run validate-commit.ts <COMMIT_MESSAGE_FILE>");
}

const commitMessage = Deno.readTextFileSync(commitMessageFile);
validateCommitMessage(commitMessage);
