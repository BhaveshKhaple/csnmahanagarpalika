# gemini.md
# Place this file at: .planning/gemini.md

---

## COMMIT BEHAVIOR — READ THIS BEFORE TOUCHING GIT

### The rule: One commit = One meaningful unit of working software

You do not commit after every file change.
You do not commit after every function you write.
You do not commit after fixing a typo.
You do not commit when something is half-done.

You commit when a meaningful, describable piece of work is complete and working.

Ask yourself before every commit:
> "If a senior developer saw this commit in isolation, would it make complete sense as a standalone unit of work?"

If the answer is no — keep working and batch it with the next logical change.

---

### WHAT COUNTS AS ONE COMMIT

Group these together into a single commit:
- Building a feature AND writing its basic test
- Adding an API endpoint AND its input validation
- Creating a component AND hooking it to its data source
- Fixing a bug AND removing the workaround that was covering it
- Setting up a config AND the code that depends on it
- Refactoring a module AND updating the imports that reference it

Do NOT split these across multiple commits.

---

### WHAT NEVER GETS ITS OWN COMMIT

Never make a standalone commit for:
- Adding a single import
- Fixing a console.log or print statement
- Renaming a variable
- Adding a comment
- Moving a file without changing it
- Fixing indentation or formatting alone
- Partially implemented code that does not run
- "WIP" or "in progress" states

If you catch yourself about to make one of these — stop. Hold it and batch it into the next real commit.

---

### COMMIT PACING — TIMING RULES

Minimum time between commits: 8 minutes
Target time between commits: 15–30 minutes
Maximum commits per hour: 4

If you finish something in under 8 minutes, do not commit yet.
Keep working on the next logical piece and commit them together.

---

### COMMIT MESSAGE FORMAT — WRITE LIKE A HUMAN DEVELOPER

**Structure:**
```
{verb} {what was built or changed}

{1–3 lines explaining the why or the approach, only if non-obvious}
```

**Rules for the subject line (first line):**
- Start with a lowercase action verb: add, build, fix, wire, connect, refactor, remove, update, implement, integrate, handle, expose, replace, configure, set up
- Do not start with: feat:, fix:, chore:, Update, Added, Fixed (these scream AI or commit-lint bots)
- No brackets, no ticket numbers, no emoji unless the team explicitly uses them
- Keep it under 72 characters
- Do not end with a period

---

## PROMPT LOGGING — REQUIRED FOR EVERY SESSION

Every prompt you receive from a team member must be logged to:
`.planning/prompt-log.md`

Create this file if it does not exist.

### LOG FORMAT

```
---
Time: {HH:MM}
Member: {name}
Task context: {one line — what they were working on}
Prompt given:
{paste the full prompt exactly as received}
Output summary: {1–2 sentences — what was built or decided as a result}
Files changed: {list of files created or modified}
---
```

### WHEN TO LOG

Log immediately after receiving a prompt, before starting work.
Do not batch prompt logs. Log each one as it happens.

---

## GENERAL AGENT BEHAVIOR

### Response style
- Be direct. No preamble.
- Show what file you are editing before you edit it.
- When making a decision, state it once — do not ask for permission on obvious calls.

### Priority order
1. MVP core loop working
2. V1 features
3. V2 features
4. Polish and edge cases
