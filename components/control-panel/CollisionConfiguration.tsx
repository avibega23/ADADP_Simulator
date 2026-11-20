"use client";

import PanelSection from "@/components/control-panel/PanelSection";
import SliderField from "@/components/control-panel/SliderField";
import { CONTROL_PANEL_DEFAULTS } from "@/lib/controlPanelDefaults";
import useControlPanelStore from "@/store/useControlPanelStore";

interface CollisionConfigurationProps {
  onApplyConfig: () => void;
  disabled?: boolean;
}

const defaultRestitution = CONTROL_PANEL_DEFAULTS.collision.restitution;

export default function CollisionConfiguration({
  onApplyConfig,
  disabled = false,
}: CollisionConfigurationProps) {
  const { collisionConfiguration, changeRestitution } = useControlPanelStore();
  const restitution = collisionConfiguration.restitution;
  const isSectionDefault = Math.abs(restitution - defaultRestitution) < 1e-9;

  return (
    <PanelSection
      title="Collision"
      disabled={disabled}
      isSectionDefault={isSectionDefault}
      onResetSection={() => {
        if (disabled) return;
        changeRestitution(defaultRestitution);
        onApplyConfig();
      }}
    >
      <SliderField
        id="collision-restitution"
        label="Restitution"
        value={restitution}
        defaultValue={defaultRestitution}
        min={0}
        max={1}
        step={0.01}
        disabled={disabled}
        formatValue={(v) => v.toFixed(2)}
        description="0 = no bounce, 1 = perfectly elastic."
        onChange={(value) => {
          changeRestitution(value);
          onApplyConfig();
        }}
      />
    </PanelSection>
  );
}
