"use client";

import useControlPanelStore from "@/store/useControlPanelStore";
import useTelemetryStore from "@/store/useTelemetryStore";
import { TELEMETRY_CHARTS } from "./chartConfig";
import TelemetryChart from "./TelemetryChart";

const TelemetryPanel = () => {
  const samples = useTelemetryStore((s) => s.samples);
  const visibility = useControlPanelStore(
    (s) => s.chartsConfiguration.visibility,
  );

  const visibleCharts = TELEMETRY_CHARTS.filter(
    (config) => visibility[config.id],
  );

  if (visibleCharts.length === 0) {
    return (
      <div className="flex h-full items-center justify-center bg-card px-4 text-sm text-muted-foreground">
        Enable charts in the Charts panel to display telemetry.
      </div>
    );
  }

  const columns = Math.min(visibleCharts.length, 3);

  return (
    <div
      className="grid h-full gap-4 bg-card p-4"
      style={{
        gridTemplateColumns: `repeat(${columns}, minmax(0, 1fr))`,
      }}
    >
      {visibleCharts.map((config) => (
        <TelemetryChart key={config.id} config={config} data={samples} />
      ))}
    </div>
  );
};

export default TelemetryPanel;
