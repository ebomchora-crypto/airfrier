import { getImage } from "../lib/assets";

/** Uses the real cover (src/assets/images/cover.*) when present; otherwise a typographic stand-in. */
export function CookbookMockup({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  const cover = getImage("cover");
  if (cover) {
    return (
      <img
        src={cover}
        alt="Air Fryer Meals for Two digital cookbook cover"
        width={600}
        height={800}
        loading={priority ? "eager" : "lazy"}
        decoding="async"
        fetchPriority={priority ? "high" : "auto"}
        className={`rounded-md shadow-lift ${className}`}
      />
    );
  }
  return (
    <div
      role="img"
      aria-label="Air Fryer Meals for Two digital cookbook cover"
      style={{ containerType: "inline-size" }}
      className={`flex aspect-[3/4] flex-col justify-between relative w-full overflow-hidden rounded-md bg-olive p-[8%] text-ivory shadow-lift ${className}`}
    >
      <div className="absolute -right-[10%] -top-[8%] h-[42%] w-[56%] rounded-full bg-orange" aria-hidden />
      <div className="absolute -bottom-[8%] -left-[10%] h-[34%] w-[46%] rounded-full bg-gold" aria-hidden />
      <p className="relative font-bold uppercase tracking-[0.2em] text-espresso" style={{ fontSize: "5.5cqw" }}>Digital Cookbook</p>
      <div className="relative">
        <p className="font-display font-semibold leading-[1.05] text-ivory" style={{ fontSize: "15cqw" }}>
          Air Fryer Meals <span className="italic text-gold">for Two</span>
        </p>
      </div>
      <p className="relative font-semibold leading-snug text-espresso" style={{ fontSize: "6.5cqw" }}>
        30 Recipes · 4 Meal Plans
        <br />
        Grocery Lists
      </p>
    </div>
  );
}
