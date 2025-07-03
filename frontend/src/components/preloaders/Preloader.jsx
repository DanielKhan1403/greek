import React, { useEffect, useState } from 'react';
import loadingGreece from '../../assets/greece.mp4'; // Импорт MP4
import loadingGreeceMobile from '../../assets/greece-mobile.webm'; // Оптимизированное видео для мобильных

const Preloader = () => {
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    // Затухание прелоадера через 1.5 секунды после начала (для плавности)
    const timer = setTimeout(() => {
      setFadeOut(true);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  return (
    <div
      className={`fixed inset-0 flex items-center justify-center bg-black transition-opacity duration-1000 ${
        fadeOut ? 'opacity-0' : 'opacity-100'
      } z-[9999]`}
    >
      <div className="relative w-full h-full flex items-center justify-center">
        <video
          src={window.innerWidth < 768 ? loadingGreeceMobile : loadingGreece}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover rounded-none shadow-none animate-[scale_6s_ease-in-out_infinite]"
        />
        <div className="absolute bottom-8 text-center text-white flex flex-col items-center justify-center space-y-4 px-4">
          <h1
            className="text-3xl sm:text-4xl md:text-5xl font-serif font-bold tracking-wider bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-300 animate-pulse drop-shadow-lg"
          >
            Открываем Грецию...
          </h1>
          <div className="flex space-x-2">
            <div
              className="w-3 h-3 bg-white rounded-full animate-bounce"
              style={{ animationDelay: '0s' }}
            ></div>
            <div
              className="w-3 h-3 bg-white rounded-full animate-bounce"
              style={{ animationDelay: '0.2s' }}
            ></div>
            <div
              className="w-3 h-3 bg-white rounded-full animate-bounce"
              style={{ animationDelay: '0.4s' }}
            ></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Preloader;