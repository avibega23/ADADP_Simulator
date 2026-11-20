import { EARTH_GRAVITY } from "@/physics/constants";

export const CONTROL_PANEL_DEFAULTS = {
  ground: {
    width: 800,
    height: 500,
    gravityX: 0,
    gravityY: EARTH_GRAVITY,
  },
  object: {
    radius: 10,
    mass: 10,
    velocityX: 0,
    velocityY: 0,
  },
  collision: {
    restitution: 0.8,
  },
  simulation: {
    timestep: 1 / 120,
    timeScale: 1,
  },
  render: {
    showTrajectory: false,
  },
} as const;
