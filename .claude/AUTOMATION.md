# Project Automation Workflow

Complete automation system for git integration with safety, transparency, and user control.

## Overview

This automation system provides:
- **Auto-staging** of modified files (with safety checks)
- **Quality gates** that block bad commits
- **Intelligent commits** with generated messages
- **Session checkpoints** with tagging
- **Status monitoring** with periodic reminders

## Development Flow

### 1. Make Changes
Edit files using Claude Code tools:
```
Edit, Write, or Serena tools
```

**What happens:**
- ✓ Files are automatically staged after modification
- ✓ Sensitive files (.env, secrets, lock files) are excluded
- ✓ Non-blocking - development continues normally

### 2. Monitor Status
Every ~5 tool uses, you'll see a status summary:
```
┌─────────────────────────────────┐
│  📊 Git Status Summary          │
└─────────────────────────────────┘
  ✓ 3 file(s) staged for commit
  ⚠ 2 file(s) modified (not staged)
  ? 1 file(s) untracked

💡 Ready to commit? Use: /commit
💡 View details: git status
```

### 3. Create Commits
Use the intelligent commit command:
```
/commit
```

**Workflow:**
1. Runs quality checks (type-check, lint, prettier)
2. Analyzes staged changes
3. Generates descriptive commit message
4. Shows preview of what will be committed
5. Asks for confirmation
6. Creates commit
7. Optionally pushes to remote

### 4. Create Checkpoints
Save session state with checkpoints:
```
/checkpoint
```

**Workflow:**
1. Shows all changes (staged and unstaged)
2. Runs full validation suite
3. Interactive file selection
4. Generates session summary
5. Creates tagged commit
6. Optionally pushes to remote

## Commands

### /commit
Intelligent commit with quality validation and generated messages.

**When to use:**
- Ready to commit staged changes
- Want descriptive commit message
- Need quality validation before commit

**Example:**
```
User: /commit

Claude:
🔍 Running quality checks...
✓ Type check passed
✓ Linting passed
✓ Formatting passed

📝 Commit Preview
═══════════════════════════════════════
Files to commit:
  M components/base/button/button.tsx
  A components/base/button/button.story.tsx

Commit message:
─────────────────────────────────────
feat(components): add button component variants

Implements primary, secondary, and ghost button variants
with full accessibility support using React Aria.

- Added Button component with TypeScript types
- Created Storybook stories for all variants
- Integrated with design system tokens
─────────────────────────────────────

Ready to commit? (yes/no)
```

### /checkpoint
Session checkpoint with interactive staging and tagging.

**When to use:**
- End of work session
- Before switching tasks
- Want to save progress with tag
- Need comprehensive validation

**Example:**
```
User: /checkpoint

Claude:
Current changes:
  M src/components/header.tsx
  M src/components/nav.tsx
  A src/components/footer.tsx

🔍 Running validation suite...
✓ All checks passed

Include src/components/header.tsx? (y/n/d/a)
User: y
Include src/components/nav.tsx? (y/n/d/a)
User: y
Include src/components/footer.tsx? (y/n/d/a)
User: a

✓ Checkpoint Created
Commit: abc123
Tag: checkpoint-20251015-143022
```

## Quality Gates

All commits are blocked unless:
- ✓ TypeScript type-check passes
- ✓ ESLint checks pass
- ✓ Prettier formatting correct
- ✓ User confirms commit

**Quality check commands:**
```bash
cd upstream/react
npm run type-check    # TypeScript validation
npm run lint:check    # ESLint validation
npm run prettier:check # Format validation
npm run test          # All checks
```

**Auto-fix commands:**
```bash
cd upstream/react
npm run lint          # Fix linting issues
npm run prettier      # Fix formatting
```

## Safety Features

### Auto-Staging Protection
**Excluded from auto-staging:**
- .env files
- credentials files
- secret/password files
- .key, .pem, .pfx files
- node_modules
- lock files (bun.lock, package-lock.json)

**Validation:**
- File existence checked before staging
- Git ignore rules respected
- Non-blocking errors

### Commit Protection
**Blocked commits:**
- No staged changes
- Quality checks fail
- User doesn't confirm

**Never silent:**
- All operations require confirmation
- Clear previews shown
- Errors reported with fix suggestions

### Recovery Support
**Checkpoint tags for easy rollback:**
```bash
# List all checkpoints
git tag -l "checkpoint-*"

# View checkpoint contents
git show checkpoint-20251015-143022

# Restore to checkpoint
git checkout checkpoint-20251015-143022

# Delete checkpoint
git tag -d checkpoint-20251015-143022
```

## Hook Behavior

### post-tool-use.js
**Triggers:** After Edit, Write, or Serena symbol tools
**Action:** Auto-stages modified files
**Safety:** Excludes sensitive files
**Output:** `✓ Staged: [filename]`

### pre-user-prompt-submit.js
**Triggers:** Before /commit or /checkpoint commands
**Action:** Runs quality validation
**Blocks:** Commit if checks fail
**Output:** Detailed validation results

### status-monitor.js
**Triggers:** Every ~5 tool uses
**Action:** Shows git status summary
**Provides:** Actionable suggestions
**Output:** Status box with recommendations

## Configuration

### Hooks Location
```
.claude/hooks/
├── post-tool-use.js              # Auto-staging
├── pre-user-prompt-submit.js     # Quality gates
└── status-monitor.js             # Status reminders
```

### Commands Location
```
.claude/commands/
├── commit.md                      # Intelligent commit
└── checkpoint.md                  # Session checkpoint
```

### Making Hooks Executable
```bash
chmod +x .claude/hooks/*.js
```

## Manual Operations

You can still use git commands directly:

```bash
# View status
git status
git diff

# Manual staging
git add [file]
git add .

# Manual commit
git commit -m "message"

# View log
git log --oneline

# Push
git push
```

## Best Practices

### Do's
✓ Use `/commit` for regular commits
✓ Use `/checkpoint` for session boundaries
✓ Review diffs before confirming
✓ Let quality gates run before committing
✓ Use descriptive commit messages
✓ Push checkpoints for backup

### Don'ts
✗ Don't bypass quality checks
✗ Don't commit without reviewing changes
✗ Don't ignore automation warnings
✗ Don't stage sensitive files manually
✗ Don't force push without reason

## Troubleshooting

### Quality Checks Failing
```bash
cd upstream/react
npm run lint          # Auto-fix linting
npm run prettier      # Auto-format
npm run type-check    # Check types
```

### Files Not Auto-Staging
- Check if file is in .gitignore
- Check if file matches sensitive patterns
- Verify in git repository
- Check hook execution permissions

### Status Monitor Not Showing
- Verify .claude/hooks/status-monitor.js exists
- Check hook is executable
- Verify .claude/.monitor-count file

### Commit Blocked
- Run quality checks: `npm run test`
- Fix reported errors
- Verify staged changes: `git diff --cached`
- Try again after fixes

## Integration with Spec Kit

This automation complements Spec Driven Development:

1. **Feature Planning** - Use Spec Kit templates
2. **Development** - Edit code (auto-staged)
3. **Validation** - Quality gates enforce standards
4. **Commit** - Use `/commit` with generated messages
5. **Checkpoint** - Use `/checkpoint` at milestones
6. **Review** - Spec documents track progress

## Summary

**Complete automation with complete control:**
- Auto-stage modified files safely
- Quality gates block bad commits
- Intelligent commit messages
- Session checkpoints with tags
- Periodic status reminders
- Never commits without confirmation
- Always shows what's happening
- Easy recovery via tags

**Simple commands:**
- `/commit` - Smart commit
- `/checkpoint` - Session checkpoint
- `git status` - Check state

**Result:** Fast, safe, transparent development workflow.
