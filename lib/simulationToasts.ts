import { toast } from "@/components/ui/toast";

export type SimulationStopReason = "resize" | "reset" | "settings";

const STOP_MESSAGES: Record<
  SimulationStopReason,
  { title: string; description: string; type: "warning" | "info" }
> = {
  resize: {
    type: "warning",
    title: "Simulation stopped",
    description: "The window was resized, so playback was paused.",
  },
  reset: {
    type: "info",
    title: "Simulation stopped",
    description: "Playback was reset to the starting state.",
  },
  settings: {
    type: "info",
    title: "Simulation stopped",
    description: "Settings changed, so playback was paused.",
  },
};

export function notifySimulationStopped(reason: SimulationStopReason) {
  const message = STOP_MESSAGES[reason];
  toast.add({
    type: message.type,
    title: message.title,
    description: message.description,
  });
}
