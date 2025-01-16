import React from 'react';

const NotFound = () => {
  return (
    <div className="relative h-screen w-screen bg-black-hole text-white flex flex-col items-center justify-center overflow-hidden">
      {/* Twinkling Stars */}
      <div className="absolute inset-0">
        {[...Array(100)].map((_, i) => (
          <div
            key={i}
            className="absolute bg-star-yellow rounded-full"
            style={{
              width: `${Math.random() * 2 + 1}px`,
              height: `${Math.random() * 2 + 1}px`,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              animation: `twinkle ${Math.random() * 3 + 2}s infinite ease-in-out`,
            }}
          ></div>
        ))}
      </div>

      {/* Central Content */}
      <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-8">
        {/* Glitchy 404 Text */}
        <h1 className="text-9xl font-glitch text-white relative glitch">
          404
          <span
            className="absolute top-0 left-0 text-neon-pink animate-glitch1 opacity-70"
            aria-hidden="true"
          >
            404
          </span>
          <span
            className="absolute top-0 left-0 text-galaxy-purple animate-glitch2 opacity-70"
            aria-hidden="true"
          >
            404
          </span>
        </h1>

        {/* Message */}
        <p className="text-2xl font-light">
          Oh no! You’ve wandered into a black hole!
        </p>

        {/* Button */}
        <a
          href="/home"
          className="px-8 py-4 bg-gradient-to-r from-galaxy-purple via-neon-pink to-star-yellow rounded-lg text-lg font-bold shadow-xl transform hover:scale-110 transition-all duration-300"
        >
          Take Me Home
        </a>
      </div>

      {/* Floating  */}
      <div className="absolute bottom-10 right-10 z-0">
        <img
          src="https://cdn-icons-png.flaticon.com/512/477/477476.png"
          alt="Astronaut Floating"
          className="w-48 animate-float"
        />
      </div>

      {/* Flying  */}
      <div className="absolute top-10 left-16 z-0">
        <img
          src="https://cdn-icons-png.flaticon.com/512/201/201818.png"
          alt="Spaceship"
          className="w-36 animate-ship"
        />
      </div>
    </div>
  );
};

export default NotFound;