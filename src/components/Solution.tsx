import { Photo } from "./Photo";

const benefits = [
  { title: "Easy-to-follow instructions", body: "Clear ingredients, quantities, and step-by-step directions.", photo: "solution-1", tone: "orange" as const },
  { title: "Convenient two-person portions", body: "Recipes built around cooking for two, so there's less to scale down.", photo: "solution-2", tone: "gold" as const },
  { title: "Practical meals, familiar ingredients", body: "Most recipes focus on ingredients you can find at the grocery store.", photo: "solution-3", tone: "olive" as const },
];

export function Solution() {
  return (
    <section className="py-14 sm:py-20" aria-labelledby="solution-h">
      <div className="container-page grid gap-10 lg:grid-cols-[1fr_1.2fr] lg:gap-16">
        <div className="lg:sticky lg:top-8 lg:self-start">
          <p className="eyebrow">The simple fix</p>
          <h2 id="solution-h" className="section-title mt-3">
            Your Air Fryer. 30 Fresh Ideas. Less Dinner Stress.
          </h2>
          <p className="mt-4 text-lg leading-relaxed">
            Open the cookbook, pick a recipe, and start cooking. No hunting for ideas, no guessing how much to make —
            just simple air fryer dinners sized for two.
          </p>
        </div>
        <ul className="grid gap-4">
          {benefits.map((b) => (
            <li key={b.title} className="grid overflow-hidden rounded-2xl border border-espresso/10 bg-white shadow-card sm:grid-cols-[180px_1fr]">
              <div className="h-40 sm:h-full">
                <Photo name={b.photo} alt="" width={360} height={300} tone={b.tone} />
              </div>
              <div className="p-5 sm:p-6">
                <h3 className="text-xl font-semibold">{b.title}</h3>
                <p className="mt-2 leading-relaxed">{b.body}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
