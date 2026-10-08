"use client";

import NumberField from "@/components/control-panel/NumberField";
import useControlPanelStore from "@/store/useControlPanelStore";

export default function SimulationConfiguration() {
  const { simulationConfiguration, changeTimeStep, changeTimeScale } =
    useControlPanelStore();

  return (
    <section className="flex flex-col gap-3">
      <div className="py-2 text-2xl">Simulation Configuration</div>
      <NumberField
        id="simulation-timestep"
        name="Enter Timestep:"
        value={simulationConfiguration.timestep}
        onChange={changeTimeStep}
      />
      <NumberField
        id="simulation-timescale"
        name="Enter Time Scale:"
        value={simulationConfiguration.timeScale}
        onChange={changeTimeScale}
      />
    </section>
  );
}
