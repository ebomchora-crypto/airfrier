import { CookbookMockup } from "./CookbookMockup";
import { CtaButton } from "./CtaButton";

export function Inside() {
  return (
    <section id="inside" className="scroll-mt-4 bg-sand py-14 sm:py-20" aria-labelledby="inside-h">
      <div className="container-page">
        <h2 id="inside-h" className="section-title max-w-2xl">
          Everything You Need to Make Dinner Easier
        </h2>

        <div className="mt-8 grid gap-4 lg:grid-cols-[0.8fr_1.6fr] lg:gap-8">
          <div className="flex justify-center py-4 lg:items-center">
            <CookbookMockup className="w-[200px] -rotate-3 sm:w-[240px]" />
          </div>

          <div className="grid gap-4 sm:grid-cols-2">
            {/* 1 — Recipes */}
            <article className="rounded-2xl bg-orange p-6 text-espresso shadow-card">
              <p className="font-display text-6xl font-semibold leading-none">30</p>
              <h3 className="mt-3 text-xl font-semibold">30 Easy Recipes</h3>
              <p className="mt-2 leading-relaxed">Delicious meal ideas with clear ingredients and simple step-by-step instructions.</p>
            </article>

            {/* 2 — Meal plans */}
            <article className="rounded-2xl border border-espresso/10 bg-white p-6 shadow-card">
              <div className="flex gap-2" aria-hidden>
                {[1, 2, 3, 4].map((w) => (
                  <span key={w} className="flex h-10 w-10 items-center justify-center rounded-lg border border-olive/40 bg-ivory text-sm font-bold text-olive">
                    W{w}
                  </span>
                ))}
              </div>
              <h3 className="mt-4 text-xl font-semibold">4 Weekly Meal Plans</h3>
              <p className="mt-2 leading-relaxed">Take the guesswork out of deciding what to cook.</p>
            </article>

            {/* 3 — Grocery lists */}
            <article className="rounded-2xl bg-gold p-6 text-espresso shadow-card">
              <div className="space-y-2" aria-hidden>
                {[70, 50, 62].map((w, i) => (
                  <div key={i} className="flex items-center gap-2">
                    <span className="h-4 w-4 rounded border-2 border-espresso" />
                    <span className="h-2 rounded-full bg-espresso/30" style={{ width: `${w}%` }} />
                  </div>
                ))}
              </div>
              <h3 className="mt-4 text-xl font-semibold">Ready-to-Use Grocery Lists</h3>
              <p className="mt-2 leading-relaxed">Shop with a plan instead of wandering through the store.</p>
            </article>

            {/* 4 — Bonus */}
            <article className="rounded-2xl bg-olive p-6 text-ivory shadow-card">
              <span className="inline-block rounded-full bg-gold px-3 py-1 text-xs font-bold uppercase tracking-wider text-espresso">Bonus</span>
              <p className="mt-3 font-display text-5xl font-semibold leading-none">+10</p>
              <h3 className="mt-3 text-xl font-semibold">10 Bonus Quick Dinners</h3>
              <p className="mt-2 leading-relaxed">Extra dinner inspiration for your busiest evenings.</p>
            </article>
          </div>
        </div>

        <div className="mt-10 flex justify-center">
          <CtaButton>Get My Cookbook — $8</CtaButton>
        </div>
      </div>
    </section>
  );
}
