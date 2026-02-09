# Archived Plans

Completed implementation plans.

---

## What Goes Here

Plans are moved here after ALL of the following are true:

1. All implementation steps marked complete
2. All tests passing
3. "Key Discoveries" section filled in
4. "Future Improvements" section has minimum 2 items
5. Improvements extracted to BACKLOG.md
6. Task summary added to `docs/planning/DONE.md`

---

## File Naming

Keep original filename: `YYYY-MM-DD_task-name.md`

---

## Complete Archive Process

### Step 1: Verify Plan Completion

Before archiving, confirm ALL criteria above are met.

### Step 2: Extract Improvements to BACKLOG.md

Review the plan's "Future Improvements" and "Key Discoveries" sections:

1. **Open** [../../planning/BACKLOG.md](../../planning/BACKLOG.md)
2. **Categorize each improvement** into the appropriate section
3. **Add entries** with Value/Effort estimates and source
4. **Update** the "Last Updated" date in BACKLOG.md

### Step 3: Add Summary to DONE.md

1. **Open** [../../planning/DONE.md](../../planning/DONE.md)
2. **Add entry** under the current month section

### Step 4: Move Plan to Archive

```bash
mv docs/planning/plans/YYYY-MM-DD_task-name.md docs/archive/plans/
```

### Step 5: Update Documentation Index

1. **Update** [../../planning/plans/README.md](../../planning/plans/README.md) — remove from "Current Plans" table
2. **Update** [../README.md](../README.md) — add to archive contents

---

## Finding Plans

To find a specific archived plan:

- By date: Look for files starting with date
- By feature: Use `grep -r "keyword" docs/archive/plans/`

---

_Archived plans serve as historical reference for decisions and patterns._
