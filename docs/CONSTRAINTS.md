# Project Design Constraints & Philosophy

## 0. Introduction: The Power of Constraints

This document outlines the core, non-negotiable constraints that form the foundational design philosophy of this project. These are not limitations to be overcome, but rather strategic principles to be embraced. 

Our guiding philosophy is **constraint-driven design**. By building our system to the specifications of a baseline AI model requiring maximum specificity, we guarantee a level of clarity, rigor, and robustness that benefits the entire system, making it universally compatible and efficient for any AI agent, regardless of its capability.

These constraints are the "guardrails" that ensure our methodology and implementation remain clear, predictable, and powerful.

---

## 1. Principle of Structured Communication (Commit Protocol)

*   **Constraint:** All Git commits must strictly adhere to the predefined `COMMIT_PROTOCOL.md`.
*   **Implication:** Commit messages are the primary communication channel for the system. They are not merely descriptions; they are machine-readable signals that convey task status, directives, and rationale, forming the backbone of the project's "process memory."

## 2. Principle of Isolated Development (Feature Branching)

*   **Constraint:** All task execution must occur within a dedicated Git feature branch, isolated from the main development line (e.g., `main` or `develop`).
*   **Implication:** This enforces the "shadow Git tree" concept. The AI will be instructed to work exclusively on feature branches, which serve as isolated "work roads" for each task, preventing conflicts and ensuring a clean, traceable history.

## 3. Principle of Explicit Continuation

*   **Constraint:** The system must assume that any single task or action is not continuous. The AI will halt after each discrete, verifiable step.
*   **Implication:** Every subsequent step in a workflow requires an explicit "go" signal. These signals will be conveyed via Git commit messages, following the `COMMIT_PROTOCOL.md`, to ensure a deliberate, step-by-step progression.

## 4. Principle of Task-Scoped Autonomy

*   **Constraint:** The AI must be granted autonomy only for the explicit and comprehensive scope of a single, well-defined task.
*   **Implication:** The system must not expect the AI to infer a broader scope of action. A "single, well-defined task" is defined within a GitHub Issue (or similar tracker) and its execution is confined to a dedicated feature branch. Each new task signal redefines the scope of autonomy.

## 5. Principle of Atomic, Verifiable Cycles

*   **Constraint:** All work must be decomposed into the smallest possible iterative cycles, and the output of each cycle must be a single, atomic, and verifiable change.
*   **Implication:** This directly informs our "Automated Agile-TDD Framework." Each cycle (Red, Green, Refactor) will result in a single, distinct Git commit that adheres to the `COMMIT_PROTOCOL.md`, ensuring progress is incremental and constantly verified.

## 6. Principle of Testable Requirements

*   **Constraint:** All functional requirements must be defined as concrete, actionable, and testable acceptance criteria.
*   **Implication:** High-level requirements are forbidden. Requirements must be defined as Gherkin-style ("Given/When/Then") acceptance criteria within a GitHub Issue. This provides the AI with an unambiguous, verifiable definition of "done."

## 7. Principle of Secure Credential Management

*   **Constraint:** All sensitive credentials (e.g., Personal Access Tokens) must be stored and accessed via secure mechanisms like `.env` files (which are git-ignored) or system environment variables. They must never be hardcoded or committed to version control.
*   **Implication:** The methodology and all integrated tools must be designed to retrieve credentials from these secure, external sources.

## 8. Constraint: Non-Interactive Execution Only

*   **Constraint:** The AI can only execute self-contained, non-interactive commands. It cannot participate in real-time, back-and-forth CLI sessions.
*   **Implication:** The entire methodology and its supporting toolchain must be built exclusively around non-interactive tools. This reinforces the preference for Gemini Extensions for interacting with external services like the GitHub MCP Server.

## 9. Constraint: Zero-State Assumption Between Sessions

*   **Constraint:** The system must assume the AI has zero internal memory or state ("process memory") of any previous interactions upon starting a new session.
*   **Implication:** This is the most critical constraint driving our architecture. It mandates that 100% of the project's context—code, documentation, decisions, status, and history—must be made persistent and queryable from the Git repository. This includes version-controlled files like `METHODOLOGY.md` and `DECISIONS.md`, as well as the conceptual history captured in GitHub Issues. The `RECOVERY_PROCEDURE.md` is a direct consequence of this constraint.

  This would transform it from a strong philosophical document
  into an even more precise and comprehensive directive for
  AI-driven development.
