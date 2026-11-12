import { RECIPES } from "../content/recipes";
import { Photo } from "./Photo";

/** Renders only when real recipes are added to src/content/recipes.ts. */
export function RecipePreview() {
  if (RECIPES.length === 0) return null;
  return (
    <section className="bg-sand py-14 sm:py-20" aria-labelledby="preview-h">
      <div className="container-page">
        <h2 id="preview-h" className="section-title max-w-2xl">
          A Little Taste of What's Inside
        </h2>
        <ul className="-mx-5 mt-8 flex snap-x snap-mandatory gap-4 overflow-x-auto px-5 pb-4 sm:mx-0 sm:grid sm:grid-cols-2 sm:overflow-visible sm:px-0 lg:grid-cols-3">
          {RECIPES.map((r) => (
            <li key={r.name} className="w-[78%] shrink-0 snap-center overflow-hidden rounded-2xl border border-espresso/10 bg-white shadow-card sm:w-auto">
              <div className="aspect-[4/3]">
                <Photo name={r.image} alt={r.name} width={640} height={480} tone="orange" />
              </div>
              <div className="p-4">
                <p className="eyebrow">{r.category}</p>
                <h3 className="mt-1 text-lg font-semibold leading-snug">{r.name}</h3>
                <p className="mt-1 text-sm">{r.time}</p>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
