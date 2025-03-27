
import React, { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import YouTubeSearch from '../components/YouTubeSearch';
import VideoCard from '../components/VideoCard';
import { getPopularVideosByCategory } from '../services/youtubeService';
import { categories } from '../data/sampleData';
import { YouTubeVideo } from '../services/youtubeService';

const Home = () => {
  const [activeCategory, setActiveCategory] = useState<string | null>('Machine Learning');
  const [videos, setVideos] = useState<YouTubeVideo[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Load initial videos for Machine Learning
    fetchVideosByCategory(activeCategory || 'Machine Learning');
  }, []);

  useEffect(() => {
    if (activeCategory) {
      fetchVideosByCategory(activeCategory);
    }
  }, [activeCategory]);

  const fetchVideosByCategory = async (category: string) => {
    setIsLoading(true);
    try {
      const videos = await getPopularVideosByCategory(category);
      setVideos(videos);
    } catch (error) {
      console.error('Error fetching videos:', error);
    } finally {
      setIsLoading(false);
    }
  };

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
              <YouTubeSearch />
            </div>
          </div>
        </header>
        
        <main className="px-4 md:px-8 py-6">
          <div className="max-w-7xl mx-auto">
            {/* Categories */}
            <div className="mb-8 overflow-x-auto pb-2 scrollbar-none">
              <div className="flex gap-2 min-w-max">
                {['Machine Learning', 'Data Science', 'Web Development', 'Python', 'JavaScript'].map(category => (
                  <button
                    key={category}
                    onClick={() => setActiveCategory(category)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                      activeCategory === category
                        ? 'bg-primary text-primary-foreground'
                        : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                    }`}
                  >
                    {category}
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
                  {activeCategory ? `${activeCategory} Videos` : 'Recommended Videos'}
                </h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                  {videos.map(video => (
                    <VideoCard key={video.id} video={{
                      id: video.id,
                      title: video.title,
                      description: video.description,
                      thumbnail: video.thumbnail,
                      author: video.channelTitle,
                      views: video.viewCount,
                      createdAt: video.publishedAt,
                      category: activeCategory || 'Programming',
                      duration: '10:30' // Default duration as it's not provided by the API
                    }} />
                  ))}
                </div>
              </>
            )}
            
            {/* Empty State */}
            {!isLoading && videos.length === 0 && (
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
