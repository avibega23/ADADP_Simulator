"use client";

import NumberField from "@/components/control-panel/NumberField";
import { syncPpm } from "@/lib/ppmSyncer";
import useControlPanelStore from "@/store/useControlPanelStore";

interface GroundConfiguratoinProps {
  onApplyConfig: () => void;
}
export default function GroundConfiguration({
  onApplyConfig,
}: GroundConfiguratoinProps) {
  const { groundConfiguration, changeGroundDimension, changeGravity } =
    useControlPanelStore();

  return (
    <section className="flex flex-col gap-3">
      <div className="py-2 text-2xl">Ground Configuration</div>
      <NumberField
        id="ground-width"
        name="Enter Width:"
        value={groundConfiguration.groundDimensions.x}
        onChange={(x) => {
          changeGroundDimension({
            ...groundConfiguration.groundDimensions,
            x,
          });
          syncPpm("width");
          onApplyConfig();
        }}
      />
      <NumberField
        id="ground-height"
        name="Enter Height:"
        value={groundConfiguration.groundDimensions.y}
        onChange={(y) => {
          changeGroundDimension({
            ...groundConfiguration.groundDimensions,
            y,
          });
          syncPpm("height");
          onApplyConfig();
        }}
      />
      <NumberField
        id="ground-gravity-x"
        name="Enter Horizontal Gravity:"
        value={groundConfiguration.gravity.x}
        onChange={(x) => {
          changeGravity({
            x,
            y: groundConfiguration.gravity.y,
          });
          onApplyConfig();
        }}
      />
      <NumberField
        id="ground-gravity-y"
        name="Enter Vertical Gravity:"
        value={groundConfiguration.gravity.y}
        onChange={(y) => {
          changeGravity({
            x: groundConfiguration.gravity.x,
            y,
          });
          onApplyConfig();
        }}
      />
    </section>
  );
}
