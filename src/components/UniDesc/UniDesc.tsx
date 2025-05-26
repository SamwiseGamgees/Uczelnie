import { useHoverStore } from "../../zustand/useHoverStore";
import "./UniDesc.css";

export default function UniDesc() {
  const hoveredName = useHoverStore((state) => state.hoveredName);
  const x = useHoverStore((state) => state.hoveredX);
  const y = useHoverStore((state) => state.hoveredY);

  if (!hoveredName || x === null || y === null) return null;
  
  return (
    <div className="tooltip" style={{ top: y, left: x }}>
       <div className="item-hints">
      <div className="hint" data-position="4">
      <span className="hint-radius"></span>
      <div className="hint-content do--split-children">
        <h1>{hoveredName}</h1>
      </div>
    </div>
    </div>
    </div>
  );
}
