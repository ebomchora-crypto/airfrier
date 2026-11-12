/**
 * RECIPE PREVIEW CONTENT — copy these from the real cookbook PDF.
 * The "A Little Taste of What's Inside" section only appears when this list
 * has entries, so nothing is ever invented.
 *
 * Example entry (delete when adding real ones):
 * {
 *   name: "Exact recipe title from the PDF",
 *   category: "Chicken",          // label as used in the book
 *   time: "10 min prep • 15 min cook", // exactly as written in the PDF
 *   image: "recipe-01",           // file name in src/assets/images (no extension)
 * }
 */
export interface Recipe {
  name: string;
  category: string;
  time: string;
  image?: string;
}

export const RECIPES: Recipe[] = [];
