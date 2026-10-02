import { GroundDimensions } from "@/physics/types";
import { create } from "zustand";

interface ControlPanelStoreType {
  groundDimensions: GroundDimensions;
  changeGroundDimension: (dimensions: GroundDimensions) => void;

  gravity: number;
  changeGravity: (value: number) => void;
}
const useControlPanelStore = create<ControlPanelStoreType>((set) => ({
  groundDimensions: {
    x: 800,
    y: 500,
  },
  changeGroundDimension: (dimensions) =>
    set((state) => ({ ...state, groundDimensions: dimensions })),

  gravity: 9.80665,
  changeGravity: (value) => set((state) => ({ ...state, gravity: value })),
}));

export default useControlPanelStore;
