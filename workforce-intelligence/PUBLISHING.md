# Publishing to GitHub - Security Checklist

## ✅ Your API Key is Protected

Your setup is already secure. Here's what's protecting your API key:

### 1. `.gitignore` Protection
- **Line 29** in `.gitignore` includes `.env*.local`
- This means `.env.local` (which contains your API key) will **NEVER** be committed to Git

### 2. Documentation Without Secrets
- `.env.example` template file created (safe to commit)
- README.md updated with setup instructions
- CLAUDE.md sanitized (no actual API keys)

### 3. Verification
```bash
# Check what Git sees (your API key file should be ignored)
git status --ignored | grep .env

# Output should show:
# .env.example     ← This WILL be committed (template only)
# .env.local       ← This is IGNORED (contains your actual key)
```

---

## Pre-Publishing Checklist

Before pushing to GitHub, verify:

### ✅ Security Checks

```bash
# 1. Verify .env.local is ignored
git status --ignored | grep .env.local
# Should show: .env.local (ignored)

# 2. Check what will be committed
git status

# 3. Search for any accidental API keys in tracked files
git grep -i "sk-ant-api"
# Should return: nothing

# 4. Check your actual .env.local file won't be committed
git check-ignore .env.local
# Should return: .env.local
```

### ✅ Files to Commit

**Safe to commit:**
- ✅ `.env.example` - Template without secrets
- ✅ `README.md` - Updated with setup instructions
- ✅ `CLAUDE.md` - Development summary
- ✅ `TESTING.md` - Testing guide
- ✅ All source code files (`lib/`, `app/`, `components/`)
- ✅ Data files (`data/*.json`)
- ✅ Scripts (`scripts/*.js`)

**Should be ignored (verify):**
- 🚫 `.env.local` - Contains your actual API key
- 🚫 `node_modules/` - Dependencies
- 🚫 `.next/` - Build artifacts

### ✅ Remove Any Sensitive Content

Check these files for any secrets before committing:

```bash
# Check CLAUDE.md
grep -i "sk-ant" CLAUDE.md
# Should return: nothing

# Check README.md
grep -i "sk-ant" README.md
# Should return: nothing

# Check all markdown files
grep -ri "sk-ant" *.md
# Should return: nothing
```

---

## Publishing Steps

### 1. Initialize Git (if not already done)
```bash
# Initialize repository
git init

# Add all files (gitignore will protect secrets)
git add .

# Check what's being added (verify no .env.local)
git status

# Create initial commit
git commit -m "Initial commit: Workforce Intelligence prototype

- O*NET 30.1 data integration
- ILO-based task classification framework
- Claude API integration for automation analysis
- Working end-to-end prototype with UI"
```

### 2. Create GitHub Repository

1. Go to https://github.com/new
2. Create repository: `workforce-intelligence`
3. **DO NOT** add README, .gitignore, or license (you already have them)
4. Leave it **public** (for your portfolio)

### 3. Push to GitHub

```bash
# Add remote
git remote add origin https://github.com/YOUR_USERNAME/workforce-intelligence.git

# Push to GitHub
git push -u origin main
```

### 4. Verify Security on GitHub

After pushing, check on GitHub.com:
1. Browse your repository files
2. Verify `.env.local` is **NOT** visible
3. Verify `.env.example` **IS** visible (this is correct)
4. Check that CLAUDE.md and README.md have no API keys

---

## Setting Up for Production (Vercel)

When deploying to Vercel, you'll need to add environment variables:

### 1. Deploy to Vercel

```bash
# Install Vercel CLI (if needed)
npm i -g vercel

# Deploy
vercel
```

### 2. Add Environment Variables

In the Vercel dashboard:
1. Go to: Project → Settings → Environment Variables
2. Add variable:
   - **Name:** `ANTHROPIC_API_KEY`
   - **Value:** Your actual API key
   - **Environments:** Production, Preview, Development

3. Redeploy:
   ```bash
   vercel --prod
   ```

---

## Emergency: If You Accidentally Commit Secrets

If you accidentally commit your API key:

### 1. Immediately Rotate the Key
```bash
# 1. Go to https://console.anthropic.com/settings/keys
# 2. Delete the exposed key
# 3. Create a new key
# 4. Update your .env.local with the new key
```

### 2. Remove from Git History
```bash
# Remove the file from Git history
git filter-branch --force --index-filter \
  "git rm --cached --ignore-unmatch .env.local" \
  --prune-empty --tag-name-filter cat -- --all

# Force push (⚠️ destructive - only if you haven't shared the repo)
git push origin --force --all
```

### 3. Alternative: Use BFG Repo-Cleaner
```bash
# Install BFG (faster method)
brew install bfg  # macOS
# or download from: https://rtyley.github.io/bfg-repo-cleaner/

# Remove all .env.local files from history
bfg --delete-files .env.local

# Clean up
git reflog expire --expire=now --all
git gc --prune=now --aggressive

# Force push
git push origin --force --all
```

---

## Best Practices Going Forward

### For Local Development
```bash
# Always check before committing
git status
git diff --staged

# Use git hooks to prevent accidents (optional)
# Create .git/hooks/pre-commit with:
#!/bin/bash
if git diff --cached --name-only | grep -q "\.env\.local"; then
    echo "ERROR: Attempting to commit .env.local file!"
    exit 1
fi
```

### For Team Collaboration
1. Share `.env.example` in repo
2. Document setup in README
3. Never share actual `.env.local` files
4. Use secrets management tools for teams (Vercel, AWS Secrets Manager, etc.)

### For Production
1. Never hardcode API keys in source code
2. Always use environment variables
3. Use different API keys for development/production
4. Rotate keys periodically
5. Monitor API usage for unexpected spikes

---

## Verification Commands Summary

Run these before pushing:

```bash
# 1. Is .env.local ignored?
git check-ignore .env.local
# Expected: .env.local

# 2. What's being committed?
git status
# Expected: .env.local should NOT appear

# 3. Any secrets in tracked files?
git grep -i "sk-ant-api"
# Expected: (empty output)

# 4. Check specific files
grep -i "sk-ant" CLAUDE.md README.md TESTING.md
# Expected: (empty output)
```

All checks passing? **You're safe to push! 🚀**

---

## Additional Resources

- [GitHub: Removing sensitive data from a repository](https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/removing-sensitive-data-from-a-repository)
- [Vercel: Environment Variables](https://vercel.com/docs/concepts/projects/environment-variables)
- [Anthropic: API Key Best Practices](https://docs.anthropic.com/en/api/getting-started)

---

**Last Updated:** December 30, 2025
