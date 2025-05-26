import GlobeScene from "./components/GlobeScene/GlobeScene";
import Menu from "./components/Menu/Menu";
import UniDesc from "./components/UniDesc/UniDesc";
import Frame from "./components/Frame/Frame";
import Intro from "./components/Intro/Intro";
import UniFrame from "./components/UniFrame/UniFrame";
import Login from "./components/Login/Login";
import supabase from "./config/supabaseClient";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ResetPassword from "./components/ResetPassword/ResetPassword"; // ← dodaje tę stronę
import ForgotPassword from "./components/ResetPassword/ForgotPassword";
import { useEffect } from "react";
import { useAuthStore } from "./zustand/useAuthStore";
import NotFound from "./components/NotFound/NotFound";
import CheckEmail from "./components/CheckEmail/CheckEmail";
import AddUni from "./components/AddUni/AddUni";
import { Outlet } from "react-router-dom";
import { Navigate } from "react-router-dom";
import UserProfileFrame from "./components/UserProfileInfo/UserProfileFrame";

function Layout() {
  const { pathname } = useLocation();

  return (
    <>
      {/* Globę + Menu + Frame + Intro pokazujemy TYLKO na "/" */}
      <div
        className={pathname === "/" ? "show" : "hide"}
        style={{ width: "100vw", height: "100vh" }}
      >
        <GlobeScene className="globe" />
        <Menu />
        <Frame />
        <Intro />
      </div>

      {/* Tutaj wchodzi właściwa zawartość podstron */}
      <Outlet />
    </>
  );
}

function App() {
  const setUsername = useAuthStore((state) => state.setUsername);
  const setAvatarUrl = useAuthStore((state) => state.setAvatarUrl);

  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      const {
        data: { session },
        error,
      } = await supabase.auth.getSession();

      if (error) {
        console.error("Błąd pobierania sesji:", error.message);
        return;
      }

      if (session?.user) {
        const metadata = session.user.user_metadata;
        const username =
          metadata?.username || metadata?.full_name || "Użytkownik";
        const avatar = metadata?.avatar_url || metadata?.picture || null;
        setUsername(username);
        setAvatarUrl(avatar);
        console.log("Zalogowany jako:", username, "Avatar URL:", avatar);
      }
    };

    checkIfUserIsLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        {/* Layout otacza wszystkie trasy */}
        <Route path="/" element={<Layout />}>
          {/* Index route = domyślna strona "/" */}
          <Route
            index
            element={
              <>
                <UniDesc />
                <UniFrame />
              </>
            }
          />

          {/* Pozostałe trasy */}
          <Route
            path="user-info"
            element={
              <>

                <Frame />
                <UserProfileFrame />
              </>
            }
          />
          <Route path="forgot-password" element={<ForgotPassword />} />
          <Route path="reset-password" element={<ResetPassword />} />
          <Route path="check-email" element={<CheckEmail />} />
          <Route path="login" element={<Login />} />
          <Route path="add-uni" element={<AddUni />} />

          {/* „Catch-all” dla nieznanych ścieżek – możesz przenieść na "/", albo na 404 */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
