'use client';

import { useState, useEffect, useRef } from 'react';
import { Header } from '../../components/layout/Header';
import Link from 'next/link';

export default function Hero() {
  const [isPlaying, setIsPlaying] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);
  const videoRef = useRef(null);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      const handleLoadedData = () => setIsLoaded(true);
      video.addEventListener('loadeddata', handleLoadedData);
      return () => video.removeEventListener('loadeddata', handleLoadedData);
    }
  }, []);

  const togglePlayPause = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  return (
    <section className="relative h-screen overflow-hidden ">
      {/* Header Overlay */}
      <Header variant="overlay" />

      {/* Video Background */}
      <video
        ref={videoRef}
        autoPlay
        muted
        loop
        playsInline
        poster="/logo pdf-05.png"
        className="absolute inset-0 w-full h-full object-cover"
        style={{ filter: 'brightness(0.7)' }}
      >
        <source src="/videos/hero.mp4" type="video/mp4" />
        <source src="/videos/HERO2.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-950/20 to-transparent opacity-60 group-hover:opacity-80 transition">

      {/* Loading State */}
      {!isLoaded && (
        <div className="absolute inset-0 flex items-center justify-center bg-gray-900">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <h1 className="text-5xl md:text-5xl font-bold mb-6 animate-fade-in-up">
          Global Launch: Co-Building the Future of Benghazi
        </h1>
        <p className="text-xl md:text-2xl mb-8 max-w-2xl animate-fade-in-up animation-delay-200">
          From dreams to foundations – together
        </p>
        <div className="flex flex-col sm:flex-row gap-4 animate-fade-in-up animation-delay-400">
        
          <a href="#aboutsection" className="border-2 border-[#a68745] text-[#a68745] hover:bg-[#a68745] hover:text-white px-8 py-3 rounded-lg font-semibold transition-all duration-300 animate-pulse text-center">
            Discover the Initiative
          </a>
        </div>

        {/* Play/Pause Button */}
        <button
          onClick={togglePlayPause}
          className="absolute top-4 right-4 bg-black bg-opacity-50 hover:bg-opacity-75 text-white p-3 rounded-full transition-all duration-300"
          aria-label={isPlaying ? 'Pause video' : 'Play video'}
        >
          {isPlaying ? (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 4a1 1 0 00-1 1v10a1 1 0 001 1h1a1 1 0 001-1V5a1 1 0 00-1-1H6zM12 4a1 1 0 00-1 1v10a1 1 0 001 1h1a1 1 0 001-1V5a1 1 0 00-1-1h-1z" clipRule="evenodd" />
            </svg>
          ) : (
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8 5.14v9.72a1 1 0 001.555.832l6-4.5a1 1 0 000-1.664l-6-4.5A1 1 0 008 5.14z" clipRule="evenodd" />
            </svg>
          )}
        </button>
      </div>
      </div>
    </section>
  );
}