# Git Commit Communication Protocol

## 1. Overview

This document defines the strict communication protocol for the `claude-aspect` project. Adherence to this protocol is mandatory, as it is the primary mechanism for orchestrating the development workflow, maintaining the "process memory" of the project, and enabling asynchronous communication between the External Agent and the Gemini CLI.

Every commit message is a structured signal that conveys intent, action, and status. The protocol is inspired by [Conventional Commits](https://www.conventionalcommits.org/).

## 2. Commit Message Structure

Each commit message must conform to the following structure:

```
<type>(<scope>): <subject>

[optional body]

[optional footer(s)]
```

### 2.1. Type

The `type` is mandatory and **must** be one of the following exact values, all lowercase:

*   **feat:** A new feature is introduced with this commit. (Corresponds to the TDD Green Phase).
*   **fix:** A bug fix is introduced with this commit. (Corresponds to the TDD Green Phase for bugs).
*   **test:** Adding a new test or correcting an existing test. (Corresponds to the TDD Red Phase).
*   **refactor:** A code change that neither fixes a bug nor adds a feature, but improves the internal structure or performance.
*   **chore:** Changes to the build process or auxiliary tools and libraries. Also used when no refactoring is needed in the Refactor Phase.
*   **docs:** Documentation only changes.
*   **clarify:** A special type used only by the AI to signal that it has encountered ambiguity and requires input from the External Agent.
*   **signal:** A special type used only by the External Agent to provide a new directive or answer a clarification question.

### 2.2. Scope

The `scope` is mandatory and provides contextual information about the part of the codebase the commit pertains to. The scope **should** be chosen from a predefined list of project modules/areas maintained in `SCOPES.md`.

*   *Examples:* `core`, `user-profile`, `auth`, `methodology`, `build`

### 2.3. Subject

The `subject` is mandatory. It is a short, imperative-tense description of the change.

*   It must not end with a period.
*   It should be capitalized.
*   It should ideally be no longer than 72 characters.
*   *Example:* `Add failing test for email display`

### 2.4. Body

The `body` is optional but highly encouraged, especially for `feat`, `fix`, and `test` commits. It is used to provide the "why" and "context" behind the change.

*   It should explain the intent of the change and how it differs from previous behavior.
*   It is where the AI will explicitly state which phase of the TDD cycle has been completed.

### 2.5. Footer(s)

Footers are used for machine-readable signals and metadata. They consist of a token, a separator (`:`), and a value.

*   **`Status:` (Mandatory for AI Commits):** This footer signals the current state of the task. The value **must** be one of the following exact strings:
    *   `Ready for Green Phase.`
    *   `Ready for Refactor Phase.`
    *   `Task Done.`
    *   `Awaiting Clarification.`
    *   `Awaiting Debug/Correction.`

*   **`Directive:` (Mandatory for External Agent Signals):** This footer provides a command to the AI. The value **must** conform to one of the following formats:
    *   `Begin TDD Red Phase.`
    *   `Answer Clarification: [Specific Answer to Question].`
    *   `Proceed to Next Step.`
    *   `Abort Task.`

*   **`Refs:` (Optional):** Used to reference issue numbers from an external tracker.
    *   *Example:* `Refs: #123`

## 3. Tooling and Adherence

To ease the burden on human users acting as the External Agent, the use of automated tooling is highly recommended:

*   **Commit Message Linters:** Tools like `commitlint` should be configured to automatically validate all commit messages against this protocol.
*   **IDE Integrations:** Plugins that assist in generating structured commit messages are encouraged.
*   **AI Validation:** As a fallback, the AI can be instructed to validate a proposed commit message before it is made.

