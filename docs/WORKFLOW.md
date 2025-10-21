# External Agent Workflow

## 1. Overview

This document defines the roles, responsibilities, and workflow for the "External Agent" interacting with the Gemini CLI within the `claude-aspect` project. The External Agent is the entity responsible for initiating tasks, providing clarification, and reviewing completed work. Initially, this role will be fulfilled by a human user.

The entire workflow is mediated through the Git repository. All communication and task management are handled via structured Git commits and branches, adhering strictly to the project's defined protocols.

## 2. Core Responsibilities of the External Agent

*   **Task Definition:** Translating high-level goals into specific, well-defined tasks that are actionable for the AI.
*   **Task Initiation:** Signaling the AI to begin work on a new task using the correct commit protocol.
*   **Monitoring:** Observing the AI's progress by tracking the commit history on the active feature branch.
*   **Clarification:** Responding to clarification requests from the AI in a timely manner.
*   **Verification & Integration:** Reviewing the AI's completed work and merging it into the main development branch.

## 3. The Task Workflow

### Step 1: Initiating a New Task

1.  **Ensure Main Branch is Up-to-Date:** Before starting, ensure your local main development branch (e.g., `main` or `develop`) is current (`git pull`).
2.  **Create a Feature Branch:** Create a new, dedicated feature branch for the task. The branch name **must** follow the `BRANCHING_PROTOCOL.md` (e.g., `feature/task-name`).
    ```bash
    git checkout -b feature/user-profile-display
    ```
3.  **Signal the Task:** Create an initial, empty commit on the new branch. This commit's message is the official signal that initiates the AI's workflow.
    *   The commit message **must** follow the `COMMIT_PROTOCOL.md`.
    *   The `type` should be `signal`.
    *   The `scope` should match the feature area.
    *   The `body` **must** contain a `Directive:` footer specifying the first action for the AI.

    ```bash
    git commit --allow-empty -m "signal(user-profile): begin work on email display" -m "Directive: Begin TDD Red Phase."
    ```
4.  **Push the Branch:** Push the new branch to the remote repository (if one is used).

### Step 2: Monitoring AI Progress

1.  **Fetch Updates:** Regularly fetch updates from the repository to see the AI's progress (`git fetch`).
2.  **Review Commit History:** The primary monitoring tool is the Git log. The log on the feature branch provides a complete, step-by-step history of the AI's actions.
    ```bash
    git log feature/user-profile-display --oneline
    ```
3.  **Check Status:** The `Status:` footer in the AI's latest commit message clearly indicates the current state of the task (e.g., `Ready for Green Phase`, `Awaiting Clarification`, `Task Done`).

### Step 3: Responding to Clarification Requests

1.  **Identify Blockage:** You will see a commit from the AI with the `clarify` type and a `Status: Awaiting Clarification.` footer.
2.  **Read the Question:** The body of the commit message will contain the AI's specific question.
3.  **Provide an Answer:** Create a new commit on the same feature branch to provide the answer.
    *   The commit message **must** use the `signal` type.
    *   The body **must** contain a `Directive:` footer with the answer.

    ```bash
    git commit --allow-empty -m "signal(user-profile): provide clarification on email format" -m "Directive: Answer Clarification: The email display should be static and non-editable."
    ```

### Step 4: Finalizing a Completed Task

1.  **Identify Completion:** You will see a commit from the AI with a `Status: Task Done.` footer.
2.  **Review the Work:** Check out the feature branch locally. Review the final code, and inspect the full commit history to ensure the methodology was followed correctly.
3.  **Merge the Branch:** Once satisfied, merge the feature branch into the main development branch according to the project's merge strategy (e.g., via a Pull Request on GitHub, or a local merge).
    ```bash
    git checkout main
    git merge --ff-only feature/user-profile-display
    ```
4.  **Clean Up:** Delete the feature branch.
