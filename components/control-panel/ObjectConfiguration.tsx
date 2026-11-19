"use client";

import NumberField from "@/components/control-panel/NumberField";
import useControlPanelStore from "@/store/useControlPanelStore";

interface ObjectConfigurationProps {
  onApplyConfig: () => void;
}
export default function ObjectConfiguration({
  onApplyConfig,
}: ObjectConfigurationProps) {
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
        onChange={(value) => {
          changeRadius(value);
          onApplyConfig();
        }}
      />
      <NumberField
        id="object-mass"
        name="Enter Mass:"
        value={objectConfiguration.mass}
        onChange={(value) => {
          changeMass(value);
          onApplyConfig();
        }}
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
          onApplyConfig();
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
          onApplyConfig();
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
          onApplyConfig();
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
          onApplyConfig();
        }}
      />
    </section>
  );
}
