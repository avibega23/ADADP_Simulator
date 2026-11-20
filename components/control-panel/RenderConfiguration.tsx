"use client";

import PanelSection from "@/components/control-panel/PanelSection";
import { Checkbox } from "@/components/ui/checkbox";
import { Field, FieldLabel } from "@/components/ui/field";
import { CONTROL_PANEL_DEFAULTS } from "@/lib/controlPanelDefaults";
import useControlPanelStore from "@/store/useControlPanelStore";

interface RenderConfigurationProps {
  disabled?: boolean;
}

export default function RenderConfiguration({
  disabled = false,
}: RenderConfigurationProps) {
  const { renderConfiguration, changeShowTrajectory } = useControlPanelStore();
  const isSectionDefault =
    renderConfiguration.showTrajectory ===
    CONTROL_PANEL_DEFAULTS.render.showTrajectory;

  return (
    <PanelSection
      title="Render"
      disabled={disabled}
      isSectionDefault={isSectionDefault}
      onResetSection={() => {
        if (disabled) return;
        changeShowTrajectory(CONTROL_PANEL_DEFAULTS.render.showTrajectory);
      }}
    >
      <Field orientation="horizontal" className="items-center">
        <Checkbox
          id="render-show-trajectory"
          checked={renderConfiguration.showTrajectory}
          disabled={disabled}
          onCheckedChange={(checked) => {
            if (disabled) return;
            changeShowTrajectory(checked);
          }}
        />
        <FieldLabel htmlFor="render-show-trajectory" className="font-normal">
          Show trajectory
        </FieldLabel>
      </Field>
    </PanelSection>
  );
}
