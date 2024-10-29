"use client";
import React, { useEffect, useRef } from 'react';
import Hls from 'hls.js';
    
interface VideoPlayerProps {
  videoUrl: string;
}

export default function VideoPlayer({ videoUrl }: VideoPlayerProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const hlsRef = useRef<Hls | null>(null);

  useEffect(() => {
    const video = videoRef.current;

    if (video && Hls.isSupported()) {
      const hls = new Hls();
      hls.loadSource(videoUrl);
      hls.attachMedia(video);
      hlsRef.current = hls;

      // Cleanup on unmount
      return () => {
        hls.destroy();
      };
    } else if (video?.canPlayType('application/vnd.apple.mpegurl')) {
      video.src = videoUrl;
    }
  }, [videoUrl]);

  return (
    <video
      className="rounded-lg border bg-black min-h-[210px] md:min-h-[310px] xl:min-h-[510px]"
      ref={videoRef}
      controls
      width="100%"
      height="100%"
    />
  );
}