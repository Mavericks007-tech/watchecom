import { NotifyForm } from "@/components/ui/NotifyForm";
import { drop } from "@/lib/content";

export function NotifyBand() {
  return (
    <section id="notify" className="mx-auto max-w-[1400px] scroll-mt-20 px-4 md:px-10">
      <div className="grid grid-cols-1 items-end gap-10 rounded-[28px] bg-surface p-7 ring-1 ring-inset ring-line md:grid-cols-12 md:p-14">
        <div className="md:col-span-6">
          <h2 className="max-w-[20ch] text-balance text-4xl leading-[1.04] tracking-[-0.03em] md:text-5xl short:text-4xl">
            Drop 10 opens {drop.nextDrop}.
          </h2>
          <p className="mt-4 max-w-[40ch] text-base leading-relaxed text-muted">
            Get one email the morning it goes live, before it reaches the site.
          </p>
        </div>
        <div className="md:col-span-6 md:col-start-7">
          <NotifyForm nextDrop={drop.nextDrop} />
        </div>
      </div>
    </section>
  );
}
