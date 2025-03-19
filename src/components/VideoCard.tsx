
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Play, Clock } from 'lucide-react';
import { Video } from '../data/sampleData';

interface VideoCardProps {
  video: Video;
}

const VideoCard: React.FC<VideoCardProps> = ({ video }) => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/video/${video.id}`);
  };

  return (
    <div 
      className="card group cursor-pointer overflow-hidden bg-card hover:bg-secondary/50 transition-all duration-300 flex flex-col"
      onClick={handleClick}
    >
      <div className="relative overflow-hidden rounded-lg aspect-video">
        <img 
          src={video.thumbnail} 
          alt={video.title}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-all duration-300"></div>
        <div className="absolute bottom-2 right-2 bg-black/70 text-white px-2 py-1 rounded text-xs flex items-center">
          <Clock className="w-3 h-3 mr-1" />
          {video.duration}
        </div>
        <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <div className="bg-white/90 rounded-full p-3 transform transition-transform duration-300 group-hover:scale-110">
            <Play className="w-6 h-6 text-primary fill-primary" />
          </div>
        </div>
      </div>
      <div className="p-4 flex-1 flex flex-col">
        <h3 className="font-medium text-lg line-clamp-2 mb-1 group-hover:text-primary transition-colors">{video.title}</h3>
        <p className="text-muted-foreground text-sm mb-2">{video.author}</p>
        <p className="text-muted-foreground text-sm line-clamp-2 mb-3">{video.description}</p>
        <div className="mt-auto flex justify-between items-center">
          <span className="text-xs px-2.5 py-1 bg-secondary rounded-full">{video.category}</span>
          <span className="text-xs text-muted-foreground">{video.views} views</span>
        </div>
      </div>
    </div>
  );
};

export default VideoCard;
