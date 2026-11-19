"use client";

interface NavbarProps {
  onPlay: () => void;
  onPause: () => void;
  onReset: () => void;
}

const Navbar = ({ onPause, onPlay, onReset }: NavbarProps) => {
  return (
    <nav className="flex items-center justify-between bg-gray-800 px-16 py-4 text-white text-2xl">
      <span className="text-2xl">ADADP Simulator</span>

      <div className="flex gap-2">
        <button onClick={onPlay}>Play</button>
        <button onClick={onPause}>Pause</button>
        <button onClick={onReset}>Reset</button>
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
