/**
 * O*NET Data Loading and Utilities
 */

import occupationsData from '@/data/onet-occupations.json';
import tasksData from '@/data/onet-tasks.json';
import searchIndex from '@/data/onet-search-index.json';

export interface OnetOccupation {
  code: string;
  title: string;
  description?: string;
  alternateTitles: string[];
}

export interface OnetTask {
  id: string;
  task: string;
  type: string;
  date: string;
  source?: string;
}

export interface SearchResult {
  title: string;
  code: string;
  isPrimary: boolean;
  primaryTitle?: string;
}

// Type assertions for the imported JSON data
const occupations = occupationsData as Record<string, OnetOccupation>;
const tasks = tasksData as Record<string, OnetTask[]>;
const search = searchIndex as SearchResult[];

/**
 * Search for occupations by title (fuzzy matching)
 */
export function searchOccupations(query: string, limit: number = 10): SearchResult[] {
  const lowerQuery = query.toLowerCase().trim();

  if (!lowerQuery) return [];

  // Filter and score matches
  const matches = search
    .map(item => {
      const lowerTitle = item.title.toLowerCase();

      // Exact match
      if (lowerTitle === lowerQuery) {
        return { ...item, score: 100 };
      }

      // Starts with query
      if (lowerTitle.startsWith(lowerQuery)) {
        return { ...item, score: 90 };
      }

      // Contains query
      if (lowerTitle.includes(lowerQuery)) {
        return { ...item, score: 70 };
      }

      // Word boundary match
      const words = lowerTitle.split(/\s+/);
      if (words.some(word => word.startsWith(lowerQuery))) {
        return { ...item, score: 60 };
      }

      return null;
    })
    .filter((item): item is SearchResult & { score: number } => item !== null)
    .sort((a, b) => {
      // Sort by score first, then prioritize primary titles
      if (b.score !== a.score) return b.score - a.score;
      if (a.isPrimary && !b.isPrimary) return -1;
      if (!a.isPrimary && b.isPrimary) return 1;
      return a.title.localeCompare(b.title);
    })
    .slice(0, limit);

  return matches;
}

/**
 * Get occupation by O*NET-SOC code
 */
export function getOccupation(code: string): OnetOccupation | null {
  return occupations[code] || null;
}

/**
 * Get tasks for an occupation by O*NET-SOC code
 */
export function getTasks(code: string): OnetTask[] {
  return tasks[code] || [];
}

/**
 * Get best match for a job title
 */
export function findBestMatch(jobTitle: string): {
  occupation: OnetOccupation;
  confidence: 'high' | 'medium' | 'low';
  matchType: 'exact' | 'primary' | 'alternate';
} | null {
  const results = searchOccupations(jobTitle, 5);

  if (results.length === 0) return null;

  const topMatch = results[0];
  const occupation = getOccupation(topMatch.code);

  if (!occupation) return null;

  const lowerQuery = jobTitle.toLowerCase().trim();
  const lowerTitle = topMatch.title.toLowerCase();

  // Determine confidence based on match quality
  let confidence: 'high' | 'medium' | 'low';
  let matchType: 'exact' | 'primary' | 'alternate';

  if (lowerQuery === lowerTitle) {
    confidence = 'high';
    matchType = topMatch.isPrimary ? 'exact' : 'alternate';
  } else if (lowerTitle.startsWith(lowerQuery) || lowerQuery.startsWith(lowerTitle)) {
    confidence = 'high';
    matchType = topMatch.isPrimary ? 'primary' : 'alternate';
  } else if (lowerTitle.includes(lowerQuery)) {
    confidence = 'medium';
    matchType = topMatch.isPrimary ? 'primary' : 'alternate';
  } else {
    confidence = 'low';
    matchType = 'alternate';
  }

  return {
    occupation,
    confidence,
    matchType,
  };
}

/**
 * Get occupation statistics
 */
export function getStats() {
  return {
    totalOccupations: Object.keys(occupations).length,
    totalTasks: Object.values(tasks).flat().length,
    totalSearchableTerms: search.length,
  };
}
