import { useState } from "react";
import { useEffect } from "react";
import { useHoverStore } from "../../zustand/useHoverStore";
import "./UniDesc.css";

export default function UniDesc() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
    const hoveredName = useHoverStore((state: any) => state.hoveredName);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  });
  if (!hoveredName) return null;
  return (
    <div className="UniDescBox" style={{ top: position.y, left: position.x }}>
      <h1>{hoveredName}</h1>
    </div>
  );
}
