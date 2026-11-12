import { getImage } from "../lib/assets";

/** The real cookbook cover from src/assets/images/cover.* */
export function CookbookMockup({ className = "", priority = false }: { className?: string; priority?: boolean }) {
  const cover = getImage("cover");
  if (!cover) return null;
  return (
    <img
      src={cover}
      alt="Air Fryer Meals for Two cookbook cover: 30 easy and budget-friendly recipes, with meal plans and grocery lists"
      width={600}
      height={800}
      loading={priority ? "eager" : "lazy"}
      decoding="async"
      fetchPriority={priority ? "high" : "auto"}
      className={`aspect-[3/4] rounded-lg object-cover shadow-lift ${className}`}
    />
  );
}
