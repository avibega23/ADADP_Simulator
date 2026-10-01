"use client";
import useControlPanelStore from "@/store/useControlPanelStore";

const ControlPanel = () => {
  const { groundDimensions, changeGroundDimension } = useControlPanelStore();
  return (
    <>
      <div>Enter Width:</div>
      <input
        type="number"
        value={groundDimensions.x}
        onChange={(value) => {
          changeGroundDimension({
            ...groundDimensions,
            x: Number(value.target.value),
          });
        }}
        style={{ backgroundColor: "gray" }}
      />
      <div>Enter Height:</div>
      <input
        type="number"
        value={groundDimensions.y}
        onChange={(value) => {
          changeGroundDimension({
            ...groundDimensions,
            y: Number(value.target.value),
          });
        }}
        style={{ backgroundColor: "gray" }}
      />
    </>
  );
};

export default ControlPanel;
