const steps = [
  { title: "Download Your Cookbook", body: "Get your digital recipe collection after completing your purchase." },
  { title: "Pick a Recipe", body: "Browse 30 delicious ideas or follow one of the included weekly meal plans." },
  { title: "Start Cooking", body: "Grab your ingredients, preheat your air fryer, and enjoy a homemade meal." },
];

export function HowItWorks() {
  return (
    <section className="py-14 sm:py-20" aria-labelledby="how-h">
      <div className="container-page">
        <h2 id="how-h" className="section-title max-w-2xl">
          From Download to Dinner in 3 Simple Steps
        </h2>
        <ol className="mt-10 grid gap-8 md:grid-cols-3 md:gap-6">
          {steps.map((s, i) => (
            <li key={s.title} className="flex gap-4 md:block">
              <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full border-2 border-espresso font-display text-2xl font-semibold">
                {i + 1}
              </span>
              <div className="md:mt-4">
                <h3 className="text-xl font-semibold">{s.title}</h3>
                <p className="mt-2 leading-relaxed">{s.body}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>
  );
}
