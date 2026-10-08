import useCanvasScreenStore from "@/store/useCanvasScreenStore";
import useControlPanelStore from "@/store/useControlPanelStore";

export enum dimensionChangeEnum {
  WIDTH = "WIDTH",
  HEIGHT = "HEIGHT",
}

export const ppmSyncer = (value: dimensionChangeEnum) => {
  const canvasState = useCanvasScreenStore.getState();
  const controlPanelState = useControlPanelStore.getState();

  if (value === dimensionChangeEnum.WIDTH) {
    const newPpm =
      canvasState.canvasDimensions.x /
      controlPanelState.groundConfiguration.groundDimensions.x;

    canvasState.setPixelsPerMeter(newPpm);

    controlPanelState.changeGroundDimension({
      ...controlPanelState.groundConfiguration.groundDimensions,
      y: canvasState.canvasDimensions.y / newPpm,
    });
  } else {
    const newPpm =
      canvasState.canvasDimensions.y /
      controlPanelState.groundConfiguration.groundDimensions.y;

    canvasState.setPixelsPerMeter(newPpm);

    controlPanelState.changeGroundDimension({
      ...controlPanelState.groundConfiguration.groundDimensions,
      x: canvasState.canvasDimensions.x / newPpm,
    });
  }
};
