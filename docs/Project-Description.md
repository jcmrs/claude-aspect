# Project Description: claude-aspect

## 1. Vision

The vision for this project was born from a journey of discovery into the nature of human-AI collaboration. It started with a simple question: "Why is the interaction with a safety-focused CLI agent like Gemini so different from a more interpretive AI?" This led to the realization that the AI's inherent need for precision and safety, while initially seeming like a barrier for non-technical users, could be transformed into a powerful strength. 

The vision is therefore **to create a development environment where this precision and safety are not a hurdle, but the very foundation of a highly reliable, consistent, and automated system.** It is a vision of a workflow where the human user can focus on the "what" and the "why" of a project, while the AI, guided by a clear and unchangeable methodology, flawlessly executes the "how." This journey of discovery itself—understanding the gaps in interaction, memory, and process—is the guiding light for the project.

*(Reference: The evolution of this vision is captured across both the "Conversation Summary and Recommendations" and "Subsequent Conversation Summary and Recommendations" documents, particularly in the rounds discussing the "Caution Reflex," "Interaction Model Differences," and the value of "Process Memory".)*

## 2. Mission

Our mission is to **build a complete, Git-native, methodology-driven development environment.** 

This system will enable a non-technical user to collaborate effectively with the Gemini CLI agent to build software. It will achieve this by using the project's own Git repository as its central communication hub, its persistent memory, and its workflow manager, all orchestrated by a deeply embedded development framework.

## 3. The Problem Statement

Our discovery process identified two fundamental challenges that prevent effective, safe, and scalable collaboration between a non-technical user and a CLI-based AI agent:

1.  **The Interaction & Specificity Gap:** The user thinks in high-level, natural language goals, while the AI requires precise, unambiguous, and structured instructions to perform actions safely. This creates friction, slows down the process, and places a heavy cognitive load on the user to perform the translation.
    *(Reference: "Round 6: Interaction Model Differences", Conversation Summary)*

2.  **The Persistent Memory Gap:** The AI's operational context—the rich, dynamic "process memory" of conversations, discarded ideas, and the rationale behind decisions—is ephemeral and lost between sessions. This makes it impossible to maintain long-term project coherence, understand the history of decisions, or onboard new participants (human or AI) without starting from scratch.
    *(Reference: "Round 12 & 13: Preserving Context & Process Memory", Subsequent Conversation Summary)*

## 4. The Proposed Solution

Instead of relying on external, proprietary tools, our solution is to leverage the robust, ubiquitous, and powerful features of **Git** to solve both core problems. We will create a system where the Git repository becomes the active, intelligent backbone of the entire development process.

*   **To solve the Interaction Gap**, we will embed a strict **"Automated Agile-TDD Framework"** into the AI's core logic. This methodology provides the structure and rules, allowing the AI to automatically translate high-level goals into concrete, verifiable steps (tests and code), guided by a clear protocol.

*   **To solve the Persistent Memory Gap**, we will use the Git repository itself as the persistent memory system:
    *   **Commit Messages** will serve as a structured communication protocol for tasks, status updates, and questions.
    *   **Feature Branches** will provide isolated "work roads" for each task, preserving the complete history of its development.
    *   **Version-Controlled Documents** (`METHODOLOGY.md`, `DECISIONS.md`, etc.) will store the high-level rules and rationale.

This Git-native approach ensures that the project's code, its history, and the "process memory" of how it was built are all stored in a single, unified, and persistent location.

*(Reference: "Round 3: Git Commits as Communication" & "Round 4: Shadow Git Tree", Subsequent Conversation Summary)*

## 5. Guiding Principles

The entire system will be built and operated according to the following non-negotiable principles:

1.  **Safety and Precision First:** The system must prevent data loss and unintended actions. All operations must be deliberate, verifiable, and precise. Overwriting files without permission, for example, is a critical failure.
2.  **Clarity and Explicitness:** The communication protocol and methodology must be unambiguous to both the user and the AI. We prefer explicit signals over inferred intent.
3.  **Leverage Standard Tools:** The solution will be built upon the industry-standard foundation of Git, ensuring it is robust, maintainable, and accessible.
4.  **Preserve the "Why":** The system's primary goal is not just to produce code, but to preserve the context, rationale, and history of how and why the code came to be.
