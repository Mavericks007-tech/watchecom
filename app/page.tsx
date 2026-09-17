import { Archive } from "@/components/sections/Archive";
import { FinalReveal } from "@/components/sections/FinalReveal";
import { Footer } from "@/components/sections/Footer";
import { Hero } from "@/components/sections/Hero";
import { MiddleOne } from "@/components/sections/MiddleOne";
import { MiddleTwo } from "@/components/sections/MiddleTwo";
import { Nav } from "@/components/sections/Nav";
import { NotifyBand } from "@/components/sections/NotifyBand";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <FinalReveal />
        <MiddleOne />
        <MiddleTwo />
        <Hero />
        <Archive />
        <NotifyBand />
      </main>
      <Footer />
    </>
  );
}
