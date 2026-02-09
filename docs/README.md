# Documentation Index

Central index for all CleanSpark project documentation.

**Last Updated**: 2026-02-09

---

## Quick Navigation

| I need to... | Go to |
|--------------|-------|
| See what tasks are pending | [planning/TODO.md](planning/TODO.md) |
| See what's been completed | [planning/DONE.md](planning/DONE.md) |
| See the roadmap | [planning/ROADMAP.md](planning/ROADMAP.md) |
| See active implementation plans | [planning/plans/README.md](planning/plans/README.md) |
| Understand the architecture | [ARCHITECTURE.md](ARCHITECTURE.md) |
| Find project patterns/decisions | [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) |
| See design theme specifications | [planning/plans/2026-02-09_theme-designs.md](planning/plans/2026-02-09_theme-designs.md) |
| See Claude Code rules | [../CLAUDE.md](../CLAUDE.md) |
| See project-specific config | [../PROJECT.md](../PROJECT.md) |

---

## Core Documentation

### Planning & Tasks

| Document | Purpose | Last Updated |
|----------|---------|--------------|
| [planning/README.md](planning/README.md) | Planning overview | 2026-02-09 |
| [planning/TODO.md](planning/TODO.md) | Active tasks (T-001 through T-012) | 2026-02-09 |
| [planning/DONE.md](planning/DONE.md) | Completed tasks | 2026-02-09 |
| [planning/BACKLOG.md](planning/BACKLOG.md) | Unprioritized ideas (15+ items) | 2026-02-09 |
| [planning/ROADMAP.md](planning/ROADMAP.md) | 4-phase roadmap (v0.1–v1.0) | 2026-02-09 |
| [planning/GOALS.md](planning/GOALS.md) | 3 objectives with key results | 2026-02-09 |
| [planning/MILESTONES.md](planning/MILESTONES.md) | 5 milestones (M1–M5) | 2026-02-09 |

### Architecture & Design

| Document | Purpose | Last Updated |
|----------|---------|--------------|
| [ARCHITECTURE.md](ARCHITECTURE.md) | Multi-theme system design, data flow, layers | 2026-02-09 |
| [PROJECT_CONTEXT.md](PROJECT_CONTEXT.md) | 10 key decisions, 3 ADRs, patterns, domain knowledge | 2026-02-09 |
| [MANUAL_TESTING.md](MANUAL_TESTING.md) | 7 test scenarios, 2 checklists | 2026-02-09 |

---

## Implementation Plans

Active and recent implementation plans.

| Plan | Task | Status | Created |
|------|------|--------|---------|
| [Project Scaffolding](planning/plans/2026-02-09_project-scaffolding.md) | T-001 through T-005 | Not Started | 2026-02-09 |
| [Theme Designs](planning/plans/2026-02-09_theme-designs.md) | T-005 through T-009 | Not Started | 2026-02-09 |

### Archived Plans

See [archive/README.md](archive/README.md) for completed historical plans.

---

## Directory Structure

```
docs/
├── README.md              # This file - documentation index
├── ARCHITECTURE.md        # Multi-theme system design
├── PROJECT_CONTEXT.md     # Decisions, patterns, domain knowledge
├── MANUAL_TESTING.md      # 7 test scenarios, 2 checklists
├── planning/              # Task management & strategy
│   ├── README.md          # Planning guide
│   ├── TODO.md            # 12 active tasks (T-001–T-012)
│   ├── DONE.md            # Completed tasks
│   ├── BACKLOG.md         # 15+ unprioritized ideas
│   ├── ROADMAP.md         # 4-phase roadmap (v0.1–v1.0)
│   ├── GOALS.md           # 3 objectives with key results
│   ├── MILESTONES.md      # 5 milestones (M1–M5)
│   └── plans/             # Implementation plans
│       ├── README.md      # Plans guide
│       ├── 2026-02-09_project-scaffolding.md
│       └── 2026-02-09_theme-designs.md
├── archive/               # Historical documents
│   ├── README.md          # Archive index
│   └── plans/             # Completed plans
│       └── README.md
└── [domain]/              # Domain-specific docs (future)
    └── *.md
```

---

*For Claude Code rules, see [../CLAUDE.md](../CLAUDE.md).*
*For project-specific configuration, see [../PROJECT.md](../PROJECT.md).*
