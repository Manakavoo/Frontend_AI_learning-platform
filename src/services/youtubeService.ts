
// This is a mock service for YouTube API

export interface YouTubeVideo {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  channelTitle: string;
  publishedAt: string;
  viewCount: string;
}

// Mock search function - in a real app, this would make an API call to YouTube
export const searchVideos = async (query: string): Promise<YouTubeVideo[]> => {
  // Simulating network delay
  await new Promise(resolve => setTimeout(resolve, 1000));
  
  // Sample videos related to learning and education
  const sampleVideos: YouTubeVideo[] = [
    {
      id: 'video1',
      title: `Learn ${query} - Complete Tutorial`,
      description: `This comprehensive tutorial covers everything you need to know about ${query}. Perfect for beginners and advanced learners alike.`,
      thumbnail: 'https://placehold.co/480x270/2563eb/FFFFFF/png?text=Learn+' + encodeURIComponent(query),
      channelTitle: 'Tech Academy',
      publishedAt: '2023-01-15',
      viewCount: '1.2M'
    },
    {
      id: 'video2',
      title: `${query} for Beginners`,
      description: `Start your journey with ${query} in this beginner-friendly guide that breaks down complex concepts into easy-to-understand lessons.`,
      thumbnail: 'https://placehold.co/480x270/2563eb/FFFFFF/png?text=' + encodeURIComponent(query) + '+for+Beginners',
      channelTitle: 'Learning Hub',
      publishedAt: '2023-03-22',
      viewCount: '856K'
    },
    {
      id: 'video3',
      title: `Advanced ${query} Techniques`,
      description: `Take your ${query} skills to the next level with these advanced techniques and strategies used by professionals.`,
      thumbnail: 'https://placehold.co/480x270/2563eb/FFFFFF/png?text=Advanced+' + encodeURIComponent(query),
      channelTitle: 'Pro Skills',
      publishedAt: '2023-02-10',
      viewCount: '634K'
    },
    {
      id: 'video4',
      title: `${query} Explained in 10 Minutes`,
      description: `A quick overview of ${query} that covers the most important concepts in just 10 minutes. Perfect for busy learners.`,
      thumbnail: 'https://placehold.co/480x270/2563eb/FFFFFF/png?text=' + encodeURIComponent(query) + '+in+10+Minutes',
      channelTitle: 'Quick Learner',
      publishedAt: '2023-04-05',
      viewCount: '1.5M'
    },
    {
      id: 'video5',
      title: `${query} Projects for Practice`,
      description: `Reinforce your ${query} knowledge with these practical projects that will help you apply what you've learned.`,
      thumbnail: 'https://placehold.co/480x270/2563eb/FFFFFF/png?text=' + encodeURIComponent(query) + '+Projects',
      channelTitle: 'Project Academy',
      publishedAt: '2023-05-18',
      viewCount: '423K'
    }
  ];
  
  return sampleVideos;
};

// Mock suggestions function
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
