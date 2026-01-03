# Workforce Intelligence App - Development Summary

**Date:** December 30, 2025
**Status:** Working end-to-end prototype ✅

## Overview

Built a working workforce intelligence application that analyzes job roles for AI automation exposure using O*NET data and ILO-based classification framework. Users enter a job title, and the app classifies each task as Automate/Augment/Retain with detailed reasoning.

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

### ✅ Working Features
- Real O*NET data integration (1,016 occupations)
- Fuzzy job title matching (57,521 searchable titles)
- Task classification with ILO-based framework
- Three capability levels (Conservative/Moderate/Bold)
- Detailed reasoning for each classification
- Exposure scoring and categorization
- Professional UI with charts and methodology transparency
- End-to-end flow tested and validated

### ⏸ Not Yet Implemented
- Skills inference (shows placeholder data)
- PDF export functionality
- LinkedIn sharing
- Custom task addition
- Task reclassification UI
- Caching for repeated queries
- Rate limiting

## Sample Results: Financial Analyst

**Occupation Match:** Financial and Investment Analysts (13-2051.00)

**Task Classifications:**
- **Automate (85):** "Draw charts and graphs using spreadsheets" - Highly structured, AI can auto-generate
- **Augment (70):** "Employ financial models to develop solutions" - AI runs models, human provides judgment
- **Retain (10):** "Develop and maintain client relationships" - Fundamentally human, requires trust-building

**Overall Exposure:** 50/100 (High exposure category)
- 13% tasks can be automated
- 60% tasks will be augmented by AI
- 27% tasks remain primarily human

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
- Create About page
- Document framework publicly
- Prepare LinkedIn announcement

### 4. Deployment (Lower Priority)
- Deploy to Vercel
- Configure production environment variables
- Set up analytics
- Test with real users

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
- [x] Cost per analysis <$0.05
- [x] Processing time acceptable

**Production Goals:** 🚧 In progress
- [ ] Skills inference implemented
- [ ] Methodology page complete
- [ ] Deployed to production
- [ ] User feedback collected
- [ ] 500 unique visitors in first month

## Contact & Portfolio

**Project Owner:** Tim Dickinson
**Portfolio:** https://strategy-practitioner.com
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

*Last Updated: December 30, 2025 - 3:00 PM*
*Status: Working prototype complete and tested ✅*
*Next: Skills inference OR deployment*
