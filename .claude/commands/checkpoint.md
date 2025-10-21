Create a development checkpoint with automatic commit and tagging.

## 1. Save Current State

Show all current changes:
```bash
git status
```

Display:
- Staged files
- Unstaged modifications
- Untracked files

## 2. Run Full Validation Suite

Execute comprehensive validation:
```bash
cd upstream/react
npm run test
npm run build-storybook
```

**CRITICAL**: If any validation fails, report errors and STOP. Fix issues before creating checkpoint.

## 3. Interactive Staging

For each modified or untracked file, ask the user:
```
Include [file_path] in checkpoint?
  (y) yes - Include this file
  (n) no - Skip this file
  (d) diff - Show changes first
  (a) all - Include all remaining files
```

If user chooses 'diff', show:
```bash
git diff [file_path]
```
Then ask again for that file.

If user chooses 'all', stage all remaining files without further prompts.

## 4. Generate Checkpoint Message

Create a structured checkpoint commit message:

```
checkpoint: [brief session description]

Changes in this session:
- [list key changes made]
- [group by component/feature]
- [highlight important additions]

Session Details:
- Date: [current date]
- Time: [current time]
- Files: [count] changed
- Insertions: [count]+
- Deletions: [count]-

Status: [Work in Progress|Feature Complete|Bug Fix|Refactoring]
```

Ask user: "Add any notes to this checkpoint message? (optional)"

## 5. Create Checkpoint Commit

Execute the commit:
```bash
git commit -m "[checkpoint message]"
```

## 6. Create Checkpoint Tag

Generate timestamp-based tag:
```bash
git tag checkpoint-[YYYYMMDD-HHMMSS]
```

Format example: `checkpoint-20251015-143022`

## 7. Summary Display

Show comprehensive summary:
```
✓ Checkpoint Created Successfully
═══════════════════════════════════════

Commit: [SHA]
Tag: checkpoint-[timestamp]
Branch: [current branch]

Files committed: [count]
  + [count] additions
  ~ [count] modifications
  - [count] deletions

Changes:
[summarize key changes]

═══════════════════════════════════════

Next Steps:
- Continue development
- Push checkpoint: git push && git push --tags
- List checkpoints: git tag -l "checkpoint-*"
- Restore checkpoint: git checkout [tag]
```

## 8. Optional Push

Ask user:
```
Push checkpoint to remote? (yes/no)
  - Push commit and tag to remote repository
  - Enables backup and sharing
```

If yes:
```bash
git push
git push --tags
```

## Recovery Information

Display helpful recovery commands:
```
Checkpoint Recovery Commands:
─────────────────────────────────────
View checkpoints:     git tag -l "checkpoint-*"
View checkpoint diff: git show [checkpoint-tag]
Restore checkpoint:   git checkout [checkpoint-tag]
Delete checkpoint:    git tag -d [checkpoint-tag]
```

## Rules

- **Quality gates must pass** before checkpoint creation
- **User confirms** which files to include
- **Always tag** checkpoints for easy recovery
- **Descriptive messages** that capture session work
- **No silent operations** - confirm before pushing
