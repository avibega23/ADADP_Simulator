import { GroundDimensions } from "@/physics/types";
import { create } from "zustand";

interface ControlPanelStoreType {
  groundDimensions: GroundDimensions;
  changeGroundDimension: (dimensions: GroundDimensions) => void;
}
const useControlPanelStore = create<ControlPanelStoreType>((set) => ({
  groundDimensions: {
    x: 800,
    y: 500,
  },

  changeGroundDimension: (dimensions) =>
    set((state) => ({ ...state, groundDimensions: dimensions })),
}));

export default useControlPanelStore;
