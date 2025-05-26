import { create } from "zustand";

type ButtonState = {
  buttonClicked: string;
  prevButtonClicked: string;
  setButtonClicked: (button: string) => void;
};

export const manageButtonState = create<ButtonState>((set) => ({
  // początkowo oba to 'home'
  buttonClicked: "home",
  prevButtonClicked: "home",

  setButtonClicked: (button) =>
    set((state) => ({
      // najpierw ustawiamy prev na to, co było
      prevButtonClicked: state.buttonClicked,
      // potem aktualizujemy buttonClicked
      buttonClicked: button,
    })),
}));
