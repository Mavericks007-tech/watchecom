import { AutoSequence } from "@/components/sequence/AutoSequence";
import { Reveal } from "@/components/ui/Reveal";

export function MiddleOne() {
  return (
    <section id="build" className="scroll-mt-20 py-24 md:py-40">
      <div className="mx-auto max-w-[1400px] px-4 md:px-10">
        <Reveal className="md:flex md:justify-end">
          <h2 className="max-w-[16ch] text-4xl md:text-right leading-[1.04] tracking-[-0.03em] md:text-6xl short:text-4xl">
            Taken apart before it is put together.
          </h2>
        </Reveal>

        <div className="mt-10 grid grid-cols-1 gap-8 md:mt-16 md:grid-cols-12 md:gap-10">
          <Reveal delay={0.08} className="md:col-span-8 md:col-start-1">
            <AutoSequence
              sequence="m1"
              mode="pingpong"
              fps={14}
              scrollZoom={[1, 1.3]}
              label="Exploded view of the watch movement: gears, bridges, hands and the carbon case middle"
              className="aspect-[720/520] w-full"
            />
          </Reveal>
          <Reveal delay={0.12} className="md:col-span-4 md:col-start-1">
            <p className="max-w-[40ch] text-base leading-relaxed text-muted md:text-lg">
              Movement, bridges and case are finished as separate parts, checked one by one, then assembled by
              hand.
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
