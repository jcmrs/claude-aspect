# Project Scopes

This document serves as the single source of truth for all allowed `scope` values in the Git commit message protocol. Using a scope from this list is mandatory to ensure consistency and machine-readability of the Git history.

## How to Use

When creating a commit, the `scope` part of the message (e.g., `feat(scope): ...`) must be one of the values listed below.

## Defined Scopes

*   **project:** Changes that affect the overall project structure, configuration, or documentation (e.g., updating roadmap, project description).
*   **core:** Changes related to the central, foundational logic of the application.
*   **auth:** Changes specifically related to user authentication or authorization.
*   **user-profile:** Changes related to the user profile feature.
*   **methodology:** Changes to the core methodology documents themselves (e.g., `METHODOLOGY.md`, `CONSTRAINTS.md`).
*   **protocol:** Changes to the communication protocols (e.g., `COMMIT_PROTOCOL.md`, `SCOPES.md`).
*   **build:** Changes affecting the build process, CI/CD pipelines, or other dependency management.
