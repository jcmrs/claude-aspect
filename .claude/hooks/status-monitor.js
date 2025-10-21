#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

/**
 * Status monitor: Periodic git status reminder
 * Triggers every ~5 tool uses to remind about uncommitted work
 * Non-blocking and informational only
 */

const MONITOR_FILE = '.claude/.monitor-count';
const TRIGGER_THRESHOLD = 5;

try {
    const input = JSON.parse(fs.readFileSync(0, 'utf8'));
    const { cwd, tool_name } = input;

    if (!cwd) process.exit(0);
    process.chdir(cwd);

    // Check if in git repo
    try {
        execSync('git rev-parse --git-dir', { stdio: 'pipe' });
    } catch {
        process.exit(0);
    }

    // Increment counter
    let count = 0;
    if (fs.existsSync(MONITOR_FILE)) {
        try {
            count = parseInt(fs.readFileSync(MONITOR_FILE, 'utf8')) || 0;
        } catch {
            count = 0;
        }
    }

    count++;

    // Only trigger monitoring at threshold intervals
    if (count < TRIGGER_THRESHOLD) {
        fs.writeFileSync(MONITOR_FILE, count.toString());
        process.exit(0);
    }

    // Reset counter
    fs.writeFileSync(MONITOR_FILE, '0');

    // Check for uncommitted changes
    let status;
    try {
        status = execSync('git status --porcelain', { encoding: 'utf8' });
    } catch {
        process.exit(0);
    }

    if (!status.trim()) {
        process.exit(0); // No changes, nothing to report
    }

    // Parse status
    const lines = status.split('\n').filter(Boolean);
    const staged = lines.filter((f) => f[0] !== ' ' && f[0] !== '?').length;
    const unstaged = lines.filter((f) => f[1] !== ' ' && f[1] !== '?').length;
    const untracked = lines.filter((f) => f.startsWith('??')).length;

    // Display status summary
    console.log('\n┌─────────────────────────────────┐');
    console.log('│  📊 Git Status Summary          │');
    console.log('└─────────────────────────────────┘');

    if (staged > 0) {
        console.log(`  ✓ ${staged} file(s) staged for commit`);
    }
    if (unstaged > 0) {
        console.log(`  ⚠ ${unstaged} file(s) modified (not staged)`);
    }
    if (untracked > 0) {
        console.log(`  ? ${untracked} file(s) untracked`);
    }

    console.log('');

    // Provide actionable suggestions
    if (staged > 0) {
        console.log('💡 Ready to commit? Use: /commit');
    }

    if (unstaged > 0 || untracked > 0) {
        console.log('💡 Create checkpoint? Use: /checkpoint');
    }

    console.log('💡 View details: git status');
    console.log('');

    process.exit(0);
} catch (error) {
    // Silently fail - monitoring should never block workflow
    process.exit(0);
}
