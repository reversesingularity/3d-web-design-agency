# Memory Maintenance (MANDATORY)

Long-horizon loops fail by "doom-looping" — repeating already-failed solutions after
the evidence scrolls out of context. The memory file is the antidote.

Before completing any task:

- If you hit a WebGL/WebGPU compilation error, dependency conflict, or harness quirk
  and found a workaround, append it to `.agency/memory/memory-decisions.md` with the
  date and one-line context.
- Before starting any task, read `.agency/memory/memory-decisions.md`. Do not repeat
  mistakes logged there.
- Treat context as a strict budget: rely on the memory file for historical state rather
  than re-reading transcripts or re-deriving prior decisions.
- Keep entries to 1–3 lines each. This file is an append-only log, newest at the bottom.
