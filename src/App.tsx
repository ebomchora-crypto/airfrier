import { useEffect, useRef, useState } from "react";
import { Hero } from "./components/Hero";
import { Problem } from "./components/Problem";
import { Solution } from "./components/Solution";
import { Inside } from "./components/Inside";
import { HowItWorks } from "./components/HowItWorks";
import { RecipePreview } from "./components/RecipePreview";
import { Offer } from "./components/Offer";
import { Faq } from "./components/Faq";
import { FinalCta } from "./components/FinalCta";
import { Footer } from "./components/Footer";
import { StickyBar } from "./components/StickyBar";

export default function App() {
  const heroCta = useRef<HTMLAnchorElement>(null);
  const [showSticky, setShowSticky] = useState(false);

  useEffect(() => {
    const el = heroCta.current;
    if (!el || !("IntersectionObserver" in window)) return;
    const io = new IntersectionObserver(([e]) => {
      // visible only once the hero CTA has scrolled past the top (not while it is below the fold)
      setShowSticky(!e.isIntersecting && e.boundingClientRect.top < 0);
    });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <>
      <Hero ctaRef={heroCta} />
      <main>
        <Problem />
        <Solution />
        <Inside />
        <HowItWorks />
        <RecipePreview />
        <Offer />
        <Faq />
        <FinalCta />
      </main>
      <Footer />
      <StickyBar visible={showSticky} />
    </>
  );
}
