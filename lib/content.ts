// Placeholder product copy. Replace with confirmed details before launch.
export const drop = {
  number: "09",
  month: "September 2026",
  model: "C-09 Carbon",
  price: "$1,240",
  pieces: 250,
  // Drop closes at the end of this month (local time of the visitor).
  closesAt: new Date(2026, 9, 1, 0, 0, 0).toISOString(),
  nextDrop: "October 1",
};

export const specs = [
  { label: "Case", value: "Forged carbon" },
  { label: "Crystal", value: "Sapphire, front and back" },
  { label: "Movement", value: "Automatic chronograph" },
  { label: "Strap", value: "Black rubber, red lining" },
];

export const pastDrops = [
  { number: "08", month: "August", name: "A-08 Field" },
  { number: "07", month: "July", name: "G-07 Ceramic GMT" },
  { number: "06", month: "June", name: "D-06 Titanium Diver" },
];

export const navLinks = [
  { href: "#build", label: "Build" },
  { href: "#materials", label: "Materials" },
  { href: "#watch", label: "The watch" },
  { href: "#archive", label: "Archive" },
];
