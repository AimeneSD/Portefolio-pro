import React, { useState } from 'react';

const MachaButton = ({ label = "Label" , href = "#" }) => {
  const [flairPos, setFlairPos] = useState({ x: 0, y: 0, scale: 0 });

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    // On calcule la position de la souris par rapport au bouton
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setFlairPos({ x, y, scale: 1 });
  };

  const handleMouseLeave = () => {
    setFlairPos((prev) => ({ ...prev, scale: 0 }));
  };

  return (
    <a
      href="#"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className="relative inline-flex items-center justify-center px-10 py-4 overflow-hidden font-medium tracking-wide text-green-200 bg-transparent border-2 border-green-700 rounded-full group transition-colors duration-300 hover:text-white"
      style={{ isolation: 'isolate' }}
    >
      {/* La "bulle" (le flair) qui suit la souris */}
      <span
        className="absolute inset-0 z-0 pointer-events-none transition-transform duration-500 ease-out"
        style={{
          background: 'linear-gradient(114.41deg, #0ae448 20.74%, #abff84 65.5%)',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          left: flairPos.x - 150,
          top: flairPos.y - 150,
          transform: `scale(${flairPos.scale})`,
          zIndex: -1,
        }}
      />

      {/* Le texte du bouton */}
      <span className="relative z-10 uppercase text-sm font-bold">
        {label}
      </span>
    </a>
  );
};

export default MachaButton;