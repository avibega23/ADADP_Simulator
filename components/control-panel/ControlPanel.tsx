import CollisionConfiguration from "@/components/control-panel/CollisionConfiguration";
import GroundConfiguration from "@/components/control-panel/GroundConfiguration";
import ObjectConfiguration from "@/components/control-panel/ObjectConfiguration";
import RenderConfiguration from "@/components/control-panel/RenderConfiguration";
import SimulationConfiguration from "@/components/control-panel/SimulationConfiguration";

interface ControlPanelProps {
  onApplyConfig: () => void;
}
export default function ControlPanel({ onApplyConfig }: ControlPanelProps) {
  return (
    <div className="flex flex-col gap-6 p-4 text-white">
      <GroundConfiguration onApplyConfig={onApplyConfig} />
      <ObjectConfiguration onApplyConfig={onApplyConfig} />
      <CollisionConfiguration onApplyConfig={onApplyConfig} />
      <SimulationConfiguration />
      <RenderConfiguration />
    </div>
  );
}
