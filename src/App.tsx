import GlobeScene from "./components/GlobeScene/GlobeScene";
import Title from "./components/Title/Title";
import MenuButton from "./components/MenuButton/MenuButton";
import UniDesc from "./components/UniDesc/UniDesc";
import DrawTitle from "./components/Napis/napis";

function App() {
  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <GlobeScene className="globe" />
        <div className="menu">
          <MenuButton>HOME</MenuButton>
          <MenuButton>GLOBE</MenuButton>
        </div>
        <div className="intro">
          <DrawTitle />
          <div className="authors">
            <Title text="byy Samuel and Jan"></Title>
          </div>
        </div>
      </div>
      <UniDesc></UniDesc>
    </>
  );
}

export default App;
