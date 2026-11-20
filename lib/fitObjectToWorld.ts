import { clamp } from "@/lib/clamp";
import useControlPanelStore from "@/store/useControlPanelStore";

/** Clamp radius to the current world and place the object at top-center. */
export function fitObjectToWorld() {
  const state = useControlPanelStore.getState();
  const { x: width, y: height } = state.groundConfiguration.groundDimensions;
  const maxRadius = Math.max(1, Math.min(width, height) / 2 - 0.01);
  const radius = clamp(state.objectConfiguration.radius, 1, maxRadius);

  if (radius !== state.objectConfiguration.radius) {
    state.changeRadius(radius);
  }

  state.changePosition({
    x: width / 2,
    y: height - radius,
  });
}
