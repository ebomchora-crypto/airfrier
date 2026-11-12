const problems = [
  { title: "Running Out of Ideas", body: "You keep making the same meals because planning something different feels like another chore.", icon: "M12 3a6 6 0 0 0-3.5 10.9V17h7v-3.1A6 6 0 0 0 12 3Zm-2 17h4" },
  { title: "Spending Too Much on Takeout", body: "Ordering dinner is convenient, but those little expenses can add up quickly.", icon: "M6 7h12l-1 12H7L6 7Zm3 0a3 3 0 0 1 6 0" },
  { title: "Cooking More Than You Need", body: "Most recipes make huge portions when you're only cooking for two.", icon: "M4 12h16M6 12a6 6 0 0 0 12 0M9 8c0-2 3-2 3-4m3 4c0-2 3-2 3-4" },
];

export function Problem() {
  return (
    <section className="bg-sand py-14 sm:py-20" aria-labelledby="problem-h">
      <div className="container-page">
        <h2 id="problem-h" className="section-title max-w-2xl">
          Tired of Asking “What's for Dinner?” Every Night?
        </h2>
        <ul className="mt-8 grid gap-4 md:grid-cols-3">
          {problems.map((p) => (
            <li key={p.title} className="rounded-2xl border border-espresso/10 bg-white p-6 shadow-card">
              <svg viewBox="0 0 24 24" className="h-9 w-9 text-ember" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden>
                <path d={p.icon} />
              </svg>
              <h3 className="mt-4 text-xl font-semibold">{p.title}</h3>
              <p className="mt-2 leading-relaxed">{p.body}</p>
            </li>
          ))}
        </ul>
        <p className="mt-10 max-w-2xl font-display text-xl font-medium italic leading-snug sm:text-2xl">
          Dinner doesn't have to be complicated. You just need a few good ideas and a simple plan.
        </p>
      </div>
    </section>
  );
}
