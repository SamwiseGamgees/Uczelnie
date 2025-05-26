import React from 'react';
import './Avatar.css';

interface AvatarProps {
  src?: string | null;
  alt?: string;
  size?: number;
}

export default function Avatar({ src, alt = "user avatar", size = 40 }: AvatarProps) {
  const style = {
    width: size,
    height: size,
  };

  return src ? (
    <img src={src} alt={alt} className="avatar-image" style={style} />
  ) : (
    <svg
      className="avatar-fallback"
      style={style}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-label="default user icon"
      role="img"
    >
      <circle cx="12" cy="8" r="4" stroke="#666" strokeWidth="2" />
      <path
        d="M4 20c0-4 8-4 8-4s8 0 8 4"
        stroke="#666"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
