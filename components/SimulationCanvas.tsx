"use client";
import useSimulation from "@/hooks/useSimulation";
import useCanvasRenderer from "@/rendering/CanvasRenderer";

export default function SimulationCanvas() {
  const { canvasRef, createObject } = useCanvasRenderer();
  const { playSimulation, pauseSimulation, resetSimulation } = useSimulation({
    createObject,
  });

  return (
    <>
      <div className="flex gap-2">
        <button onClick={playSimulation}>Play</button>
        <button onClick={pauseSimulation}>Pause</button>
        <button onClick={resetSimulation}>Reset</button>
      </div>
      <br />
      <br />
      <canvas
        ref={canvasRef}
        width={800}
        height={500}
        style={{ backgroundColor: "red" }}
      />
    </>
  );
}
