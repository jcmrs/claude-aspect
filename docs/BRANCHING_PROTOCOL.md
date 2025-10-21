# Branching Strategy Protocol

## 1. Overview

This document defines the mandatory branching strategy for the `claude-aspect` project. Its purpose is to ensure a clean, traceable history and to enable parallel development by isolating all work on dedicated branches. This protocol is the practical implementation of our "shadow Git tree" concept, as outlined in `CONSTRAINTS.md`.

**Clarification on Terms:**
*   **`develop` Branch:** This is the main, stable integration branch (the "trunk").
*   **"Shadow Tree" / Feature Branch:** These are the temporary, isolated branches (e.g., `feature/*`, `bugfix/*`) where all development work occurs. They are shadows of the main codebase, allowing work to proceed without affecting the `develop` branch until explicitly merged.

All branch operations, whether performed by a human or an AI, must strictly adhere to these rules.

## 2. Main Branches

Our repository will have two main, long-lived branches with specific roles:

*   **`main`**: This branch represents the most stable, production-ready state of the project. Direct commits to `main` are strictly forbidden. Changes are only incorporated into `main` by merging a completed `develop` branch release.

*   **`develop`**: This is the primary integration branch. All completed feature, bugfix, and chore branches are merged into `develop`. This branch represents the current state of development and should always be in a stable, test-passing state. An automated CI/CD pipeline must run on `develop` after every merge to enforce this stability.

## 3. Supporting Branches (Feature Branches)

All development work must be done on supporting branches. These are temporary and are deleted after they are merged into `develop`.

### 3.1. Branch Naming Convention

To ensure clarity and traceability, all supporting branches **must** follow this naming convention:

`<type>/<issue-id>/<scope>/<short-description>`

*   **`<type>` (Mandatory):** Must be one of the following exact values:
    *   `feature`: For implementing a new feature.
    *   `bugfix`: For fixing a bug.
    *   `chore`: For maintenance tasks, refactoring, or updates to documentation/configuration.
    *   `clarify`: For branches created by the AI specifically to ask a question.

*   **`<issue-id>` (Mandatory):** The corresponding issue number from the GitHub Issue tracker.

*   **`<scope>` (Mandatory):** Must be a valid scope from the predefined list in `SCOPES.md`.

*   **`<short-description>` (Mandatory):** A short, kebab-case description of the task.

*   **Examples:**
    *   `feature/42/auth/implement-oauth2`
    *   `bugfix/101/core/resolve-memory-leak`

### 3.2. Branch Creation

*   **External Agent:** All supporting branches **must** be created from the `develop` branch.
*   **AI Agent:** The AI will automatically create a new supporting branch upon receiving a `Directive` to begin a new task, deriving the name from the associated GitHub Issue.

*   *Example Command (Human):* `git checkout develop && git pull && git checkout -b feature/42/auth/implement-oauth2`

### 3.3. Branch Lifecycle

1.  **Work:** All work for a task is committed to its feature branch, following the `METHODOLOGY.md` and `COMMIT_PROTOCOL.md`.
2.  **Update:** Before merging, a feature branch should be updated with the latest changes from `develop` via `rebase`. If the AI encounters a rebase conflict it cannot resolve, it will commit a `clarify` type and signal `Status: Awaiting Rebase Conflict Resolution.`
3.  **Merge:** Once a task is complete (`Status: Task Done.`) and all checks have passed, the **External Agent** is responsible for initiating the merge of the feature branch into `develop` (e.g., via a Pull Request).
4.  **Delete:** After a successful merge, the **External Agent** is responsible for deleting the feature branch.

## 4. Merge Strategy

To maintain a clean and readable history on the `develop` branch, all feature branches **must** be merged using the `--no-ff` (no fast-forward) option. This creates a merge commit, which acts as a clear marker in the history, grouping all commits from the feature branch together.

*   *Example Command:* `git checkout develop && git merge --no-ff feature/42/auth/implement-oauth2`
