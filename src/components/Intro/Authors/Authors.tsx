// components/Header.tsx
import './Authors.css';

import { useEffect, useState } from 'react';
import { manageButtonState } from '../../../zustand/manageButtonState';

interface TitleProps {
  text: string;
  speed?: number; // ms between letters
}

export default function Title({ text, speed = 250 }: TitleProps) {
  const [displayed, setDisplayed] = useState('');
  const buttonsState = manageButtonState(state => state.buttonClicked);
  const textLength = text.length;
  useEffect(() => {
  if (buttonsState === 'home') {
    let i = 0;
    setDisplayed(''); // czyść napis przy każdej zmianie
    const interval = setInterval(() => {
      setDisplayed((prev) => prev + text[i]);
      i++;
      if (i === text.length - 1) {
        clearInterval(interval);
      }
    }, speed);
    return () => clearInterval(interval);
  } else if (buttonsState === 'globe') {
    let i = text.length;
    const interval = setInterval(() => {
      setDisplayed((prev) => prev.slice(0, -1));
      i--;
      if(i === 1){
        clearInterval(interval);
      }
    }, 2000/(textLength));
    
  }
}, [buttonsState, text, speed]);


  

  return (
    <p className="authors">
      {displayed}
    </p>
  );
}
