import React, { useState, useRef, useEffect } from "react";
import { 
  FaVolumeMute, 
  FaVolumeUp, 
  FaArrowRight, 
  FaPlay, 
  FaPause,
  FaExpand,
  FaCompress
} from "react-icons/fa";

export default function IntroScreen({ onFinish }) {
  const videoRef = useRef(null);
  const progressBarRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(8);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [showCenterIcon, setShowCenterIcon] = useState(false);
  const [fillMode, setFillMode] = useState(false); // toggle between fitted cinema or edge-to-edge fill

  // Auto-play on mount
  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // Prevent background scrolling while intro is visible
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const playPromise = video.play();
    if (playPromise !== undefined) {
      playPromise
        .then(() => {
          setIsPlaying(true);
        })
        .catch(() => {
          // Autoplay policy fallback: guarantee muted & retry
          video.muted = true;
          setIsMuted(true);
          video.play()
            .then(() => setIsPlaying(true))
            .catch(() => setIsPlaying(false));
        });
    }

    return () => {
      document.body.style.overflow = prevOverflow;
    };
  }, []);

  const handleTimeUpdate = () => {
    const video = videoRef.current;
    if (video && video.duration) {
      setCurrentTime(video.currentTime);
      setDuration(video.duration);
      setProgress((video.currentTime / video.duration) * 100);
    }
  };

  const handleExit = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    if (videoRef.current) {
      try {
        videoRef.current.pause();
      } catch (e) {
        // ignore
      }
    }
    setTimeout(() => {
      if (onFinish) onFinish();
    }, 750);
  };

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (!video) return;

    if (video.paused) {
      video.play().then(() => setIsPlaying(true)).catch(() => {});
    } else {
      video.pause();
      setIsPlaying(false);
    }
    setShowCenterIcon(true);
    setTimeout(() => setShowCenterIcon(false), 900);
  };

  const toggleSound = (e) => {
    e.stopPropagation();
    const video = videoRef.current;
    if (!video) return;
    const nextMuted = !isMuted;
    video.muted = nextMuted;
    setIsMuted(nextMuted);
    if (nextMuted === false && video.paused) {
      video.play().catch(() => {});
    }
  };

  const handleProgressClick = (e) => {
    e.stopPropagation();
    const bar = progressBarRef.current;
    const video = videoRef.current;
    if (!bar || !video || !video.duration) return;

    const rect = bar.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const newPercent = Math.max(0, Math.min(1, clickX / rect.width));
    video.currentTime = newPercent * video.duration;
  };

  const formatTime = (timeInSeconds) => {
    const s = Math.floor(timeInSeconds || 0);
    const m = Math.floor(s / 60);
    const remainder = s % 60;
    return `${m}:${remainder < 10 ? "0" : ""}${remainder}`;
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#120B07] text-[#FBF6EE] flex flex-col justify-between overflow-hidden select-none transition-all duration-750 ease-out h-[100dvh] w-[100dvw] ${
        isTransitioning
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
      style={{
        paddingTop: "max(env(safe-area-inset-top, 0px), 0.5rem)",
        paddingBottom: "max(env(safe-area-inset-bottom, 0px), 0.5rem)",
        paddingLeft: "max(env(safe-area-inset-left, 0px), 0.5rem)",
        paddingRight: "max(env(safe-area-inset-right, 0px), 0.5rem)",
      }}
      aria-label="Welcome Intro Video"
    >
      {/* ── Background Ambient Warm Glows ── */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-0">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[350px] sm:w-[600px] md:w-[800px] h-[350px] sm:h-[600px] md:h-[800px] rounded-full bg-[#C9A24B]/12 blur-[100px] sm:blur-[150px]" />
        <div className="absolute -bottom-20 left-1/4 w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] rounded-full bg-[#B87C4C]/10 blur-[120px]" />
        <div className="absolute inset-0 bg-gradient-to-t from-[#120B07] via-transparent to-[#120B07]/90" />
      </div>

      {/* ── Top Bar: Responsive Logo & Direct Actions ── */}
      <header className="relative z-30 w-full px-3 sm:px-6 md:px-8 py-2 sm:py-3 flex items-center justify-between gap-2">
        
        {/* Brand Logo */}
        <div className="flex items-center gap-2 sm:gap-3 min-w-0">
          <img
            src="/logo-gold.webp"
            onError={(e) => { e.currentTarget.src = "/logo-gold.png"; }}
            alt="Sanjus Bakesvelle"
            className="h-7 sm:h-9 md:h-11 w-auto max-w-[130px] sm:max-w-[180px] object-contain filter drop-shadow-[0_2px_12px_rgba(201,162,75,0.4)]"
          />
          <div className="hidden md:flex flex-col border-l border-[#C9A24B]/35 pl-2.5">
            <span className="text-[9px] font-bold tracking-[0.25em] uppercase text-[#C9A24B]">
              Artisan Atelier
            </span>
            <span className="text-[8px] tracking-wider text-[#E9DCC5]/70">
              Made to Melt Hearts
            </span>
          </div>
        </div>

        {/* Right Controls */}
        <div className="flex items-center gap-1.5 sm:gap-2.5 flex-shrink-0">
          {/* Audio Mute/Unmute Button */}
          <button
            onClick={toggleSound}
            className="flex items-center gap-1.5 px-2.5 sm:px-3.5 py-1.5 sm:py-2 rounded-full text-xs font-semibold text-[#FBF6EE] bg-black/60 hover:bg-[#3E2715]/90 border border-[#C9A24B]/35 backdrop-blur-md transition-all cursor-pointer shadow-md hover:scale-103 active:scale-95"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
            aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? (
              <>
                <FaVolumeMute className="w-3 h-3 text-[#E9DCC5]" />
                <span className="hidden xs:inline text-[10px] sm:text-xs tracking-wider uppercase">Unmute</span>
              </>
            ) : (
              <>
                <FaVolumeUp className="w-3 h-3 text-[#C9A24B]" />
                <span className="hidden xs:inline text-[10px] sm:text-xs tracking-wider uppercase text-[#C9A24B]">Sound On</span>
              </>
            )}
          </button>

          {/* Fit / Fill Toggle */}
          <button
            onClick={() => setFillMode(!fillMode)}
            className="hidden sm:flex items-center justify-center p-2 rounded-full text-xs text-[#E9DCC5] bg-black/50 hover:bg-[#3E2715] border border-white/10 hover:border-[#C9A24B]/40 transition-all cursor-pointer"
            title={fillMode ? "Fit to Frame" : "Fill Screen"}
            aria-label={fillMode ? "Fit to Frame" : "Fill Screen"}
          >
            {fillMode ? <FaCompress className="w-3 h-3" /> : <FaExpand className="w-3 h-3" />}
          </button>

          {/* Primary CTA: Enter Bakery */}
          <button
            onClick={handleExit}
            className="group flex items-center gap-1.5 sm:gap-2 px-3.5 py-1.5 sm:px-5 sm:py-2 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase text-[#3E2715] bg-[#C9A24B] hover:bg-[#D8B25C] shadow-[0_4px_20px_rgba(201,162,75,0.45)] transition-all cursor-pointer hover:scale-103 active:scale-95"
          >
            <span className="whitespace-nowrap">Enter Bakery</span>
            <FaArrowRight className="w-2.5 sm:w-3 h-2.5 sm:h-3 group-hover:translate-x-0.5 transition-transform" />
          </button>
        </div>
      </header>

      {/* ── Main Responsive Video Stage ── */}
      <main className="relative z-20 flex-1 w-full flex items-center justify-center px-2 sm:px-4 md:px-8 py-1 sm:py-2">
        <div
          className={`relative w-full transition-all duration-500 overflow-hidden shadow-[0_20px_70px_rgba(0,0,0,0.9)] bg-black flex items-center justify-center group ${
            fillMode
              ? "h-full rounded-xl sm:rounded-2xl border border-[#C9A24B]/20"
              : "max-w-5xl aspect-video max-h-[64dvh] sm:max-h-[74dvh] md:max-h-[80dvh] rounded-2xl sm:rounded-3xl border border-[#C9A24B]/35"
          }`}
        >
          {/* Main Video Element (Responsively scales with 16:9 aspect ratio) */}
          <video
            ref={videoRef}
            src="/intro.mp4"
            playsInline
            autoPlay
            muted={isMuted}
            preload="auto"
            onTimeUpdate={handleTimeUpdate}
            onEnded={handleExit}
            onError={handleExit}
            onClick={togglePlayPause}
            className={`w-full h-full cursor-pointer transition-all duration-300 ${
              fillMode ? "object-cover" : "object-contain"
            }`}
          />

          {/* Subtle Video Hover Vignette */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-black/20 pointer-events-none opacity-60 group-hover:opacity-40 transition-opacity" />

          {/* Center Play/Pause Indicator Animation on Tap */}
          {(!isPlaying || showCenterIcon) && (
            <div
              onClick={togglePlayPause}
              className="absolute inset-0 flex items-center justify-center z-30 bg-black/35 backdrop-blur-[2px] cursor-pointer"
            >
              <div className="w-14 h-14 sm:w-18 sm:h-18 rounded-full bg-[#C9A24B]/95 text-[#3E2715] flex items-center justify-center shadow-[0_8px_30px_rgba(201,162,75,0.6)] hover:scale-110 active:scale-95 transition-all">
                {isPlaying ? (
                  <FaPause className="w-5 h-5 sm:w-6 sm:h-6" />
                ) : (
                  <FaPlay className="w-5 h-5 sm:w-6 sm:h-6 ml-0.5 sm:ml-1" />
                )}
              </div>
            </div>
          )}
        </div>
      </main>

      {/* ── Bottom Section: Scrubbable Timeline & Skip Action ── */}
      <footer className="relative z-30 w-full px-3 sm:px-6 md:px-8 py-2 sm:py-3 flex flex-col gap-1.5 sm:gap-2">
        <div className="flex items-center justify-between text-[11px] sm:text-xs tracking-wider text-[#E9DCC5]/80">
          <div className="flex items-center gap-2 min-w-0 pr-2">
            <span className="font-brand-editorial italic text-xs sm:text-sm text-[#C9A24B] truncate">
              Handcrafted with Pure Butter & Love
            </span>
            <span className="hidden sm:inline text-white/30">•</span>
            <span className="hidden sm:inline font-mono text-[11px] text-[#E9DCC5]/60">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
          </div>

          <div className="flex items-center gap-3 flex-shrink-0">
            <span className="sm:hidden font-mono text-[10px] text-[#C9A24B]">
              {formatTime(currentTime)} / {formatTime(duration)}
            </span>
            <button
              onClick={handleExit}
              className="hover:text-[#C9A24B] transition-colors cursor-pointer text-[11px] sm:text-xs uppercase tracking-wider font-semibold"
            >
              Skip Video &rarr;
            </button>
          </div>
        </div>

        {/* Scrubbable Golden Progress Bar */}
        <div
          ref={progressBarRef}
          onClick={handleProgressClick}
          className="relative w-full h-1.5 sm:h-2 bg-white/15 hover:bg-white/25 rounded-full overflow-hidden backdrop-blur-sm cursor-pointer transition-all group/bar"
          title="Click to seek"
        >
          <div
            className="h-full bg-gradient-to-r from-[#B87C4C] via-[#C9A24B] to-[#FFE082] rounded-full shadow-[0_0_10px_rgba(201,162,75,0.9)] relative"
            style={{ width: `${progress}%` }}
          >
            {/* Glowing Head Dot */}
            <span className="absolute right-0 top-1/2 -translate-y-1/2 w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full bg-white shadow-md" />
          </div>
        </div>
      </footer>
    </div>
  );
}
