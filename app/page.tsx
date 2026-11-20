import DesktopOnlyGate from "@/components/DesktopOnlyGate";
import SimulationShell from "@/components/SimulationShell";

export default function Home() {
  return (
    <DesktopOnlyGate>
      <SimulationShell />
    </DesktopOnlyGate>
  );
}
