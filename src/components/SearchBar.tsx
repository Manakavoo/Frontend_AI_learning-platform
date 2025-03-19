
import React, { useState } from 'react';
import { Search, X } from 'lucide-react';
import { recommendedSearches } from '../data/sampleData';

interface SearchBarProps {
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({ className = '' }) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);
  const [searchHistory] = useState<string[]>([
    'Machine learning models',
    'Neural network architecture',
    'Python data visualization'
  ]);

  const handleClear = () => {
    setQuery('');
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    console.log(`Searching for: ${query}`);
    // In a real app, this would trigger the search functionality
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    console.log(`Searching for: ${suggestion}`);
    // In a real app, this would trigger the search functionality
  };

  return (
    <div className={`w-full max-w-3xl ${className}`}>
      <form onSubmit={handleSearch} className="relative">
        <div className="relative">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
          <input
            type="text"
            placeholder="Search for videos, courses, topics..."
            className="input-field pl-12 pr-10 py-3.5 w-full rounded-full bg-secondary text-foreground"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 200)}
          />
          {query && (
            <button
              type="button"
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
              onClick={handleClear}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {isFocused && (
          <div className="absolute mt-2 w-full bg-card rounded-xl shadow-lg border border-border overflow-hidden z-10 animate-fade-in">
            {query ? (
              <div className="py-2">
                <div className="px-4 py-2 text-sm font-medium text-muted-foreground">Search Results</div>
                <div className="px-2">
                  {searchHistory.filter(item => item.toLowerCase().includes(query.toLowerCase())).map((result, index) => (
                    <button
                      key={index}
                      className="px-3 py-2.5 text-sm w-full text-left rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
                      onClick={() => handleSuggestionClick(result)}
                    >
                      <Search className="w-4 h-4 text-muted-foreground" />
                      {result}
                    </button>
                  ))}
                </div>
              </div>
            ) : (
              <div className="py-2">
                <div className="px-4 py-2 text-sm font-medium text-muted-foreground">Recommended Searches</div>
                <div className="px-2">
                  {recommendedSearches.map((suggestion, index) => (
                    <button
                      key={index}
                      className="px-3 py-2.5 text-sm w-full text-left rounded-lg hover:bg-secondary transition-colors flex items-center gap-2"
                      onClick={() => handleSuggestionClick(suggestion)}
                    >
                      <Search className="w-4 h-4 text-muted-foreground" />
                      {suggestion}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
