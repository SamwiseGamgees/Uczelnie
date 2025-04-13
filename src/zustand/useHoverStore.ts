import { create } from 'zustand';

type HoverStore = {
    hoveredName: string | null,
    setHoveredName: (name: string | null) => void;
};

export const useHoverStore = create<HoverStore>((set) => ({
    hoveredName: null,
    setHoveredName: (name) => set({hoveredName: name}),
}));