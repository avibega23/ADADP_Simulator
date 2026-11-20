"use client";

import PanelSection from "@/components/control-panel/PanelSection";
import SliderField from "@/components/control-panel/SliderField";
import { clamp } from "@/lib/clamp";
import { CONTROL_PANEL_DEFAULTS } from "@/lib/controlPanelDefaults";
import { fitObjectToWorld } from "@/lib/fitObjectToWorld";
import useControlPanelStore from "@/store/useControlPanelStore";

interface ObjectConfigurationProps {
  onApplyConfig: () => void;
  disabled?: boolean;
}

const defaults = CONTROL_PANEL_DEFAULTS.object;

export default function ObjectConfiguration({
  onApplyConfig,
  disabled = false,
}: ObjectConfigurationProps) {
  const {
    objectConfiguration,
    groundConfiguration,
    changeRadius,
    changeMass,
    changePosition,
    changeInitialVelocity,
  } = useControlPanelStore();

  const world = groundConfiguration.groundDimensions;
  const radius = objectConfiguration.radius;
  const maxRadius = Math.max(1, Math.min(world.x, world.y) / 2 - 0.01);
  const minPosX = radius;
  const maxPosX = Math.max(radius, world.x - radius);
  const minPosY = radius;
  const maxPosY = Math.max(radius, world.y - radius);
  const defaultPosX = clamp(world.x / 2, minPosX, maxPosX);
  const defaultPosY = clamp(world.y - radius, minPosY, maxPosY);

  const isSectionDefault =
    Math.abs(radius - defaults.radius) < 1e-9 &&
    Math.abs(objectConfiguration.mass - defaults.mass) < 1e-9 &&
    Math.abs(objectConfiguration.initialVelocity.x - defaults.velocityX) <
      1e-9 &&
    Math.abs(objectConfiguration.initialVelocity.y - defaults.velocityY) <
      1e-9 &&
    Math.abs(objectConfiguration.position.x - defaultPosX) < 1e-6 &&
    Math.abs(objectConfiguration.position.y - defaultPosY) < 1e-6;

  const resetSection = () => {
    if (disabled) return;
    changeRadius(defaults.radius);
    changeMass(defaults.mass);
    changeInitialVelocity({
      x: defaults.velocityX,
      y: defaults.velocityY,
    });
    fitObjectToWorld();
    onApplyConfig();
  };

  return (
    <PanelSection
      title="Object"
      disabled={disabled}
      isSectionDefault={isSectionDefault}
      onResetSection={resetSection}
    >
      <SliderField
        id="object-radius"
        label="Radius"
        value={radius}
        defaultValue={defaults.radius}
        min={1}
        max={maxRadius}
        step={0.5}
        disabled={disabled}
        formatValue={(v) => v.toFixed(1)}
        onChange={(nextRadius) => {
          const r = clamp(nextRadius, 1, maxRadius);
          changeRadius(r);
          changePosition({
            x: clamp(objectConfiguration.position.x, r, world.x - r),
            y: clamp(objectConfiguration.position.y, r, world.y - r),
          });
          onApplyConfig();
        }}
      />
      <SliderField
        id="object-mass"
        label="Mass"
        value={objectConfiguration.mass}
        defaultValue={defaults.mass}
        min={0.1}
        max={200}
        step={0.1}
        disabled={disabled}
        formatValue={(v) => v.toFixed(1)}
        onChange={(value) => {
          changeMass(value);
          onApplyConfig();
        }}
      />
      <SliderField
        id="object-position-x"
        label="Position X"
        value={objectConfiguration.position.x}
        defaultValue={defaultPosX}
        min={minPosX}
        max={maxPosX}
        step={0.5}
        disabled={disabled}
        formatValue={(v) => v.toFixed(1)}
        onChange={(x) => {
          changePosition({
            ...objectConfiguration.position,
            x: clamp(x, minPosX, maxPosX),
          });
          onApplyConfig();
        }}
      />
      <SliderField
        id="object-position-y"
        label="Position Y"
        value={objectConfiguration.position.y}
        defaultValue={defaultPosY}
        min={minPosY}
        max={maxPosY}
        step={0.5}
        disabled={disabled}
        formatValue={(v) => v.toFixed(1)}
        onChange={(y) => {
          changePosition({
            ...objectConfiguration.position,
            y: clamp(y, minPosY, maxPosY),
          });
          onApplyConfig();
        }}
      />
      <SliderField
        id="object-velocity-x"
        label="Initial velocity X"
        value={objectConfiguration.initialVelocity.x}
        defaultValue={defaults.velocityX}
        min={-100}
        max={100}
        step={0.5}
        disabled={disabled}
        formatValue={(v) => v.toFixed(1)}
        onChange={(x) => {
          changeInitialVelocity({
            ...objectConfiguration.initialVelocity,
            x,
          });
          onApplyConfig();
        }}
      />
      <SliderField
        id="object-velocity-y"
        label="Initial velocity Y"
        value={objectConfiguration.initialVelocity.y}
        defaultValue={defaults.velocityY}
        min={-100}
        max={100}
        step={0.5}
        disabled={disabled}
        formatValue={(v) => v.toFixed(1)}
        onChange={(y) => {
          changeInitialVelocity({
            ...objectConfiguration.initialVelocity,
            y,
          });
          onApplyConfig();
        }}
      />
    </PanelSection>
  );
}
