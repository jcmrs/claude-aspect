# Exemplary Specifications & Interaction Patterns

## 0. Introduction

This document serves as a practical guide and a collection of "golden path" examples for interacting with the Gemini CLI agent within this project. It provides concrete templates that align with the principles outlined in `CONSTRAINTS.md`. 

Following these patterns will ensure maximum clarity, efficiency, and predictability when assigning tasks to the AI.

---

## 1. Example: Atomic Execution & Explicit Continuation

This example demonstrates the `Principle of Explicit Continuation`. The AI will execute a single, verifiable step and then halt, awaiting a signal to proceed with the next logical step.

*   **Scenario:** A user asks the AI to "prepare the project repository."

*   **Observed "Golden Path" Interaction:**

    1.  **User/External Agent:** Provides a high-level goal.
        > "Your first task is to create the local Project Repository and prepare it so it is a GEMINI-CLI-Managed Repository..."

    2.  **AI Action (Step 1):** The AI executes the first logical, atomic action.
        > `git init`

    3.  **AI Signal (Report & Propose):** The AI confirms completion of the step and **explicitly lists the next required steps**, signaling that it is awaiting the directive to continue.
        > "I have initialized the Git repository. What's missing is:
        > 1. Configuring `.gemini/config.json`...
        > 2. Creating `.geminiignore`..."

    4.  **User/External Agent:** Provides the explicit signal to continue.
        > "Then do it"

*   **Lesson:** The AI must execute one verifiable step and then signal its next intended actions. The controlling agent (human or AI) must then provide the explicit signal to continue the workflow.

---

## 2. Example: Granting Task-Scoped Autonomy

This example demonstrates the `Principle of Task-Scoped Autonomy`. To have the AI execute a multi-step, single-scope task without pausing for confirmation after each step, the instruction must be comprehensive and explicitly grant autonomy.

*   **Scenario:** A user wants the AI to perform the full repository setup in one continuous action.

*   **Template for a Technical User:**

    ```
    Please initialize the Git repository, configure the `.gemini/config.json` file for Gemini CLI management, and create a `.geminiignore` file to fully integrate and automate this project with Gemini CLI. Proceed with all these steps without further confirmation.
    ```

*   **Template for a Non-Technical User:**

    ```
    I'm starting a new project here. My goal is for you to be able to fully manage it and help me with tasks automatically. Please handle all the technical setup needed for this, including any repository initialization and configuration, without asking me for each individual step.
    ```

*   **Lesson:** Autonomy is not assumed; it must be explicitly granted for a well-defined scope. Focusing on the goal and giving explicit permission to handle the "how" enables continuous execution.

---

## 3. Example: A Complete TDD Cycle via Commit Protocol

This is the most critical example, as it demonstrates a full, end-to-end workflow for a single feature, exercising multiple principles at once.

*   **Demonstrates:**
    *   `Principle of Atomic, Verifiable Cycles`
    *   `Principle of Testable Requirements`
    *   The `Git Commit Communication Protocol` in action.
    *   The "Shadow Git Tree" (Feature Branch) concept.

*   **Scenario:** The External Agent tasks the AI with creating a `hello.txt` file with specific content, following the full TDD methodology.

*   **The Workflow (as a sequence of Git commits):**

    1.  **External Agent (Branch Creation):** The agent first creates an isolated "work road" for the task.
        > `git checkout -b feature/poc-hello-world`

    2.  **External Agent (Task Signal):** The agent makes an empty commit with a directive in the message body, officially tasking the AI.
        > `git commit --allow-empty -m "feat(core): initial commit for hello-world PoC" -m "Directive: Begin TDD Red Phase for hello.txt"`

    3.  **AI (Red Phase - Write Failing Test):** The AI reads the directive, creates a test that will fail because the file doesn't exist, and commits it, signaling its status.
        > `git commit -m "test(core): add failing test for hello.txt" -m "Status: Red Phase Complete. Ready for Green Phase."`

    4.  **AI (Green Phase - Write Code):** The AI reads the new status, writes the minimal code to make the test pass (creates `hello.txt`), and commits it, signaling the next status.
        > `git commit -m "feat(core): create hello.txt to pass test" -m "Status: Green Phase Complete. Ready for Refactor Phase."`

    5.  **AI (Refactor Phase - Review & Finalize):** The AI reads the status, determines no refactoring is needed for this simple case, and commits a final status update, marking the task as complete from its perspective.
        > `git commit -m "chore(core): no refactoring needed for hello.txt" -m "Status: Refactor Phase Complete. Task Done."`

*   **Lesson:** This sequence provides a perfect, end-to-end template for how a task is signaled, executed in discrete, verifiable phases, and reported on. The entire workflow and its state are captured transparently and persistently in the Git history, requiring no external tracking.
