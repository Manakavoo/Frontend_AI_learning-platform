
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, ThumbsUp, ThumbsDown, Share, Bookmark, MessageCircle } from 'lucide-react';
import Navigation from '../components/Navigation';
import ChatBot from '../components/ChatBot';
import YouTubePlayer from '../components/YouTubePlayer';
import { getPopularVideosByCategory } from '../services/youtubeService';
import { sampleVideos } from '../data/sampleData';
import { YouTubeVideo } from '../services/youtubeService';

const VideoPlayer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const location = useLocation();
  const [showChat, setShowChat] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [relatedVideos, setRelatedVideos] = useState<YouTubeVideo[]>([]);
  const [currentTime, setCurrentTime] = useState<number>(0);
  
  // Get video title from query params
  const searchParams = new URLSearchParams(location.search);
  const title = searchParams.get('title') || 'Video Title';

  useEffect(() => {
    if (!id) {
      navigate('/home');
      return;
    }

    // Load related videos
    const loadRelatedVideos = async () => {
      try {
        const videos = await getPopularVideosByCategory('programming');
        setRelatedVideos(videos.filter(v => v.id !== id).slice(0, 4));
      } catch (error) {
        console.error('Error loading related videos:', error);
      } finally {
        setIsLoading(false);
      }
    };

    loadRelatedVideos();
  }, [id, navigate]);

  const handleTimeUpdate = (time: number) => {
    setCurrentTime(time);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? '0' + secs : secs}`;
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <div className="md:ml-64 min-h-screen pt-16 md:pt-0">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <button
            onClick={() => navigate('/home')}
            className="inline-flex items-center text-sm text-muted-foreground hover:text-foreground mb-4 transition-colors"
          >
            <ArrowLeft className="w-4 h-4 mr-1" />
            Back to videos
          </button>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-6">
              {/* Video Player */}
              <YouTubePlayer videoId={id || ''} onTimeUpdate={handleTimeUpdate} />
              
              {/* Video Info */}
              <div>
                <h1 className="text-2xl font-bold mb-2">{title}</h1>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-muted-foreground">
                    <span>Current time: {formatTime(currentTime)}</span>
                  </div>
                  <div className="flex gap-3">
                    <button className="p-2 rounded-full hover:bg-secondary transition-colors">
                      <ThumbsUp className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-secondary transition-colors">
                      <ThumbsDown className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-secondary transition-colors">
                      <Share className="w-5 h-5" />
                    </button>
                    <button className="p-2 rounded-full hover:bg-secondary transition-colors">
                      <Bookmark className="w-5 h-5" />
                    </button>
                    <button 
                      className={`p-2 rounded-full transition-colors ${
                        showChat ? 'bg-primary/10 text-primary' : 'hover:bg-secondary'
                      }`}
                      onClick={() => setShowChat(!showChat)}
                    >
                      <MessageCircle className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* ChatBot */}
              {showChat ? (
                <div className="rounded-xl overflow-hidden border border-border h-[500px]">
                  <ChatBot videoId={id || ''} videoTitle={title} currentTime={currentTime} />
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <h3 className="font-medium mb-3">Related Videos</h3>
                    <div className="space-y-4">
                      {relatedVideos.map(video => (
                        <div 
                          key={video.id}
                          className="flex gap-3 cursor-pointer hover:bg-secondary/50 p-2 rounded-lg transition-colors"
                          onClick={() => navigate(`/video/${video.id}?title=${encodeURIComponent(video.title)}`)}
                        >
                          <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={video.thumbnail}
                              alt={video.title}
                              className="w-full h-full object-cover"
                            />
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm line-clamp-2 mb-1">{video.title}</h4>
                            <p className="text-xs text-muted-foreground">{video.channelTitle}</p>
                            <p className="text-xs text-muted-foreground mt-1">{video.viewCount} views</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="bg-secondary/30 rounded-xl p-6 border border-border">
                    <h3 className="font-medium mb-3">Need help understanding this video?</h3>
                    <p className="text-sm text-muted-foreground mb-4">
                      Our AI assistant can answer your questions about the content in this video.
                    </p>
                    <button
                      onClick={() => setShowChat(true)}
                      className="btn-primary w-full justify-center"
                    >
                      Chat with AI Assistant
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;
