import React, { useState, useRef, useEffect } from "react";
import { FaVolumeMute, FaVolumeUp, FaArrowRight, FaPlay } from "react-icons/fa";

export default function IntroScreen({ onFinish }) {
  const videoRef = useRef(null);
  const [isMuted, setIsMuted] = useState(true);
  const [progress, setProgress] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);

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

  const handleManualPlay = () => {
    if (videoRef.current) {
      videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
    }
  };

  return (
    <div
      className={`fixed inset-0 z-[9999] bg-[#120B07] flex items-center justify-center overflow-hidden transition-all duration-750 ease-out ${
        isTransitioning
          ? "opacity-0 scale-105 pointer-events-none"
          : "opacity-100 scale-100"
      }`}
      aria-label="Welcome Intro Video"
    >
      {/* Background ambient aura */}
      <div className="absolute inset-0 bg-radial from-[#C9A24B]/10 via-black/80 to-[#120B07] pointer-events-none z-10" />

      {/* Main Intro Video */}
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
        className="w-full h-full object-cover"
      />

      {/* Luxury Vignette & Soft Gradient Framing */}
      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-transparent to-black/60 pointer-events-none z-20" />
      <div className="absolute inset-0 shadow-[inset_0_0_120px_rgba(0,0,0,0.85)] pointer-events-none z-20" />

      {/* ── Top Bar: Brand Logo & Controls ── */}
      <div className="absolute top-0 left-0 right-0 p-5 sm:p-8 flex items-center justify-between z-30">
        <div className="flex items-center gap-3">
          <img
            src="/logo-gold.webp"
            onError={(e) => { e.currentTarget.src = "/logo-gold.png"; }}
            alt="Sanjus Bakesvelle"
            className="h-9 sm:h-11 w-auto object-contain filter drop-shadow-[0_2px_12px_rgba(201,162,75,0.45)]"
          />
          <div className="hidden sm:flex flex-col border-l border-[#C9A24B]/40 pl-3">
            <span className="text-[10px] font-bold tracking-[0.25em] uppercase text-[#C9A24B]">
              Artisan Bakery
            </span>
            <span className="text-[9px] tracking-wider text-[#E9DCC5]/80">
              Made to Melt Hearts
            </span>
          </div>
        </div>

        <div className="flex items-center gap-3">
          {/* Mute / Unmute Toggle */}
          <button
            onClick={toggleSound}
            className="flex items-center gap-2 px-3.5 py-2 rounded-full text-xs font-semibold text-[#FBF6EE] bg-black/60 hover:bg-[#3E2715]/90 border border-[#C9A24B]/40 backdrop-blur-md transition-all cursor-pointer shadow-lg hover:scale-105 active:scale-95"
            title={isMuted ? "Unmute Audio" : "Mute Audio"}
            aria-label={isMuted ? "Unmute Audio" : "Mute Audio"}
          >
            {isMuted ? (
              <>
                <FaVolumeMute className="w-3.5 h-3.5 text-[#E9DCC5]" />
                <span className="hidden sm:inline text-[11px] uppercase tracking-wider">Unmute</span>
              </>
            ) : (
              <>
                <FaVolumeUp className="w-3.5 h-3.5 text-[#C9A24B]" />
                <span className="hidden sm:inline text-[11px] uppercase tracking-wider text-[#C9A24B]">Sound On</span>
              </>
            )}
          </button>

          {/* Enter Bakery / Skip CTA */}
          <button
            onClick={handleExit}
            className="group flex items-center gap-2 px-5 py-2 sm:px-6 sm:py-2.5 rounded-full text-xs sm:text-sm font-bold tracking-wider uppercase text-[#3E2715] bg-[#C9A24B] hover:bg-[#D8B25C] shadow-[0_4px_22px_rgba(201,162,75,0.45)] transition-all cursor-pointer hover:scale-105 active:scale-95"
          >
            <span>Enter Bakery</span>
            <FaArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </div>

      {/* Autoplay fallback play button if browser prevented autoplay */}
      {!isPlaying && (
        <div className="absolute inset-0 flex items-center justify-center z-30 bg-black/50 backdrop-blur-xs">
          <button
            onClick={handleManualPlay}
            className="flex items-center gap-3 px-8 py-4 rounded-full bg-[#C9A24B] hover:bg-[#D8B25C] text-[#3E2715] font-bold text-sm tracking-wider uppercase shadow-[0_8px_30px_rgba(201,162,75,0.5)] hover:scale-105 active:scale-95 transition-all cursor-pointer"
          >
            <FaPlay className="w-4 h-4 ml-0.5" />
            <span>Play Experience</span>
          </button>
        </div>
      )}

      {/* ── Bottom Section: Progress Bar & Direct Skip ── */}
      <div className="absolute bottom-0 left-0 right-0 p-5 sm:p-8 z-30 flex flex-col gap-2">
        <div className="flex items-center justify-between text-[11px] tracking-wider text-[#E9DCC5]/80">
          <span className="font-brand-editorial italic text-xs sm:text-sm text-[#C9A24B]">
            Handcrafted with Passion & Pure Ingredients
          </span>
          <button
            onClick={handleExit}
            className="hover:text-[#C9A24B] transition-colors cursor-pointer text-xs uppercase tracking-wider font-semibold"
          >
            Skip Video &rarr;
          </button>
        </div>

        {/* Elegant Gold Progress Line */}
        <div className="w-full h-1 bg-white/20 rounded-full overflow-hidden backdrop-blur-sm">
          <div
            className="h-full bg-gradient-to-r from-[#B87C4C] via-[#C9A24B] to-[#FFE082] transition-all duration-150 ease-linear rounded-full shadow-[0_0_10px_rgba(201,162,75,0.9)]"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}

