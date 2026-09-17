import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: "solid" | "ghost" | "light";
  className?: string;
};

const variants = {
  solid: "bg-ink text-bg hover:bg-accent hover:text-accent-ink",
  ghost: "text-ink ring-1 ring-inset ring-line hover:ring-ink/40",
  light: "bg-panel-ink text-panel hover:bg-accent hover:text-accent-ink",
};

/** Pill link. Arrow slides on hover, body presses on active. */
export function ButtonLink({ href, children, variant = "solid", className = "" }: Props) {
  return (
    <a
      href={href}
      className={`group inline-flex h-12 items-center gap-3 whitespace-nowrap rounded-full pl-6 pr-5 text-[0.95rem] tracking-[0.01em] transition-[background-color,color,box-shadow,transform] duration-300 ease-out-expo active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent ${variants[variant]} ${className}`}
    >
      {children}
      <span className="relative h-4 w-4 overflow-hidden">
        <ArrowUpRight
          weight="regular"
          className="absolute inset-0 h-4 w-4 transition-transform duration-500 ease-out-expo group-hover:-translate-y-4 group-hover:translate-x-4"
        />
        <ArrowUpRight
          weight="regular"
          className="absolute inset-0 h-4 w-4 -translate-x-4 translate-y-4 transition-transform duration-500 ease-out-expo group-hover:translate-x-0 group-hover:translate-y-0"
        />
      </span>
    </a>
  );
}
