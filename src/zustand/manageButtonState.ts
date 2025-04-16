import { create } from "zustand";

type ButtonState = {
    buttonClicked: string,
    setButtonClicked: (button: string) => void;
};

export const manageButtonState = create<ButtonState>((set) => ({
    buttonClicked: 'home',
    setButtonClicked: (button) => set({buttonClicked: button}),
}));