"use client";

import { useEffect, useState } from "react";

function parts(target: number) {
  const diff = Math.max(0, target - Date.now());
  return {
    days: Math.floor(diff / 86_400_000),
    hours: Math.floor(diff / 3_600_000) % 24,
    minutes: Math.floor(diff / 60_000) % 60,
    seconds: Math.floor(diff / 1000) % 60,
  };
}

const pad = (n: number) => String(n).padStart(2, "0");

/** Time left until the drop closes. Renders dashes until mounted to avoid hydration drift. */
export function Countdown({ until }: { until: string }) {
  const target = new Date(until).getTime();
  const [time, setTime] = useState<ReturnType<typeof parts> | null>(null);

  useEffect(() => {
    const update = () => setTime(parts(target));
    update();
    const id = window.setInterval(update, 1000);
    return () => window.clearInterval(id);
  }, [target]);

  const units = [
    { label: "days", value: time?.days },
    { label: "hrs", value: time?.hours },
    { label: "min", value: time?.minutes },
    { label: "sec", value: time?.seconds },
  ];

  return (
    <div className="flex items-end gap-5 font-mono tabular-nums" aria-live="off">
      {units.map((u) => (
        <div key={u.label} className="flex flex-col gap-1">
          <span className="text-2xl leading-none md:text-[1.75rem] short:text-xl">{u.value === undefined ? "--" : pad(u.value)}</span>
          <span className="text-[0.7rem] text-panel-muted">{u.label}</span>
        </div>
      ))}
    </div>
  );
}
