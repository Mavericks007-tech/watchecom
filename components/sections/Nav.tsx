"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { List, Handbag, X } from "@phosphor-icons/react";
import { navLinks } from "@/lib/content";

export function Nav() {
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open]);

  return (
    <header className="fixed inset-x-0 top-0 z-40">
      <div className="mx-auto mt-3 flex h-12 max-w-[1400px] md:h-14 items-center justify-between px-4 md:mt-4 md:px-10">
        <nav
          aria-label="Primary"
          className="flex h-12 w-full items-center justify-between rounded-full bg-surface/70 pl-5 pr-1 md:h-14 md:pl-6 md:pr-2 shadow-[inset_0_1px_0_rgb(255_255_255/0.06),0_12px_32px_-16px_rgb(0_0_0/0.8)] ring-1 ring-inset ring-line backdrop-blur-xl"
        >
          <a href="#watch" className="text-[0.95rem] font-medium uppercase tracking-[0.34em]" aria-label="XIIAS home">
            XIIAS
          </a>

          <ul className="hidden items-center gap-9 text-[0.9rem] text-muted lg:flex">
            {navLinks.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="transition-colors duration-300 hover:text-ink">
                  {l.label}
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-1.5">
            <a
              href="#watch"
              className="hidden h-10 items-center whitespace-nowrap rounded-full bg-ink px-5 text-[0.9rem] text-bg transition-[background-color,transform] duration-300 ease-out-expo hover:bg-accent hover:text-accent-ink active:scale-[0.98] sm:inline-flex"
            >
              Reserve
            </a>
            <button
              type="button"
              aria-label="Bag, empty"
              className="grid h-10 w-10 place-items-center rounded-full transition-colors duration-300 hover:bg-ink/5 active:scale-[0.96]"
            >
              <Handbag weight="light" className="h-5 w-5" />
            </button>
            <button
              type="button"
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              onClick={() => setOpen((v) => !v)}
              className="grid h-10 w-10 place-items-center rounded-full transition-colors duration-300 hover:bg-ink/5 active:scale-[0.96] lg:hidden"
            >
              {open ? <X weight="light" className="h-5 w-5" /> : <List weight="light" className="h-5 w-5" />}
            </button>
          </div>
        </nav>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={reduce ? false : { opacity: 0, y: -12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: -12 }}
            transition={{ type: "spring", stiffness: 260, damping: 30 }}
            className="mx-4 mt-2 rounded-[28px] bg-surface p-3 ring-1 ring-inset ring-line lg:hidden"
          >
            <ul className="flex flex-col">
              {navLinks.map((l, i) => (
                <motion.li
                  key={l.href}
                  initial={reduce ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.04 * i, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                >
                  <a
                    href={l.href}
                    onClick={() => setOpen(false)}
                    className="block rounded-full px-4 py-3 text-lg transition-colors hover:bg-ink/5"
                  >
                    {l.label}
                  </a>
                </motion.li>
              ))}
              <li className="mt-2 sm:hidden">
                <a
                  href="#watch"
                  onClick={() => setOpen(false)}
                  className="flex h-12 items-center justify-center rounded-full bg-ink text-bg active:scale-[0.98]"
                >
                  Reserve
                </a>
              </li>
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
