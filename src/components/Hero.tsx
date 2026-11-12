import { CtaButton } from "./CtaButton";
import { CookbookMockup } from "./CookbookMockup";
import { Check } from "./Check";

const includes = ["30 Easy Recipes", "4 Weekly Meal Plans", "Ready-to-Use Grocery Lists", "10 Bonus Quick Dinners"];

export function Hero({ ctaRef }: { ctaRef: React.Ref<HTMLAnchorElement> }) {
  return (
    <header className="relative overflow-hidden">
      <div className="container-page flex items-center justify-between py-3">
        <span className="font-display text-lg font-semibold">Air Fryer Meals for Two</span>
        <a href="#inside" className="hidden min-h-[48px] items-center text-sm font-semibold underline-offset-4 hover:underline sm:inline-flex">
          See What's Inside
        </a>
      </div>

      <div className="container-page grid items-center gap-x-14 pb-12 pt-2 md:grid-cols-[1.1fr_0.9fr] md:pb-20 md:pt-8">
        <div>
          <p className="eyebrow">Your next favorite dinner starts here</p>
          <h1 className="mt-3 text-[2.15rem] font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
            30 Delicious Air Fryer Recipes. <span className="italic text-ember">Made Just for Two.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed sm:text-lg">
            Skip the dinner stress with easy, budget-friendly recipes, ready-to-use meal plans, and simple grocery
            lists — all in one digital cookbook.
          </p>

          {/* Mobile: compact product card keeps the CTA close to the top */}
          <div className="mt-6 flex items-center gap-4 rounded-2xl border border-espresso/10 bg-white p-3 shadow-card md:hidden">
            <CookbookMockup priority className="w-[108px] shrink-0 rounded" />
            <ul className="space-y-1.5 text-[0.95rem] font-semibold leading-snug">
              {includes.map((t) => (
                <li key={t} className="flex items-start gap-2">
                  <Check className="mt-0.5 h-4 w-4" />
                  {t}
                </li>
              ))}
            </ul>
          </div>

          <ul className="mt-6 hidden grid-cols-2 gap-x-6 gap-y-2 font-semibold md:grid">
            {includes.map((t) => (
              <li key={t} className="flex items-center gap-2">
                <Check className="h-5 w-5" />
                {t}
              </li>
            ))}
          </ul>

          <p className="mt-6 font-display text-lg font-semibold sm:text-2xl">
            Get the Complete Cookbook for Just{" "}
            <span className="whitespace-nowrap">
              <span className="text-ember">$8</span>
              <span className="ml-1 align-middle font-sans text-xs font-semibold tracking-wide text-espresso/70">USD</span>
            </span>
          </p>
          <div className="mt-4">
            <CtaButton buttonRef={ctaRef} location="hero">
              Get My Cookbook — $8
            </CtaButton>
          </div>
          <p className="mt-3 text-center text-sm font-medium sm:text-left">
            Instant Access • One-Time Payment • 7-Day Money-Back Guarantee
          </p>
        </div>

        {/* Desktop/tablet: large cover */}
        <div className="relative hidden md:block">
          <div className="absolute inset-[6%] -z-10 rounded-full bg-gold/60" aria-hidden />
          <div className="absolute -right-6 bottom-10 -z-10 h-32 w-32 rounded-full bg-orange/80" aria-hidden />
          <CookbookMockup priority className="mx-auto w-full max-w-[400px] rotate-[2deg]" />
        </div>
      </div>
    </header>
  );
}
