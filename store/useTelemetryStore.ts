import { create } from "zustand";

const MAX_SAMPLES = 3000;

export type TelemetrySample = {
  t: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  ax: number;
  ay: number;
  speed: number;
  ke: number;
};

interface TelemetryStore {
  samples: TelemetrySample[];
  pushSample: (sample: TelemetrySample) => void;
  clearSamples: () => void;
}

const useTelemetryStore = create<TelemetryStore>((set) => ({
  samples: [],

  pushSample: (sample) =>
    set((state) => {
      const next = [...state.samples, sample];
      return {
        samples: next.length > MAX_SAMPLES ? next.slice(-MAX_SAMPLES) : next,
      };
    }),

  clearSamples: () => set({ samples: [] }),
}));

export default useTelemetryStore;
