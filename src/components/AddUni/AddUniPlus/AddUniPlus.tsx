import React, { useState, useEffect } from 'react';
import './AddUniPlus.css';
import { useNavigate } from 'react-router-dom';

export default function AddUniPlus() {
  const [clicked, setClicked] = useState(false);
  const navigate = useNavigate();

  const handleClick = () => {
    if (clicked) return; // blokada podczas animacji
    setClicked(true);
  };

  useEffect(() => {
    if (clicked) {
      const timer = setTimeout(() => {
        setClicked(false);
        navigate('/add-uni');
      }, 3000); // czas animacji 3 sekundy

      return () => clearTimeout(timer);
    }
  }, [clicked, navigate]);

  return (
    <div
      className={`addUniBox ${clicked ? 'clicked' : ''}`}
      onClick={handleClick}
      role="button"
      aria-label="Add University"
      tabIndex={0}
      onKeyDown={(e) => e.key === 'Enter' && handleClick()}
    >
      <svg
      className={`icon plus ${clicked ? 'jumping' : ''}`}
      xmlns="http://www.w3.org/2000/svg"
      viewBox="0 0 24 24"
      width="28"
      height="28"
      fill="none"
      stroke="white"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
  >
  <line x1="12" y1="5" x2="12" y2="19" />
  <line x1="5" y1="12" x2="19" y2="12" />
</svg>

      <svg
        className="icon check"
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        width="28"
        height="28"
        fill="none"
        stroke="#333"
        strokeWidth="3"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <polyline points="20 6 9 17 4 12" />
      </svg>
    </div>
  );
}
