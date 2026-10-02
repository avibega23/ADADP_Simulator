"use client";
import ControlPanel from "@/components/ControlPanel";
import SimulationCanvas from "@/components/SimulationCanvas";
import TelemetryPanel from "@/components/telemetry/TelemetryPanel";
import Navbar from "@/components/Navbar";
import useCanvasRenderer from "@/rendering/CanvasRenderer";

const SimulationShell = () => {
  const { createObject, canvasRef } = useCanvasRenderer();
  return (
    <>
      <Navbar createObject={createObject} />
      <div className="flex min-h-0 flex-1">
        <main className="flex min-w-0 flex-3 flex-col">
          <section className="flex-1 min-h-0 bg-green-900">
            <SimulationCanvas canvasRef={canvasRef} />
          </section>

          <section className="h-80 shrink-0">
            <TelemetryPanel />
          </section>
        </main>

        <aside className="flex-1 shrink-0 bg-black">
          <ControlPanel />
        </aside>
      </div>
    </>
  );
};

export default SimulationShell;
