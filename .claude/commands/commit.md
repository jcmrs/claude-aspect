You are about to create an intelligent git commit. Follow this workflow strictly:

## 1. Run Quality Checks

Execute the full test suite:
```bash
cd upstream/react && npm run test
```

**IMPORTANT**: If any checks fail, report the errors and STOP. Do not proceed with the commit until all issues are resolved.

## 2. Analyze Staged Changes

Review what will be committed:
```bash
git diff --cached --stat
git diff --cached
```

Summarize:
- Number of files changed
- Types of changes (new files, modifications, deletions)
- Affected areas (components, hooks, styles, etc.)

## 3. Generate Commit Message

Analyze the changes and create a descriptive commit message following Conventional Commits format:

**Types:**
- `feat:` - New feature or component
- `fix:` - Bug fix
- `refactor:` - Code refactoring without behavior change
- `style:` - Styling or formatting changes
- `docs:` - Documentation changes
- `test:` - Test additions or changes
- `chore:` - Tooling, config, or maintenance

**Format:**
```
<type>(<scope>): <short description>

<detailed explanation of what changed and why>

<any breaking changes, migrations needed, or important notes>
```

**Example:**
```
feat(components): add dropdown menu component

Implements fully accessible dropdown menu using React Aria.
Includes multiple variants, keyboard navigation, and mobile support.

- Added DropdownMenu component with stories
- Created useDropdown hook for state management
- Integrated with existing Button component
```

## 4. Show Commit Preview

Display a clear preview:
```
📝 Commit Preview
═══════════════════════════════════════

Files to commit:
  M components/base/button/button.tsx
  A components/base/dropdown/dropdown.tsx
  A components/base/dropdown/dropdown.story.tsx

Commit message:
─────────────────────────────────────
[generated message here]
─────────────────────────────────────

Changes summary:
- 3 files changed
- 145 insertions(+), 12 deletions(-)
```

## 5. Ask for Confirmation

Present clearly:
```
Ready to commit these changes? (yes/no/edit)

Options:
- yes: Proceed with commit
- no: Cancel commit
- edit: Modify commit message
```

Wait for user response.

## 6. Execute Commit

If confirmed, execute:
```bash
git commit -m "<generated message>"
```

## 7. Post-Commit Actions

After successful commit:
- Show commit SHA
- Display current branch status
- Ask: "Push to remote? (yes/no)"

If user confirms push:
```bash
git push
```

## Important Rules

- **NEVER commit without quality checks passing**
- **NEVER commit without user confirmation**
- **ALWAYS show what will be committed**
- **ALWAYS generate meaningful commit messages**
- Check for staged changes first - if nothing staged, inform user
