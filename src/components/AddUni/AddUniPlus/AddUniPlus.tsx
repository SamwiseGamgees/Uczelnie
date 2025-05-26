import React, { JSX } from 'react';
import './AddUniPlus.css';
import { useNavigate } from 'react-router-dom';
import { useIsLoggedIn } from '@/config/isLoggedIn';
import { manageButtonState } from '@/zustand/manageButtonState';

export default function AddUniPlus(): JSX.Element | null {
  const navigate = useNavigate();
  const isLoggedIn = useIsLoggedIn();
  const buttonClicked = manageButtonState((s) => s.buttonClicked);

  // jeśli nie spełnione, nic nie renderujemy
  if (!isLoggedIn || buttonClicked !== 'globe') {
    console.log(buttonClicked);
    return null;
  }
  console.log("jaja");
  return (
    <div className="addUniBox">
      <img
        src="/media/plus.svg"
        alt="Add university"
        className="addUniIcon"
        onClick={() => navigate('/add-uni')}
      />
    </div>
  );
}
