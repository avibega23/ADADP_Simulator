"use client";

import { Field, FieldLabel } from "@/components/ui/field";
import useControlPanelStore from "@/store/useControlPanelStore";

export default function RenderConfiguration() {
  const { renderConfiguration, changeShowTrajectory } = useControlPanelStore();

  return (
    <section className="flex flex-col gap-3">
      <div className="py-2 text-2xl">Render Configuration</div>
      <Field orientation="horizontal">
        <input
          id="render-show-trajectory"
          type="checkbox"
          checked={renderConfiguration.showTrajectory}
          onChange={(event) => {
            changeShowTrajectory(event.target.checked);
          }}
          className="size-4 accent-primary"
        />
        <FieldLabel htmlFor="render-show-trajectory">
          Show trajectory
        </FieldLabel>
      </Field>
    </section>
  );
}
