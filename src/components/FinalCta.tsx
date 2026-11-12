import { CtaButton } from "./CtaButton";
import { Photo } from "./Photo";

export function FinalCta() {
  return (
    <section className="relative isolate overflow-hidden bg-espresso text-ivory" aria-labelledby="final-h">
      <div className="absolute inset-0 -z-10 opacity-40" aria-hidden>
        <Photo name="final" alt="" width={1600} height={800} tone="olive" />
      </div>
      <div className="container-page py-20 text-center sm:py-28">
        <h2 id="final-h" className="mx-auto max-w-2xl font-display text-3xl font-semibold leading-tight sm:text-5xl">
          Your Next Favorite Meal Is Just a Recipe Away.
        </h2>
        <p className="mx-auto mt-4 max-w-lg text-lg">
          Spend less time wondering what to cook and more time enjoying dinner together.
        </p>
        <div className="mx-auto mt-8 max-w-sm">
          <CtaButton>Get Instant Access — $8</CtaButton>
        </div>
        <p className="mt-3 text-sm font-medium">Digital PDF • One-Time Payment • No Subscription</p>
      </div>
    </section>
  );
}
