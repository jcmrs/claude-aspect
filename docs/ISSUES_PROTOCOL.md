# GitHub Issues Protocol

## 1. Overview

This document defines the protocol for using GitHub Issues as the primary tool for task management and for capturing the "process memory" of conceptual discussions, decisions, and discoveries. While our project is currently local, this protocol is designed for future integration with a remote GitHub repository.

Adherence to this protocol is mandatory for both the External Agent and the AI to ensure that all tasks are well-defined and that our project's history is rich, searchable, and auditable.

## 2. Core Principles

*   **No Code Without an Issue:** Every `feature`, `bugfix`, or `chore` branch and its associated commits must be linked to a corresponding GitHub Issue.
*   **Issues as Structured Data:** Issues are not just titles; they are structured documents that provide the necessary context for the AI to execute tasks.
*   **Labels as a Query Language:** A strict labeling system will be used to categorize, contextualize, and track the status of all issues, turning the issue tracker into a queryable database of our work and decisions.

## 3. Labeling System

Every issue **must** have exactly one label from each of the following categories. Status labels are mutually exclusive (e.g., an issue cannot be both `status:todo` and `status:in-progress`).

### 3.1. Type Labels (`type:`)

This mandatory label defines the nature of the issue. The `type` **must** be one of the following exact values:

*   `type:feature`: A new feature request.
*   `type:bug`: A bug report.
*   `type:chore`: A maintenance task (e.g., updating dependencies, refactoring).
*   `type:question`: A question for discussion or clarification (can be created by human or AI).
*   `type:discovery`: To document a significant insight or conceptual breakthrough.
*   `type:decision`: To create a formal record of a key decision and its rationale.

### 3.2. Context Labels (`context:`)

This label provides context about the area of the project the issue pertains to. The `context` label **must** be chosen from the predefined list of scopes in `SCOPES.md`.

*   `context:core`
*   `context:auth`
*   `context:methodology`
*   `context:protocol`
*   `context:build`

### 3.3. Status Labels (`status:`)

This mandatory label tracks the lifecycle of the issue. The `status` **must** be one of the following exact values:

*   `status:todo`: The task is defined and ready to be worked on.
*   `status:in-progress`: The task is actively being worked on (i.e., a feature branch exists).
*   `status:awaiting-clarification`: Work is blocked pending an answer to a question.
*   `status:in-review`: The task is complete and ready for final review before merging.
*   `status:done`: The task has been successfully merged and is complete.

## 4. Issue Status Transitions

The status of an issue must follow these valid transitions:

*   `status:todo` -> `status:in-progress`
*   `status:in-progress` -> `status:awaiting-clarification`
*   `status:in-progress` -> `status:in-review`
*   `status:awaiting-clarification` -> `status:in-progress`
*   `status:in-review` -> `status:done`

## 5. Issue Templates

To enforce structure, mandatory templates will be used for creating issues. These templates will be implemented as GitHub Issue Templates in the `.github/ISSUE_TEMPLATE` directory of the repository.

### 5.1. Feature Request Template (`type:feature`)

*   **Title:** `feat(<scope>): [Short, descriptive title]`
*   **Body:**
    *   **User Story:** (As a [user type], I want [goal] so that [benefit].)
    *   **Acceptance Criteria:** (A list of Gherkin-style "Given/When/Then" criteria that are concrete and testable.)
    *   **Rationale/Context:** (Why is this feature needed?)

### 5.2. Bug Report Template (`type:bug`)

*   **Title:** `bug(<scope>): [Short description of the bug]`
*   **Body:**
    *   **Description:** (A clear and concise description of the bug.)
    *   **Steps to Reproduce:** (Numbered steps to reproduce the behavior.)
    *   **Expected Behavior:** (What should have happened?)
    *   **Actual Behavior:** (What actually happened?)

### 5.3. Decision Record Template (`type:decision`)

*   **Title:** `decision(<scope>): [The decision that was made]`
*   **Body:**
    *   **Context:** (What was the problem or question being addressed?)
    *   **Options Considered:** (A list of the options that were evaluated.)
    *   **Decision:** (The final decision.)
    *   **Rationale:** (Why was this decision made? What are the trade-offs?)

## 6. Linking Commits and Issues

Every commit on a feature branch **must** reference its corresponding issue number in the commit message footer. The AI will determine the issue number by parsing it from the active branch name, which follows the `BRANCHING_PROTOCOL.md`.

*   *Example:* `feat(auth): implement OAuth2 login flow

Refs: #42`

This creates a direct, traceable link between the conceptual task (the issue) and the implementation details (the commits).

## 7. AI's Role in Issue Management

The AI has the following responsibilities regarding issue management:

*   **Issue Creation:** The AI will programmatically create issues for specific purposes, primarily `type:question` when it requires clarification to proceed.
*   **Status Updates:** The AI will automatically update an issue's status label via the GitHub API as it works on a task:
    *   When it creates a feature branch for a `status:todo` issue, it will update the issue to `status:in-progress`.
    *   When it creates a `clarify` commit, it will update the issue to `status:awaiting-clarification`.
    *   When it receives a `signal` commit answering a clarification, it will update the issue back to `status:in-progress`.
    *   When it commits with `Status: Task Done.`, it will update the issue to `status:in-review`.