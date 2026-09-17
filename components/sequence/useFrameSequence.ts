"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { framePath, sequences, type SequenceKey } from "@/lib/frames";

export type FitMode = "cover" | "contain";

type Options = {
  fit?: FitMode;
  /** Edge color of the frames; contained frames are feathered into it. */
  matte?: string;
  /** On narrow canvases (phones): multiply the fitted scale by this factor. */
  mobileZoom?: number;
  /** On narrow canvases (phones): vertical position of the frame center, 0 = top, 1 = bottom. */
  mobileCenterY?: number;
};

function isLoaded(img: HTMLImageElement | undefined): img is HTMLImageElement {
  return !!img && img.complete && img.naturalWidth > 0;
}

/**
 * Loads a frame sequence into memory and paints any frame onto a canvas.
 * `render` is stable and never touches React state, so it is safe to call from
 * GSAP ticks or requestAnimationFrame loops.
 */
export function useFrameSequence(
  key: SequenceKey,
  { fit = "cover", matte, mobileZoom = 1, mobileCenterY = 0.5 }: Options = {},
) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imagesRef = useRef<HTMLImageElement[]>([]);
  const currentRef = useRef(0);
  const [ready, setReady] = useState(false);
  const { count } = sequences[key];

  const render = useCallback(
    (frame: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      const index = Math.min(count - 1, Math.max(0, Math.round(frame)));
      currentRef.current = index;

      // Fall back to the nearest decoded frame so scrubbing never flashes empty.
      const images = imagesRef.current;
      let img: HTMLImageElement | undefined;
      for (let offset = 0; offset < count && !img; offset++) {
        if (isLoaded(images[index - offset])) img = images[index - offset];
        else if (isLoaded(images[index + offset])) img = images[index + offset];
      }
      if (!img) return;

      const cw = canvas.width;
      const ch = canvas.height;
      const narrow = canvas.clientWidth < 640;
      const fitted =
        fit === "cover"
          ? Math.max(cw / img.naturalWidth, ch / img.naturalHeight)
          : Math.min(cw / img.naturalWidth, ch / img.naturalHeight);
      const scale = fitted * (narrow ? mobileZoom : 1);
      const w = img.naturalWidth * scale;
      const h = img.naturalHeight * scale;
      const x = (cw - w) / 2;
      const y = narrow ? ch * mobileCenterY - h / 2 : (ch - h) / 2;

      // Outside the image the canvas stays transparent, so layers behind it show through.
      ctx.clearRect(0, 0, cw, ch);
      ctx.drawImage(img, x, y, w, h);

      if (fit === "contain" && matte) {
        const fx = w * 0.22;
        const fy = h * 0.12;
        const edges: [number, number, number, number, number, number, number, number][] = [
          [x, 0, x + fx, 0, x, y, fx, h],
          [x + w, 0, x + w - fx, 0, x + w - fx, y, fx, h],
          [0, y, 0, y + fy, x, y, w, fy],
          [0, y + h, 0, y + h - fy, x, y + h - fy, w, fy],
        ];
        for (const [x0, y0, x1, y1, rx, ry, rw, rh] of edges) {
          const g = ctx.createLinearGradient(x0, y0, x1, y1);
          g.addColorStop(0, matte);
          g.addColorStop(1, "rgba(0,0,0,0)");
          ctx.fillStyle = g;
          ctx.fillRect(rx, ry, rw, rh);
        }
      }
    },
    [count, fit, matte, mobileZoom, mobileCenterY],
  );

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    let cancelled = false;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = Math.max(1, Math.round(width * dpr));
      canvas.height = Math.max(1, Math.round(height * dpr));
      render(currentRef.current);
    };

    const images: HTMLImageElement[] = [];
    imagesRef.current = images;

    const load = (i: number) => {
      const img = new Image();
      img.decoding = "async";
      img.src = framePath(key, i);
      img.onload = () => {
        if (cancelled) return;
        if (i === 0) setReady(true);
        if (i === currentRef.current || !isLoaded(images[currentRef.current])) {
          render(currentRef.current);
        }
      };
      images[i] = img;
    };

    // First frame immediately. The rest wait until the canvas is within about a
    // screen of the viewport, so phones only download sequences the visitor reaches.
    load(0);
    const idle =
      window.requestIdleCallback ?? ((cb: () => void) => window.setTimeout(cb, 120) as unknown as number);
    const cancelIdle = window.cancelIdleCallback ?? window.clearTimeout;
    let handle: number | undefined;
    const nearby = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        nearby.disconnect();
        handle = idle(() => {
          for (let i = 1; i < count; i++) load(i);
        });
      },
      { rootMargin: "120% 0px" },
    );
    nearby.observe(canvas);

    const observer = new ResizeObserver(resize);
    observer.observe(canvas);
    resize();

    return () => {
      cancelled = true;
      if (handle !== undefined) cancelIdle(handle);
      nearby.disconnect();
      observer.disconnect();
      for (const img of images) if (img) img.onload = null;
    };
  }, [count, key, render]);

  return { canvasRef, render, ready, count };
}
