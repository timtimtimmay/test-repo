#!/usr/bin/env node

/**
 * Process O*NET 30.1 Data into JSON format
 *
 * This script transforms the tab-delimited O*NET database files into
 * JSON files optimized for the workforce intelligence app.
 *
 * Inputs (from onet-data/db_30_1_text/):
 * - Occupation Data.txt
 * - Task Statements.txt
 * - Alternate Titles.txt
 *
 * Outputs (to data/):
 * - onet-occupations.json
 * - onet-tasks.json
 */

const fs = require('fs');
const path = require('path');

// Paths
const ONET_DIR = path.join(__dirname, '../onet-data/db_30_1_text');
const OUTPUT_DIR = path.join(__dirname, '../data');

// Ensure output directory exists
if (!fs.existsSync(OUTPUT_DIR)) {
  fs.mkdirSync(OUTPUT_DIR, { recursive: true });
}

/**
 * Parse tab-delimited file into array of objects
 */
function parseTSV(filePath) {
  const content = fs.readFileSync(filePath, 'utf-8');
  const lines = content.split('\n').filter(line => line.trim());

  if (lines.length === 0) return [];

  // First line is headers
  const headers = lines[0].split('\t');

  // Parse remaining lines
  const data = [];
  for (let i = 1; i < lines.length; i++) {
    const values = lines[i].split('\t');
    const obj = {};
    headers.forEach((header, index) => {
      obj[header] = values[index] || '';
    });
    data.push(obj);
  }

  return data;
}

/**
 * Process Occupation Data
 */
function processOccupations() {
  console.log('Processing occupation data...');

  const occupationData = parseTSV(path.join(ONET_DIR, 'Occupation Data.txt'));
  const alternateTitles = parseTSV(path.join(ONET_DIR, 'Alternate Titles.txt'));

  // Group alternate titles by O*NET-SOC Code
  const alternatesByCode = {};
  alternateTitles.forEach(item => {
    const code = item['O*NET-SOC Code'];
    if (!alternatesByCode[code]) {
      alternatesByCode[code] = [];
    }
    const title = item['Alternate Title'];
    if (title && title !== 'n/a') {
      alternatesByCode[code].push(title);
    }
  });

  // Build occupation lookup
  const occupations = {};
  occupationData.forEach(occ => {
    const code = occ['O*NET-SOC Code'];
    occupations[code] = {
      code: code,
      title: occ['Title'],
      description: occ['Description'],
      alternateTitles: alternatesByCode[code] || []
    };
  });

  // Write to file
  const outputPath = path.join(OUTPUT_DIR, 'onet-occupations.json');
  fs.writeFileSync(outputPath, JSON.stringify(occupations, null, 2));

  console.log(`✓ Created ${outputPath}`);
  console.log(`  ${Object.keys(occupations).length} occupations processed`);

  return occupations;
}

/**
 * Process Task Statements
 */
function processTasks() {
  console.log('\nProcessing task statements...');

  const taskData = parseTSV(path.join(ONET_DIR, 'Task Statements.txt'));

  // Group tasks by O*NET-SOC Code
  const tasksByCode = {};
  taskData.forEach(task => {
    const code = task['O*NET-SOC Code'];
    if (!tasksByCode[code]) {
      tasksByCode[code] = [];
    }
    tasksByCode[code].push({
      id: task['Task ID'],
      task: task['Task'],
      type: task['Task Type'],
      date: task['Date'],
      source: task['Domain Source']
    });
  });

  // Write to file
  const outputPath = path.join(OUTPUT_DIR, 'onet-tasks.json');
  fs.writeFileSync(outputPath, JSON.stringify(tasksByCode, null, 2));

  console.log(`✓ Created ${outputPath}`);
  console.log(`  ${Object.keys(tasksByCode).length} occupations with tasks`);
  console.log(`  ${taskData.length} total task statements`);

  return tasksByCode;
}

/**
 * Create a searchable job titles index
 */
function createSearchIndex(occupations) {
  console.log('\nCreating search index...');

  const searchIndex = [];

  Object.values(occupations).forEach(occ => {
    // Add primary title
    searchIndex.push({
      title: occ.title,
      code: occ.code,
      isPrimary: true
    });

    // Add alternate titles
    occ.alternateTitles.forEach(altTitle => {
      searchIndex.push({
        title: altTitle,
        code: occ.code,
        isPrimary: false,
        primaryTitle: occ.title
      });
    });
  });

  // Sort alphabetically for faster search
  searchIndex.sort((a, b) => a.title.localeCompare(b.title));

  // Write to file
  const outputPath = path.join(OUTPUT_DIR, 'onet-search-index.json');
  fs.writeFileSync(outputPath, JSON.stringify(searchIndex, null, 2));

  console.log(`✓ Created ${outputPath}`);
  console.log(`  ${searchIndex.length} searchable job titles`);

  return searchIndex;
}

/**
 * Generate statistics report
 */
function generateStats(occupations, tasks, searchIndex) {
  console.log('\n' + '='.repeat(60));
  console.log('O*NET 30.1 DATA PROCESSING SUMMARY');
  console.log('='.repeat(60));
  console.log(`
Database Version:     O*NET 30.1 (December 2025)
Occupations:          ${Object.keys(occupations).length}
Task Statements:      ${Object.values(tasks).flat().length}
Searchable Titles:    ${searchIndex.length}
  - Primary Titles:   ${searchIndex.filter(s => s.isPrimary).length}
  - Alternate Titles: ${searchIndex.filter(s => !s.isPrimary).length}

Output Files:
  ✓ data/onet-occupations.json
  ✓ data/onet-tasks.json
  ✓ data/onet-search-index.json

Ready for integration into the workforce intelligence app!
`);
  console.log('='.repeat(60));
}

/**
 * Main execution
 */
function main() {
  console.log('O*NET 30.1 Data Processing Tool\n');

  try {
    const occupations = processOccupations();
    const tasks = processTasks();
    const searchIndex = createSearchIndex(occupations);
    generateStats(occupations, tasks, searchIndex);

    console.log('\n✓ Processing complete!\n');
  } catch (error) {
    console.error('\n✗ Error processing data:', error.message);
    console.error(error.stack);
    process.exit(1);
  }
}

main();
