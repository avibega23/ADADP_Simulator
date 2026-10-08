import CollisionConfiguration from "@/components/control-panel/CollisionConfiguration";
import GroundConfiguration from "@/components/control-panel/GroundConfiguration";
import ObjectConfiguration from "@/components/control-panel/ObjectConfiguration";
import RenderConfiguration from "@/components/control-panel/RenderConfiguration";
import SimulationConfiguration from "@/components/control-panel/SimulationConfiguration";

export default function ControlPanel() {
  return (
    <div className="flex flex-col gap-6 p-4 text-white">
      <GroundConfiguration />
      <ObjectConfiguration />
      <SimulationConfiguration />
      <CollisionConfiguration />
      <RenderConfiguration />
    </div>
  );
}
