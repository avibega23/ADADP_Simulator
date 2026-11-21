"use client";

import { useMemo, useState } from "react";
import {
  CartesianGrid,
  Legend,
  Line,
  LineChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ChartConfig, SERIES_COLORS } from "./chartConfig";
import { TelemetrySample } from "@/store/useTelemetryStore";

type Props = {
  config: ChartConfig;
  data: TelemetrySample[];
};

type PickedPoint = {
  x: number;
  values: { label: string; value: number; color: string }[];
};

function buildFixedTicks(min: number, max: number, maxTicks = 8): number[] {
  if (!Number.isFinite(min) || !Number.isFinite(max)) return [0];
  if (max <= min) return [min];

  const range = max - min;
  const rough = range / Math.max(maxTicks - 1, 1);
  const magnitude = 10 ** Math.floor(Math.log10(rough));
  const niceSteps = [1, 2, 2.5, 5, 10].map((n) => n * magnitude);
  const step =
    niceSteps.find((s) => range / s <= maxTicks - 1) ??
    niceSteps[niceSteps.length - 1];

  const start = Math.floor(min / step) * step;
  const ticks: number[] = [];
  for (let t = start; t <= max + step * 0.5; t += step) {
    ticks.push(Number(t.toFixed(6)));
  }
  return ticks;
}

const formatTick = (v: number) => {
  if (Math.abs(v) >= 100 || v === 0) return v.toFixed(0);
  if (Math.abs(v) >= 10) return v.toFixed(1);
  return v.toFixed(2);
};

const TelemetryChart = ({ config, data }: Props) => {
  const [picked, setPicked] = useState<PickedPoint | null>(null);

  const xTicks = useMemo(() => {
    if (data.length === 0) return [0];
    const xs = data.map((row) => Number(row[config.xKey]));
    return buildFixedTicks(Math.min(...xs), Math.max(...xs));
  }, [data, config.xKey]);

  const yTicks = useMemo(() => {
    if (data.length === 0) return [0];
    let min = Infinity;
    let max = -Infinity;
    for (const row of data) {
      for (const s of config.series) {
        const v = Number(row[s.key]);
        if (v < min) min = v;
        if (v > max) max = v;
      }
    }
    if (!Number.isFinite(min) || !Number.isFinite(max)) return [0];
    const pad = (max - min) * 0.05 || 1;
    return buildFixedTicks(min - pad, max + pad);
  }, [data, config.series]);

  return (
    <div className="flex min-h-0 flex-1 flex-col gap-1">
      <h3 className="text-sm font-medium text-foreground">{config.title}</h3>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          data={data}
          margin={{ top: 8, right: 12, left: 4, bottom: 4 }}
          onMouseMove={(state) => {
            if (state.activeLabel == null || !state.isTooltipActive) {
              return;
            }

            const index =
              typeof state.activeIndex === "number"
                ? state.activeIndex
                : data.findIndex(
                    (row) => Number(row[config.xKey]) === Number(state.activeLabel),
                  );
            const row = index >= 0 ? data[index] : undefined;
            if (!row) return;

            setPicked({
              x: Number(state.activeLabel),
              values: config.series.map((s, i) => ({
                label: s.label,
                value: Number(row[s.key]),
                color: SERIES_COLORS[i] ?? SERIES_COLORS[0],
              })),
            });
          }}
          onMouseLeave={() => setPicked(null)}
        >
          <CartesianGrid
            stroke="var(--border)"
            strokeDasharray="3 3"
            strokeOpacity={0.6}
          />
          <XAxis
            dataKey={config.xKey}
            type="number"
            domain={["dataMin", "dataMax"]}
            ticks={xTicks}
            tickFormatter={formatTick}
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
            label={{
              value: config.xLabel ?? config.xKey,
              position: "insideBottom",
              offset: -2,
              fill: "var(--muted-foreground)",
              fontSize: 11,
            }}
          />
          <YAxis
            type="number"
            domain={["auto", "auto"]}
            ticks={yTicks}
            tickFormatter={formatTick}
            width={48}
            tick={{ fill: "var(--muted-foreground)", fontSize: 11 }}
            label={{
              value: config.yLabel ?? "",
              angle: -90,
              position: "insideLeft",
              fill: "var(--muted-foreground)",
              fontSize: 11,
            }}
          />
          <Tooltip
            cursor={{
              stroke: "var(--muted-foreground)",
              strokeDasharray: "4 4",
            }}
            contentStyle={{
              background: "var(--card)",
              border: "1px solid var(--border)",
              borderRadius: 8,
              color: "var(--foreground)",
              fontSize: 12,
            }}
            labelFormatter={(label) =>
              `${config.xLabel ?? config.xKey}: ${formatTick(Number(label))}`
            }
            formatter={(value, name) => [
              formatTick(Number(value)),
              String(name),
            ]}
          />
          <Legend position="insideTopRight" />
          {config.series.map((s, i) => (
            <Line
              key={s.key}
              type="monotone"
              dataKey={s.key}
              name={s.label}
              stroke={SERIES_COLORS[i] ?? SERIES_COLORS[0]}
              strokeWidth={2}
              dot={false}
              activeDot={{
                r: 5,
                fill: SERIES_COLORS[i] ?? SERIES_COLORS[0],
                stroke: "#fff",
                strokeWidth: 1,
              }}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
      {picked && (
        <p className="truncate text-xs text-muted-foreground">
          {config.xLabel ?? config.xKey}: {formatTick(picked.x)}
          {" · "}
          {picked.values.map((v) => (
            <span key={v.label} style={{ color: v.color }} className="mr-2">
              {v.label}: {formatTick(v.value)}
            </span>
          ))}
        </p>
      )}
    </div>
  );
};

export default TelemetryChart;
