import { useEffect, useRef, useState, useMemo, useCallback } from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';
import { CardMedia } from '@mui/material';

function VideoPlayer({ dashUrl, hlsUrl, fallbackUrl, maxHeight, autoPlay = true, muted = true }) {
  const videoRef = useRef(null);
  const playerRef = useRef(null);
  const playPromiseRef = useRef(null);
  const isMountedRef = useRef(true);
  const hasErrorRef = useRef(false);
  const [showFallback, setShowFallback] = useState(false);
  
  // Store props in refs to avoid re-running effect
  const autoPlayRef = useRef(autoPlay);
  const mutedRef = useRef(muted);
  const fallbackUrlRef = useRef(fallbackUrl);
  const dashUrlRef = useRef(dashUrl);
  const hlsUrlRef = useRef(hlsUrl);
  
  // Update refs when props change
  autoPlayRef.current = autoPlay;
  mutedRef.current = muted;
  fallbackUrlRef.current = fallbackUrl;
  dashUrlRef.current = dashUrl;
  hlsUrlRef.current = hlsUrl;
  
  // Detect Safari - memoize to avoid recalculation
  const isSafari = useMemo(() => 
    /^((?!chrome|android).)*safari/i.test(navigator.userAgent),
    []
  );

  // If there's no DASH or HLS - use fallback immediately (without video.js)
  const shouldUseFallback = !dashUrl && !hlsUrl;

  // Handler for switching to fallback
  const switchToFallback = useCallback(() => {
    if (isMountedRef.current && !hasErrorRef.current) {
      hasErrorRef.current = true;
      setShowFallback(true);
    }
  }, []);

  useEffect(() => {
    isMountedRef.current = true;

    // If fallback is needed, don't initialize video.js
    if (shouldUseFallback || hasErrorRef.current) {
      return;
    }

    // Check that element exists
    if (!videoRef.current) {
      return;
    }

    // If player already exists, update source if URL changed
    if (playerRef.current) {
      return;
    }

    // Initialize player with small delay to ensure DOM is ready
    const timer = setTimeout(() => {
      // Double check still mounted and element exists
      if (!isMountedRef.current || !videoRef.current) {
        return;
      }

      // Double check player doesn't exist (race condition protection)
      if (playerRef.current) {
        return;
      }

      try {
        // Determine format based on browser:
        // Safari - HLS (native support with audio)
        // Others - DASH (more control)
        const videoSource = isSafari && hlsUrlRef.current
          ? { src: hlsUrlRef.current, type: 'application/x-mpegURL' }
          : { src: dashUrlRef.current, type: 'application/dash+xml' };

        // Create new player
        const player = videojs(videoRef.current, {
          controls: true,
          autoplay: false, // Set to false initially to handle play() promise properly
          muted: mutedRef.current,
          preload: 'auto',
          playsinline: true,
          fluid: false,
          responsive: true,
          sources: [videoSource],
        });

        // Check if still mounted after player creation
        if (!isMountedRef.current) {
          player.dispose();
          return;
        }

        playerRef.current = player;

        // Error handling - switch to fallback
        player.on('error', () => {
          switchToFallback();
        });

        // Handle autoplay properly with Promise
        if (autoPlayRef.current) {
          player.ready(() => {
            // Check if still mounted before playing
            if (!isMountedRef.current) {
              return;
            }

            // Store the promise to prevent interruption
            const playPromise = player.play();
            
            if (playPromise !== undefined) {
              playPromiseRef.current = playPromise;
              
              playPromise
                .then(() => {
                  // Automatic playback started successfully
                  if (isMountedRef.current) {
                    playPromiseRef.current = null;
                  }
                })
                .catch(() => {
                  // Auto-play was prevented or interrupted
                  // This is normal browser behavior, handle silently
                  if (isMountedRef.current) {
                    playPromiseRef.current = null;
                  }
                });
            }
          });
        }
      } catch (error) {
        switchToFallback();
      }
    }, 150); // Small delay for DOM readiness

    // Cleanup
    return () => {
      clearTimeout(timer);
      isMountedRef.current = false;
      
      // Wait for any pending play promise before disposing
      if (playPromiseRef.current) {
        playPromiseRef.current
          .then(() => {
            if (playerRef.current && !playerRef.current.isDisposed()) {
              playerRef.current.dispose();
              playerRef.current = null;
            }
          })
          .catch(() => {
            if (playerRef.current && !playerRef.current.isDisposed()) {
              playerRef.current.dispose();
              playerRef.current = null;
            }
          });
      } else if (playerRef.current && !playerRef.current.isDisposed()) {
        try {
          playerRef.current.dispose();
        } catch (e) {
          // Silently handle disposal errors
        }
        playerRef.current = null;
      }
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [shouldUseFallback]);
  // Note: dashUrl, hlsUrl, fallbackUrl, autoPlay, muted stored in refs to prevent re-initialization on token refresh

  // Fallback to regular video if no DASH or HLS available or error occurred
  if (shouldUseFallback || showFallback) {
    return (
      <CardMedia
        component="video"
        src={fallbackUrlRef.current}
        controls
        autoPlay={autoPlayRef.current}
        muted={mutedRef.current}
        loop
        playsInline
        sx={{
          width: '100%',
          maxHeight: maxHeight || '600px',
          objectFit: 'contain',
          backgroundColor: '#000',
        }}
      />
    );
  }

  return (
    <div 
      data-vjs-player 
      style={{ 
        width: '100%',
        position: 'relative',
      }}
    >
      <video
        ref={videoRef}
        className="video-js vjs-big-play-centered"
        style={{
          width: '100%',
          maxHeight: maxHeight,
          backgroundColor: '#000',
        }}
      />
      <style>{`
        /* Center video in fullscreen */
        .video-js.vjs-fullscreen {
          display: flex !important;
          align-items: center !important;
          justify-content: center !important;
        }
        
        .video-js.vjs-fullscreen video {
          object-fit: contain !important;
          width: 100% !important;
          height: 100% !important;
        }
        
        /* Center tech element (video player itself) */
        .video-js.vjs-fullscreen .vjs-tech {
          object-fit: contain !important;
          position: absolute !important;
          top: 50% !important;
          left: 50% !important;
          transform: translate(-50%, -50%) !important;
          max-width: 100% !important;
          max-height: 100% !important;
        }
      `}</style>
    </div>
  );
}

export default VideoPlayer;
