# Project Roadmap: claude-aspect

This document outlines the detailed, phased implementation plan for building the Git-native, methodology-driven development environment. It follows the structure laid out in the `Project-Roadmap-Approach-Guidance.md` document.

---

## Phase 1: Laying the Foundation (Defining the Rules)

**Goal:** To create the core, human-readable documents that define the project's methodology and communication protocols. This phase is critical as it provides the foundational rules upon which all subsequent automation will be built.

**Steps:**

1.  **Formalize the "Automated Agile-TDD Framework":**
    *   **Task:** Create a detailed document named `METHODOLOGY.md`.
    *   **Details:** This document will articulate the complete Test-Driven Development lifecycle to be followed. It will define the "Red-Green-Refactor" cycle, specify how user stories are decomposed into testable criteria, and outline the continuous verification steps (linting, testing) required for each commit.
    *   **Reference:** This is based on our discussion of an optimal framework for the AI's inherent tendencies. *(See: "Round 10: Methodology in Global System Prompt", Conversation Summary)*.

2.  **Define the Git Commit Communication Protocol:**
    *   **Task:** Create a detailed document named `COMMIT_PROTOCOL.md`.
    *   **Details:** This document will define the strict syntax for all commit messages, inspired by Conventional Commits. It will specify the `type`, `scope`, `subject`, `body`, and `footer` sections, and detail how they are used to signal tasks, status, questions, and directives between the user/external agent and the Gemini CLI.
    *   **Reference:** This is the implementation of our insight to use Git as the central communication hub. *(See: "Round 3: Git Commits as the Communication Mechanism", Subsequent Conversation Summary)*.

3.  **Document the Session Re-initialization Process:**
    *   **Task:** Create a document named `RECOVERY_PROCEDURE.md`.
    *   **Details:** This guide will provide explicit, step-by-step instructions on how to re-initialize the AI's context in a new session by instructing it to read the foundational project documents (`METHODOLOGY.md`, `COMMIT_PROTOCOL.md`, etc.) and check the Git log. 
    *   **Reference:** This directly addresses the "Persistent Memory Gap" and the challenge of the AI's ephemeral session state. *(See: "Round 12: Preserving Context Across Sessions", Subsequent Conversation Summary)*.

---

## Phase 2: Tooling & Workflow Setup

**Goal:** To configure the necessary tools and define the workflows required for the AI to interact with the repository and the user/external agent programmatically and securely.

**Steps:**

1.  **Configure GitHub Integration Extension:**
    *   **Task:** Properly install and configure the Gemini Extension for GitHub interaction.
    *   **Details:** This involves securely setting the `GITHUB_MCP_PAT` as a system environment variable with the minimum required scopes to interact with a remote repository (for future use). The extension is the preferred method over direct API calls for security and maintainability.
    *   **Reference:** This follows our discussion on secure credential handling and the preference for extensions. *(See: "Round 9: Gemini Extension for Secure Credential Handling", Subsequent Conversation Summary)*.

2.  **Define the External Agent Workflow:**
    *   **Task:** Create a document named `WORKFLOW.md`.
    *   **Details:** This document will define the roles and responsibilities of the "External Agent" (initially, the human user). It will specify how to initiate a task by creating a feature branch, how to monitor progress by reading commit messages, and how to provide clarifications or merge completed branches.
    *   **Reference:** This formalizes the interaction model between the user and the AI within our new system. *(See: "Round 1: Human-to-Gemini Translator", Conversation Summary)*.

3.  **Implement Commit Linter:**
    *   **Task:** Implement an automated commit message linter.
    *   **Details:** Configure a tool like `commitlint` to automatically validate all commit messages against the rules defined in `COMMIT_PROTOCOL.md` and `SCOPES.md`. This will be triggered by a Git hook (e.g., `commit-msg`).
    *   **Reference:** This addresses the need to offload the cognitive burden of the protocol from the human user and programmatically enforce its rules. *(See: Feedback on `COMMIT_PROTOCOL.md`)*.

---

## Phase 3: Building a Proof of Concept (PoC)

**Goal:** To execute a single, simple, end-to-end task using the complete framework to validate that all components (methodology, protocol, tools, workflow) function together as designed.

**Steps:**

1.  **Define the PoC Task:**
    *   **Task:** The initial task will be: "Create a file named `hello.txt` with the content 'Hello, World!' and a corresponding test to verify the file's content."

2.  **Execute the Full Workflow:**
    *   **Branch:** The External Agent will create a new feature branch (e.g., `feature/poc-hello-world`).
    *   **Signal:** The External Agent will make an initial commit on this branch with a message like `feat(core): initial commit for hello-world PoC

Directive: Begin TDD Red Phase for hello.txt`. 
    *   **AI Execution (Red):** The AI will read the directive, create a failing test that checks for the existence and content of `hello.txt`, and commit the test with a message like `test(core): add failing test for hello.txt

Status: Red Phase Complete. Ready for Green Phase.`
    *   **AI Execution (Green):** The AI will read the new status, create the `hello.txt` file, making the test pass, and commit the file with a message like `feat(core): create hello.txt to pass test

Status: Green Phase Complete. Ready for Refactor Phase.`
    *   **AI Execution (Refactor):** The AI will analyze the code (in this case, simple) and, seeing no refactoring is needed, will commit with a message like `chore(core): no refactoring needed for hello.txt

Status: Refactor Phase Complete. Task Done.`
    *   **Merge:** The External Agent will review the completed branch and merge it into the main branch.

3.  **Review PoC Results:**
    *   **Task:** Analyze the Git history of the PoC branch to confirm that every step was followed correctly and every commit message adhered to the protocol.
    *   **Reference:** This entire phase is the practical test of our "shadow Git tree" concept and the commit communication protocol. *(See: "Round 4: Risks of Concurrent Work" & "Round 5: Integrating GitHub Copilot", Subsequent Conversation Summary)*.

---

## Phase 4: Iteration and Expansion

**Goal:** To refine the system based on the PoC results and begin applying it to more complex, real-world features.

**Steps:**

1.  **Refine Protocols and Methodology:**
    *   **Task:** Based on any friction or ambiguity discovered during the PoC, update the `METHODOLOGY.md` and `COMMIT_PROTOCOL.md` documents.
    *   **Details:** This ensures our system is a "living document" and improves over time.

2.  **Tackle Initial Project Features:**
    *   **Task:** Begin using the refined framework to build the actual features of the `claude-aspect` project, starting with the foundational components identified in our discovery.

3.  **Integrate Advanced Tooling (Future):**
    *   **Task:** Explore the integration of GitHub Copilot as a code-generation utility, orchestrated by the Gemini CLI within the TDD workflow, as discussed.
    *   **Reference:** This is a future goal that builds upon our established framework. *(See: "Round 5: Integrating GitHub Copilot with Feature Branches", Subsequent Conversation Summary)*.
