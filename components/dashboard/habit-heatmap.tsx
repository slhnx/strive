"use client";

import { Habit } from "@/app/generated/prisma/client";
import { cn, getHabitColor } from "@/lib/utils";
import { trpc } from "@/trpc/react";
import { useMemo, useState } from "react";

export type HeatmapValue = { date: string; count: number };

type HabitHeatmapProps = {
  habit: Habit;
  cellSize?: number;
  gap?: number;
  startDate?: string;
};

export default function HabitHeatmap({
  habit,
  cellSize = 12,
  gap = 8,
  startDate,
}: HabitHeatmapProps) {
  const { data: checkIns, isLoading } = trpc.habits.fetchAllCheckIns.useQuery({
    habitId: habit.id,
  });

  const dataMap = useMemo(() => {
    const map = new Map<string, number>();
    checkIns?.forEach((d) =>
      map.set(new Date(d.date).toISOString().slice(0, 10), d.count)
    );
    return map;
  }, [checkIns]);

  const today = useMemo(() => new Date(), []);

  // build days array for the past 365 days (including today)
  const days = useMemo(() => {
    const result: { date: string; count: number; dt: Date }[] = [];
    const base = startDate ? new Date(startDate) : new Date();
    // if startDate provided assume it's the *end* date, keep 365 days ending at startDate
    for (let i = 364; i >= 0; i--) {
      const d = new Date(base);
      d.setDate(base.getDate() - i);
      const key = d.toISOString().slice(0, 10);
      result.push({ date: key, count: dataMap.get(key) ?? 0, dt: d });
    }
    return result;
  }, [dataMap, startDate]);

  const getColorClass = (count: number) => {
    const color = getHabitColor(habit.color);
    if (count === 0) return "bg-gray-200";
    const ratio = count / habit.frequency;
    if (ratio < 0.25) return color.progress.one;
    if (ratio < 0.5) return color.progress.three;
    if (ratio < 0.75) return color.progress.five;
    return color.progress.seven;
  };

  console.log(days);

  // prepare month labels: place label at left position of first day of month in grid
  const monthPositions = useMemo(() => {
    // grid is 7 rows, flow by column: each column is a week starting Sunday (or not exactly)
    // Our days array flows left-to-right by day; grid-flow-col with 7 rows means days[0] is top-left
    // Calculate column index for each day: Math.floor(index / 7)
    const map = new Map<string, number>();

    days.forEach((d, idx) => {
      const monthKey = d.dt.toLocaleString("en-US", { month: "short" });
      const col = Math.floor(idx / 7);
      if (!map.has(monthKey)) map.set(monthKey, col);
    });

    const arr: { month: string; col: number }[] = [];
    map.forEach((col, month) => arr.push({ month, col }));
    return arr;
  }, [days]);

  const [hover, setHover] = useState<{
    x: number;
    y: number;
    text: string;
  } | null>(null);

  // visualization sizes for absolute positioning of month labels
  const cellTotal = cellSize + gap;

  return (
    <div className="w-full">
      <div className="relative overflow-x-auto pb-6">
        {/* month labels positioned above the grid */}
        <div className="relative h-6">
          {monthPositions.map((m) => {
            const left = m.col * cellTotal;
            return (
              <div
                key={m.month + m.col}
                className="absolute -top-1 text-xs text-zinc-500 font-medium"
                style={{ left }}
              >
                {m.month}
              </div>
            );
          })}
        </div>

        {/* grid */}
        <div
          className="grid grid-flow-col grid-rows-7"
          style={{ gap }}
          aria-hidden={false}
        >
          {days.map((d, idx) => (
            <div
              key={d.date}
              role="button"
              tabIndex={0}
              onMouseEnter={(e) => {
                const rect = (e.target as HTMLElement).getBoundingClientRect();
                setHover({
                  x: rect.left + rect.width / 2,
                  y: rect.top - 10,
                  text: `${d.date} — ${d.count} completions`,
                });
              }}
              onMouseLeave={() => setHover(null)}
              onFocus={(e) => {
                const rect = (e.target as HTMLElement).getBoundingClientRect();
                setHover({
                  x: rect.left + rect.width / 2,
                  y: rect.top - 10,
                  text: `${d.date} — ${d.count} completions`,
                });
              }}
              onBlur={() => setHover(null)}
              className={`w-[${cellSize}px] h-[${cellSize}px] ${getColorClass(
                d.count
              )} border border-transparent cursor-default`}
              title={`${d.date} — ${d.count} completions`}
              style={{ width: cellSize, height: cellSize }}
            />
          ))}
        </div>

        {/* tooltip (simple) */}
        {hover ? (
          <div
            className="pointer-events-none fixed z-50 text-sm bg-zinc-900 text-white px-2 py-1 rounded"
            style={{
              transform: "translate(-50%, -100%)",
              left: hover.x,
              top: hover.y,
            }}
          >
            {hover.text}
          </div>
        ) : null}
      </div>

      {/* legend */}
      <div className="mt-3 flex items-center gap-2 text-xs text-zinc-500">
        <span>Less</span>
        <div className="flex items-center gap-1">
          <div className={cn("w-3 h-3 border", getColorClass(0))} />
          <div className={cn("w-3 h-3 border", getColorClass(0.1))} />
          <div className={cn("w-3 h-3 border", getColorClass(0.3))} />
          <div className={cn("w-3 h-3 border", getColorClass(0.5))} />
          <div className={cn("w-3 h-3 border", getColorClass(0.7))} />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
