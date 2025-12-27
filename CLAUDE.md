# CLAUDE.md - AI Assistant Guide

This document provides comprehensive guidance for AI assistants (like Claude) working with this repository. It includes codebase structure, development workflows, and key conventions to follow.

**Last Updated:** 2025-12-27
**Repository:** timtimtimmay/test-repo

---

## 📋 Table of Contents

- [Repository Overview](#repository-overview)
- [Codebase Structure](#codebase-structure)
- [Development Workflow](#development-workflow)
- [Git Conventions](#git-conventions)
- [Code Conventions](#code-conventions)
- [AI Assistant Guidelines](#ai-assistant-guidelines)
- [Common Tasks](#common-tasks)

---

## 🏗️ Repository Overview

### Purpose
This is a test repository used for experimentation and development.

### Current State
- **Status:** Active development
- **Main Branch:** Not yet configured (currently on feature branch)
- **Primary Language:** To be determined based on project needs
- **Dependencies:** None currently
- **Build System:** None currently

### Key Files
- `README.md` - Basic repository description
- `CLAUDE.md` - This file, containing AI assistant guidelines

---

## 📁 Codebase Structure

### Current Directory Layout
```
test-repo/
├── .git/                 # Git version control
├── README.md            # Repository README
└── CLAUDE.md            # AI assistant guidelines (this file)
```

### Expected Future Structure
As the repository grows, expect the following structure:

```
test-repo/
├── .git/                # Git version control
├── .github/             # GitHub workflows and configurations
├── src/                 # Source code
├── tests/               # Test files
├── docs/                # Documentation
├── config/              # Configuration files
├── scripts/             # Utility scripts
├── README.md            # Repository README
├── CLAUDE.md            # AI assistant guidelines
├── .gitignore           # Git ignore patterns
└── LICENSE              # License file (if applicable)
```

---

## 🔄 Development Workflow

### Branch Strategy

**Feature Development:**
- All feature work should be done on feature branches
- Current feature branch: `claude/add-claude-documentation-5ul3o`
- Branch naming convention: `claude/<description>-<session-id>`

**Branch Protection:**
- Always develop on the designated feature branch
- Never push to main/master without explicit permission
- Create new branches locally if they don't exist

### Development Cycle

1. **Start Work**
   - Ensure you're on the correct branch
   - Pull latest changes if needed
   - Understand the task requirements

2. **Implementation**
   - Read existing code before making changes
   - Follow existing patterns and conventions
   - Write clean, maintainable code
   - Test changes locally when possible

3. **Commit**
   - Stage relevant files
   - Write clear, descriptive commit messages
   - Follow commit message conventions (see below)

4. **Push**
   - Push to the designated feature branch
   - Use `git push -u origin <branch-name>`
   - Retry on network failures with exponential backoff

5. **Pull Request** (when ready)
   - Create PR with comprehensive description
   - Include summary of changes
   - Provide test plan
   - Link related issues

---

## 🔀 Git Conventions

### Commit Messages

Follow this format for commit messages:

```
<type>: <short summary>

<detailed description if needed>

<footer (issues, breaking changes, etc.)>
```

**Types:**
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Formatting, missing semicolons, etc.
- `refactor`: Code restructuring without changing behavior
- `test`: Adding or updating tests
- `chore`: Maintenance tasks, dependency updates

**Examples:**
```
feat: add user authentication system

Implements JWT-based authentication with login and logout endpoints.
Includes middleware for protected routes.

Closes #123
```

```
fix: resolve memory leak in data processor

The processor was not properly releasing resources after processing.
Added cleanup logic in the finally block.
```

### Git Operations Best Practices

**Pushing:**
- Always use: `git push -u origin <branch-name>`
- Branch must start with 'claude/' and end with session ID
- Retry up to 4 times on network failures (2s, 4s, 8s, 16s backoff)

**Fetching/Pulling:**
- Prefer specific branches: `git fetch origin <branch-name>`
- Retry up to 4 times on network failures
- Use: `git pull origin <branch-name>`

**Never:**
- Use `--force` push to main/master
- Skip hooks with `--no-verify` (unless explicitly requested)
- Amend commits from other developers
- Use interactive commands (`-i` flag)

---

## 💻 Code Conventions

### General Principles

1. **Readability First**
   - Write self-documenting code
   - Use descriptive variable and function names
   - Keep functions focused and small

2. **Consistency**
   - Follow existing code style
   - Match indentation (tabs vs spaces)
   - Follow naming conventions in the codebase

3. **Simplicity**
   - Avoid over-engineering
   - Don't add features beyond requirements
   - Keep solutions minimal and focused

4. **Security**
   - Prevent injection vulnerabilities (SQL, XSS, command injection)
   - Validate input at system boundaries
   - Follow OWASP top 10 best practices

### Code Style Guidelines

**File Organization:**
- Group related functionality together
- Order: imports → constants → types → functions → exports
- One primary export per file when possible

**Naming Conventions:**
- Classes: PascalCase (`UserManager`)
- Functions: camelCase (`getUserData`)
- Constants: UPPER_SNAKE_CASE (`MAX_RETRY_COUNT`)
- Files: kebab-case (`user-manager.js`) or match framework conventions

**Comments:**
- Only add comments where logic isn't self-evident
- Explain WHY, not WHAT (code should show what)
- Update comments when code changes
- Remove outdated comments

**Error Handling:**
- Validate at system boundaries (user input, external APIs)
- Trust internal code and framework guarantees
- Don't add error handling for impossible scenarios
- Use appropriate error types

---

## 🤖 AI Assistant Guidelines

### Before Making Changes

1. **Read First**: Always read files before modifying them
2. **Understand Context**: Review related code and dependencies
3. **Check Patterns**: Follow existing conventions in the codebase
4. **Plan Complex Tasks**: Use TodoWrite for multi-step tasks

### During Development

1. **Minimal Changes**: Only change what's necessary
2. **No Over-Engineering**: Don't add "nice to have" features
3. **Follow Conventions**: Match existing code style
4. **Test Awareness**: Consider how changes affect tests

### What to Avoid

- ❌ Adding features not explicitly requested
- ❌ Refactoring code unrelated to the task
- ❌ Adding excessive error handling
- ❌ Creating premature abstractions
- ❌ Adding comments to unchanged code
- ❌ Creating files unnecessarily (prefer editing existing)
- ❌ Using backwards-compatibility hacks for unused code

### What to Do

- ✅ Read existing code before suggesting changes
- ✅ Follow existing patterns and conventions
- ✅ Keep solutions simple and focused
- ✅ Delete unused code completely
- ✅ Commit with clear, descriptive messages
- ✅ Use TodoWrite for complex multi-step tasks
- ✅ Check for security vulnerabilities

### Task Management

Use the TodoWrite tool for:
- Complex multi-step tasks (3+ steps)
- Non-trivial implementations
- Multiple related tasks
- Tracking progress on larger features

**Example workflow:**
```
1. Plan tasks with TodoWrite
2. Mark task as in_progress before starting
3. Complete the work
4. Mark as completed immediately
5. Move to next task
```

---

## 🛠️ Common Tasks

### Starting a New Feature

```bash
# Ensure you're on the correct branch
git status

# Pull latest changes
git fetch origin <branch-name>
git pull origin <branch-name>

# Start development
# (make your changes)

# Commit and push
git add <files>
git commit -m "feat: description of feature"
git push -u origin <branch-name>
```

### Fixing a Bug

```bash
# Read the relevant code first
# Understand the bug

# Make minimal fix
# Test the fix

# Commit with clear description
git add <files>
git commit -m "fix: description of bug fix

Detailed explanation of the issue and solution."
git push -u origin <branch-name>
```

### Creating a Pull Request

```bash
# Ensure all changes are committed and pushed
git status

# Use gh CLI to create PR
gh pr create --title "Title" --body "$(cat <<'EOF'
## Summary
- Bullet point summary

## Test plan
- [ ] Test item 1
- [ ] Test item 2
EOF
)"
```

### Handling Pre-commit Hooks

If pre-commit hooks modify files:
1. Check the HEAD commit matches yours
2. Verify not pushed yet
3. If both true: amend commit
4. Otherwise: create new commit

---

## 📚 Additional Resources

### When to Ask for Help

- Unclear requirements or multiple valid approaches
- Significant architectural decisions needed
- Large-scale changes affecting many files
- Security-sensitive modifications
- Breaking changes to public APIs

### Documentation Standards

When adding documentation:
- Keep it concise and actionable
- Use examples where helpful
- Update existing docs when changing behavior
- Include context for why, not just how

---

## 🔄 Maintaining This Document

This document should be updated when:
- Project structure changes significantly
- New conventions are established
- Development workflow changes
- New tools or frameworks are added
- Common issues are identified

**Update Process:**
1. Make changes to CLAUDE.md
2. Commit with type `docs:`
3. Update "Last Updated" date at top
4. Consider notifying team of significant changes

---

## 📝 Notes

- This repository is currently in early stages
- Conventions will evolve as the project grows
- Feedback on this document is welcome
- Keep this file updated as the project matures

---

*This document is maintained for AI assistants (like Claude) to better understand and work with this repository. Human developers should also find this useful for onboarding and reference.*
