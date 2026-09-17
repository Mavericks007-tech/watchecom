import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { Reveal } from "@/components/ui/Reveal";
import { drop, pastDrops } from "@/lib/content";

export function Archive() {
  return (
    <section id="archive" className="scroll-mt-20 py-24 md:py-40">
      <div className="mx-auto grid max-w-[1400px] grid-cols-1 gap-10 px-4 md:grid-cols-12 md:px-10">
        <Reveal className="md:col-span-4">
          <h2 className="text-4xl leading-[1.04] tracking-[-0.03em] md:text-5xl short:text-4xl">Past drops</h2>
          <p className="mt-5 max-w-[34ch] text-base leading-relaxed text-muted">
            Each watch is made once. When its month closes, it does not come back.
          </p>
        </Reveal>

        <ol className="divide-y divide-line border-t border-line md:col-span-8">
          <Reveal as="li">
            <a
              href="#watch"
              className="group grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-7 md:grid-cols-[5rem_1fr_auto] md:py-9"
            >
              <span className="font-mono text-sm text-muted">{drop.number}</span>
              <span className="flex flex-col gap-1">
                <span className="text-2xl tracking-[-0.02em] transition-transform duration-500 ease-out-expo group-hover:translate-x-2 md:text-4xl">
                  {drop.model}
                </span>
                <span className="font-mono text-xs text-muted">September</span>
              </span>
              <span className="flex items-center gap-1.5 text-sm text-accent">
                Available
                <ArrowUpRight className="h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
              </span>
            </a>
          </Reveal>
          {pastDrops.map((d, i) => (
            <Reveal
              as="li"
              key={d.number}
              delay={0.06 * (i + 1)}
              className="grid grid-cols-[3rem_1fr_auto] items-baseline gap-4 py-7 md:grid-cols-[5rem_1fr_auto] md:py-9"
            >
              <span className="font-mono text-sm text-muted">{d.number}</span>
              <span className="flex flex-col gap-1">
                <span className="text-2xl tracking-[-0.02em] text-muted md:text-4xl">{d.name}</span>
                <span className="font-mono text-xs text-muted">{d.month}</span>
              </span>
              <span className="text-sm text-muted">Sold out</span>
            </Reveal>
          ))}
        </ol>
      </div>
    </section>
  );
}
