import { InstagramLogo, XLogo, YoutubeLogo } from "@phosphor-icons/react/dist/ssr";

const links = ["Shipping", "Warranty", "Care", "Contact"];
const social = [
  { label: "Instagram", Icon: InstagramLogo },
  { label: "X", Icon: XLogo },
  { label: "YouTube", Icon: YoutubeLogo },
];

export function Footer() {
  return (
    <footer className="mx-auto grid max-w-[1400px] grid-cols-1 items-center gap-8 px-4 py-12 text-sm text-muted md:grid-cols-3 md:px-10">
      <ul className="flex flex-wrap gap-x-6 gap-y-2">
        {links.map((l) => (
          <li key={l}>
            <a href="#" className="transition-colors duration-300 hover:text-ink">
              {l}
            </a>
          </li>
        ))}
      </ul>
      <ul className="flex gap-2 md:justify-center">
        {social.map(({ label, Icon }) => (
          <li key={label}>
            <a
              href="#"
              aria-label={label}
              className="grid h-10 w-10 place-items-center rounded-full transition-colors duration-300 hover:bg-ink/5 hover:text-ink"
            >
              <Icon weight="light" className="h-5 w-5" />
            </a>
          </li>
        ))}
      </ul>
      <div className="flex flex-wrap gap-x-6 gap-y-2 md:justify-end">
        <a href="#" className="transition-colors duration-300 hover:text-ink">
          Privacy
        </a>
        <a href="#" className="transition-colors duration-300 hover:text-ink">
          Terms
        </a>
        <span>&copy; 2026 XIIAS</span>
      </div>
    </footer>
  );
}
