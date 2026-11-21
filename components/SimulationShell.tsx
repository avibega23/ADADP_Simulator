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
    <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
      <Navbar
        onPlay={playSimulation}
        onPause={pauseSimulation}
        onReset={resetSimulation}
        isPlaying={isPlaying}
      />
      <div className="flex min-h-0 flex-1 flex-col overflow-hidden">
        <div className="flex min-h-0 flex-3">
          <section className="min-h-0 min-w-0 flex-3">
            <SimulationCanvas canvasRef={canvasRef} />
          </section>
          <aside className="min-h-0 flex-1 overflow-y-auto bg-card shadow-cream-left">
            <ControlPanel onApplyConfig={applyConfig} disabled={isPlaying} />
          </aside>
        </div>
        <section className="flex-1 w-full shrink-0 shadow-cream-top bg-card">
          <TelemetryPanel />
        </section>
      </div>
    </div>
  );
};

export default SimulationShell;
