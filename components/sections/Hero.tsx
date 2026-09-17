"use client";

import { useRef } from "react";
import { FrameSkeleton } from "@/components/sequence/FrameSkeleton";
import { useFrameSequence } from "@/components/sequence/useFrameSequence";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { drop } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";

// Scroll ranges of the sequence that show each part, used to name what is on screen.
const parts = [
  { name: "Sapphire crystal", from: 0, to: 0.4 },
  { name: "Forged carbon case", from: 0.4, to: 1.01 },
];

export function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const mediaRef = useRef<HTMLDivElement>(null);
  const partRefs = useRef<(HTMLLIElement | null)[]>([]);
  const { canvasRef, render, ready, count } = useFrameSequence("hero");

  useGSAP(
    () => {
      const setPart = (progress: number) => {
        partRefs.current.forEach((el, i) => {
          if (!el) return;
          const active = progress >= parts[i].from && progress < parts[i].to;
          el.dataset.active = String(active);
        });
      };

      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
          desktop: "(min-width: 768px)",
          short: "(max-height: 560px)",
        },
        (context) => {
          const { reduce, desktop, short } = context.conditions as Record<string, boolean>;
          if (reduce) {
            render(count - 6);
            setPart(1);
            return;
          }

          const state = { frame: 0 };
          render(0);
          setPart(0);
          gsap.to(state, {
            frame: count - 1,
            ease: "none",
            onUpdate: () => render(state.frame),
            // Short screens (phones in landscape): no room to pin, frames play while the section scrolls past.
            // Desktop: the whole section holds. Phones: the copy scrolls by first, then only the large
            // panel holds centered on screen while the frames play.
            scrollTrigger: short
              ? {
                  trigger: sectionRef.current,
                  start: "top bottom",
                  end: "bottom top",
                  scrub: 0.5,
                  invalidateOnRefresh: true,
                  onUpdate: (self) => setPart(self.progress),
                }
              : desktop
                ? {
                    trigger: sectionRef.current,
                    start: "top top",
                    end: "+=170%",
                    pin: true,
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => setPart(self.progress),
                  }
                : {
                    trigger: mediaRef.current,
                    // Centered in the space below the nav.
                    start: "center center+=32",
                    end: "+=140%",
                    pin: true,
                    scrub: 0.5,
                    invalidateOnRefresh: true,
                    onUpdate: (self) => setPart(self.progress),
                  },
          });
        },
      );
    },
    { scope: sectionRef, dependencies: [render, count] },
  );

  return (
    <section ref={sectionRef} id="drop" className="relative bg-bg">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 content-center gap-10 px-4 pb-16 pt-4 md:min-h-[100svh] md:grid-cols-12 md:items-center md:gap-10 md:px-10 md:pb-10 md:pt-24 short:py-20">
        <div className="md:col-span-6">
          <p className="font-mono text-xs uppercase tracking-[0.18em] text-muted">
            Drop {drop.number}, {drop.month}
          </p>
          <h2 className="mt-4 text-[2.5rem] leading-[1.04] tracking-[-0.03em] md:mt-5 md:text-5xl xl:text-[4rem] short:text-4xl">
            One watch a month.
            <span className="block text-muted">This one is carbon.</span>
          </h2>
          <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-muted md:mt-6 md:text-lg">
            A forged carbon chronograph, made in a single run of {drop.pieces} pieces. When September ends, so
            does the run.
          </p>
          <div className="mt-6 flex flex-wrap items-center gap-3 md:mt-8">
            <ButtonLink href="#watch">Reserve</ButtonLink>
            <ButtonLink href="#build" variant="ghost">
              See the build
            </ButtonLink>
          </div>
        </div>

        <div ref={mediaRef} className="flex flex-col items-center gap-4 md:col-span-6 md:items-end">
          <div className="relative isolate aspect-[4/5] w-[min(100%,calc((100svh-8.5rem)*0.8))] overflow-hidden rounded-[28px] md:w-[min(100%,calc(72svh*0.8))]">
            <canvas
              ref={canvasRef}
              role="img"
              aria-label="The C-09 Carbon case assembling from its sapphire crystal and forged carbon parts"
              className="absolute inset-0 h-full w-full"
            />
            <FrameSkeleton visible={!ready} />
          </div>
          <ol className="flex w-full justify-center gap-6 whitespace-nowrap font-mono text-[0.7rem] md:w-[min(100%,calc(72svh*0.8))] md:justify-between md:gap-4 md:text-xs">
            {parts.map((p, i) => (
              <li
                key={p.name}
                ref={(el) => {
                  partRefs.current[i] = el;
                }}
                data-active={i === 0}
                className="text-muted/60 transition-colors duration-500 data-[active=true]:text-ink"
              >
                {p.name}
              </li>
            ))}
          </ol>
        </div>
      </div>
    </section>
  );
}
