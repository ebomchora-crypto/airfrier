/**
 * Auto-detects real photos you drop into src/assets/images/.
 * Expected file names (any of .webp .jpg .jpeg .png .avif):
 *   cover        – the cookbook cover / product mockup
 *   hero         – appetizing hero meal photo
 *   final        – wide photo for the closing section
 *   solution-1, solution-2, solution-3 – optional benefit photos
 *   recipe names referenced in src/content/recipes.ts (field `image`)
 * Missing files simply fall back to a neutral illustration.
 */
const modules = import.meta.glob("/src/assets/images/*.{webp,jpg,jpeg,png,avif}", {
  eager: true,
  query: "?url",
  import: "default",
}) as Record<string, string>;

const byName: Record<string, string> = {};
for (const [path, url] of Object.entries(modules)) {
  const file = path.split("/").pop() ?? "";
  byName[file.replace(/\.[^.]+$/, "")] = url;
}

export function getImage(name?: string): string | undefined {
  return name ? byName[name] : undefined;
}
