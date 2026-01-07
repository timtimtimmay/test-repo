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

// Pre-compute set of occupation codes that have task data
const occupationsWithTasks = new Set(Object.keys(tasks).filter(code => tasks[code].length > 0));

/**
 * Check if an occupation has task data available
 */
export function hasTaskData(code: string): boolean {
  return occupationsWithTasks.has(code);
}

/**
 * Search for occupations by title (fuzzy matching)
 * Only returns occupations that have task data available
 */
export function searchOccupations(query: string, limit: number = 10): SearchResult[] {
  const lowerQuery = query.toLowerCase().trim();

  if (!lowerQuery) return [];

  // Extract words from query (remove common stop words)
  const stopWords = new Set(['the', 'and', 'for', 'with', 'a', 'an', 'of', 'in', 'to']);
  const queryWords = lowerQuery
    .split(/\s+/)
    .filter(word => word.length > 1 && !stopWords.has(word));

  // Filter and score matches
  const matches = search
    .filter(item => occupationsWithTasks.has(item.code)) // Only include occupations with tasks
    .map(item => {
      const lowerTitle = item.title.toLowerCase();
      const titleWords = lowerTitle.split(/\s+/);

      // Exact match (highest priority)
      if (lowerTitle === lowerQuery) {
        return { ...item, score: 100 };
      }

      // Title starts with query
      if (lowerTitle.startsWith(lowerQuery)) {
        return { ...item, score: 95 };
      }

      // Query starts with title - but only if title is substantial (not just one short word)
      // e.g., "Software Developer Senior" starting with "Software Developer" is good
      // but "Chief Learning Officer" starting with "Chief" is NOT good
      if (lowerQuery.startsWith(lowerTitle) && titleWords.length >= 2) {
        return { ...item, score: 90 };
      }

      // Title contains full query as substring
      if (lowerTitle.includes(lowerQuery)) {
        return { ...item, score: 85 };
      }

      // Check for exact word matches (not substrings!)
      const exactWordMatches = queryWords.filter(queryWord =>
        titleWords.some(titleWord => titleWord === queryWord)
      );

      // Partial word matches (word starts with query word or vice versa)
      // e.g., "manage" matches "manager", "train" matches "training"
      const partialWordMatches = queryWords.filter(queryWord =>
        !exactWordMatches.includes(queryWord) && // Don't double-count
        titleWords.some(titleWord =>
          (titleWord.startsWith(queryWord) && queryWord.length >= 4) ||
          (queryWord.startsWith(titleWord) && titleWord.length >= 4)
        )
      );

      const totalMatches = exactWordMatches.length + partialWordMatches.length * 0.7;

      if (totalMatches > 0) {
        // Score based on how many query words match
        const matchRatio = totalMatches / queryWords.length;

        // CRITICAL: Penalize heavily if most query words don't match
        // "Chief Learning Officer" matching just "Chief" should score poorly
        if (matchRatio < 0.5 && queryWords.length >= 2) {
          // Less than half the query words match - this is likely a bad match
          // Score range: 20-40 for poor matches
          const score = 20 + (matchRatio * 40);
          return { ...item, score };
        }

        // Good match: at least half of query words match
        // Score based on match quality, with bonus for longer matches
        // This prefers "Learning Manager" over just "Chief"
        const lengthBonus = Math.min(totalMatches / 3, 1) * 10; // Up to 10 points for multi-word matches
        const score = 50 + (matchRatio * 25) + lengthBonus;
        return { ...item, score };
      }

      return null;
    })
    .filter((item): item is SearchResult & { score: number } => item !== null)
    .sort((a, b) => {
      // Sort by score first
      if (b.score !== a.score) return b.score - a.score;
      // Then prioritize primary titles
      if (a.isPrimary && !b.isPrimary) return -1;
      if (!a.isPrimary && b.isPrimary) return 1;
      // Then by title length (shorter = more specific match)
      if (a.title.length !== b.title.length) return a.title.length - b.title.length;
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
  matchedTitle: string;
  score: number;
  alternatives?: Array<{ title: string; code: string; score: number }>;
} | null {
  const results = searchOccupations(jobTitle, 10) as Array<SearchResult & { score: number }>;

  if (results.length === 0) return null;

  const topMatch = results[0];
  const occupation = getOccupation(topMatch.code);

  if (!occupation) return null;

  const lowerQuery = jobTitle.toLowerCase().trim();
  const lowerTitle = topMatch.title.toLowerCase();

  // Determine confidence based on score
  let confidence: 'high' | 'medium' | 'low';
  let matchType: 'exact' | 'primary' | 'alternate';

  if (topMatch.score >= 90) {
    confidence = 'high';
    matchType = lowerQuery === lowerTitle ? 'exact' : (topMatch.isPrimary ? 'primary' : 'alternate');
  } else if (topMatch.score >= 60) {
    confidence = 'medium';
    matchType = topMatch.isPrimary ? 'primary' : 'alternate';
  } else {
    confidence = 'low';
    matchType = 'alternate';
  }

  // Include alternatives if confidence is not high
  const alternatives = confidence !== 'high'
    ? results.slice(1, 4).map(r => ({
        title: r.title,
        code: r.code,
        score: r.score,
      }))
    : undefined;

  return {
    occupation,
    confidence,
    matchType,
    matchedTitle: topMatch.title,
    score: topMatch.score,
    alternatives,
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
