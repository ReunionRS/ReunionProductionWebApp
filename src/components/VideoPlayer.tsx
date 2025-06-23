import React from 'react';

interface VideoPlayerProps {
  url: string;
  poster?: string;
  className?: string;
  autoPlay?: boolean;
  muted?: boolean;
  loop?: boolean;
  controls?: boolean;
}

const VideoPlayer: React.FC<VideoPlayerProps> = ({
  url,
  poster,
  className = "w-full h-full",
  autoPlay = false,
  muted = false,
  loop = false,
  controls = true
}) => {
  const getVideoType = (url: string) => {
    if (url.includes('youtube.com') || url.includes('youtu.be')) {
      return 'youtube';
    }
    if (url.includes('vimeo.com')) {
      return 'vimeo';
    }
    if (url.match(/\.(mp4|webm|ogg|mov|avi)(\?.*)?$/i)) {
      return 'file';
    }
    return 'file';
  };

  const getYouTubeEmbedUrl = (url: string) => {
    let videoId = '';
    
    if (url.includes('youtube.com/watch?v=')) {
      videoId = url.split('v=')[1].split('&')[0];
    } else if (url.includes('youtu.be/')) {
      videoId = url.split('youtu.be/')[1].split('?')[0];
    } else if (url.includes('youtube.com/embed/')) {
      return url; 
    }
    
    if (videoId) {
      const embedParams = new URLSearchParams();
      if (autoPlay) embedParams.set('autoplay', '1');
      if (muted) embedParams.set('mute', '1');
      if (loop) embedParams.set('loop', '1');
      if (!controls) embedParams.set('controls', '0');
      
      const params = embedParams.toString();
      return `https://www.youtube.com/embed/${videoId}${params ? '?' + params : ''}`;
    }
    
    return url;
  };

  const getVimeoEmbedUrl = (url: string) => {
    const match = url.match(/vimeo\.com\/(\d+)/);
    if (match) {
      const videoId = match[1];
      const embedParams = new URLSearchParams();
      if (autoPlay) embedParams.set('autoplay', '1');
      if (muted) embedParams.set('muted', '1');
      if (loop) embedParams.set('loop', '1');
      
      const params = embedParams.toString();
      return `https://player.vimeo.com/video/${videoId}${params ? '?' + params : ''}`;
    }
    return url;
  };

  const videoType = getVideoType(url);

  if (videoType === 'youtube') {
    const embedUrl = getYouTubeEmbedUrl(url);
    return (
      <iframe
        src={embedUrl}
        className={className}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
        title="YouTube Video"
      />
    );
  }

  if (videoType === 'vimeo') {
    const embedUrl = getVimeoEmbedUrl(url);
    return (
      <iframe
        src={embedUrl}
        className={className}
        allow="autoplay; fullscreen; picture-in-picture"
        allowFullScreen
        title="Vimeo Video"
      />
    );
  }

  return (
    <video
      src={url}
      poster={poster}
      className={className}
      autoPlay={autoPlay}
      muted={muted}
      loop={loop}
      controls={controls}
    >
      Ваш браузер не поддерживает видео.
    </video>
  );
};

export default VideoPlayer;