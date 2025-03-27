
export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  viewCount: string;
}

const API_KEY = 'AIzaSyBrgPFYKcDmx7hehAleaDPYXKFgqR6ELZo';

// Class to handle YouTube API requests
class YouTubeDataCollector {
  apiKey: string;
  
  constructor(apiKey: string) {
    if (!apiKey) {
      throw new Error('YouTube API Key is required');
    }
    this.apiKey = apiKey;
  }
  
  // Search for videos by topic
  async searchVideosByTopic(query: string, maxResults = 8): Promise<string[]> {
    try {
      const response = await fetch(
        `https://youtube.googleapis.com/youtube/v3/search?part=id&q=${encodeURIComponent(query)}&type=video&maxResults=${maxResults}&order=viewCount&relevanceLanguage=en&videoDuration=medium&key=${this.apiKey}`,
        { method: 'GET' }
      );
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      const data = await response.json();
      return data.items.map((item: any) => item.id.videoId);
    } catch (error) {
      console.error('Error searching videos:', error);
      return [];
    }
  }
  
  // Retrieve detailed information for specific videos
  async retrieveVideoDetails(videoIds: string[], topic: string): Promise<YouTubeVideo[]> {
    try {
      const videoDetailsPromises = videoIds.map(async (videoId) => {
        const response = await fetch(
          `https://youtube.googleapis.com/youtube/v3/videos?part=snippet,statistics&id=${videoId}&key=${this.apiKey}`,
          { method: 'GET' }
        );
        
        if (!response.ok) {
          console.error(`Failed to fetch details for video ${videoId}`);
          return null;
        }
        
        const data = await response.json();
        
        if (!data.items || data.items.length === 0) {
          return null;
        }
        
        const snippet = data.items[0].snippet;
        const statistics = data.items[0].statistics;
        
        return {
          id: videoId,
          title: snippet.title || '',
          description: snippet.description || '',
          thumbnail: snippet.thumbnails.high?.url || snippet.thumbnails.default?.url,
          channelTitle: snippet.channelTitle || '',
          publishedAt: snippet.publishedAt || '',
          viewCount: statistics?.viewCount ? new Intl.NumberFormat().format(Number(statistics.viewCount)) : '0'
        };
      });
      
      // Wait for all video details to be fetched
      const videoDetails = await Promise.all(videoDetailsPromises);
      
      // Filter out any null results
      return videoDetails.filter(detail => detail !== null) as YouTubeVideo[];
    } catch (error) {
      console.error('Error retrieving video details:', error);
      return [];
    }
  }
  
  // Main method to collect video data for a given topic
  async collectVideoData(topic: string, maxResults = 8): Promise<YouTubeVideo[]> {
    try {
      // Search for videos
      const videoIds = await this.searchVideosByTopic(topic, maxResults);
      
      if (videoIds.length === 0) {
        return this.getFallbackVideos(topic);
      }
      
      // Retrieve details for the found videos
      const videoDetails = await this.retrieveVideoDetails(videoIds, topic);
      
      if (videoDetails.length === 0) {
        return this.getFallbackVideos(topic);
      }
      
      return videoDetails;
    } catch (error) {
      console.error(`Error collecting data for topic ${topic}:`, error);
      return this.getFallbackVideos(topic);
    }
  }
  
  // Fallback videos when API fails
  getFallbackVideos(topic: string): YouTubeVideo[] {
    // Generate fallback videos based on the topic
    const fallbackVideos: YouTubeVideo[] = [];
    
    for (let i = 1; i <= 8; i++) {
      fallbackVideos.push({
        id: `fallback-${topic}-${i}`,
        title: `${topic} Tutorial Part ${i}`,
        description: `Learn about ${topic} in this comprehensive tutorial series.`,
        thumbnail: 'https://images.unsplash.com/photo-1516110833967-0b5716ca1387?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1740&q=80',
        channelTitle: 'LearnAI Academy',
        publishedAt: new Date().toISOString(),
        viewCount: new Intl.NumberFormat().format(Math.floor(Math.random() * 10000))
      });
    }
    
    return fallbackVideos;
  }
}

// Create a collector instance
const collector = new YouTubeDataCollector(API_KEY);

// Function to fetch popular videos by category
export const getPopularVideosByCategory = async (category: string): Promise<YouTubeVideo[]> => {
  return collector.collectVideoData(category);
};

// Function to search for videos
export const searchVideos = async (query: string): Promise<YouTubeVideo[]> => {
  return collector.collectVideoData(query);
};

// Function to get video details by ID
export const getVideoById = async (videoId: string): Promise<YouTubeVideo | null> => {
  try {
    const results = await collector.retrieveVideoDetails([videoId], '');
    return results[0] || null;
  } catch (error) {
    console.error('Error fetching video by ID:', error);
    return null;
  }
};
