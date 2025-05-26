import UserProfileFrameImg from "./UserProfileInfoImg";
import "./UserProfileFrame.css";
import { useIsLoggedIn } from "@/config/isLoggedIn";
import { useAuthStore } from "@/zustand/useAuthStore";
import supabase from "@/config/supabaseClient";
import { useNavigate } from "react-router-dom";
import LikeImage from "./LikeImage";
import AddImage from "./AddImage";

export default function UserProfileFrame(): JSX.Element | null {
  const isLoggedIn = useIsLoggedIn();
  const username = useAuthStore((s) => s.username);
  const avatarUrl = useAuthStore((s) => s.avatarUrl);
  const clearUsername = useAuthStore((s) => s.clearUsername);
  const navigate = useNavigate();

  // nie renderujemy, jeśli nie ma zalogowanego użytkownika
  if (!isLoggedIn) return null;

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) {
      console.error("Błąd przy wylogowaniu:", error.message);
    } else {
      clearUsername();
      console.log("Wylogowano pomyślnie");
      navigate("/");
    }
  };

  return (
    <>
      <div className="blackBackground showBlur" />

      <div className="userProfileFrameBox">
        <svg
          version="1.0"
          xmlns="http://www.w3.org/2000/svg"
          width="1024pt"
          height="1024pt"
          viewBox="0 0 1024 1024"
          preserveAspectRatio="xMidYMid meet"
        >
          <foreignObject width="1024" height="1024">
            <div className="profilePicture">
              {avatarUrl && (
                <img src={avatarUrl} alt="avatar" className="profile-avatar" />
              )}
            </div>
            <div className="userName">
              <h1>{username}</h1>
            </div>
            <button className="logoutButton" onClick={handleLogout}>
              Wyloguj
            </button>
            <div className="userOptions">
              <div className="likedUniBox">
                <LikeImage />
                <div className="underButton">
                  <span>Ulubione</span>
                </div>
              </div>
              <div className="likedUniBox">
                <AddImage />
                <div className="underButton">
                  <span>Dodaj uczelnię</span>
                </div>
              </div>
            </div>
          </foreignObject>
          <UserProfileFrameImg />
        </svg>
      </div>
    </>
  );
}
