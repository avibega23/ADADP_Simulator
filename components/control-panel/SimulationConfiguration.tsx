"use client";

import NumberField from "@/components/control-panel/NumberField";
import PanelSection from "@/components/control-panel/PanelSection";
import SliderField from "@/components/control-panel/SliderField";
import { CONTROL_PANEL_DEFAULTS } from "@/lib/controlPanelDefaults";
import useControlPanelStore from "@/store/useControlPanelStore";

const defaults = CONTROL_PANEL_DEFAULTS.simulation;

interface SimulationConfigurationProps {
  disabled?: boolean;
}

export default function SimulationConfiguration({
  disabled = false,
}: SimulationConfigurationProps) {
  const { simulationConfiguration, changeTimeStep, changeTimeScale } =
    useControlPanelStore();

  const isSectionDefault =
    Math.abs(simulationConfiguration.timestep - defaults.timestep) < 1e-12 &&
    Math.abs(simulationConfiguration.timeScale - defaults.timeScale) < 1e-9;

  return (
    <PanelSection
      title="Simulation"
      disabled={disabled}
      isSectionDefault={isSectionDefault}
      onResetSection={() => {
        if (disabled) return;
        changeTimeStep(defaults.timestep);
        changeTimeScale(defaults.timeScale);
      }}
    >
      <NumberField
        id="simulation-timestep"
        label="Timestep (s)"
        value={simulationConfiguration.timestep}
        defaultValue={defaults.timestep}
        min={0.001}
        max={0.1}
        step={0.001}
        disabled={disabled}
        description="Fixed step used by the loop when wired up."
        onChange={changeTimeStep}
      />
      <SliderField
        id="simulation-timescale"
        label="Time scale"
        value={simulationConfiguration.timeScale}
        defaultValue={defaults.timeScale}
        min={0.1}
        max={5}
        step={0.1}
        disabled={disabled}
        formatValue={(v) => `${v.toFixed(1)}×`}
        onChange={changeTimeScale}
      />
    </PanelSection>
  );
}
