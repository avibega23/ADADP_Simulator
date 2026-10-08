import { Vector2 } from "@/physics/types";
import { create } from "zustand";

interface CanvasScreenStore {
  PIXELS_PER_METER: number;
  setPixelsPerMeter: (value: number) => void;

  canvasDimensions: Vector2;
  setCanvasDimensions: (value: Vector2) => void;
}

const useCanvasScreenStore = create<CanvasScreenStore>((set) => ({
  PIXELS_PER_METER: 1,
  setPixelsPerMeter: (value) =>
    set((state) => ({
      ...state,
      PIXELS_PER_METER: value,
    })),

  canvasDimensions: {
    x: 0,
    y: 0,
  },
  setCanvasDimensions: (value) =>
    set((state) => ({
      ...state,
      canvasDimensions: value,
    })),
}));

export default useCanvasScreenStore;
