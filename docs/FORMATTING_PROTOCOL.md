# **FORMATTING_PROTOCOL.md:**

## 1. Overview

This document defines the mandatory formatting standards for all code, documentation, and communication artifacts within the `claude-aspect` project. Adherence to this protocol ensures consistency, readability, and machine-parseability, reinforcing the "Golden Path" principles of clarity, specificity, and structured output.

This protocol applies to all files and communications generated or modified by both the External Agent and the AI.

## 2. Core Principles

*   **Consistency:** All project artifacts must adhere to a single, unified formatting style.
*   **Readability:** Formatting should enhance human comprehension and reduce cognitive load.
*   **Machine-Parseability:** Formatting must facilitate automated processing and validation by AI agents and tooling.
*   **Automation:** Formatting should primarily be enforced and applied by automated tools.

## 3. Code Formatting Standards

All source code files (e.g., `.py`, `.js`, `.ts`, `.md`) must adhere to the following standards:

### 3.1. Indentation
*   **Standard:** Use 4 spaces for indentation. Tabs are forbidden.
*   **Rationale:** Ensures consistent visual structure across different editors and environments.
*   **AI Action:** The AI will automatically apply 4-space indentation.

### 3.2. Line Length
*   **Standard:** Lines should be wrapped at 80 characters where possible, with a hard limit of 120 characters.
*   **Rationale:** Improves readability, especially in split-screen views or smaller terminal windows.
*   **AI Action:** The AI will automatically wrap lines according to this standard.

### 3.3. Spacing
*   **Standard:**
    *   No trailing whitespace at the end of lines.
    *   One blank line between function/method definitions.
    *   One blank line after imports.
    *   Spaces around operators (e.g., `x = y + z`).
*   **Rationale:** Enhances code clarity and consistency.
*   **AI Action:** The AI will automatically apply spacing rules.

### 3.4. Quotes
*   **Standard:** Use single quotes (`'`) for string literals unless the string contains a single quote, in which case double quotes (`"`) should be used. Triple quotes (`"""` or `'''`) for multi-line strings/docstrings.
*   **Rationale:** Consistent string definition.
*   **AI Action:** The AI will automatically apply quote standards.

### 3.5. Imports
*   **Standard:** Imports should be grouped and sorted alphabetically.
    *   Standard library imports first.
    *   Third-party imports next.
    *   Local application imports last.
    *   Each group separated by a blank line.
*   **Rationale:** Improves code organization and reduces merge conflicts.
*   **AI Action:** The AI will automatically sort and group imports.

## 4. Documentation Formatting Standards

All Markdown files (e.g., `.md` files like `METHODOLOGY.md`, `DIARY.md`, `README.md`) must adhere to the following standards:

### 4.1. Headings
*   **Standard:** Use ATX headings (e.g., `# Heading 1`, `## Heading 2`).
*   **Rationale:** Consistent structure for document navigation.
*   **AI Action:** The AI will use ATX headings.

### 4.2. Lists
*   **Standard:**
    *   Unordered lists: Use hyphens (`-`).
    *   Ordered lists: Use `1.`, `2.`, etc.
    *   Indent nested lists with 4 spaces.
*   **Rationale:** Clear and consistent list presentation.
*   **AI Action:** The AI will use these list formats.

### 4.3. Code Blocks
*   **Standard:** Use fenced code blocks (triple backticks ` ``` `) with language specifiers (e.g., ` ```python `).
*   **Rationale:** Improves readability and enables syntax highlighting.
*   **AI Action:** The AI will use fenced code blocks with language specifiers.

### 4.4. Emphasis
*   **Standard:** Use asterisks (`*`) for italics and double asterisks (`**`) for bold.
*   **Rationale:** Consistent text emphasis.
*   **AI Action:** The AI will use asterisks for emphasis.

## 5. Commit Message Formatting

*   **Standard:** All commit messages must strictly adhere to the `COMMIT_PROTOCOL.md`.
*   **Rationale:** Ensures structured communication and machine-parseability.
*   **AI Action:** The AI will validate and generate commit messages according to `COMMIT_PROTOCOL.md`.

## 6. File Naming Conventions

*   **Standard:** All new files and directories should follow `kebab-case` (e.g., `my-new-file.md`, `feature-module/`).
*   **Rationale:** Consistency and cross-platform compatibility.
*   **AI Action:** The AI will adhere to `kebab-case` for new file and directory names.

## 7. Tooling for Enforcement

*   **Recommendation:** The project will utilize automated tools to enforce these formatting standards.
*   **Prioritization:** For Deno-based projects, **Deno's built-in `deno fmt` and `deno lint` are the primary and preferred tools** due to their simplicity, performance, and tight integration with the Deno ecosystem. Other tools like Prettier and ESLint should only be considered if `deno fmt` and `deno lint` cannot meet specific, advanced project requirements not covered by Deno's native tools.
*   **Examples:**
    *   **Deno (Primary):** `deno fmt` (formatter), `deno lint` (linter)
    *   **Python:** Black (formatter), Ruff (linter)
    *   **JavaScript/TypeScript (Secondary/Specific Needs):** Prettier (formatter), ESLint (linter)
    *   **Markdown:** Prettier (formatter), markdownlint (linter)
*   **AI Action:** The AI will run these configured tools as part of the `CODE_REVIEW_PROTOCOL.md` and automatically apply fixes where possible, committing them with a `chore(format)` or `chore(lint)` type.

---

This `FORMATTING_PROTOCOL.md` provides the necessary actionable structure for consistent presentation across all project artifacts, reinforcing the "golden path" from a visual and machine-parseable perspective.