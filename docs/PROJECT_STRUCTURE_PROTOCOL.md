# Project Structure Protocol

## 1. Overview

This document defines the standard project structure and naming conventions for the `claude-aspect` project. Adhering to this protocol is mandatory to ensure consistency, maintainability, and to reduce cognitive load for all participants (human and AI).

This protocol directly informs the allowed values for the `scope` in our `COMMIT_PROTOCOL.md`.

## 2. Top-Level Directory Structure

The project root will adhere to the following directory structure. All top-level directories should be lowercase.

*   **`/src`**: Contains all primary source code for the application.
    *   *Example:* Python modules, JavaScript source files.

*   **`/tests`**: Contains all tests for the source code. The structure within `/tests` should mirror the structure of `/src`.
    *   *Example:* `tests/core/test_main.py` would test `src/core/main.py`.

*   **`/docs`**: Contains all project documentation, including foundational documents, summaries, and diagrams.
    *   *This is where our protocol and description documents reside.*

*   **`/config`**: Contains configuration files for various tools and environments (e.g., linters, formatters, deployment settings).

*   **`/scripts`**: Contains utility scripts for automation, build processes, or other development tasks.

*   **`/UPSTREAM`**: This directory is specifically for containing local clones of external Git repositories. It is listed in the `.gitignore` file and is not part of the main project's version control.

## 3. File Naming Conventions

To ensure consistency, all files should adhere to the following naming conventions:

*   **Source Code & Tests:** `snake_case` (e.g., `user_profile.py`, `test_user_profile.py`).
*   **Configuration Files:** `kebab-case` or as required by the specific tool (e.g., `.eslintrc.json`, `commitlint.config.js`).
*   **Documentation:** `PascalCase` or `UPPERCASE` for primary documents (e.g., `METHODOLOGY.md`, `README.md`).
*   **Scripts:** `kebab-case` (e.g., `deploy-staging.sh`).

## 4. Commit Scope Naming

The names of the top-level directories and primary modules within `/src` should serve as the basis for the allowed scopes defined in `SCOPES.md`. This creates a direct link between the code structure and the commit history.

*   A commit modifying `src/auth/login.py` should use the `auth` scope: `feat(auth): ...`
*   A commit modifying `docs/METHODOLOGY.md` should use the `methodology` scope: `docs(methodology): ...`
