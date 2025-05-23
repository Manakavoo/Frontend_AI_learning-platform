
import React, { useEffect, useRef, useState } from 'react';

interface YouTubePlayerProps {
  videoId: string;
  onTimeUpdate?: (currentTime: number) => void;
}

declare global {
  interface Window {
    onYouTubeIframeAPIReady: () => void;
    YT: any;
  }
}

const YouTubePlayer: React.FC<YouTubePlayerProps> = ({ videoId, onTimeUpdate }) => {
  const playerRef = useRef<HTMLDivElement>(null);
  const player = useRef<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const timeUpdateIntervalRef = useRef<number | null>(null);

  useEffect(() => {
    // Load YouTube API script if not already loaded
    if (!window.YT) {
      const tag = document.createElement('script');
      tag.src = 'https://www.youtube.com/iframe_api';
      const firstScriptTag = document.getElementsByTagName('script')[0];
      firstScriptTag.parentNode?.insertBefore(tag, firstScriptTag);

      // This function will be called when the YouTube API is ready
      window.onYouTubeIframeAPIReady = initializePlayer;
    } else {
      initializePlayer();
    }

    return () => {
      // Cleanup
      if (player.current) {
        player.current.destroy();
      }
      
      // Clear interval if it exists
      if (timeUpdateIntervalRef.current) {
        clearInterval(timeUpdateIntervalRef.current);
      }
    };
  }, [videoId]);

  const initializePlayer = () => {
    if (playerRef.current && window.YT) {
      // Clear existing player if it exists
      if (player.current) {
        player.current.destroy();
      }
      
      try {
        player.current = new window.YT.Player(playerRef.current, {
          videoId: videoId,
          playerVars: {
            autoplay: 0,
            modestbranding: 1,
            rel: 0
          },
          events: {
            onReady: () => setIsLoading(false),
            onStateChange: onPlayerStateChange
          }
        });
      } catch (error) {
        console.error("Error initializing YouTube player:", error);
        setIsLoading(false);
      }
    }
  };

  const onPlayerStateChange = (event: any) => {
    // Clear existing interval
    if (timeUpdateIntervalRef.current) {
      clearInterval(timeUpdateIntervalRef.current);
      timeUpdateIntervalRef.current = null;
    }
    
    // Update time periodically when the video is playing
    if (event.data === window.YT.PlayerState.PLAYING) {
      timeUpdateIntervalRef.current = window.setInterval(() => {
        if (player.current && typeof player.current.getCurrentTime === 'function') {
          const currentTime = player.current.getCurrentTime();
          if (onTimeUpdate) {
            onTimeUpdate(currentTime);
          }
        }
      }, 1000);
    }
  };

  return (
    <div className="relative aspect-video rounded-xl overflow-hidden bg-black border border-border w-full">
      {isLoading && (
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="w-12 h-12 border-4 border-primary/20 border-t-primary rounded-full animate-spin"></div>
        </div>
      )}
      <div ref={playerRef} className="w-full h-full"></div>
    </div>
  );
};

export default YouTubePlayer;
