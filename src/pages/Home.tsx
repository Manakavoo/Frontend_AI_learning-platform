
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import SearchBar from '../components/SearchBar';
import VideoCard from '../components/VideoCard';
import { sampleVideos, categories } from '../data/sampleData';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const [filteredVideos, setFilteredVideos] = useState(sampleVideos);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (activeCategory) {
      setFilteredVideos(sampleVideos.filter(video => video.category === activeCategory));
    } else {
      setFilteredVideos(sampleVideos);
    }
  }, [activeCategory]);

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="md:ml-64 min-h-screen">
        {/* Header + Search */}
        <header className="pt-16 md:pt-8 px-4 md:px-8 pb-6 sticky top-0 bg-background z-10 border-b border-border">
          <div className="max-w-7xl mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              <div>
                <h1 className="text-2xl font-bold">Discover</h1>
                <p className="text-muted-foreground">Find videos to expand your knowledge</p>
              </div>
              <SearchBar className="md:max-w-md" />
            </div>
          </div>
        </header>
        
        <main className="px-4 md:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {/* Categories */}
            <div className="mb-8 overflow-x-auto pb-2 scrollbar-none">
              <div className="flex gap-2 min-w-max">
                <button
                  onClick={() => setActiveCategory(null)}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    activeCategory === null
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  All Categories
                </button>
                {categories.map(category => (
                  <button
                    key={category.id}
                    onClick={() => setActiveCategory(category.name)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                      activeCategory === category.name
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {category.name}
                  </button>
                ))}
              </div>
            </div>
            
            {/* Videos Grid */}
            {isLoading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {[...Array(8)].map((_, index) => (
                  <div key={index} className="animate-pulse">
                    <div className="rounded-lg bg-secondary h-48 mb-3"></div>
                    <div className="bg-secondary h-5 w-3/4 rounded mb-2"></div>
                    <div className="bg-secondary h-4 w-1/2 rounded mb-4"></div>
                    <div className="bg-secondary h-4 w-full rounded"></div>
                  </div>
                ))}
              </div>
            ) : (
              <>
                <h2 className="text-xl font-semibold mb-4">
                  {activeCategory ? `${activeCategory} Videos` : 'Recent Videos'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {filteredVideos.map(video => (
                    <VideoCard key={video.id} video={video} />
                  ))}
                </div>
              </>
            )}
            
            {/* Empty State */}
            {!isLoading && filteredVideos.length === 0 && (
              <div className="text-center py-12">
                <h3 className="text-lg font-medium mb-2">No videos found</h3>
                <p className="text-muted-foreground">
                  Try selecting a different category or check back later.
                </p>
              </div>
            )}
          </div>
        </main>
      </div>
    </div>
  );
};

export default Home;
