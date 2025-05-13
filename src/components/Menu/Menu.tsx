import MenuButton from "./MenuButton/MenuButton";
import './Menu.css';
import { useState } from "react";
import { manageButtonState } from "../../zustand/manageButtonState";

export default function Menu() {
  const [buttonClicked, setButtonClicked] = useState('home');
  const setButton = manageButtonState(state => state.setButtonClicked);
  return (
    <div className="menu">
      <MenuButton onClick={() => setButton('home')}>HOME</MenuButton>
      <MenuButton onClick={() => setButton('globe')}>GLOBE</MenuButton>
      <MenuButton> | </MenuButton>
      <MenuButton onClick={() => setButton('login')}>SIGN IN</MenuButton>
    </div>
  );
}
