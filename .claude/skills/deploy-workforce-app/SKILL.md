---
name: deploy-workforce-app
description: Deploy the workforce-intelligence app. Use when the user asks to deploy, push changes, update the app, or make it live on Vercel.
---

# Deploy Workforce Intelligence App

## Overview

This skill handles the complete workflow for modifying and deploying the workforce-intelligence Next.js app to Vercel.

## Project Location

```
/Users/timdickinson/CodeRepos/test-repo/workforce-intelligence
```

## Step 1: Local Development

Start the dev server to preview changes:

```bash
cd /Users/timdickinson/CodeRepos/test-repo/workforce-intelligence
npm run dev
```

App runs at http://localhost:3000

## Step 2: Build Verification

Before deploying, ensure the build passes:

```bash
npm run build
```

Fix any TypeScript or ESLint errors before proceeding.

## Step 3: Commit to GitHub

```bash
git add .
git commit -m "Description of changes"
git push origin master
```

## Step 4: Deploy to Vercel

```bash
vercel --prod --yes
```

Production URL: https://workforce-intelligence.vercel.app

## Environment Variables

The app requires `ANTHROPIC_API_KEY` set in Vercel dashboard:
https://vercel.com/tim-dickinsons-projects/workforce-intelligence/settings/environment-variables

## Common Issues

### TypeScript Errors
- Run `npm run build` locally first to catch type errors
- Fix all errors before deploying - Vercel build will fail otherwise

### API Key Issues
- If analysis fails in production, check that `ANTHROPIC_API_KEY` is set in Vercel
- After adding/changing env vars, redeploy with `vercel --prod`

## Quick Deploy Checklist

1. Make changes locally
2. Test at localhost:3000
3. Run `npm run build` - must pass
4. `git add . && git commit -m "msg" && git push origin master`
5. `vercel --prod --yes`
6. Verify at https://workforce-intelligence.vercel.app
