
import React, { useState, useEffect, useRef } from 'react';
import { Search, X, Loader2 } from 'lucide-react';
import { searchVideos, getSuggestions, YouTubeVideo } from '../services/youtubeService';
import { useNavigate } from 'react-router-dom';

const YouTubeSearch: React.FC = () => {
  const [query, setQuery] = useState('');
  const [suggestions, setSuggestions] = useState<string[]>([]);
  const [results, setResults] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isFocused, setIsFocused] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  // Fetch suggestions when query changes
  useEffect(() => {
    const fetchSuggestions = async () => {
      if (query.trim().length > 1) {
        const data = await getSuggestions(query);
        setSuggestions(data);
      } else {
        setSuggestions([]);
      }
    };
    
    const debounce = setTimeout(() => {
      fetchSuggestions();
    }, 300);
    
    return () => clearTimeout(debounce);
  }, [query]);

  // Handle clicks outside of search component
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsFocused(false);
        setShowResults(false);
      }
    };
    
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = async (searchQuery: string = query) => {
    if (!searchQuery.trim()) return;
    
    setIsLoading(true);
    setShowResults(true);
    
    try {
      const videos = await searchVideos(searchQuery);
      setResults(videos);
    } catch (error) {
      console.error('Error searching videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleSuggestionClick = (suggestion: string) => {
    setQuery(suggestion);
    handleSearch(suggestion);
  };

  const handleClear = () => {
    setQuery('');
    setSuggestions([]);
    setResults([]);
    setShowResults(false);
  };

  const handleVideoClick = (video: YouTubeVideo) => {
    // In a real app, you would navigate to the video player page with the YouTube video ID
    navigate(`/video/${video.id}?title=${encodeURIComponent(video.title)}`);
  };

  return (
    <div ref={searchRef} className="w-full max-w-3xl relative">
      <div className="relative">
        <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
        <input
          type="text"
          placeholder="Search for learning videos..."
          className="input-field pl-12 pr-10 py-3.5 w-full rounded-full bg-secondary text-foreground"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => setIsFocused(true)}
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              handleSearch();
            }
          }}
        />
        {isLoading ? (
          <Loader2 className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5 animate-spin" />
        ) : query && (
          <button
            type="button"
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
            onClick={handleClear}
          >
            <X className="w-5 h-5" />
          </button>
        )}
      </div>

      {/* Suggestions */}
      {isFocused && suggestions.length > 0 && (
        <div className="absolute mt-2 w-full bg-card rounded-xl shadow-lg border border-border overflow-hidden z-20 animate-fade-in">
          <div className="py-2">
            <div className="px-4 py-2 text-sm font-medium text-muted-foreground">Suggestions</div>
            <div className="px-2">
              {suggestions.map((suggestion, index) => (
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
        </div>
      )}

      {/* Search Results */}
      {showResults && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Search Results for "{query}"</h2>
          {isLoading ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(5)].map((_, index) => (
                <div key={index} className="animate-pulse">
                  <div className="rounded-lg bg-secondary h-48 mb-3"></div>
                  <div className="bg-secondary h-5 w-3/4 rounded mb-2"></div>
                  <div className="bg-secondary h-4 w-1/2 rounded"></div>
                </div>
              ))}
            </div>
          ) : results.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((video) => (
                <div 
                  key={video.id} 
                  className="rounded-xl overflow-hidden border border-border bg-card shadow-sm hover:shadow-md transition-all cursor-pointer"
                  onClick={() => handleVideoClick(video)}
                >
                  <div className="aspect-video relative">
                    <img src={video.thumbnail} alt={video.title} className="w-full h-full object-cover" />
                  </div>
                  <div className="p-4">
                    <h3 className="font-medium text-foreground line-clamp-2">{video.title}</h3>
                    <p className="text-sm text-muted-foreground mt-1">{video.channelTitle}</p>
                    <div className="flex items-center gap-2 mt-2">
                      <span className="text-xs text-muted-foreground">{video.viewCount} views</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-10">
              <p className="text-muted-foreground">No videos found. Try a different search term.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default YouTubeSearch;
