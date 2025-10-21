# TECHNOLOGY_STACK_PROTOCOL.md

## 1. Introduction

This document outlines the core technology stack and tooling adopted for the `claude-aspect` project. The choices reflect a commitment to security, efficiency, cross-platform compatibility, and maintainability, while leveraging modern development practices.

## 2. Technology Stack & Tooling: What We Use

| Layer | Technology | Rationale and Commentary |
|---|---|---|
| Runtime Environment | **Deno (TypeScript runtime)** | Secure, zero-config, no NPM overhead, native TypeScript support |
| Primary Programming Language| **TypeScript** | Chosen for its strong typing, cross-platform capabilities, and seamless integration with Deno. Avoids AI predisposition issues observed with Python in cross-platform testing scenarios. |
| Scripting & Automation | Deno TypeScript scripts + subprocess CLI calls | Modern, typed, minimal dependencies, cross-platform |
| Package Management | Deno native URL imports | Dependency bloat and versioning problems avoided |
| File Watching | Deno standard library fs.watch | Cross-platform, no external dependencies |
| Version Control | Native Git CLI commands | Universal, minimal dependencies, familiar to users. Serves as the primary "memory graph" for human and AI understanding, capturing complete history, origin, and rationale of all interactions and decisions. |
| Shell Scripting | PowerShell Core + POSIX shell fallback | Cross-platform scripting parity with Windows support |
| Gemini CLI Integration | `.gemini/GEMINI.md` prompt injection + Deno CLI subprocess calls | Clean separation of AI prompt management and automation orchestration |
| Usage Tracking & Quota | Lightweight Deno modules | Transparent, small footprint monitoring |
| Documentation & Archival | Markdown + GitHub Pages | Universally understood, versioned, approachable |

## 3. Guiding Principles for Technology Adoption

*   **Security First:** Prioritize tools and practices that enhance the security posture of the project.
*   **Minimal Overhead:** Favor solutions that reduce configuration, setup, and ongoing maintenance burdens.
*   **Cross-Platform Compatibility:** Ensure that all chosen technologies function seamlessly across different operating systems, particularly Windows and POSIX-compliant environments.
*   **Maintainability & Readability:** Select languages and tools that promote clear, maintainable, and easily understandable codebases.
*   **Leverage Existing Strengths:** Utilize the inherent capabilities of platforms (e.g., Deno's native TypeScript support, Git's versioning) to their fullest extent.
*   **Avoid "AI Predisposition":** Actively choose technologies and approaches that mitigate potential biases or limitations observed in AI-assisted development, particularly in testing and cross-platform scenarios.

This protocol will be reviewed periodically to ensure it remains aligned with project goals and industry best practices.