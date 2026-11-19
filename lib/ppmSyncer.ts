import useCanvasScreenStore from "@/store/useCanvasScreenStore";
import useControlPanelStore from "@/store/useControlPanelStore";

export function syncPpm(axis: "width" | "height" | "canvas") {
  const canvasStore = useCanvasScreenStore.getState();
  const controlStore = useControlPanelStore.getState();
  const setPixelsPerMeter = canvasStore.setPixelsPerMeter;
  const changeGroundDimension = controlStore.changeGroundDimension;
  const { x: cw, y: ch } = canvasStore.canvasDimensions;
  const g = controlStore.groundConfiguration.groundDimensions;
  if (cw <= 0 || ch <= 0) return;
  if (axis === "height") {
    if (g.y <= 0) return;
    const ppm = ch / g.y;
    setPixelsPerMeter(ppm);
    changeGroundDimension({ x: cw / ppm, y: g.y });
  } else {
    // width change OR canvas resize: lock width, derive height
    if (g.x <= 0) return;
    const ppm = cw / g.x;
    setPixelsPerMeter(ppm);
    changeGroundDimension({ x: g.x, y: ch / ppm });
  }
}
