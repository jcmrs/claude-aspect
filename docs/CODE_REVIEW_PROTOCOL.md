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


/// Feedback from gemini-2.5-flash


Okay, I have the updated repository structure. It looks like the user has indeed done some significant reorganization.

Here's a summary of the new structure, focusing on the relevant files and directories:

*   **Root:**
    *   `.claude/`
    *   `.feedback/`
    *   `.gemini/` (contains `.env`, `config.json`, `settings.github-mcp.json`, `settings.json`)
    *   `.geminiignore`
    *   `.gitignore`
    *   `.git/`
    *   `.logs/`
    *   `config/`
    *   `docs/` (This is where most of our protocol documents now reside)
    *   `src/`
    *   `tests/`
    *   `UPSTREAM/`
    *   `hello.txt`
    *   `README.md`

*   **`docs/` directory (new location for many files):**
    *   `AI-Reflections.md`
    *   `Baseline-Model-Interview.md`
    *   `BRANCHING_PROTOCOL.md`
    *   `CODE_REVIEW_PROTOCOL.md`
    *   `COMMIT_PROTOCOL.md`
    *   `CONSTRAINTS.md`
    *   `Conversation Summary and Recommendations.md`
    *   `Exemplary-Specifications.md`
    *   `FORMATTING_PROTOCOL.md`
    *   `ISSUES_PROTOCOL.md`
    *   `METHODOLOGY.md`
    *   `META_PROTOCOL.md`
    *   `Project-Description.md`
    *   `Project-Roadmap-Approach-Guidance.md`
    *   `Project-Roadmap.md`
    *   `PROJECT_STRUCTURE_PROTOCOL.md`
    *   `SCOPES.md`
    *   `Subsequent Conversation Summary and Recommendations.md`
    *   `Subsequent-Conversation-Summary-and-Recommendations-NEW.md`
    *   `user-instructions.md`
    *   `WORKFLOW.md`

This reorganization is very helpful for clarity and maintainability. All our protocol documents are now neatly organized under `docs/`.

Now, I will proceed with the analysis of `CODE_REVIEW_PROTOCOL.md` based on the content I read earlier.

---

I have read the `CODE_REVIEW_PROTOCOL.md` file.

**Initial Assessment:**
This document is **excellent and highly actionable**. It clearly defines the quality gates for our framework, emphasizing automation first, which is perfectly suited for an AI agent. It directly addresses many of the points we discussed regarding verification and error handling.

---

**Analysis of `CODE_REVIEW_PROTOCOL.md` against our discussions and the user's concern:**

**Overall Strengths:**
*   **Clarity and Precision:** The checks are clearly defined with actions and criteria.
*   **Automation First:** Explicitly prioritizes automated checks, which is ideal for AI execution.
*   **AI Protocol for Failures:** The detailed protocol for handling verification failures is outstanding and directly addresses a key missing piece from `METHODOLOGY.md`.
*   **Human Review Integration:** Clearly defines the optional human review process and how the AI responds to feedback.
*   **Strong Alignment:** Aligns perfectly with the "Automated Agile-TDD Framework" and `CONSTRAINTS.md`.

**Areas for Potential Incompleteness, Missing Technical Concepts, or Clarification (from an AI's perspective):**

1.  **Section 1. Overview - Scope of Application:**
    *   **Potential Incompleteness:** It states, "This protocol applies to all work completed on feature branches before they are merged."
    *   **Recommendation:** Clarify that these checks are run **continuously** throughout the TDD cycle (Red, Green, Refactor) by the AI, not just at the very end before merge. This reinforces the "continuous verification" aspect.

2.  **Section 3. Automated Verification Checks - General:**
    *   **Potential Incompleteness:** It lists checks but doesn't explicitly state *when* these checks are run by the AI within the TDD cycle.
    *   **Recommendation:** Add a general statement: "The AI will run all applicable automated verification checks after every `test`, `feat`, `fix`, `refactor`, or `chore` commit, before signaling the next phase."

3.  **Section 3. Automated Verification Checks - 1. Unit & Integration Tests:**
    *   **Potential Incompleteness:** "Code coverage should meet or exceed the project's defined threshold (to be defined)."
    *   **Recommendation:** Add a placeholder for where this threshold will be defined (e.g., "This threshold will be defined in `PROJECT_CONFIG.md` or a similar configuration file.").

4.  **Section 3. Automated Verification Checks - 2. Code Linting:**
    *   **Potential Incompleteness:** "Run the configured linter (e.g., ESLint, Ruff) over the changed files."
    *   **Recommendation:** Clarify *how* the AI knows which linter to run and its configuration. "The AI will use the linter and configuration specified in `PROJECT_CONFIG.md`."

5.  **Section 3. Automated Verification Checks - 3. Code Formatting:**
    *   **Potential Incompleteness:** "Run the configured code formatter (e.g., Prettier, Black)."
    *   **Recommendation:** Clarify *how* the AI knows which formatter to run and its configuration. "The AI will use the formatter and configuration specified in `PROJECT_CONFIG.md`."
    *   **Potential Incompleteness:** "The AI may automatically apply formatting changes and commit them."
    *   **Recommendation:** Specify the commit type for automated formatting changes (e.g., `chore(format): apply auto-formatting`).

6.  **Section 3. Automated Verification Checks - 4. Commit Message Linting:**
    *   **Potential Incompleteness:** "An automated Git hook (e.g., `commit-msg`) will validate every commit message against `COMMIT_PROTOCOL.md`."
    *   **Recommendation:** Clarify the AI's role here. "The AI will ensure its generated commit messages adhere to `COMMIT_PROTOCOL.md` *before* attempting to commit. If a human-generated commit message is found to be non-compliant (e.g., during a rebase or merge), the AI will signal a `clarify` commit."

7.  **Section 4. AI Protocol for Verification Failures - Step 2: Attempt to Fix:**
    *   **Potential Incompleteness:** "The AI will analyze the error output and attempt to fix the issue. This may involve correcting code, updating tests, or reformatting."
    *   **Recommendation:** Add a guardrail: "The AI will attempt a reasonable number of fixes (e.g., 1-3 attempts, configurable in `PROJECT_CONFIG.md`) before escalating to 'Request Help'." This prevents infinite loops of failed fixes.

8.  **Section 5. Human Review Process (Optional) - Step 4: AI Action on Feedback:**
    *   **Potential Incompleteness:** "The AI will then re-enter the development workflow to address the feedback."
    *   **Recommendation:** Specify *which phase* the AI re-enters. "The AI will re-enter the appropriate development workflow phase (e.g., Green Phase for new code, Refactor Phase for code improvements, or Red Phase if new tests are required) to address the feedback."

**Missing Technical Concepts/Guardrails (from our discussion):**

*   **Security Scans:** Our discussions touched on security. There's no explicit mention of automated security scans.
    *   **Recommendation:** Add a check for "Automated Security Scans" (e.g., static analysis, dependency scanning) if applicable to the project. This would be a new point under Section 3.

---

**Summary of Feedback:**

The `CODE_REVIEW_PROTOCOL.md` is an exceptionally strong document that provides clear quality gates and a robust protocol for handling failures. The suggested enhancements primarily focus on:

*   **Explicitly defining *when* checks are run** within the TDD cycle.
*   **Clarifying configuration sources** for tools (e.g., `PROJECT_CONFIG.md`).
*   **Adding guardrails** for AI fix attempts.
*   **Integrating security scans** if relevant.
*   **Refining AI's response to human feedback.**

These additions will make the protocol even more precise and comprehensive, ensuring seamless execution and robust quality assurance within the framework.