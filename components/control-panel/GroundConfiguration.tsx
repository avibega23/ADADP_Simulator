"use client";

import NumberField from "@/components/control-panel/NumberField";
import PanelSection from "@/components/control-panel/PanelSection";
import SliderField from "@/components/control-panel/SliderField";
import { CONTROL_PANEL_DEFAULTS } from "@/lib/controlPanelDefaults";
import { fitObjectToWorld } from "@/lib/fitObjectToWorld";
import { syncPpm } from "@/lib/ppmSyncer";
import useControlPanelStore from "@/store/useControlPanelStore";

interface GroundConfigurationProps {
  onApplyConfig: () => void;
  disabled?: boolean;
}

const defaults = CONTROL_PANEL_DEFAULTS.ground;

export default function GroundConfiguration({
  onApplyConfig,
  disabled = false,
}: GroundConfigurationProps) {
  const { groundConfiguration, changeGroundDimension, changeGravity } =
    useControlPanelStore();

  const { groundDimensions, gravity } = groundConfiguration;

  const isSectionDefault =
    Math.abs(groundDimensions.x - defaults.width) < 1e-9 &&
    Math.abs(groundDimensions.y - defaults.height) < 1e-9 &&
    Math.abs(gravity.x - defaults.gravityX) < 1e-9 &&
    Math.abs(gravity.y - defaults.gravityY) < 1e-9;

  const applyWorldChange = (axis: "width" | "height", next: number) => {
    if (disabled) return;
    const dims = groundConfiguration.groundDimensions;
    changeGroundDimension(
      axis === "width" ? { ...dims, x: next } : { ...dims, y: next },
    );
    syncPpm(axis);
    fitObjectToWorld();
    onApplyConfig();
  };

  const resetSection = () => {
    if (disabled) return;
    changeGroundDimension({ x: defaults.width, y: defaults.height });
    changeGravity({ x: defaults.gravityX, y: defaults.gravityY });
    syncPpm("width");
    fitObjectToWorld();
    onApplyConfig();
  };

  return (
    <PanelSection
      title="Ground"
      showSeparator={false}
      disabled={disabled}
      isSectionDefault={isSectionDefault}
      onResetSection={resetSection}
    >
      <NumberField
        id="ground-width"
        label="World width (m)"
        value={groundDimensions.x}
        defaultValue={defaults.width}
        min={1}
        step={1}
        commitMode="live"
        disabled={disabled}
        description="Updates live; height follows canvas aspect via ppm."
        onChange={(x) => applyWorldChange("width", x)}
      />
      <NumberField
        id="ground-height"
        label="World height (m)"
        value={groundDimensions.y}
        defaultValue={defaults.height}
        min={1}
        step={1}
        commitMode="live"
        disabled={disabled}
        description="Updates live; width follows canvas aspect via ppm."
        onChange={(y) => applyWorldChange("height", y)}
      />
      <SliderField
        id="ground-gravity-x"
        label="Gravity X"
        value={gravity.x}
        defaultValue={defaults.gravityX}
        min={-50}
        max={50}
        step={0.1}
        disabled={disabled}
        formatValue={(v) => v.toFixed(1)}
        onChange={(x) => {
          changeGravity({
            x,
            y: gravity.y,
          });
          onApplyConfig();
        }}
      />
      <SliderField
        id="ground-gravity-y"
        label="Gravity Y"
        value={gravity.y}
        defaultValue={defaults.gravityY}
        min={0}
        max={50}
        step={0.01}
        disabled={disabled}
        formatValue={(v) => v.toFixed(2)}
        description="Panel stores downward strength as positive."
        onChange={(y) => {
          changeGravity({
            x: gravity.x,
            y,
          });
          onApplyConfig();
        }}
      />
    </PanelSection>
  );
}
