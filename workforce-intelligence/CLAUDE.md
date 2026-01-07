# Workforce Intelligence App - Development Summary

**Date:** January 5, 2026
**Status:** Deployed MVP ✅

## Live Application

**Production URL:** https://workforce-intelligence.vercel.app

## Overview

Built and deployed a working workforce intelligence application that analyzes job roles for AI automation exposure using O*NET data and ILO-based classification framework. Users enter a job title, and the app classifies each task as Automate/Augment/Retain with detailed reasoning.

## What Was Built

### 1. O*NET 30.1 Data Integration

**Downloaded & Processed:**
- O*NET 30.1 Database (December 2025 release)
- 1,016 occupations with descriptions
- 18,796 task statements
- 57,521 searchable job titles (primary + alternates)

**Generated Files:**
- `data/onet-occupations.json` (1.8 MB) - Occupation lookup by SOC code
- `data/onet-tasks.json` (3.6 MB) - Tasks organized by occupation
- `data/onet-search-index.json` (8.7 MB) - Searchable title index
- `scripts/process-onet-data.js` - Data transformation script

**Source:** https://www.onetcenter.org/database.html

### 2. ILO Classification Framework

**Created:** `data/ilo-criteria.json` (comprehensive classification framework)

**Based on:** ILO Working Paper 140 (2025) - "Generative AI and Jobs: A Refined Global Index of Occupational Exposure"

**Framework Components:**
- **3 Categories:** Automate (70-100), Augment (30-69), Retain (0-29)
- **6 Assessment Dimensions:**
  1. Task Structure (structured vs unstructured)
  2. Cognitive vs Physical (information vs hands-on)
  3. Routine vs Novel (repetitive vs unprecedented)
  4. Human Judgment Requirement (objective vs subjective)
  5. Interpersonal Intensity (solo vs relationship-dependent)
  6. Stakes & Accountability (low vs high-stakes)
- **3 Capability Levels:** Conservative, Moderate, Bold (adjustable AI advancement scenarios)

**Scoring Methodology:**
- Start with baseline 50
- Apply dimension adjustments
- Calculate composite score (0-100)
- Classify based on capability level thresholds
- Document reasoning

**Research Foundation:** https://webapps.ilo.org/static/english/intserv/working-papers/wp140/index.html

### 3. API Integration

**Created Files:**
- `lib/onet.ts` - O*NET data utilities (search, match, retrieve tasks)
- `lib/classification.ts` - Task classification engine with Claude API
- `app/api/analyze/route.ts` - Updated API endpoint

**Flow:**
1. User enters job title
2. Fuzzy search across 57,521 titles → Find O*NET match
3. Retrieve tasks for occupation (analyze first 15 for cost control)
4. Call Claude API with ILO criteria → Classify each task
5. Calculate exposure statistics → Return structured JSON
6. UI displays results with charts and reasoning

**API Configuration:**
- `.env.local` - Contains `ANTHROPIC_API_KEY`
- Model: `claude-sonnet-4-20250514`
- Cost: ~$0.025 per analysis
- Processing time: ~60 seconds

### 4. Testing & Validation

**Tested:** Financial Analyst (13-2051.00)

**Results:**
- Distribution: 13% Automate, 60% Augment, 27% Retain
- Overall exposure: 50/100 (High category)
- Classifications are sensible and well-reasoned
- UI displays correctly with charts

**Test Document:** `TESTING.md` - Complete testing guide

## Key Files Created/Modified

```
workforce-intelligence/
├── data/
│   ├── onet-occupations.json          ← O*NET occupation data
│   ├── onet-tasks.json                ← Task statements by SOC code
│   ├── onet-search-index.json         ← Searchable job titles
│   └── ilo-criteria.json              ← Classification framework
├── lib/
│   ├── onet.ts                        ← O*NET utilities
│   └── classification.ts              ← Claude API integration
├── app/api/analyze/
│   └── route.ts                       ← Updated API endpoint
├── scripts/
│   ├── process-onet-data.js           ← Data processing script
│   └── test-classification-criteria.md ← Framework testing
├── .env.local                         ← API key configuration
├── TESTING.md                         ← Testing guide
└── CLAUDE.md                          ← This file

```

## How It Works

### User Perspective
1. Open http://localhost:3000
2. Enter job title (e.g., "Financial Analyst")
3. Select capability level (Conservative/Moderate/Bold)
4. Click "Analyze"
5. View results:
   - Taxonomy resolution (O*NET match)
   - Task breakdown (15 tasks classified)
   - Automation exposure (pie chart + score)
   - Skills implications (placeholder)

### Technical Flow
```
User Input → O*NET Search → Task Retrieval → Claude Classification → Results Display

SearchInput.tsx
    ↓
/api/analyze (route.ts)
    ↓
findBestMatch() [onet.ts] → Match job title to O*NET SOC code
    ↓
getTasks() [onet.ts] → Retrieve task statements
    ↓
classifyTasks() [classification.ts]
    ├─ buildClassificationPrompt() → Create prompt with ILO criteria
    ├─ anthropic.messages.create() → Call Claude API
    └─ parseClassificationResponse() → Structure results
    ↓
ResultsPanel.tsx → Display with charts
```

## Current Status

### ✅ Deployed & Working
- **Production deployment on Vercel** (https://workforce-intelligence.vercel.app)
- Real O*NET data integration (1,016 occupations)
- Fuzzy job title matching (57,521 searchable titles)
- Task classification with ILO-based framework (up to 25 tasks per occupation)
- **Skills inference** - 6-8 actionable skill implications per analysis
- Three capability levels (Conservative/Moderate/Bold)
- Detailed reasoning for each classification
- Exposure scoring and categorization
- Professional UI with charts and methodology transparency
- End-to-end flow tested and validated
- Portfolio page (https://workforce-intelligence.vercel.app/portfolio)
- TypeScript build optimized for production
- Vercel deployment workflow documented

### ⏸ Not Yet Implemented
- PDF export functionality
- LinkedIn sharing
- Custom task addition
- Task reclassification UI
- Caching for repeated queries
- Rate limiting

## Sample Results: Financial Analyst

**Occupation Match:** Financial and Investment Analysts (13-2051.00)

**Task Classifications (25 tasks analyzed):**
- **Automate (85):** "Draw charts and graphs using spreadsheets" - Highly structured, AI can auto-generate
- **Augment (70):** "Employ financial models to develop solutions" - AI runs models, human provides judgment
- **Retain (10):** "Develop and maintain client relationships" - Fundamentally human, requires trust-building

**Overall Exposure:** 55/100 (High exposure category)
- 20% tasks can be automated
- 64% tasks will be augmented by AI
- 16% tasks remain primarily human

**Skills Inference (7 skills identified):**
- **Declining:** Document/Report Generation, Financial Data Processing (low priority)
- **Evolving:** Investment Analysis Oversight, AI-Human Collaboration (high priority)
- **Differentiating:** Client Advisory, Strategic Relationship Building, Physical Assessment (high priority)

## Development Notes

### Design Decisions
1. **Skip ESCO integration** - O*NET alone provides sufficient US market coverage for prototype
2. **Limit to 15 tasks** - Cost control (~$0.025 vs $0.05+ for all tasks)
3. **Temperature 0.3** - Lower temperature for consistent classification
4. **Moderate as baseline** - Most realistic scenario for typical organizations

### Known Issues
- First analysis takes ~60 seconds (large prompt)
- No caching yet (each request calls Claude API)
- Skills inference not implemented (placeholder shown)
- O*NET is US-centric (international titles may not match well)

### Performance
- **Cost:** ~$0.025 per analysis (within budget)
- **Speed:** ~60 seconds first request, similar for subsequent
- **Accuracy:** Classifications are defensible and well-reasoned

## Next Steps (Prioritized)

### 1. Skills Inference (High Priority)
Implement Prompt 3 from original plan:
- Analyze which skills decline (Automate tasks)
- Identify skills that need to evolve (Augment tasks)
- Highlight skills increasing in value (Retain tasks)
- Connect recommendations to specific task shifts
- Reasoning-first approach

**Estimated Time:** 2-3 hours
**Value:** Completes core analysis, makes results actionable

### 2. Optimization & Caching (Medium Priority)
- Cache Claude API responses for repeated job titles
- Add rate limiting for production
- Optimize prompt for faster response
- Better error handling and user feedback

### 3. Content & Documentation (Medium Priority)
- Write Methodology page content
- Enhance About page
- Document framework publicly
- Prepare LinkedIn announcement

### 4. Production Optimization (Medium Priority)
- ✅ ~~Deploy to Vercel~~ (COMPLETED)
- ✅ ~~Configure production environment variables~~ (COMPLETED)
- Set up analytics
- Gather user feedback
- Add caching for API responses

### 5. UI Enhancements (On Hold)
- User requested to defer UI updates for now
- Keep list of desired improvements for later

## Commands Reference

### Development
```bash
# Install dependencies
npm install

# Start dev server
npm run dev

# Process O*NET data (if updating)
node scripts/process-onet-data.js
```

### Testing
```bash
# Test API directly
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"jobTitle":"Financial Analyst","capabilityLevel":"moderate"}'

# Open UI
open http://localhost:3000
```

### Environment Setup
```bash
# Copy .env.example to .env.local and add your API key
cp .env.example .env.local

# Edit .env.local with your Anthropic API key
# Get your key from: https://console.anthropic.com/settings/keys
ANTHROPIC_API_KEY=your_actual_api_key_here
ANTHROPIC_MODEL=claude-sonnet-4-20250514
```

### Deployment
```bash
# Build and verify locally
npm run build

# Deploy to Vercel production
vercel --prod --yes

# Production URL
# https://workforce-intelligence.vercel.app
```

**Environment Variables in Vercel:**
- Set `ANTHROPIC_API_KEY` in Vercel dashboard
- https://vercel.com/tim-dickinsons-projects/workforce-intelligence/settings/environment-variables

## Technical Architecture

### Stack
- **Framework:** Next.js 14 with App Router
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Charts:** Recharts
- **AI:** Anthropic SDK (@anthropic-ai/sdk)
- **Data:** O*NET 30.1 (static JSON files)

### Data Flow
- **Client-side:** React components, search UI
- **API Routes:** Next.js API handlers
- **Data Layer:** Static JSON files (bundled)
- **AI Layer:** Claude API (external)

### Type Safety
- Full TypeScript implementation
- Type definitions in `lib/types.ts`
- Validated API responses

## Research Citations

1. **ILO Working Paper 140 (2025)**
   - "Generative AI and Jobs: A Refined Global Index of Occupational Exposure"
   - https://webapps.ilo.org/static/english/intserv/working-papers/wp140/index.html
   - Foundation for classification framework

2. **O*NET Database 30.1 (December 2025)**
   - https://www.onetcenter.org/database.html
   - Occupational data and task statements
   - Creative Commons Attribution 4.0 License

## Important Notes

### Cost Management
- Currently analyzing first 15 tasks per occupation
- Budget ~$20 for 1,000 analyses
- Consider caching for production

### Limitations
- O*NET is US labor market focused
- Technical automation potential ≠ organizational adoption
- Framework requires periodic updates as AI capabilities evolve
- Task-level automation ≠ job elimination (most jobs transform, not disappear)

### Data Attribution
- O*NET data: Licensed under CC BY 4.0
- ILO framework: Public research, properly cited
- Always include attribution in production deployment

## Success Metrics

**Prototype Goals:** ✅ All achieved
- [x] Real O*NET data integrated
- [x] ILO-based classification working
- [x] Claude API integration functional
- [x] End-to-end flow tested
- [x] Results are defensible and detailed
- [x] Cost per analysis <$0.10 (~$0.05-0.06 with skills inference)
- [x] Processing time acceptable (~75-90 seconds)

**Production Goals:** 🚧 In progress
- [x] **Skills inference implemented** ✅ (6-8 skills per analysis)
- [ ] Methodology page complete
- [x] **Deployed to production** ✅ (https://workforce-intelligence.vercel.app)
- [ ] User feedback collected
- [ ] 500 unique visitors in first month

## Contact & Portfolio

**Project Owner:** Tim Dickinson
**Portfolio:** https://aistrategypractitioner.com
**Positioning:** Strategy Practitioner - combining strategic thinking with technical implementation

---

## Session Notes

### December 30, 2025 - Initial Build Complete

**Accomplished:**
- ✅ Downloaded and integrated O*NET 30.1 database
- ✅ Created ILO classification framework based on 2025 research
- ✅ Built complete API integration with Claude
- ✅ Tested end-to-end prototype successfully
- ✅ User confirmed: "It works! I am really happy with the results"
- ✅ Secured API key for GitHub publishing

**Testing Results:**
- Financial Analyst: 50/100 exposure (13% Automate, 60% Augment, 27% Retain)
- Classifications are defensible and well-reasoned
- Processing time: ~60 seconds per analysis
- Cost: ~$0.025 per analysis

**Files Created:**
- Data: `onet-occupations.json`, `onet-tasks.json`, `onet-search-index.json`, `ilo-criteria.json`
- Code: `lib/onet.ts`, `lib/classification.ts`, updated `app/api/analyze/route.ts`
- Docs: `CLAUDE.md`, `TESTING.md`, `PUBLISHING.md`, `.env.example`
- Scripts: `scripts/process-onet-data.js`

**Security Setup:**
- `.env.local` properly ignored by Git
- `.env.example` created for documentation
- PUBLISHING.md guide created for safe GitHub publishing
- All sensitive data sanitized from committed files

**User Decisions:**
- Hold off on UI updates for now
- Focus on core functionality first
- Skills inference recommended as next step

**Next Session:**
- Consider implementing skills inference (Prompt 3)
- Or proceed with deployment to Vercel
- Or optimize/polish existing features

**Environment:**
- Node.js with Next.js 14
- TypeScript throughout
- Anthropic SDK installed
- Dev server tested and working
- API key configured and tested

---

### January 3, 2026 - Production Deployment

**Accomplished:**
- ✅ Fixed TypeScript type errors for production build
  - Added `ParsedTask` interface in classification.ts
  - Made `aiCapabilities` and `humanAdvantages` default to empty arrays
  - Made `OnetOccupation.description` optional
- ✅ Deployed to Vercel production
  - URL: https://workforce-intelligence.vercel.app
  - Environment variables configured in Vercel dashboard
  - Vercel project linked to GitHub repository
- ✅ Created deployment skill documentation
  - `.claude/skills/deploy-workforce-app/SKILL.md` (managed by Claude Code)
  - Documents local → GitHub → Vercel workflow
- ✅ Added portfolio page
  - `/portfolio` route showcasing projects
  - Updated site URLs from strategy-practitioner.com to aistrategypractitioner.com
  - Enhanced professional presentation

**Commits:**
- `8b6d105` - Fix TypeScript type errors for Vercel build
- `20da851` - Add deploy-workforce-app skill
- `3243e71` - Add portfolio page and update site URLs

**Status:**
- MVP successfully deployed and accessible
- Production build passing
- Ready for user feedback and testing

---

### January 5, 2026 - Skills Inference & Task Limit Expansion

**Accomplished:**
- ✅ Increased task classification limit from 15 to 25 tasks
  - Captures 77% of occupations completely
  - Better coverage for comprehensive analysis
- ✅ Implemented real skills inference (replacing placeholder)
  - 6-8 skill implications generated per analysis
  - Three skill categories: Declining, Evolving, Differentiating
  - Each skill connects to specific classified tasks
  - Development priority recommendations included
- ✅ Updated prompt to include ILO-based skills framework
- ✅ Added skills parsing and API integration
- ✅ Tested across multiple occupations:
  - Financial Analyst: 25 tasks, 7 skills, 55 exposure
  - Registered Nurse: 25 tasks, 8 skills, 47 exposure
  - Software Developer: 17 tasks, 8 skills, 54 exposure
  - Electrician: 21 tasks, 8 skills, 31 exposure
  - Marketing Manager: 25 tasks, 7 skills, 50 exposure
- ✅ **Connected frontend to real API** (was using sample data!)
  - Replaced sample-jobs.json with onet-search-index.json
  - All 57,521 O*NET titles now searchable
  - Real API call to `/api/analyze` endpoint
  - Tested and confirmed working end-to-end
- ✅ **Optimized search performance**
  - Added debouncing (150ms delay after typing stops)
  - Limited autocomplete results to 50 max
  - Optimized search algorithm (prioritize startsWith, early exit)
  - Added visual feedback (loading spinner while searching)
  - Eliminated multi-second UI freezes

**Files Modified:**
- `lib/classification.ts` - Task limit, prompt expansion, skills parsing
- `app/api/analyze/route.ts` - Skills mapping, methodology update
- `app/page.tsx` - Connected to real API, replaced sample data with O*NET index
- `components/SearchInput.tsx` - Performance optimization with debouncing

**Performance Impact:**
- Cost: ~$0.025 → ~$0.05-0.06 per analysis
- Time: ~60s → ~75-90s per analysis
- Search: Eliminated UI freezing, responsive typing
- Value: Comprehensive task coverage + actionable skill insights

**Commits:**
- `e4fe6dd` - Connect frontend to real API with all 57,521 O*NET titles
- (pending) - Search performance optimization

---

*Last Updated: January 5, 2026*
*Status: Enhanced MVP with Skills Inference ✅*
*Live: https://workforce-intelligence.vercel.app*
*Next: Caching, rate limiting, user feedback collection*
