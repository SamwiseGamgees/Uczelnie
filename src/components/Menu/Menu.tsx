import MenuButton from "./MenuButton/MenuButton";
import './Menu.css';
import { manageButtonState } from "../../zustand/manageButtonState";
import { useAuthStore } from "../../zustand/useAuthStore"; 
import { useState } from "react";
import ProfileMenu from "../profilemenu/profilemenu";
import supabase from '../../config/supabaseClient';
import { useNavigate } from 'react-router-dom';

export default function Menu() {

  const setButton = manageButtonState(state => state.setButtonClicked);
  const username = useAuthStore(state => state.username);
  const clearUsername = useAuthStore(state => state.clearUsername);
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const navigate = useNavigate();


  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();  // faktyczne wylogowanie z Supabase
    if (!error) {
      console.log("Wylogowano pomyślnie");
      clearUsername();                 // wyczyszczenie username w zustand
      setShowProfileMenu(false);      // zamknięcie menu
    } else {
      console.error("Błąd przy wylogowaniu:", error.message);
    }
  };

  return (
    <div className="menu">
      <MenuButton onClick={() => setButton('home')}>HOME</MenuButton>
      <MenuButton onClick={() => setButton('globe')}>GLOBE</MenuButton>
      <MenuButton> | </MenuButton>
      {username ? (
        <div style={{ position: "relative" }}>
          <MenuButton onClick={() => setShowProfileMenu(prev => !prev)}>
            {username.toUpperCase()} ⌄
          </MenuButton>
          {showProfileMenu && <ProfileMenu onLogout={handleLogout} />}
        </div>
      ) : (
        <MenuButton onClick={() => navigate('/login')}>SIGN IN</MenuButton>
      )}
    </div>
  );
}
