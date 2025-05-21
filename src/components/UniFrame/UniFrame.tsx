import "./UniFrame.css";
import UniFrameContent from "./UniFrameContent/UniFrameContent";
import UniFrameImage from "./UniFrameImg";
import { useHoverStore } from "../../zustand/useHoverStore";
import xImg from "/media/x.png";

export default function UniFrame() {
  const uniClicked = useHoverStore((state) => state.clickedName);
  const setClicked = useHoverStore((state) => state.setClickedName);
  return (
    <>
      <div className={`blackBackground ${uniClicked ? "showBlur" : "hideBlur"}`}></div>
      <div className={`uniFrameBox ${uniClicked ? "showUniFrameBox" : "hideUniFrameBox"}`}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 1536.000000 1024.000000"
          preserveAspectRatio="xMidYMid meet"
          className="uniFrame"
        >
          <UniFrameImage />
          <foreignObject x="0" y="0" width="1536" height="1024">
            <div className="uniFrameContentBox">
              <UniFrameContent />
            </div>
            <button
              className="uniFrameClose"
              onClick={() => {
                setClicked(null);
                console.log("klik");
              }}
              aria-label="Close frame"
            >
              <img src={xImg} alt="Close" />
            </button>
          </foreignObject>
        </svg>
      </div>
    </>
  );
}
