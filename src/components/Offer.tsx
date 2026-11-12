import { CtaButton } from "./CtaButton";

const items = ["30 Easy Air Fryer Recipes", "4 Weekly Meal Plans", "Organized Grocery Lists", "10 Bonus Quick Dinner Ideas"];

export function Offer() {
  return (
    <section id="offer" className="scroll-mt-4 py-14 sm:py-20" aria-labelledby="offer-h">
      <div className="container-page">
        <div className="mx-auto max-w-xl rounded-3xl border border-espresso/10 bg-white p-6 text-center shadow-lift sm:p-10">
          <h2 id="offer-h" className="section-title">Make Your Next Dinner a Little Easier.</h2>
          <ul className="mt-6 space-y-3 text-left">
            {items.map((t) => (
              <li key={t} className="flex items-center gap-3 border-b border-espresso/10 pb-3 text-lg">
                <svg viewBox="0 0 24 24" className="h-6 w-6 shrink-0 text-olive" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                  <path d="m5 12 5 5 9-10" />
                </svg>
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm font-bold uppercase tracking-widest text-ember">Total price</p>
          <p className="font-display text-6xl font-semibold leading-none">$8.00</p>
          <p className="mt-3">One payment. Your digital cookbook is yours to keep.</p>
          <div className="mt-6">
            <CtaButton>Yes! I Want My Cookbook — $8</CtaButton>
          </div>
          <p className="mt-3 text-sm font-medium">Digital PDF • Instant Access • No Subscription</p>
        </div>
      </div>
    </section>
  );
}
