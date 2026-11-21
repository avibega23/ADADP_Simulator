"use client";

import PanelSection from "@/components/control-panel/PanelSection";
import {
  CHART_TOGGLE_LABELS,
  type ChartId,
} from "@/components/telemetry/chartConfig";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { CONTROL_PANEL_DEFAULTS } from "@/lib/controlPanelDefaults";
import useControlPanelStore from "@/store/useControlPanelStore";

const CHART_IDS = Object.keys(CHART_TOGGLE_LABELS) as ChartId[];

interface ChartsConfigurationProps {
  disabled?: boolean;
}

export default function ChartsConfiguration({
  disabled = false,
}: ChartsConfigurationProps) {
  const {
    chartsConfiguration,
    changeChartVisibility,
    changeShowCanvasTrajectory,
    resetChartsConfiguration,
  } = useControlPanelStore();

  const defaults = CONTROL_PANEL_DEFAULTS.charts;
  const isSectionDefault =
    chartsConfiguration.showCanvasTrajectory ===
      defaults.showCanvasTrajectory &&
    CHART_IDS.every(
      (id) =>
        chartsConfiguration.visibility[id] === defaults.visibility[id],
    );

  return (
    <PanelSection
      title="Charts"
      disabled={disabled}
      isSectionDefault={isSectionDefault}
      onResetSection={() => {
        if (disabled) return;
        resetChartsConfiguration();
      }}
    >
      {CHART_IDS.map((id) => {
        const inputId = `chart-show-${id}`;
        return (
          <Field
            key={id}
            orientation="horizontal"
            className="items-center"
          >
            <Checkbox
              id={inputId}
              checked={chartsConfiguration.visibility[id]}
              disabled={disabled}
              onCheckedChange={(checked) => {
                if (disabled) return;
                changeChartVisibility(id, checked);
              }}
            />
            <FieldLabel htmlFor={inputId} className="font-normal">
              {CHART_TOGGLE_LABELS[id]}
            </FieldLabel>
          </Field>
        );
      })}
      <Field orientation="horizontal" className="items-center">
        <Checkbox
          id="chart-show-canvas-trajectory"
          checked={chartsConfiguration.showCanvasTrajectory}
          disabled={disabled}
          onCheckedChange={(checked) => {
            if (disabled) return;
            changeShowCanvasTrajectory(checked);
          }}
        />
        <FieldLabel
          htmlFor="chart-show-canvas-trajectory"
          className="font-normal"
        >
          Show trajectory on canvas
        </FieldLabel>
      </Field>
    </PanelSection>
  );
}
