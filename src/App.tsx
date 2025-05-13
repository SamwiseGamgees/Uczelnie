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

function App() {
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
                <Login />
              </div>
              <UniDesc />
              <UniFrame />
            </>
          }
        />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
