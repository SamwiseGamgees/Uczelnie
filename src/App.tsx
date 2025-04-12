import GlobeScene from "./components/GlobeScene/GlobeScene";
import Title from "./components/Title/Title";
import MenuButton from "./components/MenuButton/MenuButton";

function App() {
  return (
    <>
      <div style={{ width: "100vw", height: "100vh" }}>
        <GlobeScene className="globe" />
        <div className="menu">
          <MenuButton>HOME</MenuButton>
          <MenuButton>GLOBE</MenuButton>
        </div>
      </div>
      <Title text="Ucczelnie" />
    </>
  );
}

export default App;
