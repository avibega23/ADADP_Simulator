import useControlPanelStore from "@/store/useControlPanelStore";

export function objectPositionDefaulter() {
  const state = useControlPanelStore.getState();
  const { x: width, y: height } = state.groundConfiguration.groundDimensions;
  const radius = state.objectConfiguration.radius;
  state.changePosition({
    x: width / 2,
    y: height - radius,
  });
}
