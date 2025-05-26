import React from 'react';
import './StopButton.css';
import { useNavigate } from 'react-router-dom';

export default function StopButton() {
    const navigate = useNavigate();
  return (
    <button className="stop-button" onClick={() => navigate('/')}>
      <svg
        className="stop-icon"
        viewBox="0 0 24 24"
        width="24"
        height="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <line x1="6" y1="6" x2="18" y2="18" />
        <line x1="6" y1="18" x2="18" y2="6" />
      </svg>
      <span className="stop-text">Przerwij</span>
    </button>
  );
}
