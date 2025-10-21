# The Automated Agile-TDD Framework

## 1. Overview

This document defines the official Product and Project Development Methodology for the `claude-aspect` project. Its purpose is to provide a structured, predictable, and verifiable process for AI-driven software development, ensuring that all work adheres to the principles outlined in `CONSTRAINTS.md`.

The framework is a tailored implementation of Test-Driven Development (TDD) within an Agile, iterative structure. The entire workflow is orchestrated through the Git repository, using the commit history as the primary mechanism for communication, state tracking, and process memory.

## 2. Core Principles

*   **Test-First:** No functional code is written until a test that proves its necessity exists and is failing.
*   **Atomic Commits:** Each step of the process (writing a test, writing code, refactoring) is a discrete, atomic commit.
*   **Explicit Signaling:** The state of the workflow and the readiness for the next step are communicated explicitly through a status footer in each commit message.
*   **Isolation:** All work for a given task is performed on a dedicated feature branch to prevent conflicts and ensure a clean history.

## 3. Commit Protocol Reference

All Git commits made within this methodology **must** strictly adhere to the rules and structures defined in the `COMMIT_PROTOCOL.md` document. This protocol is not optional; it is the machine-readable language that drives the workflow.

## 4. The Development Workflow

The lifecycle of a single task (e.g., a new feature or a bug fix) follows these precise steps:

### Step 0: Task Initiation (External Agent)

1.  **Create Branch:** The External Agent (the human user or a future orchestrator AI) creates a new feature branch from the main development branch (typically `main` or `develop`).
2.  **Signal Task:** The External Agent makes an initial, empty commit on this branch. The commit message's body **must** contain a single-line `Directive` that clearly states the task and signals the first phase.
    *   *Example Commit:* `feat(scope): initial commit for new feature

Directive: Begin TDD Red Phase.`

### Step 1: Red Phase (AI Action - Write a Failing Test)

1.  **Read Directive:** The AI checks out the feature branch and reads the `Directive` from the latest commit.
2.  **Write Failing Test:** The AI writes the minimum amount of test code necessary to capture the task's requirements. These requirements are derived from the Acceptance Criteria in the associated GitHub Issue (which should be referenced in the initial task commit).
3.  **Verify Failure:** The AI runs the new test to ensure it fails as expected.
4.  **Commit and Signal:** The AI commits the new test file. The commit message **must** follow the protocol, including the footer: `Status: Ready for Green Phase.`

### Step 2: Green Phase (AI Action - Write Code to Pass)

1.  **Read Status:** The AI sees the `Status: Ready for Green Phase.` signal.
2.  **Write Passing Code:** The AI writes the absolute minimum amount of functional code required to make the failing test from the Red Phase pass.
3.  **Verify Success:** The AI will run the full test suite to ensure the new test passes and that no regressions were introduced.
4.  **Commit and Signal:** If verification succeeds, the AI commits the new functional code. The commit message **must** follow the protocol, including the footer: `Status: Ready for Refactor Phase.`

### Step 3: Refactor Phase (AI Action - Improve Code)

1.  **Read Status:** The AI sees the `Status: Ready for Refactor Phase.` signal.
2.  **Refactor Code:** The AI analyzes the newly added code for improvements in clarity, efficiency, or adherence to design patterns. It refactors the code **without changing its external behavior**.
3.  **Verify Integrity:** The AI will run the full test suite after refactoring to ensure no regressions were introduced.
4.  **Commit and Signal:** The AI commits the refactored code (or a `chore` commit if no refactoring was needed). The commit message **must** follow the protocol, including the footer: `Status: Task Done.`

### Step 4: Task Completion (External Agent)

1.  **Read Status:** The External Agent sees the `Status: Task Done.` signal.
2.  **Review:** The agent reviews the completed work on the feature branch, including the code and the full commit history.
3.  **Merge:** The agent merges the completed feature branch back into the main development branch (e.g., `main` or `develop`).

## 5. Handling Workflow Deviations

### 5.1. Handling Ambiguity

If at any point the AI encounters ambiguity or lacks sufficient information, it will not guess. Instead, it will:

1.  **Commit a Clarification Request:** Make a commit with the `clarify` type, referencing the relevant GitHub Issue if applicable.
2.  **State the Question:** The commit message body will contain a clear, specific question for the External Agent.
3.  **Signal Blockage:** The commit message footer will be `Status: Awaiting Clarification.`
4.  **Halt Work:** The AI will halt all further work on that branch until a new commit with a `signal` type and a new `Directive` is provided by the External Agent.

### 5.2. Handling Verification Failures

If any automated verification step (testing, linting, etc.) fails, the AI will not proceed to the next phase. Instead, it will:

1.  **Attempt to Debug:** The AI will first attempt to diagnose and fix the issue that caused the failure.
2.  **Commit the Fix:** If a fix is identified and implemented, the AI will commit the changes with a `fix` type (e.g., `fix(tests): correct assertion in user profile test`). The commit body will explain the fix.
3.  **Re-run Verification:** The AI will re-run the verification step.
4.  **Request Help if Unable to Fix:** If the AI cannot resolve the failure after a reasonable number of attempts, it will follow the "Handling Ambiguity" protocol, committing a `clarify` request that details the failure and asks for assistance, using the status `Status: Awaiting Debug/Correction.`

