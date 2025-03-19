
import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { ArrowLeft, ThumbsUp, ThumbsDown, Share, Bookmark, MessageCircle } from 'lucide-react';
import Navigation from '../components/Navigation';
import ChatBot from '../components/ChatBot';
import { sampleVideos } from '../data/sampleData';

const VideoPlayer = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showChat, setShowChat] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  const video = sampleVideos.find(v => v.id === id);
  const relatedVideos = sampleVideos.filter(v => v.id !== id).slice(0, 4);

  useEffect(() => {
    if (!video) {
      navigate('/home');
      return;
    }

    // Simulate loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [video, navigate]);

  if (!video) return null;

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
              <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-border">
                {isLoading ? (
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
                  </div>
                ) : (
                  <img 
                    src={video.thumbnail} 
                    alt={video.title}
                    className="w-full h-full object-cover"
                  />
                )}
              </div>
              
              {/* Video Info */}
              <div>
                <h1 className="text-2xl font-bold mb-2">{video.title}</h1>
                <div className="flex justify-between items-center mb-4">
                  <div className="text-sm text-muted-foreground">
                    <span>{video.views} views</span>
                    <span className="mx-2">•</span>
                    <span>{video.createdAt}</span>
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
                
                <div className="bg-secondary/50 rounded-xl p-4 mb-6">
                  <h3 className="font-medium mb-1">About this video</h3>
                  <p className="text-muted-foreground text-sm">{video.description}</p>
                </div>
                
                <div>
                  <h3 className="font-medium mb-2">Author</h3>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-lg font-medium">
                      {video.author.charAt(0)}
                    </div>
                    <div>
                      <p className="font-medium">{video.author}</p>
                      <p className="text-sm text-muted-foreground">Content Creator</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            {/* Sidebar */}
            <div className="space-y-6">
              {/* ChatBot */}
              {showChat ? (
                <div className="rounded-xl overflow-hidden border border-border h-[500px]">
                  <ChatBot videoId={video.id} />
                </div>
              ) : (
                <>
                  <div className="mb-4">
                    <h3 className="font-medium mb-3">Related Videos</h3>
                    <div className="space-y-4">
                      {relatedVideos.map(relatedVideo => (
                        <div 
                          key={relatedVideo.id}
                          className="flex gap-3 cursor-pointer hover:bg-secondary/50 p-2 rounded-lg transition-colors"
                          onClick={() => navigate(`/video/${relatedVideo.id}`)}
                        >
                          <div className="relative w-32 h-20 rounded-lg overflow-hidden flex-shrink-0">
                            <img
                              src={relatedVideo.thumbnail}
                              alt={relatedVideo.title}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute bottom-1 right-1 bg-black/70 text-white px-1 text-xs rounded">
                              {relatedVideo.duration}
                            </div>
                          </div>
                          <div className="flex-1">
                            <h4 className="font-medium text-sm line-clamp-2 mb-1">{relatedVideo.title}</h4>
                            <p className="text-xs text-muted-foreground">{relatedVideo.author}</p>
                            <p className="text-xs text-muted-foreground mt-1">{relatedVideo.views} views</p>
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
