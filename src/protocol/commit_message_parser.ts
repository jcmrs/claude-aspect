export function parseCommitMessage(message: string): { type: string; scope: string; subject: string; body: string; footers: Record<string, string>; } {
  const lines = message.split('\n').map(line => line.trim());
  const header = lines[0];

  const headerMatch = header.match(/^(\w+)(?:\((\w+)\))?:\s(.+)$/);
  if (!headerMatch) {
    throw new Error("Commit message header format invalid. Expected: <type>(<scope>): <subject>");
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
        throw new Error(`Invalid footer format: "${line}". Expected: <Token>: <Value>`);
      }
    } else if (inBody) {
      body += line + '\n';
    }
  }

  return { type, scope, subject, body: body.trim(), footers };
}