import { CtaButton } from "./CtaButton";
import { CookbookMockup } from "./CookbookMockup";
import { Photo } from "./Photo";

export function Hero({ ctaRef }: { ctaRef: React.Ref<HTMLAnchorElement> }) {
  return (
    <header className="relative overflow-hidden">
      <div className="container-page flex items-center justify-between py-3">
        <span className="font-display text-lg font-semibold">Air Fryer Meals for Two</span>
        <a href="#inside" className="hidden min-h-[48px] items-center text-sm font-semibold underline-offset-4 hover:underline sm:inline-flex">
          See What's Inside
        </a>
      </div>

      <div className="container-page grid items-center gap-6 pb-10 pt-2 md:grid-cols-2 md:gap-12 md:pb-16 md:pt-6">
        <div className="md:col-start-1 md:row-start-1 md:self-end">
          <p className="eyebrow">Your next favorite dinner starts here</p>
          <h1 className="mt-3 text-[2.15rem] font-semibold leading-[1.05] sm:text-5xl lg:text-6xl">
            30 Delicious Air Fryer Recipes. <span className="italic text-ember">Made Just for Two.</span>
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed sm:text-lg">
            Skip the dinner stress with easy, budget-friendly recipes, ready-to-use meal plans, and simple grocery
            lists — all in one digital cookbook.
          </p>
        </div>

        <div className="relative mx-auto w-full max-w-sm md:col-start-2 md:row-span-2 md:row-start-1 md:max-w-none">
          <div className="relative mx-auto h-[190px] overflow-hidden rounded-3xl border border-espresso/10 shadow-card sm:h-[300px] md:h-[440px]">
            <Photo name="hero" alt="A homemade air fryer dinner for two" width={800} height={600} priority tone="orange" />
          </div>
          <div className="absolute -bottom-4 right-3 w-[96px] rotate-[4deg] sm:w-[140px] md:-bottom-6 md:right-6 md:w-[190px]">
            <CookbookMockup priority />
          </div>
        </div>

        <div className="pt-2 md:col-start-1 md:row-start-2 md:self-start">
          <p className="font-display text-lg font-semibold sm:text-2xl">
            Get the Complete Cookbook for Just <span className="text-ember">$8</span>
          </p>
          <div className="mt-4">
            <CtaButton buttonRef={ctaRef}>Get My Cookbook — $8</CtaButton>
          </div>
          <p className="mt-3 text-center text-sm font-medium sm:text-left">Instant Digital Download • One-Time Payment</p>
        </div>
      </div>
    </header>
  );
}
