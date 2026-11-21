import type { TelemetrySample } from "@/store/useTelemetryStore";

type SeriesKey = keyof TelemetrySample;

export type ChartId =
  | "velocity"
  | "acceleration"
  | "position"
  | "speed"
  | "kineticEnergy"
  | "trajectory";

export type ChartSeries = {
  key: SeriesKey;
  label: string;
};

export type ChartConfig = {
  id: ChartId;
  title: string;
  xKey: SeriesKey;
  xLabel?: string;
  yLabel?: string;
  series: ChartSeries[];
};

/** Sharp RGB: red first (single-series charts), green for second series. */
export const SERIES_COLORS = ["#ff0000", "#00ff00"] as const;

export const TELEMETRY_CHARTS: ChartConfig[] = [
  {
    id: "velocity",
    title: "Velocity vs time",
    xKey: "t",
    xLabel: "time (s)",
    yLabel: "velocity (m/s)",
    series: [
      { key: "vx", label: "vx" },
      { key: "vy", label: "vy" },
    ],
  },
  {
    id: "acceleration",
    title: "Acceleration vs time",
    xKey: "t",
    xLabel: "time (s)",
    yLabel: "acceleration (m/s²)",
    series: [
      { key: "ax", label: "ax" },
      { key: "ay", label: "ay" },
    ],
  },
  {
    id: "position",
    title: "Position vs time",
    xKey: "t",
    xLabel: "time (s)",
    yLabel: "position (m)",
    series: [
      { key: "x", label: "x" },
      { key: "y", label: "y" },
    ],
  },
  {
    id: "speed",
    title: "Speed vs time",
    xKey: "t",
    xLabel: "time (s)",
    yLabel: "speed (m/s)",
    series: [{ key: "speed", label: "speed" }],
  },
  {
    id: "kineticEnergy",
    title: "Kinetic energy vs time",
    xKey: "t",
    xLabel: "time (s)",
    yLabel: "KE (J)",
    series: [{ key: "ke", label: "KE" }],
  },
  {
    id: "trajectory",
    title: "Trajectory",
    xKey: "x",
    xLabel: "x (m)",
    yLabel: "y (m)",
    series: [{ key: "y", label: "y" }],
  },
];

export const CHART_TOGGLE_LABELS: Record<ChartId, string> = {
  velocity: "Velocity vs time",
  acceleration: "Acceleration vs time",
  position: "Position vs time",
  speed: "Speed vs time",
  kineticEnergy: "Kinetic energy vs time",
  trajectory: "Trajectory (y vs x)",
};
