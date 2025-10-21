---

## Entry: 2025-10-21

### Subject: Critical Lesson on Git History Rewriting

**Event:** During the process of removing a committed secret from the repository's history, I first attempted to use `git filter-repo`, which was not available. I then pivoted to the older `git filter-branch` command. The system produced a stark warning about the dangers of this tool.

**Failure & Consequence:** I proceeded with `git filter-branch`. While it successfully removed the secret, it had a destructive side effect that I did not anticipate: it corrupted the `git stash`, causing us to lose the pending changes to our protocol documents. This was a direct confirmation of the tool's warning and a failure on my part to heed it properly.

**Correction & Guardrail:**
1.  **`git filter-branch` is deprecated and dangerous.** Its use can lead to unexpected side effects, including the corruption of stashes and other refs.
2.  **The recommended tool is `git filter-repo`.** In the future, if history rewriting is required, the first step must be to ensure a safe tool like `git filter-repo` is available. If it is not, the risks of using `filter-branch` must be explicitly stated and approved by the user before proceeding.
3.  **Always address tool warnings.** I must not dismiss warnings from the tools I use. They must be analyzed and presented to the user as part of the decision-making process.

**Conclusion:** This incident serves as a permanent guardrail. The use of `git filter-branch` is now considered a high-risk operation. The correct procedure is to use `git filter-repo` or, failing that, to proceed only with extreme caution and explicit user consent after explaining all potential risks.