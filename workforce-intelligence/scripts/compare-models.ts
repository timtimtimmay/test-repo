/**
 * Model Comparison Test: Haiku vs Sonnet
 *
 * Run with: npx ts-node scripts/compare-models.ts
 */

import Anthropic from '@anthropic-ai/sdk';
import { findBestMatch, getTasks } from '../lib/onet';
import { buildClassificationPrompt } from '../lib/classification';

const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

const TEST_JOBS = [
  'Financial Analyst',
  'Registered Nurse',
  'Chief Learning Officer',
];

const MODELS = {
  sonnet: 'claude-sonnet-4-20250514',
  haiku: 'claude-3-5-haiku-20241022',
};

interface TestResult {
  job: string;
  model: string;
  responseTimeMs: number;
  taskCount: number;
  classifications: { automate: number; augment: number; retain: number };
  sampleReasoning: string;
  skillCount: number;
  error?: string;
}

async function runTest(jobTitle: string, model: string): Promise<TestResult> {
  const startTime = Date.now();

  try {
    // Find O*NET match
    const match = findBestMatch(jobTitle);
    if (!match) {
      return {
        job: jobTitle,
        model,
        responseTimeMs: Date.now() - startTime,
        taskCount: 0,
        classifications: { automate: 0, augment: 0, retain: 0 },
        sampleReasoning: '',
        skillCount: 0,
        error: 'No O*NET match found',
      };
    }

    // Get tasks
    const tasks = getTasks(match.occupation.code).slice(0, 25);

    // Build prompt (reuse existing function)
    const prompt = buildClassificationPrompt(tasks, match.occupation.title, 'moderate');

    // Call Claude
    const response = await anthropic.messages.create({
      model,
      max_tokens: 12000,
      temperature: 0.3,
      messages: [{ role: 'user', content: prompt }],
    });

    const responseTimeMs = Date.now() - startTime;
    const content = response.content[0];

    if (content.type !== 'text') {
      throw new Error('Unexpected response type');
    }

    // Parse response
    const jsonMatch = content.text.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error('No JSON found in response');
    }

    const parsed = JSON.parse(jsonMatch[0]);
    const taskResults = parsed.classifiedTasks || [];
    const skills = parsed.skillInferences || [];

    // Count classifications
    const classifications = {
      automate: taskResults.filter((t: { classification: string }) => t.classification === 'automate').length,
      augment: taskResults.filter((t: { classification: string }) => t.classification === 'augment').length,
      retain: taskResults.filter((t: { classification: string }) => t.classification === 'retain').length,
    };

    // Get sample reasoning
    const sampleTask = taskResults[0];
    const sampleReasoning = sampleTask?.reasoning?.substring(0, 200) || 'No reasoning';

    return {
      job: jobTitle,
      model: model.includes('haiku') ? 'Haiku' : 'Sonnet',
      responseTimeMs,
      taskCount: taskResults.length,
      classifications,
      sampleReasoning,
      skillCount: skills.length,
    };

  } catch (error) {
    return {
      job: jobTitle,
      model: model.includes('haiku') ? 'Haiku' : 'Sonnet',
      responseTimeMs: Date.now() - startTime,
      taskCount: 0,
      classifications: { automate: 0, augment: 0, retain: 0 },
      sampleReasoning: '',
      skillCount: 0,
      error: error instanceof Error ? error.message : 'Unknown error',
    };
  }
}

async function main() {
  console.log('='.repeat(80));
  console.log('MODEL COMPARISON TEST: Haiku vs Sonnet');
  console.log('='.repeat(80));
  console.log();

  const results: TestResult[] = [];

  for (const job of TEST_JOBS) {
    console.log(`\nTesting: ${job}`);
    console.log('-'.repeat(40));

    // Run Sonnet first
    console.log('  Running Sonnet...');
    const sonnetResult = await runTest(job, MODELS.sonnet);
    results.push(sonnetResult);
    console.log(`  ✓ Sonnet: ${sonnetResult.responseTimeMs}ms`);

    // Run Haiku
    console.log('  Running Haiku...');
    const haikuResult = await runTest(job, MODELS.haiku);
    results.push(haikuResult);
    console.log(`  ✓ Haiku: ${haikuResult.responseTimeMs}ms`);
  }

  // Print summary
  console.log('\n');
  console.log('='.repeat(80));
  console.log('RESULTS SUMMARY');
  console.log('='.repeat(80));

  for (const job of TEST_JOBS) {
    const sonnet = results.find(r => r.job === job && r.model === 'Sonnet')!;
    const haiku = results.find(r => r.job === job && r.model === 'Haiku')!;

    console.log(`\n### ${job}`);
    console.log();
    console.log('| Metric | Sonnet | Haiku | Diff |');
    console.log('|--------|--------|-------|------|');
    console.log(`| Response Time | ${(sonnet.responseTimeMs / 1000).toFixed(1)}s | ${(haiku.responseTimeMs / 1000).toFixed(1)}s | ${((haiku.responseTimeMs - sonnet.responseTimeMs) / 1000).toFixed(1)}s |`);
    console.log(`| Tasks Classified | ${sonnet.taskCount} | ${haiku.taskCount} | ${haiku.taskCount - sonnet.taskCount} |`);
    console.log(`| Automate | ${sonnet.classifications.automate} | ${haiku.classifications.automate} | ${haiku.classifications.automate - sonnet.classifications.automate} |`);
    console.log(`| Augment | ${sonnet.classifications.augment} | ${haiku.classifications.augment} | ${haiku.classifications.augment - sonnet.classifications.augment} |`);
    console.log(`| Retain | ${sonnet.classifications.retain} | ${haiku.classifications.retain} | ${haiku.classifications.retain - sonnet.classifications.retain} |`);
    console.log(`| Skills Inferred | ${sonnet.skillCount} | ${haiku.skillCount} | ${haiku.skillCount - sonnet.skillCount} |`);

    if (sonnet.error) console.log(`| Sonnet Error | ${sonnet.error} |`);
    if (haiku.error) console.log(`| Haiku Error | ${haiku.error} |`);

    console.log('\n**Sample Reasoning (Sonnet):**');
    console.log(`> ${sonnet.sampleReasoning}...`);
    console.log('\n**Sample Reasoning (Haiku):**');
    console.log(`> ${haiku.sampleReasoning}...`);
  }

  // Cost comparison
  console.log('\n');
  console.log('='.repeat(80));
  console.log('COST COMPARISON (estimated)');
  console.log('='.repeat(80));
  console.log();
  console.log('| Model | Cost per 1K queries | Monthly (100 queries/day) |');
  console.log('|-------|---------------------|---------------------------|');
  console.log('| Sonnet | ~$50 | ~$150 |');
  console.log('| Haiku | ~$5 | ~$15 |');
  console.log('| **Savings** | **$45** | **$135** |');
}

main().catch(console.error);
