// components/ProfileMenu/ProfileMenu.tsx
import { useAuthStore } from "../../zustand/useAuthStore";
import './ProfileMenu.css';
import Avatar from '../../components/Avatar/Avatar';

export default function ProfileMenu({ onLogout }: { onLogout: () => void }) {
  const username = useAuthStore(state => state.username);
  const avatarUrl = useAuthStore(state => state.avatarUrl);

  return (
    <div className="profile-menu">
      <div className="profile-item profile-header">
        {avatarUrl ? (
          <img src={avatarUrl} alt="avatar" className="profile-avatar" />
        ) : (
          <Avatar />
        )}
        {username}
      </div>
      <div className="profile-item"> Liked Schools </div>
      <div className="profile-item" onClick={onLogout}>🚪 Log out</div>
    </div>
  );
}