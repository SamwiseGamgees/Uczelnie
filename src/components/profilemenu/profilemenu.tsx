// components/ProfileMenu/ProfileMenu.tsx
import { useAuthStore } from "../../zustand/useAuthStore";
import './ProfileMenu.css';

export default function ProfileMenu({ onLogout }: { onLogout: () => void }) {
  const username = useAuthStore(state => state.username);

  return (
    <div className="profile-menu">
      <div className="profile-item">👤 {username}</div>
      <div className="profile-item" onClick={onLogout}>🚪 Log out</div>
    </div>
  );
}