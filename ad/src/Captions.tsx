import React from "react";
import { interpolate, spring, useCurrentFrame, useVideoConfig } from "remotion";
import timeline from "./timeline.json";
import { C, SANS } from "./theme";

/** Word-synced captions, 3–5 words per line, kept inside the Reels/TikTok safe zone (y ≈ 1330–1430). */
export const Captions = () => {
  const frame = useCurrentFrame();
  const { fps } = useVideoConfig();
  const t = frame / fps;
  const cap = timeline.captions.find((c) => t >= c.start && t < c.end);
  if (!cap) return null;
  const enter = spring({ frame: frame - Math.round(cap.start * fps), fps, config: { damping: 20, stiffness: 260 } });
  return (
    <div style={{ position: "absolute", left: 70, right: 150, top: 1330, display: "flex", justifyContent: "center" }}>
      <div
        style={{
          background: "rgba(48,32,24,.86)", borderRadius: 26, padding: "16px 30px 18px", maxWidth: 860, textAlign: "center",
          transform: `translateY(${(1 - enter) * 24}px) scale(${0.94 + enter * 0.06})`, opacity: enter,
          fontFamily: SANS, fontWeight: 800, fontSize: 54, lineHeight: 1.12, letterSpacing: "-0.01em", color: C.white,
          boxShadow: "0 12px 30px -12px rgba(0,0,0,.45)",
        }}
      >
        {cap.words.map((w, i) => {
          const spoken = t >= w.start;
          const pop = spring({ frame: frame - Math.round(w.start * fps), fps, config: { damping: 14, stiffness: 300 } });
          return (
            <React.Fragment key={i}>
            {i > 0 ? " " : null}
            <span
              style={{
                display: "inline-block", padding: w.hl ? "0 0.08em" : 0,
                color: w.hl ? (spoken ? C.gold : "rgba(255,200,87,.55)") : spoken ? C.white : "rgba(255,255,255,.6)",
                transform: `scale(${w.hl ? 1 + interpolate(pop, [0, 1], [0, 0.06]) : 1})`,
              }}
            >
              {w.text}
            </span>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};
