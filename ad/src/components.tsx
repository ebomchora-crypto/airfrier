import React from "react";
import { AbsoluteFill, Easing, Img, OffthreadVideo, interpolate, spring, staticFile, useCurrentFrame, useVideoConfig } from "remotion";
import { C, DISPLAY, SANS } from "./theme";

/** Full-bleed footage with a slow camera move (Ken Burns). */
export const Footage: React.FC<{ src: string; from?: number; to?: number; dur: number; origin?: string; style?: React.CSSProperties }> = ({
  src, from = 1.12, to = 1.0, dur, origin = "50% 50%", style,
}) => {
  const f = useCurrentFrame();
  const s = interpolate(f, [0, dur], [from, to], { extrapolateRight: "clamp", easing: Easing.out(Easing.quad) });
  return (
    <AbsoluteFill style={{ overflow: "hidden", ...style }}>
      <OffthreadVideo muted src={staticFile(`clips/${src}.mp4`)} style={{ width: "100%", height: "100%", objectFit: "cover", transform: `scale(${s})`, transformOrigin: origin }} />
    </AbsoluteFill>
  );
};

/** Masked wipe-in: the incoming scene is revealed from the bottom with a rounded edge. */
export const WipeIn: React.FC<{ children: React.ReactNode; frames?: number }> = ({ children, frames = 9 }) => {
  const f = useCurrentFrame();
  const p = interpolate(f, [0, frames], [100, 0], { extrapolateLeft: "clamp", extrapolateRight: "clamp", easing: Easing.bezier(0.65, 0, 0.35, 1) });
  const r = interpolate(p, [0, 100], [0, 120]);
  return <AbsoluteFill style={{ clipPath: `inset(${p}% 0 0 0 round ${r}px ${r}px 0 0)` }}>{children}</AbsoluteFill>;
};

/** Text line that slides up from behind a mask. */
export const RiseLine: React.FC<{ delay: number; children: React.ReactNode; style?: React.CSSProperties; distance?: number }> = ({
  delay, children, style, distance = 110,
}) => {
  const f = useCurrentFrame();
  const { fps } = useVideoConfig();
  const p = spring({ frame: f - delay, fps, config: { damping: 18, stiffness: 170, mass: 0.8 } });
  return (
    <div style={{ overflow: "hidden", paddingBottom: 6, ...style }}>
      <div style={{ transform: `translateY(${(1 - p) * distance}%)`, opacity: interpolate(p, [0, 0.3], [0, 1], { extrapolateRight: "clamp" }) }}>{children}</div>
    </div>
  );
};

export const Scrim: React.FC<{ top?: number; bottom?: number }> = ({ top = 0.55, bottom = 0.6 }) => (
  <AbsoluteFill
    style={{
      background: `linear-gradient(180deg, rgba(48,32,24,${top}) 0%, rgba(48,32,24,0) 38%, rgba(48,32,24,0) 52%, rgba(48,32,24,${bottom}) 100%)`,
    }}
  />
);

/** The real cookbook cover with subtle 3D perspective and soft shadow. */
export const Cover: React.FC<{ width: number; rotY: number; rotX?: number; style?: React.CSSProperties }> = ({ width, rotY, rotX = 4, style }) => (
  <div style={{ perspective: 1600, ...style }}>
    <div
      style={{
        width, height: width * (1448 / 1086), transform: `rotateY(${rotY}deg) rotateX(${rotX}deg)`, transformStyle: "preserve-3d",
        borderRadius: 14, overflow: "hidden",
        boxShadow: "0 50px 80px -30px rgba(48,32,24,.65), 0 18px 30px -12px rgba(48,32,24,.45)",
      }}
    >
      <Img src={staticFile("img/cover.png")} style={{ width: "100%", height: "100%", display: "block" }} />
      <div style={{ position: "absolute", inset: 0, background: "linear-gradient(100deg, rgba(255,255,255,.22) 0%, rgba(255,255,255,0) 30%, rgba(0,0,0,.12) 100%)" }} />
      <div style={{ position: "absolute", top: 0, bottom: 0, left: 0, width: 10, background: "linear-gradient(90deg, rgba(0,0,0,.35), rgba(0,0,0,0))" }} />
    </div>
  </div>
);

export const Pill: React.FC<{ bg: string; color: string; children: React.ReactNode; size?: number; style?: React.CSSProperties }> = ({
  bg, color, children, size = 64, style,
}) => (
  <span style={{ display: "inline-block", background: bg, color, fontFamily: SANS, fontWeight: 900, fontSize: size, letterSpacing: "-0.01em", padding: `${size * 0.16}px ${size * 0.4}px`, borderRadius: size * 0.3, lineHeight: 1.05, ...style }}>
    {children}
  </span>
);

export const headline: React.CSSProperties = { fontFamily: SANS, fontWeight: 900, color: C.white, letterSpacing: "-0.035em", lineHeight: 0.95, textShadow: "0 6px 30px rgba(0,0,0,.35)" };
export const serif: React.CSSProperties = { fontFamily: DISPLAY, fontWeight: 900, letterSpacing: "-0.02em", lineHeight: 0.92 };
