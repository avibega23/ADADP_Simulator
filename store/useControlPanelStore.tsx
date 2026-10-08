import { Vector2 } from "@/physics/types";
import { create } from "zustand";

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
      x: 800,
      y: 500,
    },
    gravity: { x: 0, y: 9.80665 },
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
    radius: 10,
    mass: 10,
    position: {
      x: 0,
      y: 0,
    },
    initialVelocity: {
      x: 0,
      y: 0,
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
    timestep: 1 / 120,
    timeScale: 1,
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
    restitution: 0.8,
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
    showTrajectory: false,
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
