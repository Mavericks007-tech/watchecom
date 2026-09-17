"use client";

import { useId, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { CheckCircle, WarningCircle } from "@phosphor-icons/react";

type Status = "idle" | "loading" | "success" | "error";

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export function NotifyForm({ nextDrop }: { nextDrop: string }) {
  const id = useId();
  const reduce = useReducedMotion();
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [error, setError] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!EMAIL.test(email.trim())) {
      setStatus("error");
      setError("Enter a full email address, like name@domain.com.");
      return;
    }
    setStatus("loading");
    setError("");
    // No backend yet: simulate the request so every state can be reviewed.
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
  }

  const fade = reduce
    ? {}
    : { initial: { opacity: 0, y: 8 }, animate: { opacity: 1, y: 0 }, exit: { opacity: 0, y: -8 } };

  return (
    <AnimatePresence mode="wait" initial={false}>
      {status === "success" ? (
        <motion.div key="done" {...fade} className="flex items-start gap-3" role="status">
          <CheckCircle weight="regular" className="mt-0.5 h-6 w-6 shrink-0 text-accent" />
          <p className="max-w-[40ch] text-lg leading-snug">
            You are on the list. We will email {email.trim()} the morning of {nextDrop}.
          </p>
        </motion.div>
      ) : (
        <motion.form key="form" {...fade} onSubmit={onSubmit} noValidate className="flex w-full flex-col gap-2">
          <label htmlFor={`${id}-email`} className="text-sm text-ink">
            Email
          </label>
          <div className="flex flex-col gap-3 sm:flex-row">
            <input
              id={`${id}-email`}
              type="email"
              inputMode="email"
              autoComplete="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              aria-invalid={status === "error"}
              aria-describedby={`${id}-help ${id}-error`}
              placeholder="name@domain.com"
              className={`h-12 w-full rounded-full bg-bg px-5 text-base text-ink ring-1 ring-inset transition-shadow duration-300 placeholder:text-muted focus:outline-none focus:ring-2 sm:max-w-sm ${
                status === "error" ? "ring-accent" : "ring-line focus:ring-ink"
              }`}
            />
            <button
              type="submit"
              disabled={status === "loading"}
              className="relative inline-flex h-12 min-w-36 items-center justify-center overflow-hidden whitespace-nowrap rounded-full bg-ink px-6 text-[0.95rem] text-bg transition-[background-color,transform] duration-300 ease-out-expo hover:bg-accent hover:text-accent-ink active:scale-[0.98] disabled:cursor-wait focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              {status === "loading" ? (
                <span className="flex items-center gap-2">
                  <span className="h-1.5 w-16 overflow-hidden rounded-full bg-bg/20">
                    <span className="block h-full w-1/2 animate-[shimmer_1s_ease-in-out_infinite] rounded-full bg-bg" />
                  </span>
                  <span className="sr-only">Sending</span>
                </span>
              ) : (
                "Notify me"
              )}
            </button>
          </div>
          <p id={`${id}-help`} className="text-sm text-muted">
            One email per drop. Nothing else.
          </p>
          <p id={`${id}-error`} role="alert" className="flex min-h-5 items-center gap-1.5 text-sm text-accent">
            {status === "error" && (
              <>
                <WarningCircle weight="regular" className="h-4 w-4" />
                {error}
              </>
            )}
          </p>
        </motion.form>
      )}
    </AnimatePresence>
  );
}
