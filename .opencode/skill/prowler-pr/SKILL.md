---
name: prowler-pr
description: >
  Creates Pull Requests for Prowler following the project template and conventions.
  Trigger: When working on pull request requirements or creation (PR template sections, PR title Conventional Commits check, changelog gate/no-changelog label), or when inspecting PR-related GitHub workflows like conventional-commit.yml, pr-check-changelog.yml, pr-conflict-checker.yml, labeler.yml, or CODEOWNERS.
license: Apache-2.0
metadata:
  author: prowler-cloud
  version: "1.0"
  scope: [root]
  auto_invoke:
    - "Create a PR with gh pr create"
    - "Review PR requirements: template, title conventions, changelog gate"
    - "Fill .github/pull_request_template.md (Context/Description/Steps to review/Checklist)"
    - "Inspect PR CI workflows (.github/workflows/*): conventional-commit, pr-check-changelog, pr-conflict-checker, labeler"
    - "Understand review ownership with CODEOWNERS"
allowed-tools: Read, Edit, Write, Glob, Grep, Bash, WebFetch, WebSearch, Task
---

## PR Creation Process

1. **Analyze changes**: `git diff main...HEAD` to understand ALL commits
2. **Determine affected components**: App Shell, Onboarding, Social, GeoHub, Auth, Analytics, Admin
3. **Fill template sections** based on changes
4. **Create PR** with `gh pr create`

## PR Template Structure

```markdown
### Context

{Why this change? Link issues with `Fix #XXXX`}

### Description

{Summary of changes and dependencies}

### Steps to review

{How to test/verify the changes}

### Checklist

<details>

<summary><b>Community Checklist</b></summary>

- [ ] This feature/issue is listed in the roadmap
- [ ] It is assigned to me or I requested it

</details>

- [ ] Review if the code is being covered by tests
- [ ] Review if backport is needed
- [ ] Review if is needed to change the README
- [ ] Ensure new entries are added to CHANGELOG.md, if applicable

#### UI (if applicable)
- [ ] All issue/task requirements work as expected on the UI
- [ ] Screenshots/Video - Mobile (X < 640px)
- [ ] Screenshots/Video - Tablet (640px > X < 1024px)
- [ ] Screenshots/Video - Desktop (X > 1024px)

#### API (if applicable)
- [ ] Endpoint response output (if applicable)
- [ ] EXPLAIN ANALYZE output for new/modified queries or indexes (if applicable)
- [ ] Performance test results (if applicable)
- [ ] Any other relevant evidence (if applicable)
```

## Commands

```bash
# Check current branch status
git status
git log main..HEAD --oneline

# View full diff
git diff main...HEAD

# Create PR with heredoc for body
gh pr create --title "feat: description" --body "$(cat <<'EOF'
### Context
...
EOF
)"

# Create draft PR
gh pr create --draft --title "feat: description"
```

## Title Conventions

Follow conventional commits:
- `feat:` New feature
- `fix:` Bug fix
- `docs:` Documentation
- `chore:` Maintenance
- `refactor:` Code restructure
- `test:` Tests

## Before Creating PR

1. ✅ All tests pass locally
2. ✅ Linting passes
3. ✅ CHANGELOG updated (if applicable)
4. ✅ Branch is up to date with main
5. ✅ Commits are clean and descriptive

## Resources

- **Documentation**: See [references/](references/) for links to local developer guide
