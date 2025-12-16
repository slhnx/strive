"use client";

import { Habit } from "@/app/generated/prisma/client";
import { cn, getHabitColor, getHabitProgressColor } from "@/lib/utils";
import { trpc } from "@/trpc/react";
import { useMemo, useState, useRef, useEffect } from "react";

export type HeatmapValue = { date: string; count: number };

type HabitHeatmapProps = {
  habit: Habit;
  cellSize?: number;
  gap?: number;
  startDate?: string;
  /**
   * width of the outer container (where scrolling happens).
   * Accepts CSS width values like '280px', '22rem', '100%'.
   * Default is a small width so it looks "narrow".
   */
  containerWidth?: string | number;
};

export default function HabitHeatmap({
  habit,
  cellSize = 12,
  gap = 8,
  startDate,
  containerWidth = 280,
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

  // compute number of columns (weeks)
  const columns = useMemo(() => Math.ceil(days.length / 7), [days.length]);

  // prepare month labels: place label at left position of first day of month in grid
  const cellTotal = cellSize + gap;
  const monthPositions = useMemo(() => {
    const map = new Map<string, number>();
    days.forEach((d, idx) => {
      const monthKey = d.dt.toLocaleString("en-US", { month: "short" });
      const col = Math.floor(idx / 7);
      if (!map.has(`${monthKey}-${d.dt.getFullYear()}`)) {
        map.set(`${monthKey}-${d.dt.getFullYear()}`, col);
      }
    });

    const arr: { month: string; col: number }[] = [];
    map.forEach((col, monthYear) => {
      const [month] = monthYear.split("-");
      arr.push({ month, col });
    });
    return arr;
  }, [days]);

  const [hover, setHover] = useState<{
    x: number;
    y: number;
    text: string;
  } | null>(null);

  // scroll container ref (the element with overflow-x)
  const scrollRef = useRef<HTMLDivElement | null>(null);

  // ensure the grid has explicit pixel width to allow smooth scrolling
  const gridWidthPx = columns * cellTotal;

  // auto-scroll to right when days change (or on mount)
  useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // wait for layout; using rAF twice is a common pattern to ensure content measured
    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        const scrollTo = el.scrollWidth - el.clientWidth;
        // guard against negative
        if (scrollTo > 0) el.scrollTo({ left: scrollTo, behavior: "auto" });
      });
    });
  }, [gridWidthPx, days.length, cellSize, gap]);

  return (
    <div
      className="overflow-hidden"
      style={{
        width:
          typeof containerWidth === "number"
            ? `${containerWidth}px`
            : containerWidth,
      }}
    >
      <div className="relative overflow-x-auto pb-6" ref={scrollRef}>
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
          style={{
            gap,
            // set explicit width so the overflow container can measure scrollWidth correctly
            width: gridWidthPx,
            // optional: ensure items don't stretch unexpectedly
            gridAutoColumns: `${cellSize}px`,
            gridTemplateRows: `repeat(7, ${cellSize}px)`,
          }}
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
              className={cn(
                'border border-transparent cursor-default rounded-sm',
                getHabitProgressColor(d.count, habit.frequency, habit.color)
              )}
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
          <div className={cn("w-3 h-3 border", getHabitProgressColor(0, habit.frequency, habit.color))} />
          <div className={cn("w-3 h-3 border", getHabitProgressColor(0.1, habit.frequency, habit.color))} />
          <div className={cn("w-3 h-3 border", getHabitProgressColor(0.3, habit.frequency, habit.color))} />
          <div className={cn("w-3 h-3 border", getHabitProgressColor(0.5, habit.frequency, habit.color))} />
          <div className={cn("w-3 h-3 border", getHabitProgressColor(0.7, habit.frequency, habit.color))} />
        </div>
        <span>More</span>
      </div>
    </div>
  );
}
