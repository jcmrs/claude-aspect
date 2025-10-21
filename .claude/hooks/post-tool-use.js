#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

/**
 * PostToolUse hook: Smart staging with safety checks
 * Auto-stages edited files but never commits
 * Excludes sensitive files and validates paths
 */

try {
    const input = JSON.parse(fs.readFileSync(0, 'utf8'));
    const { tool_input, tool_name, cwd } = input;

    if (!cwd) process.exit(0);
    process.chdir(cwd);

    // Only trigger on file modification tools
    const fileTools = [
        'Edit',
        'Write',
        'NotebookEdit',
        'mcp__serena__replace_symbol_body',
        'mcp__serena__insert_after_symbol',
        'mcp__serena__insert_before_symbol',
    ];

    if (!fileTools.includes(tool_name)) process.exit(0);

    // Check if in git repo
    try {
        execSync('git rev-parse --git-dir', { stdio: 'pipe' });
    } catch {
        process.exit(0); // Not a git repo, skip
    }

    // Extract file path from tool input
    const filePath = tool_input?.file_path || tool_input?.filePath || tool_input?.relative_path || tool_input?.notebook_path;

    if (!filePath) process.exit(0);

    // Safety checks - exclude sensitive files
    const sensitivePatterns = [
        '.env',
        'credentials',
        'secrets',
        'secret',
        '.key',
        '.pem',
        '.pfx',
        'password',
        'token',
        'node_modules',
        '.git/',
        'bun.lock',
        'package-lock.json',
        'yarn.lock',
    ];

    const isSensitive = sensitivePatterns.some((pattern) => filePath.toLowerCase().includes(pattern));

    if (isSensitive) {
        console.log(`⚠ Skipping auto-stage of sensitive/lock file: ${filePath}`);
        process.exit(0);
    }

    // Verify file exists before staging
    if (!fs.existsSync(filePath)) {
        console.log(`⚠ File not found, skipping: ${filePath}`);
        process.exit(0);
    }

    // Stage the file
    try {
        execSync(`git add "${filePath}"`, { stdio: 'pipe' });
        console.log(`✓ Staged: ${filePath}`);
    } catch (err) {
        // Only log if it's not a "file is ignored" error
        if (!err.message.includes('ignored')) {
            console.error(`Failed to stage ${filePath}: ${err.message}`);
        }
    }

    process.exit(0);
} catch (error) {
    console.error('Auto-stage hook error:', error.message);
    process.exit(1);
}
