# Memory Maintenance (MANDATORY)

Long-horizon loops fail by "doom-looping" — repeating already-failed solutions after
the evidence scrolls out of context. The memory file is the antidote.

Before starting any task, read in order:

1. `.agency/memory/memory-decisions.md` — append-only workarounds; do not repeat logged
   mistakes.
2. `.agency/memory/session-state.md` — volatile handoff: current HEAD, remote URL, pilot
   status, backlog, stale worktrees. **Overwrite this file when ending a session.**

Before completing any task:

- If you hit a WebGL/WebGPU compilation error, dependency conflict, or harness quirk
  and found a workaround, append it to `memory-decisions.md` with the date and one-line
  context.
- Update `session-state.md` with the new HEAD, what shipped, and the prioritized backlog
  for the next session.
- Treat context as a strict budget: rely on the memory files for historical state rather
  than re-reading transcripts or re-deriving prior decisions.
- Keep `memory-decisions.md` entries to 1–3 lines each. Append-only, newest at the bottom.
