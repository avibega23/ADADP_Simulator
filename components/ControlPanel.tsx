"use client";
import useControlPanelStore from "@/store/useControlPanelStore";

const ControlPanel = () => {
  const { groundDimensions, changeGroundDimension, gravity, changeGravity } =
    useControlPanelStore();
  return (
    <div className="text-white p-4 flex flex-col">
      <div className="text-2xl py-2">Canvas Configuration</div>
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
      <div>Enter Gravity:</div>
      <input
        type="number"
        value={gravity == 0 ? "" : gravity}
        onChange={(value) => {
          changeGravity(Number(value.target.value));
        }}
        style={{ backgroundColor: "gray" }}
      />
      <div className="text-2xl py-2">Object Configuration</div>
    </div>
  );
};

export default ControlPanel;
