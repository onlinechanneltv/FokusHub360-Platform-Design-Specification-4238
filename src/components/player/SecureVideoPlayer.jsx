```jsx
import React, { useState, useRef, useEffect } from 'react';
import { motion } from 'framer-motion';
import SafeIcon from '../common/SafeIcon';
import * as FiIcons from 'react-icons/fi';
import Hls from 'hls.js';
import DRMPlayer from './DRMPlayer';
import Watermark from './Watermark';
import SubtitleManager from './SubtitleManager';
import useAuthStore from '../../store/authStore';
import toast from 'react-hot-toast';

const {
  FiPlay,
  FiPause,
  FiVolume2,
  FiVolumeX,
  FiMaximize,
  FiMinimize,
  FiSettings,
  FiType,
  FiDownload,
  FiShield,
} = FiIcons;

const SecureVideoPlayer = ({
  src,
  drmConfig,
  subtitles = [],
  watermarkText,
  preventScreenCapture = true,
  disableDownload = true,
  onTimeUpdate,
  onComplete,
  className = '',
}) => {
  const { user } = useAuthStore();
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [volume, setVolume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showControls, setShowControls] = useState(true);
  const [selectedSubtitle, setSelectedSubtitle] = useState(null);
  const [showSettings, setShowSettings] = useState(false);
  const [playbackRate, setPlaybackRate] = useState(1);
  const [quality, setQuality] = useState('auto');
  const [availableQualities, setAvailableQualities] = useState([]);
  const [isBuffering, setIsBuffering] = useState(false);
  const [error, setError] = useState(null);
  const [sessionId, setSessionId] = useState(null);

  // Initialize HLS and DRM
  useEffect(() => {
    let hls = null;

    const initializePlayer = async () => {
      try {
        // Generate unique session ID for tracking
        setSessionId(Math.random().toString(36).substring(7));

        if (drmConfig) {
          // Initialize DRM player
          await DRMPlayer.initialize(videoRef.current, {
            ...drmConfig,
            userId: user.id,
            sessionId,
          });
        } else if (Hls.isSupported() && src.includes('.m3u8')) {
          // Initialize HLS for streaming
          hls = new Hls({
            enableWorker: true,
            lowLatencyMode: true,
          });

          hls.loadSource(src);
          hls.attachMedia(videoRef.current);

          hls.on(Hls.Events.MANIFEST_PARSED, (event, data) => {
            setAvailableQualities(
              data.levels.map(level => ({
                height: level.height,
                bitrate: level.bitrate,
              }))
            );
          });

          hls.on(Hls.Events.ERROR, (event, data) => {
            if (data.fatal) {
              setError('Video playback error. Please try again.');
              toast.error('Video playback error');
            }
          });
        } else {
          // Fallback to native video player
          videoRef.current.src = src;
        }

        // Initialize screen capture prevention
        if (preventScreenCapture) {
          initializeScreenCaptureProtection();
        }
      } catch (error) {
        console.error('Player initialization error:', error);
        setError('Failed to initialize video player');
        toast.error('Failed to initialize video player');
      }
    };

    initializePlayer();

    return () => {
      if (hls) {
        hls.destroy();
      }
    };
  }, [src, drmConfig, user.id]);

  // Screen capture prevention
  const initializeScreenCaptureProtection = () => {
    if (document.pictureInPictureEnabled) {
      videoRef.current.disablePictureInPicture = true;
    }

    // Prevent right-click
    containerRef.current.addEventListener('contextmenu', (e) => e.preventDefault());

    // Add dynamic watermark with user info
    const watermark = new Watermark({
      text: `${watermarkText || 'Confidential'} - ${user.email} - ${new Date().toISOString()}`,
      opacity: 0.3,
      fontSize: '14px',
    });

    watermark.apply(containerRef.current);
  };

  // Playback controls
  const togglePlay = () => {
    if (videoRef.current.paused) {
      videoRef.current.play();
      setIsPlaying(true);
    } else {
      videoRef.current.pause();
      setIsPlaying(false);
    }
  };

  const handleTimeUpdate = () => {
    setCurrentTime(videoRef.current.currentTime);
    
    if (onTimeUpdate) {
      onTimeUpdate({
        currentTime: videoRef.current.currentTime,
        duration: videoRef.current.duration,
        progress: (videoRef.current.currentTime / videoRef.current.duration) * 100,
      });
    }

    // Track completion
    if (videoRef.current.currentTime >= videoRef.current.duration * 0.9) {
      onComplete?.();
    }
  };

  const handleProgress = () => {
    const buffered = videoRef.current.buffered;
    setIsBuffering(buffered.length === 0 || buffered.end(0) < videoRef.current.currentTime);
  };

  const handleVolumeChange = (value) => {
    const newVolume = parseFloat(value);
    setVolume(newVolume);
    videoRef.current.volume = newVolume;
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (isMuted) {
      videoRef.current.volume = volume;
      setIsMuted(false);
    } else {
      videoRef.current.volume = 0;
      setIsMuted(true);
    }
  };

  const toggleFullscreen = async () => {
    try {
      if (!isFullscreen) {
        if (containerRef.current.requestFullscreen) {
          await containerRef.current.requestFullscreen();
        } else if (containerRef.current.webkitRequestFullscreen) {
          await containerRef.current.webkitRequestFullscreen();
        }
      } else {
        if (document.exitFullscreen) {
          await document.exitFullscreen();
        } else if (document.webkitExitFullscreen) {
          await document.webkitExitFullscreen();
        }
      }
    } catch (error) {
      console.error('Fullscreen error:', error);
    }
  };

  const handleQualityChange = (newQuality) => {
    setQuality(newQuality);
    if (Hls.isSupported()) {
      const hls = videoRef.current.hls;
      if (newQuality === 'auto') {
        hls.currentLevel = -1; // Auto quality
      } else {
        const levelIndex = availableQualities.findIndex(q => q.height === newQuality);
        if (levelIndex !== -1) {
          hls.currentLevel = levelIndex;
        }
      }
    }
  };

  const handleSubtitleChange = (track) => {
    setSelectedSubtitle(track);
    
    if (videoRef.current.textTracks) {
      Array.from(videoRef.current.textTracks).forEach(track => {
        track.mode = track.label === selectedSubtitle ? 'showing' : 'hidden';
      });
    }
  };

  const formatTime = (time) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  // Render player controls
  const renderControls = () => (
    <div 
      className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/80 to-transparent p-4 transition-opacity duration-300"
      style={{ opacity: showControls ? 1 : 0 }}
    >
      {/* Progress bar */}
      <div className="relative w-full h-1 bg-gray-600 rounded cursor-pointer mb-4">
        <div 
          className="absolute h-full bg-primary-500 rounded"
          style={{ width: `${(currentTime / duration) * 100}%` }}
        />
        <div 
          className="absolute h-3 w-3 bg-white rounded-full -top-1"
          style={{ left: `${(currentTime / duration) * 100}%` }}
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* Play/Pause */}
          <button onClick={togglePlay} className="text-white hover:text-primary-400">
            <SafeIcon icon={isPlaying ? FiPause : FiPlay} className="w-6 h-6" />
          </button>

          {/* Volume */}
          <div className="flex items-center space-x-2">
            <button onClick={toggleMute} className="text-white hover:text-primary-400">
              <SafeIcon icon={isMuted ? FiVolumeX : FiVolume2} className="w-6 h-6" />
            </button>
            <input
              type="range"
              min="0"
              max="1"
              step="0.1"
              value={isMuted ? 0 : volume}
              onChange={(e) => handleVolumeChange(e.target.value)}
              className="w-20"
            />
          </div>

          {/* Time */}
          <div className="text-white text-sm">
            {formatTime(currentTime)} / {formatTime(duration)}
          </div>
        </div>

        <div className="flex items-center space-x-4">
          {/* Subtitles */}
          {subtitles.length > 0 && (
            <button 
              onClick={() => setShowSettings(prev => !prev)} 
              className="text-white hover:text-primary-400"
            >
              <SafeIcon icon={FiType} className="w-6 h-6" />
            </button>
          )}

          {/* Quality */}
          <button 
            onClick={() => setShowSettings(prev => !prev)} 
            className="text-white hover:text-primary-400"
          >
            <SafeIcon icon={FiSettings} className="w-6 h-6" />
          </button>

          {/* Fullscreen */}
          <button 
            onClick={toggleFullscreen} 
            className="text-white hover:text-primary-400"
          >
            <SafeIcon 
              icon={isFullscreen ? FiMinimize : FiMaximize} 
              className="w-6 h-6" 
            />
          </button>
        </div>
      </div>

      {/* Settings menu */}
      {showSettings && (
        <div className="absolute bottom-16 right-4 bg-black/90 rounded-lg p-4 text-white">
          {/* Quality options */}
          <div className="mb-4">
            <h3 className="text-sm font-semibold mb-2">Quality</h3>
            <div className="space-y-2">
              <button
                onClick={() => handleQualityChange('auto')}
                className={`block w-full text-left px-2 py-1 rounded ${
                  quality === 'auto' ? 'bg-primary-500' : 'hover:bg-gray-700'
                }`}
              >
                Auto
              </button>
              {availableQualities.map((q) => (
                <button
                  key={q.height}
                  onClick={() => handleQualityChange(q.height)}
                  className={`block w-full text-left px-2 py-1 rounded ${
                    quality === q.height ? 'bg-primary-500' : 'hover:bg-gray-700'
                  }`}
                >
                  {q.height}p
                </button>
              ))}
            </div>
          </div>

          {/* Subtitles */}
          {subtitles.length > 0 && (
            <div>
              <h3 className="text-sm font-semibold mb-2">Subtitles</h3>
              <div className="space-y-2">
                <button
                  onClick={() => handleSubtitleChange(null)}
                  className={`block w-full text-left px-2 py-1 rounded ${
                    !selectedSubtitle ? 'bg-primary-500' : 'hover:bg-gray-700'
                  }`}
                >
                  Off
                </button>
                {subtitles.map((track) => (
                  <button
                    key={track.label}
                    onClick={() => handleSubtitleChange(track)}
                    className={`block w-full text-left px-2 py-1 rounded ${
                      selectedSubtitle === track ? 'bg-primary-500' : 'hover:bg-gray-700'
                    }`}
                  >
                    {track.label}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Error display
  if (error) {
    return (
      <div className="flex items-center justify-center bg-gray-900 rounded-lg p-8">
        <div className="text-center text-white">
          <SafeIcon icon={FiShield} className="w-12 h-12 mx-auto mb-4" />
          <h3 className="text-xl font-semibold mb-2">Playback Error</h3>
          <p>{error}</p>
        </div>
      </div>
    );
  }

  return (
    <div
      ref={containerRef}
      className={`relative bg-black rounded-lg overflow-hidden ${className}`}
      onMouseEnter={() => setShowControls(true)}
      onMouseLeave={() => setShowControls(false)}
    >
      <video
        ref={videoRef}
        className="w-full h-full"
        playsInline
        onTimeUpdate={handleTimeUpdate}
        onProgress={handleProgress}
        onLoadedMetadata={() => setDuration(videoRef.current.duration)}
        onPlay={() => setIsPlaying(true)}
        onPause={() => setIsPlaying(false)}
        onEnded={() => {
          setIsPlaying(false);
          onComplete?.();
        }}
      >
        {subtitles.map((track) => (
          <track
            key={track.label}
            kind="subtitles"
            src={track.src}
            srcLang={track.srcLang}
            label={track.label}
          />
        ))}
      </video>

      {/* Loading spinner */}
      {isBuffering && (
        <div className="absolute inset-0 flex items-center justify-center bg-black/50">
          <div className="animate-spin rounded-full h-12 w-12 border-4 border-primary-500 border-t-transparent" />
        </div>
      )}

      {/* Controls overlay */}
      {renderControls()}
    </div>
  );
};

export default SecureVideoPlayer;
```