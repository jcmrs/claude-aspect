#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');

/**
 * PreUserPromptSubmit hook: Validate before allowing commits
 * Runs when user types commands related to committing
 * Blocks commit if quality checks fail
 */

try {
    const input = JSON.parse(fs.readFileSync(0, 'utf8'));
    const { user_prompt, cwd } = input;

    if (!cwd) process.exit(0);

    // Check if user is trying to commit
    const commitKeywords = ['/commit', 'commit', 'git commit', '/checkpoint', 'checkpoint'];
    const isCommitAttempt = commitKeywords.some((kw) => user_prompt.toLowerCase().includes(kw));

    if (!isCommitAttempt) process.exit(0);

    process.chdir(cwd);

    // Check if in git repo
    try {
        execSync('git rev-parse --git-dir', { stdio: 'pipe' });
    } catch {
        process.exit(0); // Not a git repo
    }

    // Check for staged changes
    let staged;
    try {
        staged = execSync('git diff --cached --name-only', { encoding: 'utf8' });
    } catch {
        process.exit(0);
    }

    if (!staged.trim()) {
        console.log('\n⚠ No staged changes to commit.');
        console.log('💡 Stage files with: git add <file>');
        console.log('💡 Or files are auto-staged when you edit them\n');
        process.exit(0);
    }

    // Only run quality checks if upstream/react exists (project has source)
    const hasUpstream = fs.existsSync('upstream/react/package.json');

    if (!hasUpstream) {
        console.log('\n⚠ No upstream source found, skipping quality checks');
        process.exit(0);
    }

    // Run quality checks
    console.log('\n🔍 Running quality checks before commit...\n');

    try {
        // Type checking
        console.log('→ Type checking...');
        execSync('cd upstream/react && npm run type-check', { stdio: 'inherit' });

        // Linting
        console.log('\n→ Linting...');
        execSync('cd upstream/react && npm run lint:check', { stdio: 'inherit' });

        // Formatting
        console.log('\n→ Format checking...');
        execSync('cd upstream/react && npm run prettier:check', { stdio: 'inherit' });

        console.log('\n✓ All quality checks passed\n');
    } catch (err) {
        console.error('\n❌ Quality checks failed. Please fix errors before committing.\n');
        console.error('Quick fixes:');
        console.error('  npm run lint        (auto-fix linting issues)');
        console.error('  npm run prettier    (auto-format files)');
        console.error('  npm run type-check  (check types)\n');
        process.exit(1); // Block the commit
    }

    process.exit(0);
} catch (error) {
    console.error('Pre-commit validation error:', error.message);
    process.exit(0); // Don't block on hook errors
}
