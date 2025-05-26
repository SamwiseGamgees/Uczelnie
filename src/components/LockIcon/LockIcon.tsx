import { useEffect, useState } from "react";
import "./LockIcon.css"; // dodamy animacje w CSS

export default function LockIcon() {
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setAnimate(true), 500); // opóźnienie animacji
    return () => clearTimeout(timer);
  }, []);

  return (
    <svg
      viewBox="0 0 60 60"
      xmlns="http://www.w3.org/2000/svg"
      className={`lock-icon ${animate ? "animate" : ""}`}
    >
      {/* Obramowanie (okrąg) */}
      <circle
        className="lock-circle"
        cx="30"
        cy="30"
        r="28"
        fill="none"
        stroke="#e50914"
        strokeWidth="2"
      />

      {/* Kłódka - część główna */}
      <g className="lock-body">
        <path
          d="M35.35 24.95h-.28v-3.71c0-2.76-2.51-5-5.58-5-3.08 0-5.58 2.24-5.58 5 0 .42.34.76.77.76a.76.76 0 0 0 .76-.76c0-1.91 1.82-3.47 4.05-3.47s4.04 1.56 4.04 3.47v3.71h-10.2c-1.71 0-3.11 1.49-3.11 3.31v8.67c0 1.82 1.49 3.31 3.32 3.31h11.89c1.83 0 3.32-1.49 3.32-3.31v-8.67c0-1.82-1.49-3.31-3.4-3.31zm1.87 11.98c0 .98-.8 1.78-1.79 1.78H23.54c-.98 0-1.78-.8-1.78-1.78v-8.67c0-.98.71-1.78 1.57-1.78h12.1c.99 0 1.79.8 1.79 1.78v8.67zm-5.98-3.03c0 .97-.79 1.75-1.75 1.75a1.746 1.746 0 1 1 0-3.49 1.75 1.75 0 0 1 1.75 1.74z"
          fill="#e50914"
        />
      </g>
    </svg>
  );
}
