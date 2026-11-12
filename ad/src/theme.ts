import { continueRender, delayRender, staticFile } from "remotion";

export const C = {
  cream: "#FFF8EF",
  espresso: "#302018",
  orange: "#F47721",
  gold: "#FFC857",
  white: "#FFFFFF",
  olive: "#556B42",
};

export const DISPLAY = "Fraunces";
export const SANS = "Inter";

const faces: [string, string, string, string][] = [
  [DISPLAY, "fraunces-latin-700-normal.woff2", "700", "normal"],
  [DISPLAY, "fraunces-latin-900-normal.woff2", "900", "normal"],
  [DISPLAY, "fraunces-latin-900-italic.woff2", "900", "italic"],
  [SANS, "inter-latin-600-normal.woff2", "600", "normal"],
  [SANS, "inter-latin-800-normal.woff2", "800", "normal"],
  [SANS, "inter-latin-900-normal.woff2", "900", "normal"],
];

let loaded = false;
export function loadFonts() {
  if (loaded || typeof document === "undefined") return;
  loaded = true;
  const handle = delayRender("fonts");
  Promise.all(
    faces.map(([family, file, weight, style]) => {
      const f = new FontFace(family, `url(${staticFile(`fonts/${file}`)}) format("woff2")`, { weight, style });
      return f.load().then((ff) => document.fonts.add(ff));
    }),
  )
    .then(() => continueRender(handle))
    .catch((e) => {
      console.error(e);
      continueRender(handle);
    });
}
