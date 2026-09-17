"use client";

import { useEffect, useRef } from "react";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import type { SequenceKey } from "@/lib/frames";
import { FrameSkeleton } from "./FrameSkeleton";
import { useFrameSequence } from "./useFrameSequence";

type Props = {
  sequence: SequenceKey;
  fps?: number;
  /** "loop" restarts at frame 0, "pingpong" plays forward then backward. */
  mode?: "loop" | "pingpong";
  /** Frame shown when motion is reduced. */
  poster?: number;
  label: string;
  className?: string;
  /** Scales the frames inside the panel from `from` to `to` while the panel crosses the viewport. */
  scrollZoom?: [from: number, to: number];
};

/** Plays a frame sequence on its own while visible, pauses when off screen. */
export function AutoSequence({
  sequence,
  fps = 18,
  mode = "loop",
  poster = 0,
  label,
  className = "",
  scrollZoom,
}: Props) {
  const { canvasRef, render, ready, count } = useFrameSequence(sequence);
  const wrapRef = useRef<HTMLDivElement>(null);
  const reduceMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({ target: wrapRef, offset: ["start end", "end start"] });
  const scale = useTransform(scrollYProgress, [0, 1], scrollZoom && !reduceMotion ? scrollZoom : [1, 1]);

  useEffect(() => {
    const wrap = wrapRef.current;
    if (!wrap) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)");
    let raf = 0;
    let visible = false;
    let last = 0;
    let frame = 0;
    let direction = 1;
    const step = 1000 / fps;

    const tick = (now: number) => {
      raf = requestAnimationFrame(tick);
      if (now - last < step) return;
      last = now;
      frame += direction;
      if (mode === "loop") {
        frame = (frame + count) % count;
      } else if (frame >= count - 1 || frame <= 0) {
        frame = Math.min(count - 1, Math.max(0, frame));
        direction *= -1;
      }
      render(frame);
    };

    const sync = () => {
      cancelAnimationFrame(raf);
      if (reduce.matches) {
        render(poster);
        return;
      }
      if (visible && !document.hidden) raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        visible = entry.isIntersecting;
        sync();
      },
      { rootMargin: "120px 0px" },
    );
    observer.observe(wrap);
    document.addEventListener("visibilitychange", sync);
    reduce.addEventListener("change", sync);

    return () => {
      cancelAnimationFrame(raf);
      observer.disconnect();
      document.removeEventListener("visibilitychange", sync);
      reduce.removeEventListener("change", sync);
    };
  }, [count, fps, mode, poster, render]);

  return (
    <div ref={wrapRef} className={`relative isolate overflow-hidden rounded-[28px] ${className}`}>
      <motion.canvas
        ref={canvasRef}
        role="img"
        aria-label={label}
        style={{ scale }}
        className={`absolute inset-0 h-full w-full origin-center ${scrollZoom ? "will-change-transform" : ""}`}
      />
      <FrameSkeleton visible={!ready} />
    </div>
  );
}
