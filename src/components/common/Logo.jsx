import React from 'react';

export const Logo = ({ size = "md", className = "" }) => {
  const logoHeights = {
    sm: "h-10",
    md: "h-14 sm:h-16",
    lg: "h-20 sm:h-24"
  };

  return (
    <div className={`flex items-center group cursor-pointer ${className}`}>
      {/* Official Legacy Hotel Uploaded Logo Image */}
      <div className="relative overflow-hidden rounded-xl bg-[#faf7f5] p-1 border border-[#c5a880]/40 shadow-md group-hover:scale-105 transition-transform duration-300">
        <img
          src="/legacy_logo.jpg"
          alt="Legacy Hotel Official Logo"
          className={`${logoHeights[size]} object-contain rounded-lg`}
        />
      </div>
    </div>
  );
};

export default Logo;
