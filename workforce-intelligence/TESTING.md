# Testing Guide: Workforce Intelligence Prototype

## Setup (One-Time)

### 1. Set Your Anthropic API Key

Edit `.env.local` and add your actual API key:

```bash
ANTHROPIC_API_KEY=sk-ant-api03-xxxxx
```

Get your API key from: https://console.anthropic.com/settings/keys

### 2. Verify Installation

```bash
npm install  # Should show @anthropic-ai/sdk is installed
```

## Testing the Prototype

### Quick Test (API Only)

Test the API endpoint directly:

```bash
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{
    "jobTitle": "Financial Analyst",
    "capabilityLevel": "moderate"
  }'
```

Expected: JSON response with classified tasks

### Full UI Test

1. **Start the dev server:**
   ```bash
   npm run dev
   ```

2. **Open browser:** http://localhost:3000

3. **Test these job titles:**

   | Job Title | Expected Result | Why Interesting |
   |-----------|----------------|-----------------|
   | Financial Analyst | Moderate-High exposure | Good mix of automatable data work + judgment |
   | Registered Nurse | Low-Moderate exposure | Physical care tasks remain human |
   | Software Developer | High exposure | Coding is highly augmentable |
   | Marketing Manager | Low-Moderate exposure | Strategic work stays human |
   | Customer Service Representative | Moderate-High exposure | Routine inquiries automatable |

4. **What to verify:**
   - ✓ Job title matches to O*NET occupation
   - ✓ Tasks display with classifications (Automate/Augment/Retain)
   - ✓ Pie chart shows distribution
   - ✓ Overall exposure score makes sense
   - ✓ Each task has detailed reasoning
   - ✓ Capability level selector changes results

### Test Different Capability Levels

Try the same job with different assumptions:

- **Conservative**: Should show more "Augment" and "Retain"
- **Moderate**: Balanced classifications
- **Bold**: More "Automate" classifications

## Cost Tracking

Each analysis costs approximately:
- **Input tokens**: ~2,500 tokens (prompt + criteria)
- **Output tokens**: ~1,500 tokens (15 tasks classified)
- **Cost per analysis**: ~$0.02-0.03

Budget for testing: 20 analyses = ~$0.50

## Troubleshooting

### Error: "API key not configured"
→ Check `.env.local` file exists and has `ANTHROPIC_API_KEY=...`

### Error: "No O*NET occupation found"
→ Try more specific job title (e.g., "Financial Analyst" not "Analyst")
→ Or try one of the suggested titles above

### Classifications seem off
→ Check which capability level is selected
→ Review the reasoning for each task
→ Verify the O*NET occupation matched correctly

### API is slow (>10 seconds)
→ Normal for first request (large prompt)
→ Should be 5-8 seconds for subsequent requests
→ We're analyzing 15 tasks per request

## What's Working

✓ Real O*NET data (1,016 occupations, 18,796 tasks)
✓ Fuzzy job title matching across 57,521 titles
✓ ILO-based classification with 6-dimensional assessment
✓ Three capability levels (Conservative/Moderate/Bold)
✓ Detailed reasoning for each classification
✓ Automatic exposure scoring and categorization

## What's Not Yet Implemented

⏸ Skills inference (placeholder data shown)
⏸ PDF export
⏸ LinkedIn sharing
⏸ Custom task addition
⏸ Task reclassification UI

## Next Steps After Testing

1. Review 3-5 job analyses
2. Validate classifications make sense
3. Refine prompt if needed
4. Add skills inference (Prompt 3)
5. Polish UI/UX
6. Deploy to production

## Sample Test Queries

```bash
# Test 1: Knowledge worker
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"jobTitle": "Data Scientist", "capabilityLevel": "moderate"}'

# Test 2: Hands-on work
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"jobTitle": "Electrician", "capabilityLevel": "moderate"}'

# Test 3: Creative role
curl -X POST http://localhost:3000/api/analyze \
  -H "Content-Type: application/json" \
  -d '{"jobTitle": "Graphic Designer", "capabilityLevel": "moderate"}'
```

## Success Criteria

The prototype is working if:
- [x] API returns valid JSON with classifications
- [ ] UI displays results correctly
- [ ] Classifications are defensible (check reasoning)
- [ ] Different job types show different exposure levels
- [ ] Capability levels affect classifications appropriately
- [ ] Cost per analysis is <$0.05

---

**Ready to test!** Start the dev server and try "Financial Analyst" as your first test.
