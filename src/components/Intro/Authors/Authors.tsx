// components/Header.tsx
import './Authors.css';

import { useEffect, useState } from 'react';

interface TitleProps {
  text: string;
  speed?: number; // ms between letters
}

export default function Title({ text, speed = 250 }: TitleProps) {
  const [displayed, setDisplayed] = useState('');

  useEffect(() => {
    let i = 0;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i++;
      if (i === text.length - 1) {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  }, [text]);

  return (
    <p className="title">
      {displayed}
    </p>
  );
}
