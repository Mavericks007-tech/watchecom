"use client";

import { useRef } from "react";
import { FrameSkeleton } from "@/components/sequence/FrameSkeleton";
import { useFrameSequence } from "@/components/sequence/useFrameSequence";
import { ButtonLink } from "@/components/ui/ButtonLink";
import { Countdown } from "@/components/ui/Countdown";
import { drop } from "@/lib/content";
import { gsap, useGSAP } from "@/lib/gsap";

// Matches the near-black edge of the rendered frames so the contained image melts into the panel.
const MATTE = "#070606";

export function FinalReveal() {
  const sectionRef = useRef<HTMLElement>(null);
  const panelRef = useRef<HTMLDivElement>(null);
  const wordRef = useRef<HTMLDivElement>(null);
  const { canvasRef, render, ready, count } = useFrameSequence("final", { fit: "contain", matte: MATTE });

  useGSAP(
    () => {
      const copy = gsap.utils.toArray<HTMLElement>("[data-reveal]");
      const mm = gsap.matchMedia();

      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          reduce: "(prefers-reduced-motion: reduce)",
        },
        (context) => {
          const { reduce } = context.conditions as Record<string, boolean>;
          gsap.set(wordRef.current, { yPercent: -50 });

          if (reduce) {
            render(count - 1);
            gsap.set(copy, { autoAlpha: 1 });
            return;
          }

          const state = { frame: 0 };
          render(0);

          // One timeline, scrubbed by scroll: the panel opens, the watch turns, the offer arrives.
          gsap
            .timeline({
              defaults: { ease: "none" },
              scrollTrigger: {
                trigger: sectionRef.current,
                start: "top top",
                end: "+=260%",
                pin: true,
                scrub: 0.6,
                invalidateOnRefresh: true,
              },
            })
            .fromTo(panelRef.current, { scale: 0.82 }, { scale: 1, duration: 0.3 }, 0)
            .to(state, { frame: count - 1, duration: 0.85, onUpdate: () => render(state.frame) }, 0)
            .fromTo(wordRef.current, { xPercent: 6 }, { xPercent: -28, duration: 1 }, 0)
            .fromTo(
              copy,
              { autoAlpha: 0, y: 40 },
              { autoAlpha: 1, y: 0, duration: 0.14, stagger: 0.05, ease: "power2.out" },
              0.62,
            );
        },
      );
    },
    { scope: sectionRef, dependencies: [render, count] },
  );

  return (
    <section ref={sectionRef} id="watch" className="relative bg-bg">
      <div className="mx-auto flex min-h-[100svh] max-w-[1400px] items-center px-4 pb-4 pt-20 md:px-10 md:pb-6 md:pt-24 short:pb-2 short:pt-[4.5rem]">
        <div
          ref={panelRef}
          className="relative h-[calc(100svh-6rem)] w-full overflow-hidden panel-start rounded-[28px] bg-panel text-panel-ink will-change-transform md:h-[calc(100svh-7.5rem)] short:h-[calc(100svh-5.25rem)]"
        >
          <canvas
            ref={canvasRef}
            role="img"
            aria-label="The C-09 Carbon on its black rubber strap, turning slowly under low light"
            className="absolute inset-0 h-full w-full"
          />
          <div
            ref={wordRef}
            aria-hidden
            className="pointer-events-none absolute left-0 top-1/2 whitespace-nowrap text-[34vw] font-medium leading-none tracking-[-0.05em] text-panel-ink/[0.08] mix-blend-screen md:text-[24vw]"
          >
            XIIAS C-09
          </div>
          <FrameSkeleton visible={!ready} />

          <div aria-hidden className="absolute inset-x-0 bottom-0 h-3/5 bg-gradient-to-t from-panel via-panel/80 to-transparent md:h-2/5" />

          <div className="absolute inset-x-0 bottom-0 grid grid-cols-1 items-end gap-8 p-6 md:grid-cols-12 md:p-12 short:gap-4 short:p-5">
            <div className="md:col-span-5">
              <p data-reveal className="reveal-hidden font-mono text-xs uppercase tracking-[0.18em] text-panel-muted">
                Drop {drop.number}
              </p>
              <h1 data-reveal className="reveal-hidden mt-4 text-5xl leading-none tracking-[-0.03em] md:text-7xl short:mt-2 short:text-4xl">
                {drop.model}
              </h1>
              <p data-reveal className="reveal-hidden mt-5 flex flex-wrap items-baseline gap-x-4 gap-y-1 short:mt-2">
                <span className="font-mono text-2xl md:text-3xl short:text-xl">{drop.price}</span>
                <span className="text-sm text-panel-muted">{drop.pieces} pieces, then retired</span>
              </p>
            </div>

            <div data-reveal className="reveal-hidden flex flex-col gap-6 short:gap-3 md:col-span-4 md:col-start-9 md:items-end">
              <div className="flex flex-col gap-3 short:gap-1.5 md:items-end">
                <span className="text-sm text-panel-muted">Closes in</span>
                <Countdown until={drop.closesAt} />
              </div>
              {/* TODO: point to checkout once it exists. */}
              <ButtonLink href="#checkout" variant="light" className="self-start md:self-end">
                Reserve
              </ButtonLink>
            </div>
          </div>
        </div>
      </div>
      <noscript>
        <style>{`.reveal-hidden{opacity:1!important;visibility:visible!important}.panel-start{transform:none!important}`}</style>
      </noscript>
    </section>
  );
}
