
import React, { useState } from 'react';
import Navigation from '../components/Navigation';
import { MessageSquare, ThumbsUp, Reply, Search, Filter, User } from 'lucide-react';

interface Post {
  id: string;
  title: string;
  content: string;
  author: {
    name: string;
    avatar: string;
  };
  date: string;
  likes: number;
  replies: number;
  tags: string[];
  isLiked: boolean;
}

const Community: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string | null>(null);
  
  // Sample data for posts
  const [posts, setPosts] = useState<Post[]>([
    {
      id: '1',
      title: 'Best resources to learn React in 2023?',
      content: 'I\'m looking for updated resources to learn React. Any recommendations for courses, books, or YouTube channels?',
      author: {
        name: 'Alex Johnson',
        avatar: 'https://placehold.co/200/2563eb/FFFFFF/png?text=AJ'
      },
      date: '2 days ago',
      likes: 24,
      replies: 12,
      tags: ['React', 'JavaScript', 'Frontend'],
      isLiked: false
    },
    {
      id: '2',
      title: 'How to structure a Python project?',
      content: 'I\'m starting a new Python project and wondering what\'s the best way to structure it for maintainability and scalability.',
      author: {
        name: 'Sarah Williams',
        avatar: 'https://placehold.co/200/2563eb/FFFFFF/png?text=SW'
      },
      date: '5 days ago',
      likes: 18,
      replies: 8,
      tags: ['Python', 'Backend', 'Best Practices'],
      isLiked: false
    },
    {
      id: '3',
      title: 'Data science vs Machine Learning - where to start?',
      content: 'I\'m interested in AI but not sure whether to focus on data science or machine learning first. Any advice?',
      author: {
        name: 'Mike Chen',
        avatar: 'https://placehold.co/200/2563eb/FFFFFF/png?text=MC'
      },
      date: '1 week ago',
      likes: 32,
      replies: 15,
      tags: ['Data Science', 'Machine Learning', 'AI'],
      isLiked: true
    },
    {
      id: '4',
      title: 'Getting started with UI/UX design',
      content: 'Looking for beginner-friendly resources to learn UI/UX design principles. What tools should I learn first?',
      author: {
        name: 'Emma Rodriguez',
        avatar: 'https://placehold.co/200/2563eb/FFFFFF/png?text=ER'
      },
      date: '3 days ago',
      likes: 12,
      replies: 7,
      tags: ['UI/UX', 'Design', 'Frontend'],
      isLiked: false
    },
    {
      id: '5',
      title: 'How to prepare for technical interviews?',
      content: 'I have some coding interviews coming up. What\'s the best approach to prepare, especially for algorithm questions?',
      author: {
        name: 'David Kim',
        avatar: 'https://placehold.co/200/2563eb/FFFFFF/png?text=DK'
      },
      date: '4 days ago',
      likes: 28,
      replies: 18,
      tags: ['Interviews', 'Algorithms', 'Career'],
      isLiked: false
    }
  ]);

  const popularTags = [
    'All',
    'JavaScript',
    'Python',
    'Data Science',
    'Machine Learning',
    'Web Development',
    'Frontend',
    'Backend',
    'Career',
    'Algorithms'
  ];

  const handleLike = (postId: string) => {
    setPosts(prevPosts => 
      prevPosts.map(post => {
        if (post.id === postId) {
          return {
            ...post,
            likes: post.isLiked ? post.likes - 1 : post.likes + 1,
            isLiked: !post.isLiked
          };
        }
        return post;
      })
    );
  };

  const filteredPosts = posts.filter(post => {
    const matchesSearch = searchQuery === '' || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
      post.content.toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesTag = activeTag === null || activeTag === 'All' || 
      post.tags.some(tag => tag.toLowerCase() === activeTag.toLowerCase());
    
    return matchesSearch && matchesTag;
  });

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="md:ml-64 min-h-screen">
        <div className="pt-16 md:pt-0 px-4 md:px-8 py-6 max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 mb-6">
            <div>
              <h1 className="text-2xl font-bold">Community</h1>
              <p className="text-muted-foreground">Connect with fellow learners and share knowledge</p>
            </div>
            <button className="btn-primary flex items-center gap-2 whitespace-nowrap">
              <MessageSquare className="w-4 h-4" />
              New Post
            </button>
          </div>
          
          {/* Search and filter */}
          <div className="mb-6 grid md:grid-cols-4 gap-4">
            <div className="md:col-span-3 relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <input
                type="text"
                placeholder="Search discussions..."
                className="input-field pl-10 py-2.5 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-4 h-4" />
              <select 
                className="input-field pl-10 py-2.5 w-full appearance-none cursor-pointer"
                onChange={(e) => setActiveTag(e.target.value)}
                defaultValue=""
              >
                <option value="">Filter by category</option>
                {popularTags.map(tag => (
                  <option key={tag} value={tag}>{tag}</option>
                ))}
              </select>
            </div>
          </div>
          
          {/* Tags */}
          <div className="mb-6 overflow-x-auto pb-2 scrollbar-none">
            <div className="flex gap-2 min-w-max">
              {popularTags.map(tag => (
                <button
                  key={tag}
                  onClick={() => setActiveTag(tag === 'All' ? null : tag)}
                  className={`px-3 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
                    (tag === 'All' && activeTag === null) || activeTag === tag
                      ? 'bg-primary text-primary-foreground'
                      : 'bg-secondary text-secondary-foreground hover:bg-secondary/80'
                  }`}
                >
                  {tag}
                </button>
              ))}
            </div>
          </div>
          
          {/* Posts */}
          <div className="space-y-4">
            {filteredPosts.length > 0 ? (
              filteredPosts.map(post => (
                <div key={post.id} className="bg-card rounded-xl border border-border shadow-sm p-4 hover:shadow-md transition-shadow">
                  <div className="flex items-start gap-3">
                    <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                      <img src={post.author.avatar} alt={post.author.name} className="w-full h-full object-cover" />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h3 className="font-medium text-lg">{post.title}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                        <span>{post.author.name}</span>
                        <span>•</span>
                        <span>{post.date}</span>
                      </div>
                      <p className="mt-2 text-secondary-foreground">{post.content}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {post.tags.map(tag => (
                          <span 
                            key={tag} 
                            className="px-2 py-1 bg-secondary text-secondary-foreground text-xs rounded-full"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                      <div className="flex items-center gap-4 mt-4 pt-3 border-t border-border">
                        <button 
                          className={`flex items-center gap-1.5 text-sm ${post.isLiked ? 'text-primary font-medium' : 'text-muted-foreground'}`}
                          onClick={() => handleLike(post.id)}
                        >
                          <ThumbsUp className="w-4 h-4" />
                          <span>{post.likes}</span>
                        </button>
                        <button className="flex items-center gap-1.5 text-sm text-muted-foreground">
                          <Reply className="w-4 h-4" />
                          <span>{post.replies} replies</span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-12 bg-card rounded-xl border border-border">
                <MessageSquare className="w-12 h-12 mx-auto text-muted-foreground mb-3" />
                <h3 className="text-lg font-medium mb-2">No posts found</h3>
                <p className="text-muted-foreground">
                  {searchQuery ? 'Try a different search term or tag filter.' : 'Be the first to start a discussion!'}
                </p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Community;
