import React, { useEffect, useRef, useState } from 'react';
import loadingGreece from '../../assets/greece.mp4';
import loadingGreeceMobile from '../../assets/greece-mobile.webm';

const Preloader = ({ onFinish }) => {
  const [fadeOut, setFadeOut] = useState(false);
  const [shouldPlay, setShouldPlay] = useState(true);
  const videoRef = useRef(null);

  const handleSkip = () => {
    setFadeOut(true);
    if (videoRef.current) {
      videoRef.current.pause();
    }
    setTimeout(() => {
      onFinish?.();
    }, 1000);
  };

  useEffect(() => {
    const alreadyPlayed = sessionStorage.getItem('preloaderPlayed');
    if (alreadyPlayed) {
      // Если уже проигрывали в этой сессии — сразу завершаем
      setShouldPlay(false);
      onFinish?.();
      return;
    }
    sessionStorage.setItem('preloaderPlayed', 'true');
  }, []);

  useEffect(() => {
    if (shouldPlay && videoRef.current) {
      const video = videoRef.current;
      const handleEnd = () => handleSkip();
      video.addEventListener('ended', handleEnd);
      return () => video.removeEventListener('ended', handleEnd);
    }
  }, [shouldPlay]);

  if (!shouldPlay) return null;

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      } z-[9999]`}
    >
      <video
        ref={videoRef}
        src={window.innerWidth < 768 ? loadingGreeceMobile : loadingGreece}
        autoPlay
        muted
        playsInline
        className="w-full h-full object-cover"
      />
      {!fadeOut && (
        <button
          onClick={handleSkip}
          className="absolute bottom-8 px-6 py-2 bg-white text-black rounded-full"
        >
          Пропустить
        </button>
      )}
    </div>
  );
};

export default Preloader;
