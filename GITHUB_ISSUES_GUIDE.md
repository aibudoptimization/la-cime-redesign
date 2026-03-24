# GitHub Issues Guide for AI Dev Agents

Use this guide at the start of every new AI dev chat to keep work traceable, milestone-driven, and up to date.

## Goal

Maintain a reliable execution trail between:
- planned work (issues + milestones),
- implementation (branches, commits, pull requests),
- and delivery status (open, in progress, blocked, done).

## Non-Negotiable Rules

1. No significant code task starts without an issue reference.
2. Every issue must belong to a milestone when a milestone exists for that scope.
3. Every PR must reference and close issue(s) when applicable.
4. Issue status must be updated during the work, not only at the end.
5. If scope changes, update the issue immediately (title, description, labels, milestone, checklist).

## Session Start Protocol (Do This First)

At the beginning of each chat/session, the AI agent must:

1. Review current open issues and milestones.
2. Confirm the issue(s) linked to the requested task.
3. If no issue exists, create one before implementation.
4. Ensure the issue has:
   - clear objective,
   - acceptance criteria,
   - labels,
   - milestone,
   - priority (via label or explicit field in body).
5. Post a short "starting work" comment in the issue.

## Issue Creation Standard

When creating an issue, use this structure:

### Title format

`[Area] Verb + outcome`

Examples:
- `[Homepage] Add Trustindex widget section`
- `[SEO] Add LocalBusiness JSON-LD`
- `[UX] Improve CTA visibility on mobile`

### Description template

```md
## Context
Why this matters and where it fits in the project.

## Objective
Clear expected outcome.

## Scope
- In scope:
- Out of scope:

## Acceptance Criteria
- [ ] Criterion 1
- [ ] Criterion 2
- [ ] Criterion 3

## Deliverables
- Code/files expected
- Documentation updates

## Links
- Related issue(s):
- Related PR(s):
- Reference docs:
```

## Labels and Milestones

Apply labels consistently. Suggested minimum set:
- `type:feature`
- `type:bug`
- `type:chore`
- `type:docs`
- `priority:p0` / `priority:p1` / `priority:p2`
- `status:blocked` (only when blocked)

Milestone rules:
- Attach every planned issue to a milestone if one exists.
- If milestone is missing but work is milestone-worthy, create or request one.
- Keep milestone due dates realistic and update when scope shifts.

## During Implementation (Issue Hygiene)

The AI agent must update the issue at key moments:

1. **Start:** comment with plan and intended approach.
2. **Progress:** comment when major subtask is completed.
3. **Blocker:** immediately mark blocked + explain dependency/decision needed.
4. **Scope change:** edit issue body/checklist before continuing.
5. **PR opened:** link PR in issue comment and in issue body links section.

Progress comment format:

```md
### Progress Update
- Done:
- Next:
- Risks/Blockers:
```

## PR and Commit Linking Rules

- Branch naming:
  - `feat/<issue-number>-short-slug`
  - `fix/<issue-number>-short-slug`
  - `chore/<issue-number>-short-slug`
- Include issue reference in commits when useful (example: `refs #123`).
- In PR description, include closing keywords:
  - `Closes #123`
  - `Fixes #456`
- If PR only partially delivers, use `Refs #123` (do not close issue).

## Definition of Done (Before Closing Issue)

Close an issue only when all are true:

1. Acceptance criteria are fully checked.
2. Code is merged to the target branch.
3. Relevant docs are updated (`README`, `BACKLOG`, or others as needed).
4. Milestone status reflects reality (remaining work updated).
5. A final issue comment summarizes what shipped.

Final comment template:

```md
### Completed
- Delivered:
- Validation performed:
- Follow-ups (if any):
- PR(s):
- Commit(s):
```

## Milestone Update Protocol

When any issue in a milestone changes significantly, verify milestone health:

- Remaining open issues are still valid and scoped correctly.
- No completed work is left unclosed.
- Blocked items are clearly flagged.
- If timeline slips, update milestone due date and note why.
- If scope grows, split into a new milestone instead of overloading current one.

## Weekly Maintenance Rhythm (Recommended)

At least once per week:

1. Triage new issues (label + milestone + priority).
2. Close stale/invalid issues.
3. Re-check blocked items and dependencies.
4. Confirm top-priority milestone has a realistic path to completion.

## Quick Command Checklist for AI Agents

At session start:
- Identify task issue number(s).
- Validate labels + milestone + acceptance criteria.
- Post start comment.

Before opening PR:
- Ensure issue checklist reflects real progress.
- Link issue in PR with closing keywords.

Before ending session:
- Post progress or completion comment.
- Update issue state (open/blocked/closed).
- Update milestone status if scope/timeline changed.

---

If this guide conflicts with explicit maintainer instructions in a session, follow maintainer instructions and update this file afterward to keep process alignment.
