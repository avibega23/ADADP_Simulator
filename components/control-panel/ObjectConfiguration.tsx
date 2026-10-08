"use client";

import NumberField from "@/components/control-panel/NumberField";
import useControlPanelStore from "@/store/useControlPanelStore";

export default function ObjectConfiguration() {
  const {
    objectConfiguration,
    changeRadius,
    changeMass,
    changePosition,
    changeInitialVelocity,
  } = useControlPanelStore();

  return (
    <section className="flex flex-col gap-3">
      <div className="py-2 text-2xl">Object Configuration</div>
      <NumberField
        id="object-radius"
        name="Enter Radius:"
        value={objectConfiguration.radius}
        onChange={changeRadius}
      />
      <NumberField
        id="object-mass"
        name="Enter Mass:"
        value={objectConfiguration.mass}
        onChange={changeMass}
      />
      <NumberField
        id="object-position-x"
        name="Enter Position X:"
        value={objectConfiguration.position.x}
        onChange={(x) => {
          changePosition({
            ...objectConfiguration.position,
            x,
          });
        }}
      />
      <NumberField
        id="object-position-y"
        name="Enter Position Y:"
        value={objectConfiguration.position.y}
        onChange={(y) => {
          changePosition({
            ...objectConfiguration.position,
            y,
          });
        }}
      />
      <NumberField
        id="object-velocity-x"
        name="Enter Initial Velocity X:"
        value={objectConfiguration.initialVelocity.x}
        onChange={(x) => {
          changeInitialVelocity({
            ...objectConfiguration.initialVelocity,
            x,
          });
        }}
      />
      <NumberField
        id="object-velocity-y"
        name="Enter Initial Velocity Y:"
        value={objectConfiguration.initialVelocity.y}
        onChange={(y) => {
          changeInitialVelocity({
            ...objectConfiguration.initialVelocity,
            y,
          });
        }}
      />
    </section>
  );
}
