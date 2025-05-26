import GlobeScene from "./components/GlobeScene/GlobeScene";
import Menu from "./components/Menu/Menu";
import UniDesc from "./components/UniDesc/UniDesc";
import Frame from "./components/Frame/Frame";
import Intro from "./components/Intro/Intro";
import UniFrame from "./components/UniFrame/UniFrame";
import Login from "./components/Login/Login";
import supabase from "./config/supabaseClient";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import ResetPassword from "./components/ResetPassword/ResetPassword"; // ← dodaje tę stronę
import ForgotPassword from './components/ResetPassword/ForgotPassword';
import { useEffect } from "react"; 
import { useAuthStore } from "./zustand/useAuthStore"; 
import NotFound from "./components/NotFound/NotFound";
import CheckEmail from './components/CheckEmail/CheckEmail';
import AddUniPlus from "./components/AddUni/AddUniPlus/AddUniPlus";
import AddUni from "./components/AddUni/AddUni";

function App() {
  const setUsername = useAuthStore((state) => state.setUsername);

  useEffect(() => {
    const checkIfUserIsLoggedIn = async () => {
      const { data: { session }, error } = await supabase.auth.getSession();

      if (error) {
        console.error("Błąd pobierania sesji:", error.message);
        return;
      }

      if (session?.user) {
        const metadata = session.user.user_metadata;
        const username = metadata?.username || metadata?.full_name || "Użytkownik";
        setUsername(username);
        console.log("Zalogowany jako:", username);
      }
    };

    checkIfUserIsLoggedIn();
  }, []);

  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <>
              <div style={{ width: "100vw", height: "100vh" }}>
                <GlobeScene className="globe" />
                <Menu />
                <Frame />
                <Intro />
              </div>
              <UniDesc />
              <UniFrame />
              <AddUniPlus />
            </>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
        <Route path="/check-email" element={<CheckEmail />} />
        <Route path="/login" element={<Login />} />
        <Route path="/add-uni" element={<AddUni />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
