#!/bin/bash
# Model Comparison Test: Haiku vs Sonnet
# Usage: ./scripts/compare-models.sh

set -e

API_URL="http://localhost:3000/api/analyze"
TEST_JOB="Financial Analyst"

echo "========================================"
echo "MODEL COMPARISON TEST"
echo "========================================"
echo ""
echo "Test Job: $TEST_JOB"
echo ""

# Test with Sonnet (current default)
echo "1. Testing with SONNET..."
echo "   Model: claude-sonnet-4-20250514"
START_SONNET=$(date +%s)

SONNET_RESULT=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{\"jobTitle\": \"$TEST_JOB\", \"capabilityLevel\": \"moderate\"}")

END_SONNET=$(date +%s)
SONNET_TIME=$((END_SONNET - START_SONNET))

echo "   Response time: ${SONNET_TIME}s"
echo "$SONNET_RESULT" > /tmp/sonnet_result.json

# Extract key metrics from Sonnet
SONNET_TASKS=$(echo "$SONNET_RESULT" | jq '.data.tasks | length')
SONNET_AUTOMATE=$(echo "$SONNET_RESULT" | jq '[.data.tasks[] | select(.classification == "automate")] | length')
SONNET_AUGMENT=$(echo "$SONNET_RESULT" | jq '[.data.tasks[] | select(.classification == "augment")] | length')
SONNET_RETAIN=$(echo "$SONNET_RESULT" | jq '[.data.tasks[] | select(.classification == "retain")] | length')
SONNET_SKILLS=$(echo "$SONNET_RESULT" | jq '.data.skillImplications | length')
SONNET_REASONING=$(echo "$SONNET_RESULT" | jq -r '.data.tasks[0].reasoning' | head -c 200)

echo "   Tasks: $SONNET_TASKS | Auto: $SONNET_AUTOMATE | Aug: $SONNET_AUGMENT | Ret: $SONNET_RETAIN | Skills: $SONNET_SKILLS"
echo ""

# Test with Haiku
echo "2. Testing with HAIKU..."
echo "   Model: claude-3-5-haiku-20241022"
echo "   (Restarting server with new model...)"

# Kill dev server and restart with Haiku model
pkill -f "next dev" 2>/dev/null || true
sleep 2

ANTHROPIC_MODEL="claude-3-5-haiku-20241022" npm run dev &
DEV_PID=$!
sleep 5

START_HAIKU=$(date +%s)

HAIKU_RESULT=$(curl -s -X POST "$API_URL" \
  -H "Content-Type: application/json" \
  -d "{\"jobTitle\": \"$TEST_JOB\", \"capabilityLevel\": \"moderate\"}")

END_HAIKU=$(date +%s)
HAIKU_TIME=$((END_HAIKU - START_HAIKU))

echo "   Response time: ${HAIKU_TIME}s"
echo "$HAIKU_RESULT" > /tmp/haiku_result.json

# Extract key metrics from Haiku
HAIKU_TASKS=$(echo "$HAIKU_RESULT" | jq '.data.tasks | length')
HAIKU_AUTOMATE=$(echo "$HAIKU_RESULT" | jq '[.data.tasks[] | select(.classification == "automate")] | length')
HAIKU_AUGMENT=$(echo "$HAIKU_RESULT" | jq '[.data.tasks[] | select(.classification == "augment")] | length')
HAIKU_RETAIN=$(echo "$HAIKU_RESULT" | jq '[.data.tasks[] | select(.classification == "retain")] | length')
HAIKU_SKILLS=$(echo "$HAIKU_RESULT" | jq '.data.skillImplications | length')
HAIKU_REASONING=$(echo "$HAIKU_RESULT" | jq -r '.data.tasks[0].reasoning' | head -c 200)

echo "   Tasks: $HAIKU_TASKS | Auto: $HAIKU_AUTOMATE | Aug: $HAIKU_AUGMENT | Ret: $HAIKU_RETAIN | Skills: $HAIKU_SKILLS"

# Kill test server
kill $DEV_PID 2>/dev/null || true

echo ""
echo "========================================"
echo "COMPARISON SUMMARY"
echo "========================================"
echo ""
echo "| Metric           | Sonnet | Haiku | Diff |"
echo "|------------------|--------|-------|------|"
echo "| Response Time    | ${SONNET_TIME}s    | ${HAIKU_TIME}s   | $((HAIKU_TIME - SONNET_TIME))s   |"
echo "| Tasks Classified | $SONNET_TASKS     | $HAIKU_TASKS    | $((HAIKU_TASKS - SONNET_TASKS))    |"
echo "| Automate         | $SONNET_AUTOMATE      | $HAIKU_AUTOMATE     | $((HAIKU_AUTOMATE - SONNET_AUTOMATE))    |"
echo "| Augment          | $SONNET_AUGMENT     | $HAIKU_AUGMENT    | $((HAIKU_AUGMENT - SONNET_AUGMENT))    |"
echo "| Retain           | $SONNET_RETAIN      | $HAIKU_RETAIN     | $((HAIKU_RETAIN - SONNET_RETAIN))    |"
echo "| Skills Inferred  | $SONNET_SKILLS      | $HAIKU_SKILLS     | $((HAIKU_SKILLS - SONNET_SKILLS))    |"
echo ""
echo "Sample Reasoning (Sonnet):"
echo "> $SONNET_REASONING..."
echo ""
echo "Sample Reasoning (Haiku):"
echo "> $HAIKU_REASONING..."
echo ""
echo "Full results saved to:"
echo "  - /tmp/sonnet_result.json"
echo "  - /tmp/haiku_result.json"
echo ""
echo "========================================"
echo "COST ESTIMATE (per 1000 queries)"
echo "========================================"
echo "| Model  | Cost     | Savings |"
echo "|--------|----------|---------|"
echo "| Sonnet | ~\$50    | -       |"
echo "| Haiku  | ~\$5     | \$45    |"
