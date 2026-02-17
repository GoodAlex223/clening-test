# TODO

Active tasks and backlog for CleanSpark.

**Last Updated**: 2026-02-17

**Purpose**: Tracks PLANNED and IN-PROGRESS tasks only.
**Completed tasks**: Move to [DONE.md](DONE.md)
**Unprioritized ideas**: See [BACKLOG.md](BACKLOG.md)

**Week Focus (Feb 16–22)**: Project Development Freeze — finalize portfolio presentation, lock documentation, tag v1.0.0 release.

---

## In Progress

<!-- Currently active tasks. Limit to 1-3 at a time. -->

_No tasks currently in progress._

---

## Planned

<!-- Defined tasks ready to start. Ordered by priority. -->

### T-F05: BACKLOG Triage & Freeze Label (Feb 20)

**Priority**: Medium | **Origin**: Freeze process
**Goal**: Review all backlog items, categorize them for post-freeze, and mark the backlog as frozen.

- [ ] Review all 60+ backlog items for relevance
- [ ] Mark items that are no longer applicable (code has changed, already addressed, etc.)
- [ ] Categorize remaining items: "Post-Freeze Priority" vs "Deferred Indefinitely"
- [ ] Add freeze notice at top of BACKLOG.md with freeze date
- [ ] Update BACKLOG.md "Last Updated" date

---

### T-F06: v1.0.0 Release Tag (Feb 21)

**Priority**: High | **Origin**: ROADMAP v1.0
**Goal**: Create an official v1.0.0 release marking the project as complete.

- [ ] Final smoke test on production (https://cleanspark-virid.vercel.app)
- [ ] Verify all 5 themes load and switch correctly
- [ ] Verify all 6 pages render on each theme
- [ ] Create annotated git tag `v1.0.0`
- [ ] Create GitHub Release with changelog summary (T-001 through T-012 highlights)
- [ ] Link to live demo and case study in release notes

---

### T-F07: Project Freeze Finalization (Feb 22)

**Priority**: High | **Origin**: Freeze process
**Goal**: Final wrap-up — commit all freeze-week changes, update planning docs, save session.

- [ ] Move all completed freeze tasks (T-F01–T-F06) from TODO.md to DONE.md
- [ ] Verify no uncommitted changes remain
- [ ] Final commit with all freeze-week documentation
- [ ] Add "FROZEN" notice to TODO.md — no new development after this date
- [ ] Save final session to memory with freeze status

---

## Blocked

<!-- Tasks waiting on external dependencies or decisions -->

_No blocked tasks._

---

## Notes

- **Freeze scope**: No new features, no refactoring, no tech debt fixes this week
- **Focus**: Documentation, screenshots, release tagging, portfolio presentation
- Tasks ordered by suggested date but can be reordered as needed
- When a task is done: remove from here, add to [DONE.md](DONE.md)
- Significant tasks should have a plan in `plans/`
