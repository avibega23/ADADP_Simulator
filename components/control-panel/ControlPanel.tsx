import CollisionConfiguration from "@/components/control-panel/CollisionConfiguration";
import GroundConfiguration from "@/components/control-panel/GroundConfiguration";
import ObjectConfiguration from "@/components/control-panel/ObjectConfiguration";
import RenderConfiguration from "@/components/control-panel/RenderConfiguration";
import SimulationConfiguration from "@/components/control-panel/SimulationConfiguration";
import { cn } from "@/lib/utils";

interface ControlPanelProps {
  onApplyConfig: () => void;
  disabled?: boolean;
}

export default function ControlPanel({
  onApplyConfig,
  disabled = false,
}: ControlPanelProps) {
  return (
    <div
      className={cn(
        "flex flex-col gap-6 p-4 transition-opacity",
        disabled && "opacity-60",
      )}
    >
      {disabled ? (
        <p className="text-xs text-muted-foreground">
          Pause the simulation to edit settings.
        </p>
      ) : null}
      <GroundConfiguration
        onApplyConfig={onApplyConfig}
        disabled={disabled}
      />
      <ObjectConfiguration
        onApplyConfig={onApplyConfig}
        disabled={disabled}
      />
      <CollisionConfiguration
        onApplyConfig={onApplyConfig}
        disabled={disabled}
      />
      <SimulationConfiguration disabled={disabled} />
      <RenderConfiguration disabled={disabled} />
    </div>
  );
}
