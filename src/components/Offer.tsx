import { CtaButton } from "./CtaButton";
import { CookbookMockup } from "./CookbookMockup";
import { Guarantee } from "./Guarantee";
import { Check } from "./Check";

const items = ["30 Easy Air Fryer Recipes", "4 Weekly Meal Plans", "Organized Grocery Lists", "10 Bonus Quick Dinner Ideas"];

export function Offer() {
  return (
    <section id="offer" className="scroll-mt-4 py-14 sm:py-20" aria-labelledby="offer-h">
      <div className="container-page">
        <div className="mx-auto max-w-xl rounded-3xl border border-espresso/10 bg-white p-6 text-center shadow-lift sm:p-10">
          <CookbookMockup className="mx-auto -mt-16 mb-6 w-[130px] rotate-[-3deg] sm:-mt-20 sm:w-[150px]" />
          <h2 id="offer-h" className="section-title">Make Your Next Dinner a Little Easier.</h2>
          <ul className="mt-6 space-y-3 text-left">
            {items.map((t) => (
              <li key={t} className="flex items-center gap-3 border-b border-espresso/10 pb-3 text-lg">
                <Check className="h-6 w-6" />
                {t}
              </li>
            ))}
          </ul>
          <p className="mt-6 text-sm font-bold uppercase tracking-widest text-ember">Total price</p>
          <p className="font-display text-6xl font-semibold leading-none">
            $8.00 <span className="font-sans text-base font-semibold tracking-wide text-espresso/70">USD</span>
          </p>
          <p className="mt-3">One payment. Your digital cookbook is yours to keep.</p>
          <div className="mt-6">
            <CtaButton location="offer">Yes! I Want My Cookbook — $8</CtaButton>
          </div>
          <p className="mt-3 text-sm font-medium">Instant Access • No Subscription • Secure Checkout</p>
          <div className="mt-6 border-t border-espresso/10 pt-6">
            <Guarantee compact />
          </div>
        </div>
      </div>
    </section>
  );
}
