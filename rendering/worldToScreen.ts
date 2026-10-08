import type { PhysicsObject } from "@/physics/types";
import useCanvasScreenStore from "@/store/useCanvasScreenStore";
import useControlPanelStore from "@/store/useControlPanelStore";

export function worldToScreen(object: PhysicsObject): PhysicsObject {
  const state = useControlPanelStore.getState();
  const PIXELS_PER_METER = useCanvasScreenStore.getState().PIXELS_PER_METER;
  const GROUND_Y = state.groundConfiguration.groundDimensions.y;
  return {
    ...object,
    position: {
      x: object.position.x * PIXELS_PER_METER,
      y: GROUND_Y - object.position.y * PIXELS_PER_METER,
    },
    radius: object.radius * PIXELS_PER_METER,
  };
}
