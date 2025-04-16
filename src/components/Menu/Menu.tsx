import MenuButton from "./MenuButton/MenuButton";
import './Menu.css';
import { useState } from "react";
import { manageButtonState } from "../../zustand/manageButtonState";

export default function Menu() {
  const [buttonClicked, setButtonClicked] = useState('home');
  const setButton = manageButtonState(state => state.setButtonClicked);
  const button = manageButtonState(state => state.buttonClicked);
  return (
    <div className="menu">
      <MenuButton onClick={() => {setButton('home'); console.log(button)}}>HOME</MenuButton>
      <MenuButton onClick={() => {setButton('globe'); console.log(button)}}>GLOBE</MenuButton>
      <MenuButton> | </MenuButton>
      <MenuButton onClick={() => {setButton('log_in'); console.log(button)}}>LOG IN</MenuButton>
    </div>
  );
}
