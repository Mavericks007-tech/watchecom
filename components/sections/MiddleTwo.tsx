import { AutoSequence } from "@/components/sequence/AutoSequence";
import { Reveal } from "@/components/ui/Reveal";
import { specs } from "@/lib/content";

export function MiddleTwo() {
  return (
    <section id="materials" className="scroll-mt-20 pb-24 md:pb-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-12 px-4 md:grid-cols-12 md:gap-10 md:px-10">
        <div className="flex flex-col justify-between gap-12 md:col-span-5">
          <Reveal>
            <h2 className="max-w-[14ch] text-4xl leading-[1.04] tracking-[-0.03em] md:text-6xl short:text-4xl">
              Carbon in layers. Sapphire on both sides.
            </h2>
            <p className="mt-6 max-w-[42ch] text-base leading-relaxed text-muted md:text-lg">
              The case middle is pressed from stacked carbon sheets, so every piece carries its own grain.
            </p>
          </Reveal>

          <dl className="grid grid-cols-2 gap-x-6 gap-y-8 border-t border-line pt-8">
            {specs.map((s, i) => (
              <Reveal key={s.label} delay={0.05 * i}>
                <dt className="font-mono text-xs text-muted">{s.label}</dt>
                <dd className="mt-2 text-lg leading-snug md:text-xl">{s.value}</dd>
              </Reveal>
            ))}
          </dl>
        </div>

        <Reveal delay={0.1} className="flex md:col-span-7 md:justify-end">
          <AutoSequence
            sequence="m2"
            fps={12}
            label="Carbon case rings, stacked sapphire crystals and the suspended case middle"
            className="aspect-[4/5] w-full md:w-[min(100%,calc(84svh*0.8))]"
          />
        </Reveal>
      </div>
    </section>
  );
}
