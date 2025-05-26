import { create } from "zustand";

type HoverStore = {
  hoveredName: string | null;
  clickedName: string | null;
  hoveredX: number | null;
  hoveredY: number | null;
  isNew: boolean | null;
  setHoveredName: (
    name: string | null,
    x: number | null,
    y: number | null
  ) => void;
  setClickedName: (name: string | null) => void;
  setIsNew: (isNew: boolean | null) => void;
};

export const useHoverStore = create<HoverStore>((set) => ({
  hoveredName: null,
  clickedName: null,
  hoveredX: null,
  hoveredY: null,
  isNew: null,
  setHoveredName: (name, x, y) =>
    set({ hoveredName: name, hoveredX: x, hoveredY: y }),
  setClickedName: name => set({ clickedName: name }),
  setIsNew: isNew => set({isNew: isNew }),
}));
