
// YouTube API integration
import axios from 'axios';

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  viewCount: string;
}

// YouTube Data Collector Class
class YouTubeDataCollector {
  private apiKey: string;

  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('YouTube API Key is required');
    }
    this.apiKey = apiKey;
  }

  // Search for videos by topic
  async searchVideosByTopic(query: string, maxResults = 10): Promise<string[]> {
    try {
      const response = await axios.get(
        `https://youtube.googleapis.com/youtube/v3/search?part=id&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&order=viewCount&relevanceLanguage=en&videoDuration=medium&key=${this.apiKey}`
      );

      if (response.status !== 200) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      return response.data.items.map((item: any) => item.id.videoId);
    } catch (error) {
      console.error('Error searching videos:', error);
      return [];
    }
  }

  // Retrieve detailed information for specific videos
  async retrieveVideoDetails(videoIds: string[]): Promise<YouTubeVideo[]> {
    try {
      const videoDetailsPromises = videoIds.map(async (videoId) => {
        try {
          const videoResponse = await axios.get(
            `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${this.apiKey}`
          );

          if (videoResponse.status !== 200 || !videoResponse.data.items || videoResponse.data.items.length === 0) {
            console.error(`Failed to fetch details for video ${videoId}`);
            return null;
          }

          const video = videoResponse.data.items[0];
          const snippet = video.snippet;
          const statistics = video.statistics;

          return {
            id: videoId,
            title: snippet.title || '',
            description: snippet.description || '',
            thumbnail: snippet.thumbnails.high.url || snippet.thumbnails.default.url,
            channelTitle: snippet.channelTitle || '',
            publishedAt: new Date(snippet.publishedAt).toLocaleDateString(),
            viewCount: this.formatViewCount(statistics.viewCount || '0')
          };
        } catch (error) {
          console.error(`Error fetching video ${videoId}:`, error);
          return null;
        }
      });

      // Wait for all video details to be fetched
      const videoDetails = await Promise.all(videoDetailsPromises);
      
      // Filter out any null results
      return videoDetails.filter((detail): detail is YouTubeVideo => detail !== null);
    } catch (error) {
      console.error('Error retrieving video details:', error);
      return [];
    }
  }

  // Format view count to be more readable
  private formatViewCount(viewCount: string): string {
    const count = parseInt(viewCount, 10);
    if (count >= 1000000) {
      return `${(count / 1000000).toFixed(1)}M`;
    } else if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}K`;
    }
    return viewCount;
  }
}

// YouTube API Key
const API_KEY = 'AIzaSyBrgPFYKcDmx7hehAleaDPYXKFgqR6ELZo';
const collector = new YouTubeDataCollector(API_KEY);

// Function to search videos
export const searchVideos = async (query: string): Promise<YouTubeVideo[]> => {
  try {
    // Search for videos
    const videoIds = await collector.searchVideosByTopic(query);
    
    // Retrieve details for the found videos
    const videoDetails = await collector.retrieveVideoDetails(videoIds);
    
    return videoDetails;
  } catch (error) {
    console.error('Error searching videos:', error);
    // Return sample videos if there's an error
    return getSampleVideos(query);
  }
};

// Function to get popular videos by category
export const getPopularVideosByCategory = async (category: string): Promise<YouTubeVideo[]> => {
  try {
    // Search for videos in the category
    const videoIds = await collector.searchVideosByTopic(category);
    
    // Retrieve details for the found videos
    const videoDetails = await collector.retrieveVideoDetails(videoIds);
    
    return videoDetails;
  } catch (error) {
    console.error(`Error fetching popular videos for ${category}:`, error);
    // Return sample videos if there's an error
    return getSampleVideos(category);
  }
};

// Function to get suggestions (simplified version)
export const getSuggestions = async (query: string): Promise<string[]> => {
  // Simulating network delay
  await new Promise(resolve => setTimeout(resolve, 300));
  
  if (!query) return [];
  
  const suggestions = [
    `${query} tutorial`,
    `${query} for beginners`,
    `${query} advanced course`,
    `${query} certification`,
    `${query} projects`,
    `learn ${query} fast`,
    `${query} career path`
  ];
  
  return suggestions.slice(0, 5);
};

// Fallback sample videos if API fails
const getSampleVideos = (query: string): YouTubeVideo[] => {
  return [
    {
      id: 'video1',
      title: `Learn ${query} - Complete Tutorial`,
      description: `This comprehensive tutorial covers everything you need to know about ${query}.`,
      thumbnail: 'https://placehold.co/480x270/2563eb/FFFFFF/png?text=Learn+' + encodeURIComponent(query),
      channelTitle: 'Tech Academy',
      publishedAt: '2023-01-15',
      viewCount: '1.2M'
    },
    {
      id: 'video2',
      title: `${query} for Beginners`,
      description: `Start your journey with ${query} in this beginner-friendly guide.`,
      thumbnail: 'https://placehold.co/480x270/2563eb/FFFFFF/png?text=' + encodeURIComponent(query) + '+for+Beginners',
      channelTitle: 'Learning Hub',
      publishedAt: '2023-03-22',
      viewCount: '856K'
    },
    {
      id: 'video3',
      title: `Advanced ${query} Techniques`,
      description: `Take your ${query} skills to the next level with these advanced techniques.`,
      thumbnail: 'https://placehold.co/480x270/2563eb/FFFFFF/png?text=Advanced+' + encodeURIComponent(query),
      channelTitle: 'Pro Skills',
      publishedAt: '2023-02-10',
      viewCount: '634K'
    }
  ];
};
