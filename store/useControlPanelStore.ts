import { CONTROL_PANEL_DEFAULTS } from "@/lib/controlPanelDefaults";
import { Vector2 } from "@/physics/types";
import { create } from "zustand";

const defaults = CONTROL_PANEL_DEFAULTS;

interface GroundConfiguration {
  groundDimensions: Vector2;
  gravity: Vector2;
}

interface ObjectConfiguration {
  radius: number;
  mass: number;
  position: Vector2;
  initialVelocity: Vector2;
}

interface SimulationConfiguartion {
  timestep: number;
  timeScale: number;
  duration?: number;
}

interface CollisionConfiguration {
  restitution: number;
}

interface RenderConfiguration {
  showTrajectory: boolean;
}

interface ControlPanelStore {
  groundConfiguration: GroundConfiguration;
  //ground methods
  changeGroundDimension: (dimensions: Vector2) => void;
  changeGravity: (value: Vector2) => void;

  objectConfiguration: ObjectConfiguration;
  //object methods
  changeRadius: (value: number) => void;
  changeMass: (value: number) => void;
  changePosition: (value: Vector2) => void;
  changeInitialVelocity: (value: Vector2) => void;

  simulationConfiguration: SimulationConfiguartion;
  //simulation methods
  changeTimeStep: (value: number) => void;
  changeTimeScale: (value: number) => void;
  changeDuartion?: (value: number) => void;

  collisionConfiguration: CollisionConfiguration;
  //collision methods
  changeRestitution: (value: number) => void;

  renderConfiguration: RenderConfiguration;
  //redner methdods
  changeShowTrajectory: (value: boolean) => void;
}

const useControlPanelStore = create<ControlPanelStore>((set) => ({
  //grouund data and methods
  groundConfiguration: {
    groundDimensions: {
      x: defaults.ground.width,
      y: defaults.ground.height,
    },
    gravity: {
      x: defaults.ground.gravityX,
      y: defaults.ground.gravityY,
    },
  },
  changeGroundDimension: (dimensions) =>
    set((state) => ({
      groundConfiguration: {
        ...state.groundConfiguration,
        groundDimensions: dimensions,
      },
    })),
  changeGravity: (value: Vector2) =>
    set((state) => ({
      groundConfiguration: {
        ...state.groundConfiguration,
        gravity: value,
      },
    })),

  //object data and methods
  objectConfiguration: {
    radius: defaults.object.radius,
    mass: defaults.object.mass,
    position: {
      x: defaults.ground.width / 2,
      y: defaults.ground.height - defaults.object.radius,
    },
    initialVelocity: {
      x: defaults.object.velocityX,
      y: defaults.object.velocityY,
    },
  },
  changeRadius: (value) =>
    set((state) => ({
      objectConfiguration: {
        ...state.objectConfiguration,
        radius: value,
      },
    })),
  changeMass: (value) =>
    set((state) => ({
      objectConfiguration: {
        ...state.objectConfiguration,
        mass: value,
      },
    })),
  changePosition: (value) =>
    set((state) => ({
      objectConfiguration: {
        ...state.objectConfiguration,
        position: value,
      },
    })),
  changeInitialVelocity: (value) =>
    set((state) => ({
      objectConfiguration: {
        ...state.objectConfiguration,
        initialVelocity: value,
      },
    })),

  //simulation data and methods
  simulationConfiguration: {
    timestep: defaults.simulation.timestep,
    timeScale: defaults.simulation.timeScale,
  },
  changeTimeScale: (value) =>
    set((state) => ({
      simulationConfiguration: {
        ...state.simulationConfiguration,
        timeScale: value,
      },
    })),
  changeTimeStep: (value) =>
    set((state) => ({
      simulationConfiguration: {
        ...state.simulationConfiguration,
        timestep: value,
      },
    })),

  //collision data and methods
  collisionConfiguration: {
    restitution: defaults.collision.restitution,
  },
  changeRestitution: (value) =>
    set((state) => ({
      collisionConfiguration: {
        ...state.collisionConfiguration,
        restitution: value,
      },
    })),

  //render data and methods
  renderConfiguration: {
    showTrajectory: defaults.render.showTrajectory,
  },

  changeShowTrajectory: (value) =>
    set((state) => ({
      renderConfiguration: {
        ...state.renderConfiguration,
        showTrajectory: value,
      },
    })),
}));

export default useControlPanelStore;
