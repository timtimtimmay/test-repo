'use client';

import { useState, useRef, useEffect, useCallback } from 'react';
import { SearchResult } from '@/lib/types';

interface SearchInputProps {
  onSelect: (result: SearchResult) => void;
  searchData: SearchResult[];
  placeholder?: string;
  disabled?: boolean;
}

export default function SearchInput({
  onSelect,
  searchData,
  placeholder = 'Search for a job title...',
  disabled = false,
}: SearchInputProps) {
  const [query, setQuery] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const [highlightedIndex, setHighlightedIndex] = useState(-1);
  const [filteredResults, setFilteredResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLUListElement>(null);

  // Filter results based on query with debouncing and optimization
  useEffect(() => {
    if (query.trim() === '') {
      setFilteredResults([]);
      setIsSearching(false);
      return;
    }

    setIsSearching(true);

    // Debounce: wait for user to stop typing
    const debounceTimer = setTimeout(() => {
      const lowerQuery = query.toLowerCase();
      const maxResults = 50; // Limit results for performance
      const results: SearchResult[] = [];

      // Optimized search: prioritize exact/startsWith matches
      // Only show "includes" matches if query is substantial (3+ chars)
      // Early exit when we have enough results
      const showPartialMatches = lowerQuery.length >= 3;

      for (const item of searchData) {
        if (results.length >= maxResults) break;

        const lowerTitle = item.title.toLowerCase();
        const lowerCategory = item.category?.toLowerCase() || '';

        // High-quality matches (exact or starts with)
        if (
          lowerTitle.startsWith(lowerQuery) ||
          lowerCategory.startsWith(lowerQuery)
        ) {
          results.push(item);
        }
        // Partial matches (only if query is 3+ chars and we don't have many results yet)
        else if (showPartialMatches && results.length < 20) {
          if (lowerTitle.includes(lowerQuery) || lowerCategory.includes(lowerQuery)) {
            results.push(item);
          }
        }
      }

      setFilteredResults(results);
      setHighlightedIndex(-1);
      setIsSearching(false);
    }, 150); // 150ms debounce delay

    return () => clearTimeout(debounceTimer);
  }, [query, searchData]);

  // Handle selection
  const handleSelect = useCallback((result: SearchResult) => {
    setQuery(result.title);
    setIsOpen(false);
    setHighlightedIndex(-1);
    onSelect(result);
  }, [onSelect]);

  // Handle free-form text submission (not from autocomplete)
  const handleSubmitFreeForm = useCallback(() => {
    if (!query.trim()) return;

    // Create a synthetic SearchResult for free-form input
    const freeFormResult: SearchResult = {
      id: 'free-form',
      title: query.trim(),
      category: 'Custom search',
    };

    handleSelect(freeFormResult);
  }, [query, handleSelect]);

  // Handle keyboard navigation
  const handleKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      if (!isOpen) {
        if (e.key === 'ArrowDown' && filteredResults.length > 0) {
          setIsOpen(true);
          setHighlightedIndex(0);
          e.preventDefault();
        } else if (e.key === 'Enter' && query.trim()) {
          // Allow Enter to submit free-form text even if dropdown not open
          e.preventDefault();
          handleSubmitFreeForm();
        }
        return;
      }

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setHighlightedIndex((prev) =>
            prev < filteredResults.length - 1 ? prev + 1 : prev
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : prev));
          break;
        case 'Enter':
          e.preventDefault();
          if (highlightedIndex >= 0 && filteredResults[highlightedIndex]) {
            handleSelect(filteredResults[highlightedIndex]);
          } else if (query.trim()) {
            // If no item highlighted, submit free-form text
            handleSubmitFreeForm();
          }
          break;
        case 'Escape':
          setIsOpen(false);
          setHighlightedIndex(-1);
          break;
      }
    },
    [isOpen, filteredResults, highlightedIndex, handleSelect, query, handleSubmitFreeForm]
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        inputRef.current &&
        !inputRef.current.contains(e.target as Node) &&
        listRef.current &&
        !listRef.current.contains(e.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Scroll highlighted item into view
  useEffect(() => {
    if (highlightedIndex >= 0 && listRef.current) {
      const item = listRef.current.children[highlightedIndex] as HTMLElement;
      if (item) {
        item.scrollIntoView({ block: 'nearest' });
      }
    }
  }, [highlightedIndex]);

  return (
    <div className="relative w-full">
      {/* Search Input */}
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-4">
          <svg
            className="h-5 w-5 text-gray-400"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </div>
        <input
          ref={inputRef}
          type="text"
          value={query}
          onChange={(e) => {
            setQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => {
            if (filteredResults.length > 0) {
              setIsOpen(true);
            }
          }}
          onKeyDown={handleKeyDown}
          disabled={disabled}
          placeholder={placeholder}
          className="block w-full rounded-lg border border-gray-300 bg-white py-3 pl-11 pr-4 text-gray-900 placeholder:text-gray-500 focus:border-slate-500 focus:outline-none focus:ring-2 focus:ring-slate-500/20 disabled:bg-gray-50 disabled:text-gray-500 sm:text-sm"
        />
        {isSearching && query && (
          <div className="absolute inset-y-0 right-0 flex items-center pr-4">
            <svg className="h-5 w-5 animate-spin text-gray-400" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
          </div>
        )}
        {!isSearching && query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              setFilteredResults([]);
              inputRef.current?.focus();
            }}
            className="absolute inset-y-0 right-0 flex items-center pr-4 text-gray-400 hover:text-gray-600"
          >
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>

      {/* Autocomplete Dropdown */}
      {isOpen && query.trim() !== '' && (
        <ul
          ref={listRef}
          className="absolute z-10 mt-2 max-h-60 w-full overflow-auto rounded-lg border border-gray-200 bg-white shadow-lg"
          role="listbox"
        >
          {/* Always show free-form search option first */}
          <li
            role="option"
            aria-selected={false}
            className="cursor-pointer px-4 py-3 bg-blue-50 border-b border-blue-100"
            onClick={handleSubmitFreeForm}
          >
            <div className="flex items-center gap-2">
              <svg className="h-4 w-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              <div>
                <div className="text-sm text-blue-600 font-medium">
                  Search for: &quot;{query.trim()}&quot;
                </div>
                <div className="text-xs text-gray-600 mt-0.5">
                  {filteredResults.length > 0
                    ? 'Find closest match using AI'
                    : 'We\'ll find the closest matching occupation'}
                </div>
              </div>
            </div>
          </li>

          {/* Autocomplete suggestions below */}
          {filteredResults.length > 0 && (
            <>
              <li className="px-4 py-2 text-xs text-gray-500 bg-gray-50 font-medium">
                Or select from suggestions:
              </li>
              {filteredResults.map((result, index) => (
                <li
                  key={result.id}
                  role="option"
                  aria-selected={highlightedIndex === index}
                  className={`cursor-pointer px-4 py-3 ${
                    highlightedIndex === index
                      ? 'bg-slate-50'
                      : 'hover:bg-gray-50'
                  }`}
                  onClick={() => handleSelect(result)}
                  onMouseEnter={() => setHighlightedIndex(index)}
                >
                  <div className="flex items-center justify-between">
                    <span className="font-medium text-gray-900">{result.title}</span>
                    {result.category && (
                      <span className="text-xs text-gray-500 bg-gray-100 px-2 py-0.5 rounded-full">
                        {result.category}
                      </span>
                    )}
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>
      )}
    </div>
  );
}
