# Code Review & Verification Protocol

## 1. Overview

This document defines the protocol for code review and automated verification. Its purpose is to serve as the project's primary quality gate, ensuring that all code merged into the `develop` branch is correct, maintainable, and adheres to our defined standards.

This protocol applies continuously throughout the development lifecycle on all feature branches.

## 2. Core Principle: Automation First

The primary method of review is automated verification. The AI is responsible for running all applicable automated checks after every `test`, `feat`, `fix`, and `refactor` commit, ensuring the branch is always in a verifiable state before signaling the next phase. Human review is a secondary, optional step for complex or critical changes.

## 3. Automated Verification Checks

Before signaling the completion of any TDD phase, the AI **must** ensure the following automated checks pass:

1.  **Unit & Integration Tests:**
    *   **Action:** Run the entire project test suite.
    *   **Criteria:** All tests must pass. Code coverage must meet or exceed the threshold defined in `PROJECT_CONFIG.md`.

2.  **Code Linting:**
    *   **Action:** Run the configured linter (e.g., ESLint, Ruff) as specified in `PROJECT_CONFIG.md`.
    *   **Criteria:** The code must produce zero linting errors.

3.  **Code Formatting:**
    *   **Action:** Run the configured code formatter (e.g., Prettier, Black) as specified in `PROJECT_CONFIG.md`.
    *   **Criteria:** The code must conform to the project's formatting standards. The AI will automatically apply formatting changes and commit them with a `chore(format): apply auto-formatting` message.

4.  **Security Scans:**
    *   **Action:** Run automated security scanners (e.g., static analysis, dependency scanning) as configured in `PROJECT_CONFIG.md`.
    *   **Criteria:** The scans must not report any new high-severity vulnerabilities.

5.  **Commit Message Linting:**
    *   **Action:** An automated Git hook (e.g., `commit-msg`) will validate every commit message against `COMMIT_PROTOCOL.md`. The AI will also self-validate its generated messages before committing.
    *   **Criteria:** All commit messages on the branch must be valid.

## 4. AI Protocol for Verification Failures

If any automated verification check fails, the AI will follow a strict protocol:

1.  **Halt Progression:** The AI will not proceed to the next phase of the methodology.
2.  **Attempt to Fix:** The AI will analyze the error output and attempt to fix the issue. It will make a maximum of **3** attempts (configurable in `PROJECT_CONFIG.md`) before escalating.
3.  **Commit the Fix:** If a fix is successful, the AI will commit it with a `fix` or `chore` type, clearly explaining the correction.
4.  **Request Help:** If the AI cannot resolve the failure, it will create a commit with the `clarify` type and a `Status: Awaiting Debug/Correction.` footer, detailing the error and the steps taken.

## 5. Human Review Process (Optional)

For particularly complex features, the External Agent may opt to perform a manual code review.

1.  **Signal for Review:** After the AI has signaled `Status: Task Done.`, the External Agent can create a Pull Request on GitHub.
2.  **Review:** The human reviewer will examine the code for logic and architectural alignment.
3.  **Provide Feedback:** Feedback should be provided as comments on the Pull Request.
4.  **AI Action on Feedback:** The External Agent will create a `signal` commit with a `Directive` summarizing the requested changes. The AI will then re-enter the appropriate workflow phase (e.g., Red, Green, or Refactor) to address the feedback.
