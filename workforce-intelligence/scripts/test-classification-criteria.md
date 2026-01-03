# Testing ILO Classification Criteria

This document demonstrates how the classification criteria work by applying them to real O*NET tasks.

## Test Case 1: Financial Analyst - Data Collection

**Task:** "Draw charts and graphs to illustrate reports using spreadsheets or specialized software"

### Dimension Analysis (Moderate Capability Level)

| Dimension | Score | Reasoning |
|-----------|-------|-----------|
| **Task Structure** | +40 | Highly structured with clear rules for chart creation |
| **Cognitive vs Physical** | +30 | Pure cognitive/information work |
| **Routine vs Novel** | +30 | Routine, repetitive task |
| **Human Judgment** | +10 | Some judgment on chart type, but largely rule-based |
| **Interpersonal Intensity** | +20 | Minimal human interaction required |
| **Stakes & Accountability** | +0 | Medium stakes; charts support decisions but aren't the decision |

**Composite Score:** 50 + 40 + 30 + 30 + 10 + 20 + 0 = **180 → Capped at 100**

**Classification:** **AUTOMATE** (Score: 100)

**Reasoning:** This task is highly automatable. Modern AI can generate charts and graphs from data with minimal human input. Tools like ChatGPT, Claude, and specialized BI tools can create visualizations from data tables. The task is structured, routine, and doesn't require significant judgment beyond selecting appropriate chart types (which AI can recommend based on data characteristics).

---

## Test Case 2: Financial Analyst - Strategic Recommendation

**Task:** "Advise clients on aspects of capitalization, such as amounts, sources, or timing"

### Dimension Analysis (Moderate Capability Level)

| Dimension | Score | Reasoning |
|-----------|-------|-----------|
| **Task Structure** | +10 | Semi-structured; general frameworks exist but context-dependent |
| **Cognitive vs Physical** | +30 | Pure cognitive work |
| **Routine vs Novel** | +10 | Each situation has unique factors requiring adaptation |
| **Human Judgment** | -20 | Heavy judgment required for strategic financial decisions |
| **Interpersonal Intensity** | -20 | Relationship management and trust-building essential |
| **Stakes & Accountability** | -30 | High stakes; fiduciary duty and accountability required |

**Composite Score:** 50 + 10 + 30 + 10 - 20 - 20 - 30 = **30**

**Classification:** **AUGMENT** (Score: 30, at threshold)

**Reasoning:** AI can augment this task by analyzing market conditions, running scenarios, and identifying patterns. However, the final advice requires human judgment on client-specific context, risk tolerance, regulatory considerations, and relationship dynamics. The advisor remains accountable for the recommendation. This is a clear augmentation scenario: AI provides analytical support, human provides judgment and accountability.

---

## Test Case 3: Registered Nurse - Patient Assessment

**Task:** "Assess patient physical conditions by feeling pulses, taking blood pressure, temperature, or other vital signs"

### Dimension Analysis (Moderate Capability Level)

| Dimension | Score | Reasoning |
|-----------|-------|-----------|
| **Task Structure** | +20 | Structured procedure but requires interpretation |
| **Cognitive vs Physical** | -30 | Heavily physical; requires hands-on execution and sensory feedback |
| **Routine vs Novel** | +20 | Routine procedure performed regularly |
| **Human Judgment** | -10 | Some judgment in interpreting readings and patient responses |
| **Interpersonal Intensity** | -20 | Direct patient interaction, comfort, and trust-building |
| **Stakes & Accountability** | -30 | High stakes; patient safety depends on accurate assessment |

**Composite Score:** 50 + 20 - 30 + 20 - 10 - 20 - 30 = **0**

**Classification:** **RETAIN** (Score: 0)

**Reasoning:** Despite technological aids (automated blood pressure cuffs, digital thermometers), this task fundamentally requires physical presence and human touch. The nurse must physically interact with the patient, use sensory feedback (feeling pulses), observe non-verbal cues, and build patient comfort. While devices can assist, the core task remains human-performed. This is distinctly different from remote monitoring which is more automatable.

---

## Test Case 4: Software Developer - Code Writing

**Task:** "Develop and direct software system testing procedures, programming, and documentation"

### Dimension Analysis (Moderate Capability Level)

| Dimension | Score | Reasoning |
|-----------|-------|-----------|
| **Task Structure** | +20 | Semi-structured; follows patterns but requires creative solutions |
| **Cognitive vs Physical** | +35 | Pure cognitive work (information/logic) |
| **Routine vs Novel** | +5 | Mix of routine patterns and novel problem-solving |
| **Human Judgment** | +0 | Moderate judgment on architecture, trade-offs, and priorities |
| **Interpersonal Intensity** | +5 | Some collaboration but primarily individual work |
| **Stakes & Accountability** | -10 | Medium-high stakes; bugs can be costly but iterative fixes possible |

**Composite Score:** 50 + 20 + 35 + 5 + 0 + 5 - 10 = **55**

**Classification:** **AUGMENT** (Score: 55)

**Reasoning:** AI coding assistants (GitHub Copilot, ChatGPT, Claude) already demonstrate strong augmentation capability. They can generate code, suggest implementations, write tests, and create documentation. However, developers retain responsibility for architecture decisions, code review, security considerations, and ensuring code meets business requirements. This is classic augmentation: AI accelerates execution, human provides direction and validates quality.

---

## Test Case 5: Marketing Manager - Campaign Strategy

**Task:** "Formulate, direct, and coordinate marketing activities to promote products and services"

### Dimension Analysis (Moderate Capability Level)

| Dimension | Score | Reasoning |
|-----------|-------|-----------|
| **Task Structure** | +0 | Loosely structured; many valid approaches exist |
| **Cognitive vs Physical** | +30 | Primarily cognitive/strategic work |
| **Routine vs Novel** | -10 | Each campaign requires unique positioning and approach |
| **Human Judgment** | -20 | Heavy creative and strategic judgment required |
| **Interpersonal Intensity** | -15 | Coordination across teams and stakeholders |
| **Stakes & Accountability** | -20 | High stakes; campaign success impacts business outcomes |

**Composite Score:** 50 + 0 + 30 - 10 - 20 - 15 - 20 = **15**

**Classification:** **RETAIN** (Score: 15)

**Reasoning:** While AI can assist with market research, content generation, and channel recommendations, the strategic formulation and coordination remain human-primary. Marketing strategy requires understanding brand positioning, competitive dynamics, organizational capabilities, and stakeholder alignment—areas where human judgment and relationship management are essential. AI provides analytical support but doesn't own strategy formulation.

---

## Observations from Testing

### The Framework Works Well For:
✓ **Clear differentiation** between routine data tasks (automate) and strategic judgment tasks (retain)
✓ **Identifying augmentation** scenarios where AI accelerates but doesn't replace human work
✓ **Multi-dimensional assessment** prevents oversimplified binary classifications
✓ **Physical vs cognitive distinction** properly identifies hands-on work as human-retained

### Calibration Notes:
- **Threshold boundaries** work well at 70/30 for moderate level
- **Augment category** (30-69) captures the large middle ground where most knowledge work exists
- **Scoring system** provides transparency: users can see *why* a task was classified
- **Capability levels** allow scenario modeling without rebuilding entire framework

### Edge Cases to Watch:
1. **Mixed tasks**: Some O*NET task descriptions combine multiple sub-tasks (e.g., "Develop AND test AND document"). These need decomposition.
2. **Evolving capabilities**: Tasks near thresholds (e.g., score 68-72) may shift categories as AI improves
3. **Organizational context**: Same task may be automated in tech-forward companies but human-performed in traditional organizations

---

## Recommendation: Framework Ready for Production

The classification criteria are **ready to use** in LLM prompts. The multi-dimensional assessment provides clear logic that LLMs can follow, and the scoring methodology ensures transparency.

**Next Steps:**
1. Integrate criteria into task classification prompt (Prompt 2 from original plan)
2. Test with Claude API on 10-20 diverse job titles
3. Refine dimension weights if needed based on results
4. Document any edge case handling rules discovered during testing
