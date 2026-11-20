"use client";
import ControlPanel from "@/components/control-panel/ControlPanel";
import SimulationCanvas from "@/components/SimulationCanvas";
import TelemetryPanel from "@/components/telemetry/TelemetryPanel";
import Navbar from "@/components/Navbar";
import useCanvasRenderer from "@/rendering/CanvasRenderer";
import useSimulation from "@/hooks/useSimulation";

const SimulationShell = () => {
  const { canvasRef, createObject } = useCanvasRenderer();
  const {
    playSimulation,
    pauseSimulation,
    resetSimulation,
    applyConfig,
    isPlaying,
  } = useSimulation({
    createObject,
  });

  return (
    <>
      <Navbar
        onPlay={playSimulation}
        onPause={pauseSimulation}
        onReset={resetSimulation}
        isPlaying={isPlaying}
      />
      <div className="flex min-h-0 flex-1">
        <main className="flex min-w-0 flex-3 flex-col">
          <section className="flex-1 min-h-0">
            <SimulationCanvas canvasRef={canvasRef} />
          </section>

          <section className="h-80 shrink-0 shadow-cream-top">
            <TelemetryPanel />
          </section>
        </main>

        <aside className="min-h-0 flex-1 overflow-y-auto bg-card shadow-cream-left">
          <ControlPanel
            onApplyConfig={applyConfig}
            disabled={isPlaying}
          />
        </aside>
      </div>
    </>
  );
};

export default SimulationShell;
