import GlobeScene from "./components/GlobeScene/GlobeScene";
import Menu from "./components/Menu/Menu";
import UniDesc from "./components/UniDesc/UniDesc";
import Frame from "./components/Frame/Frame";
import Intro from "./components/Intro/Intro";
import { globe } from "./kula/globe";
import UniFrame from "./components/UniFrame/UniFrame";

function App() {
  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <GlobeScene className="globe" />
        <Menu />
        <Frame></Frame>
        <Intro></Intro>
      </div>
      <UniDesc></UniDesc>
      <UniFrame></UniFrame>
    </>
  );
}

export default App;
