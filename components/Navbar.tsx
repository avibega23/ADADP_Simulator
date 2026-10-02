"use client";

import type { PhysicsObject } from "@/physics/types";
import useSimulation from "@/hooks/useSimulation";

interface NavbarProps {
  createObject: (object: PhysicsObject) => void;
}

const Navbar = ({ createObject }: NavbarProps) => {
  const { pauseSimulation, playSimulation, resetSimulation } = useSimulation({
    createObject,
  });

  return (
    <nav className="flex items-center justify-between bg-gray-800 px-16 py-4 text-white text-2xl">
      <span className="text-2xl">ADADP Simulator</span>

      <div className="flex gap-2">
        <button onClick={playSimulation}>Play</button>
        <button onClick={pauseSimulation}>Pause</button>
        <button onClick={resetSimulation}>Reset</button>
      </div>

      <div className="flex gap-4">
        <a
          href="https://github.com/avibega23/adadp_simulator"
          className="text-sm"
          target="_blank"
        >
          GitHub
        </a>
        <a href="https://x.com/avibega23" className="text-sm" target="_blank">
          Twitter
        </a>
      </div>
    </nav>
  );
};

export default Navbar;
