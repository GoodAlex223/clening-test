# T-F06: v1.0.0 Release Tag

**Status**: Complete
**Created**: 2026-02-21
**Priority**: High | **Origin**: ROADMAP v1.0
**Goal**: Create an official v1.0.0 release marking the project as feature-complete.

---

## 1. Context

CleanSpark has completed all development tasks (T-001 through T-012) and freeze-week tasks (T-F01 through T-F05). The project is in development freeze with:
- 5 complete themes, 6 pages each (30 implementations)
- 962 automated tests (78 unit + 884 E2E)
- Perfect Lighthouse scores (100/100/100/100)
- Production deployment at https://cleanspark-virid.vercel.app

## 2. Approach

1. Run Playwright smoke test against production (all 30 theme/page combos)
2. Verify ThemeSwitcher works for all 5 themes
3. Bump `package.json` version from `0.0.1` to `1.0.0`
4. Create PR, merge to main
5. Create annotated git tag `v1.0.0` on main
6. Create GitHub Release with professional portfolio-style release notes

## 3. Key Decisions

- **Release notes tone**: Professional portfolio showcase (highlights architecture, quality metrics, build timeline)
- **Version bump**: `package.json` updated from `0.0.1` → `1.0.0` to match release tag
- **Tag target**: Main branch (after merging version bump PR)
- **Smoke test**: Automated via Playwright (not manual)

## 4. Acceptance Criteria

- [x] Production smoke test passes (30/30 pages, 5/5 theme switchers)
- [x] `package.json` version set to `1.0.0`
- [x] Build passes with version bump
- [x] PR created and reviewed
- [x] PR merged to main
- [x] Annotated tag `v1.0.0` created on main
- [x] GitHub Release created with changelog, live demo link, case study link

## 5. Future Improvements

1. **Automated release pipeline**: Could use GitHub Actions to auto-create releases on tag push, including changelog generation from conventional commits
2. **Semantic versioning enforcement**: Add a CI check that validates `package.json` version matches the latest git tag

---

### Execution Log

#### [2026-02-21 23:20] — PHASE: Planning
- Goal understood: Create v1.0.0 release with professional release notes
- Approach chosen: Playwright smoke test → version bump → PR → tag → GitHub Release
- Risks identified: None significant — this is a tagging/documentation task

#### [2026-02-21 23:25] — PHASE: Discovery
- Explored DONE.md for complete task history (17 tasks)
- Explored project stats: 43 components, 14 test files, 962 tests
- Found no existing git tags — this is the first
- Found package.json version at 0.0.1

#### [2026-02-21 23:30] — PHASE: Sub-Item Complete — Smoke Test
- **Sub-item**: Production smoke test
- **Results obtained**: 30/30 theme/page pass (HTTP 200, [data-theme] present), 5/5 ThemeSwitcher pass
- **Lessons learned**: Existing test helpers use localhost cookie domain; standalone script needed for production
- **Problems encountered**: None
- **Improvements identified**: Could add production smoke test to CI pipeline
- **Technical debt noted**: None

#### [2026-02-21 23:32] — PHASE: Sub-Item Complete — Version Bump
- **Sub-item**: package.json version bump
- **Results obtained**: Version set to 1.0.0, build passes
- **Lessons learned**: Simple change, no side effects
- **Problems encountered**: None
- **Improvements identified**: None

#### [2026-02-21 23:33] — PHASE: Sub-Item Complete — PR
- **Sub-item**: PR creation and merge
- **Results obtained**: PR #18 created, code review passed, merged to main
- **Lessons learned**: None
- **Problems encountered**: None
- **Improvements identified**: None

#### [2026-02-21 23:45] — PHASE: Sub-Item Complete — Tag and Release
- **Sub-item**: Git tag and GitHub Release
- **Results obtained**: Annotated v1.0.0 tag pushed, GitHub Release created with full release notes
- **Lessons learned**: Heredoc with single quotes in release notes body causes bash parsing issues; write to temp file instead
- **Problems encountered**: Bash heredoc quote conflict — resolved by writing notes to file, using --notes-file flag
- **Improvements identified**: Keep release notes template as a file for reuse

#### [2026-02-21 23:50] — PHASE: Complete
- Final approach: Automated smoke test → version bump → PR → merge → tag → release
- Tests passing: N/A (no code changes, only version bump)
- User approval: Received

#### [2026-02-21 23:50] — PHASE: Task Completion Documentation
- **Step 1 EXTRACT**: 2 improvements → BACKLOG.md
- **Step 2 ARCHIVE**: Plan moved to docs/archive/plans/
- **Step 3 TRANSITION**: Task moved TODO.md → DONE.md
- **Step 4 COMMIT**: Documentation commit
- **Step 5 MEMORY**: Session entity created
