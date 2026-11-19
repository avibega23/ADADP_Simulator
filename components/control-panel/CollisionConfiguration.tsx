"use client";

import NumberField from "@/components/control-panel/NumberField";
import useControlPanelStore from "@/store/useControlPanelStore";

interface CollisionConfigurationProps {
  onApplyConfig: () => void;
}
export default function CollisionConfiguration({
  onApplyConfig,
}: CollisionConfigurationProps) {
  const { collisionConfiguration, changeRestitution } = useControlPanelStore();

  return (
    <section className="flex flex-col gap-3">
      <div className="py-2 text-2xl">Collision Configuration</div>
      <NumberField
        id="collision-restitution"
        name="Enter Restitution:"
        value={collisionConfiguration.restitution}
        onChange={(value) => {
          changeRestitution(value);
          onApplyConfig();
        }}
      />
    </section>
  );
}
